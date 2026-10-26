'use server'

import db from '@/db/drizzle';
import { news } from '@/db/schema';
import { revalidatePath, updateTag } from 'next/cache';
import { NEWS_CACHE_TAG } from '@/lib/cache-tags';
import { z } from 'zod';
import { eq, desc, ilike, or, and, count, asc } from 'drizzle-orm/sql';
import { ensureLiveCmsData } from '@/lib/cms-live';
import { newsSchema } from '@/lib/validators';
import { requireStaff } from '@/lib/staff/session';
import { sanitizeRichHtml } from '@/lib/sanitize-rich-html';

export type NewsData = z.infer<typeof newsSchema>;

type ActionResponse<T = void> = 
  | { success: true; data?: T }
  | { success: false; error: string };

function revalidateNewsPaths(slug?: string, previousSlug?: string) {
  updateTag(NEWS_CACHE_TAG);
  revalidatePath('/');
  revalidatePath('/staff/news');
  revalidatePath('/newsroom');
  if (slug) {
    revalidatePath(`/news/${slug}`);
  }
  if (previousSlug && previousSlug !== slug) {
    revalidatePath(`/news/${previousSlug}`);
  }
}

/**
 * Generate a URL-friendly slug from a title
 */
function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
    .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
}

/**
 * Ensure slug is unique by appending a number if necessary
 */
async function ensureUniqueSlug(baseSlug: string, excludeId?: string): Promise<string> {
  let slug = baseSlug;
  let counter = 1;
  
  while (true) {
    const existing = await db.select().from(news).where(eq(news.slug, slug)).limit(1);

    if (existing.length === 0) {
      return slug;
    }

    if (excludeId && existing[0].id === excludeId) {
      return slug;
    }

    slug = `${baseSlug}-${counter}`;
    counter++;
  }
}

/**
 * List all news articles with optional filtering
 */
export async function listNews(options?: {
  category?: string;
  search?: string;
  featured?: boolean;
  limit?: number;
  offset?: number;
  /** When false, skip the live CMS gate (staff panel lists). Default true for public pages. */
  live?: boolean;
}): Promise<ActionResponse<{ articles: NewsData[]; total: number }>> {
  try {
    if (options?.live !== false) {
      await ensureLiveCmsData()
    }
    // Build query conditions
    const conditions = [];
    
    if (options?.category) {
      conditions.push(eq(news.category, options.category));
    }
    
    if (options?.featured !== undefined) {
      conditions.push(eq(news.featured, options.featured));
    }
    
    if (options?.search) {
      conditions.push(
        or(
          ilike(news.title, `%${options.search}%`),
          ilike(news.excerpt, `%${options.search}%`)
        )
      );
    }
    
    const whereClause =
      conditions.length > 0 ? and(...conditions) : undefined;

    const [{ value: total }] = await db
      .select({ value: count() })
      .from(news)
      .where(whereClause);

    const ordered = db
      .select()
      .from(news)
      .where(whereClause)
      .orderBy(desc(news.publishedAt), desc(news.createdAt));

    const articles =
      options?.limit !== undefined
        ? await ordered.limit(options.limit).offset(options?.offset ?? 0)
        : options?.offset !== undefined
          ? await ordered.offset(options.offset)
          : await ordered;
    
    const data: NewsData[] = articles.map(article => ({
      id: article.id,
      title: article.title,
      excerpt: article.excerpt,
      content: article.content || '',
      thumbnail: article.thumbnail,
      category: article.category,
      slug: article.slug,
      readTime: article.readTime || '',
      featured: article.featured,
      publishedAt: article.publishedAt
    }));

    return {
      success: true,
      data: { articles: data, total }
    };
  } catch (error) {
    console.error('Error fetching news:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch news'
    };
  }
}

/**
 * Get a single news article by ID
 */
export async function listNewsCategories(): Promise<ActionResponse<string[]>> {
  try {
    await requireStaff({ redirect: false })
    const rows = await db
      .selectDistinct({ category: news.category })
      .from(news)
      .orderBy(asc(news.category))

    return {
      success: true,
      data: rows.map((row) => row.category).filter(Boolean),
    }
  } catch (error) {
    console.error('Error fetching news categories:', error)
    return {
      success: false,
      error:
        error instanceof Error ? error.message : 'Failed to fetch categories',
    }
  }
}

export async function getNewsArticle(id: string): Promise<ActionResponse<NewsData>> {
  try {
    await requireStaff({ redirect: false })
    const article = await db.select().from(news).where(eq(news.id, id)).limit(1);
    if (article.length === 0) {
      return {
        success: false,
        error: 'News article not found'
      };
    }
    const data: NewsData = {
      id: article[0].id,
      title: article[0].title,
      excerpt: article[0].excerpt,
      content: article[0].content || '',
      thumbnail: article[0].thumbnail,
      category: article[0].category,
      slug: article[0].slug,
      readTime: article[0].readTime || '',
      featured: article[0].featured,
      publishedAt: article[0].publishedAt
    };

    return {
      success: true,
      data
    };
  } catch (error) {
    console.error('Error fetching news article:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch news article'
    };
  }
}

/**
 * Get a single news article by slug
 */
export async function getNewsArticleBySlug(slug: string): Promise<ActionResponse<NewsData>> {
  try {
    await ensureLiveCmsData()
    const article = await db.select().from(news).where(eq(news.slug, slug)).limit(1);
    if (article.length === 0) {
      return {
        success: false,
        error: 'News article not found'
      };
    }

    const data: NewsData = {
      id: article[0].id,
      title: article[0].title,
      excerpt: article[0].excerpt,
      content: article[0].content || '',
      thumbnail: article[0].thumbnail,
      category: article[0].category,
      slug: article[0].slug,
      readTime: article[0].readTime || '',
      featured: article[0].featured,
      publishedAt: article[0].publishedAt
    };

    return {
      success: true,
      data
    };
  } catch (error) {
    console.error('Error fetching news article:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch news article'
    };
  }
}

/**
 * Create a new news article
 */
export async function createNewsArticle(
  data: Omit<NewsData, 'id'>
): Promise<ActionResponse<string>> {
  try {
    await requireStaff({ redirect: false })
    const validated = newsSchema.omit({ id: true }).parse(data)

    const baseSlug = validated.slug?.trim()
      ? validated.slug.trim()
      : generateSlug(validated.title)
    const uniqueSlug = await ensureUniqueSlug(baseSlug)
    
    // Generate unique ID
    const id = `news-${Date.now()}`;
    
    // Convert publishedAt to Date if it's a string
    const publishedAt = validated.publishedAt
    const content = validated.content
      ? sanitizeRichHtml(validated.content)
      : null

    await db.insert(news).values({
      id,
      title: validated.title,
      excerpt: validated.excerpt,
      content: content || null,
      thumbnail: validated.thumbnail,
      category: validated.category,
      slug: uniqueSlug,
      readTime: validated.readTime || null,
      featured: validated.featured,
      publishedAt,
      createdAt: new Date(),
      updatedAt: new Date()
    });
    
    revalidateNewsPaths(uniqueSlug);
    
    return { 
      success: true,
      data: id
    };
  } catch (error) {
    console.error('Error creating news article:', error);
    
    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: error.issues.map(e => `${e.path.join('.')}: ${e.message}`).join(', ')
      };
    }
    
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to create news article'
    };
  }
}

/**
 * Update an existing news article
 */
export async function updateNewsArticle(id: string, data: Omit<NewsData, 'id'>): Promise<ActionResponse> {
  try {
    await requireStaff({ redirect: false })
    const validated = newsSchema.omit({ id: true }).parse(data);
    
    // Check if article exists
    const existing = await db.select().from(news).where(eq(news.id, id)).limit(1);
    if (existing.length === 0) {
      return {
        success: false,
        error: 'News article not found'
      };
    }
    
    let slug = existing[0].slug
    const requestedSlug = validated.slug?.trim()
    if (requestedSlug && requestedSlug !== existing[0].slug) {
      slug = await ensureUniqueSlug(requestedSlug, id)
    }

    const publishedAt = validated.publishedAt
    const content = validated.content
      ? sanitizeRichHtml(validated.content)
      : null

    await db.update(news)
      .set({
        title: validated.title,
        excerpt: validated.excerpt,
        content: content || null,
        thumbnail: validated.thumbnail,
        category: validated.category,
        slug,
        readTime: validated.readTime || null,
        featured: validated.featured,
        publishedAt,
        updatedAt: new Date()
      })
      .where(eq(news.id, id));
    
    revalidateNewsPaths(slug, existing[0].slug);
    
    return { success: true };
  } catch (error) {
    console.error('Error updating news article:', error);
    
    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: error.issues.map(e => `${e.path.join('.')}: ${e.message}`).join(', ')
      };
    }
    
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to update news article'
    };
  }
}

/**
 * Delete a news article
 */
export async function deleteNewsArticle(id: string): Promise<ActionResponse> {
  try {
    await requireStaff({ redirect: false })
    // Check if article exists
    const existing = await db.select().from(news).where(eq(news.id, id)).limit(1);
    if (existing.length === 0) {
      return {
        success: false,
        error: 'News article not found'
      };
    }
    
    // Delete the article
    await db.delete(news)
      .where(eq(news.id, id));
    
    revalidateNewsPaths(existing[0].slug);
    
    return { success: true };
  } catch (error) {
    console.error('Error deleting news article:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to delete news article'
    };
  }
}

/**
 * Toggle featured status of a news article
 */
export async function toggleFeaturedNews(id: string): Promise<ActionResponse> {
  try {
    await requireStaff({ redirect: false })
    // Check if article exists
    const existing = await db.select().from(news).where(eq(news.id, id)).limit(1);
    if (existing.length === 0) {
      return {
        success: false,
        error: 'News article not found'
      };
    }
    
    // Toggle featured status
    await db.update(news)
      .set({
        featured: !existing[0].featured,
        updatedAt: new Date()
      })
      .where(eq(news.id, id));
    
    revalidateNewsPaths(existing[0].slug);
    
    return { success: true };
  } catch (error) {
    console.error('Error toggling featured status:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to toggle featured status'
    };
  }
}
