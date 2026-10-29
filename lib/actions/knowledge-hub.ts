'use server'

import db from '@/db/drizzle';
import { knowledgeItems } from '@/db/schema';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { and, desc, eq } from 'drizzle-orm/sql';
import { ensureLiveCmsData } from '@/lib/cms-live';
import { knowledgeItemSchema } from '@/lib/validators';
import { requireStaff } from '@/lib/staff/session';
import { slugifyTitle } from '@/lib/staff/slug';
import { sanitizeRichHtml } from '@/lib/sanitize-rich-html';
import type { KnowledgeItem, KnowledgeSectionSlug } from '@/lib/data/knowledge-hub';

export type KnowledgeItemInput = z.input<typeof knowledgeItemSchema>;

type ActionResponse<T = void> =
  | { success: true; data?: T }
  | { success: false; error: string };

type KnowledgeRow = typeof knowledgeItems.$inferSelect;

function toKnowledgeItem(row: KnowledgeRow): KnowledgeItem {
  return {
    id: row.id,
    section: row.section as KnowledgeSectionSlug,
    title: row.title,
    slug: row.slug,
    summary: row.summary,
    content: row.content || '',
    coverImage: row.coverImage,
    attachmentUrl: row.attachmentUrl || '',
    attachmentName: row.attachmentName || '',
    attachmentSize: row.attachmentSize ?? null,
    publishedAt: row.publishedAt.toISOString(),
  };
}

/** `YYYY-MM-DD` → 12:00 UTC on that day, so the calendar date reads the same in every timezone. */
function toPublishedAt(day: string) {
  const [year, month, date] = day.split('-').map(Number);
  return new Date(Date.UTC(year, month - 1, date, 12));
}

function revalidateKnowledgePaths(section: string, slug?: string, previous?: { section: string; slug: string }) {
  revalidatePath('/staff/knowledge-hub');
  revalidatePath(`/knowledge-hub/${section}`);
  if (slug) {
    revalidatePath(`/knowledge-hub/${section}/${slug}`);
  }
  if (previous && (previous.section !== section || previous.slug !== slug)) {
    revalidatePath(`/knowledge-hub/${previous.section}`);
    revalidatePath(`/knowledge-hub/${previous.section}/${previous.slug}`);
  }
}

/**
 * Ensure slug is unique by appending a number if necessary
 */
async function ensureUniqueSlug(baseSlug: string, excludeId?: string): Promise<string> {
  let slug = baseSlug;
  let counter = 1;

  while (true) {
    const existing = await db
      .select({ id: knowledgeItems.id })
      .from(knowledgeItems)
      .where(eq(knowledgeItems.slug, slug))
      .limit(1);

    if (existing.length === 0 || (excludeId && existing[0].id === excludeId)) {
      return slug;
    }

    slug = `${baseSlug}-${counter}`;
    counter++;
  }
}

function errorMessage(error: unknown, fallback: string) {
  if (error instanceof z.ZodError) {
    return error.issues.map(e => `${e.path.join('.')}: ${e.message}`).join(', ');
  }
  return error instanceof Error ? error.message : fallback;
}

/**
 * List Knowledge Hub items, newest first
 */
export async function listKnowledgeItems(options?: {
  section?: KnowledgeSectionSlug;
  /** When false, skip the live CMS gate (staff panel lists). Default true for public pages. */
  live?: boolean;
}): Promise<ActionResponse<KnowledgeItem[]>> {
  try {
    if (options?.live !== false) {
      await ensureLiveCmsData();
    }

    const rows = await db
      .select()
      .from(knowledgeItems)
      .where(options?.section ? eq(knowledgeItems.section, options.section) : undefined)
      .orderBy(desc(knowledgeItems.publishedAt), desc(knowledgeItems.createdAt));

    return { success: true, data: rows.map(toKnowledgeItem) };
  } catch (error) {
    console.error('Error fetching knowledge items:', error);
    return { success: false, error: errorMessage(error, 'Failed to fetch items') };
  }
}

/**
 * Get a single item by ID (staff)
 */
export async function getKnowledgeItem(id: string): Promise<ActionResponse<KnowledgeItem>> {
  try {
    await requireStaff({ redirect: false });
    const rows = await db.select().from(knowledgeItems).where(eq(knowledgeItems.id, id)).limit(1);
    if (rows.length === 0) {
      return { success: false, error: 'Item not found' };
    }
    return { success: true, data: toKnowledgeItem(rows[0]) };
  } catch (error) {
    console.error('Error fetching knowledge item:', error);
    return { success: false, error: errorMessage(error, 'Failed to fetch item') };
  }
}

/**
 * Get a single published item by section and slug (public)
 */
export async function getKnowledgeItemBySlug(
  section: KnowledgeSectionSlug,
  slug: string
): Promise<ActionResponse<KnowledgeItem>> {
  try {
    await ensureLiveCmsData();
    const rows = await db
      .select()
      .from(knowledgeItems)
      .where(and(eq(knowledgeItems.section, section), eq(knowledgeItems.slug, slug)))
      .limit(1);
    if (rows.length === 0) {
      return { success: false, error: 'Item not found' };
    }
    return { success: true, data: toKnowledgeItem(rows[0]) };
  } catch (error) {
    console.error('Error fetching knowledge item:', error);
    return { success: false, error: errorMessage(error, 'Failed to fetch item') };
  }
}

function toRowValues(validated: z.output<typeof knowledgeItemSchema>) {
  const content = validated.content ? sanitizeRichHtml(validated.content) : '';
  const attachmentUrl = validated.attachmentUrl?.trim() || null;
  return {
    section: validated.section,
    title: validated.title,
    summary: validated.summary,
    content: content || null,
    coverImage: validated.coverImage,
    attachmentUrl,
    attachmentName: attachmentUrl ? validated.attachmentName?.trim() || null : null,
    attachmentSize: attachmentUrl ? validated.attachmentSize ?? null : null,
    publishedAt: toPublishedAt(validated.publishedOn),
  };
}

/**
 * Create a new Knowledge Hub item
 */
export async function createKnowledgeItem(data: KnowledgeItemInput): Promise<ActionResponse<string>> {
  try {
    await requireStaff({ redirect: false });
    const validated = knowledgeItemSchema.parse(data);

    const baseSlug = validated.slug?.trim() || slugifyTitle(validated.title);
    const slug = await ensureUniqueSlug(baseSlug);
    const id = `kh-${Date.now()}`;

    await db.insert(knowledgeItems).values({
      id,
      slug,
      ...toRowValues(validated),
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    revalidateKnowledgePaths(validated.section, slug);

    return { success: true, data: id };
  } catch (error) {
    console.error('Error creating knowledge item:', error);
    return { success: false, error: errorMessage(error, 'Failed to create item') };
  }
}

/**
 * Update an existing Knowledge Hub item
 */
export async function updateKnowledgeItem(id: string, data: KnowledgeItemInput): Promise<ActionResponse> {
  try {
    await requireStaff({ redirect: false });
    const validated = knowledgeItemSchema.parse(data);

    const existing = await db.select().from(knowledgeItems).where(eq(knowledgeItems.id, id)).limit(1);
    if (existing.length === 0) {
      return { success: false, error: 'Item not found' };
    }

    let slug = existing[0].slug;
    const requestedSlug = validated.slug?.trim();
    if (requestedSlug && requestedSlug !== existing[0].slug) {
      slug = await ensureUniqueSlug(requestedSlug, id);
    }

    await db
      .update(knowledgeItems)
      .set({ slug, ...toRowValues(validated), updatedAt: new Date() })
      .where(eq(knowledgeItems.id, id));

    revalidateKnowledgePaths(validated.section, slug, existing[0]);

    return { success: true };
  } catch (error) {
    console.error('Error updating knowledge item:', error);
    return { success: false, error: errorMessage(error, 'Failed to update item') };
  }
}

/**
 * Delete a Knowledge Hub item
 */
export async function deleteKnowledgeItem(id: string): Promise<ActionResponse> {
  try {
    await requireStaff({ redirect: false });
    const existing = await db.select().from(knowledgeItems).where(eq(knowledgeItems.id, id)).limit(1);
    if (existing.length === 0) {
      return { success: false, error: 'Item not found' };
    }

    await db.delete(knowledgeItems).where(eq(knowledgeItems.id, id));

    revalidateKnowledgePaths(existing[0].section, existing[0].slug);

    return { success: true };
  } catch (error) {
    console.error('Error deleting knowledge item:', error);
    return { success: false, error: errorMessage(error, 'Failed to delete item') };
  }
}
