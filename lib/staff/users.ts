import db from "@/db/drizzle"
import { account, user } from "@/db/schema"
import { and, asc, eq, ne } from "drizzle-orm/sql"
import bcrypt from "bcryptjs"
import { nanoid } from "nanoid"

export interface CreateStaffUserInput {
  name: string
  email: string
  password: string
}

export async function createStaffUser(input: CreateStaffUserInput) {
  const normalizedEmail = input.email.trim().toLowerCase()
  const name = input.name.trim()

  const existing = await db
    .select({ id: user.id })
    .from(user)
    .where(eq(user.email, normalizedEmail))
    .limit(1)

  if (existing.length > 0) {
    return { success: false as const, error: "A user with this email already exists." }
  }

  const passwordHash = await bcrypt.hash(input.password, 10)
  const userId = nanoid()
  const now = new Date()

  await db.insert(user).values({
    id: userId,
    name,
    email: normalizedEmail,
    emailVerified: true,
    createdAt: now,
    updatedAt: now,
  })

  await db.insert(account).values({
    id: nanoid(),
    accountId: userId,
    providerId: "credential",
    userId,
    password: passwordHash,
    createdAt: now,
    updatedAt: now,
  })

  return { success: true as const, userId }
}

export async function listStaffUsers() {
  const rows = await db
    .select({
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
    })
    .from(user)
    .orderBy(asc(user.createdAt))

  return rows
}

export interface UpdateStaffUserInput {
  id: string
  name: string
  email: string
  password?: string
}

export async function updateStaffUser(input: UpdateStaffUserInput) {
  const normalizedEmail = input.email.trim().toLowerCase()
  const name = input.name.trim()
  const now = new Date()

  const target = await db
    .select({ id: user.id })
    .from(user)
    .where(eq(user.id, input.id))
    .limit(1)

  if (target.length === 0) {
    return { success: false as const, error: "Staff account not found." }
  }

  const emailTaken = await db
    .select({ id: user.id })
    .from(user)
    .where(and(eq(user.email, normalizedEmail), ne(user.id, input.id)))
    .limit(1)

  if (emailTaken.length > 0) {
    return { success: false as const, error: "Another account already uses this email." }
  }

  await db
    .update(user)
    .set({
      name,
      email: normalizedEmail,
      updatedAt: now,
    })
    .where(eq(user.id, input.id))

  const newPassword = input.password?.trim()
  if (newPassword) {
    const passwordHash = await bcrypt.hash(newPassword, 10)
    await db
      .update(account)
      .set({
        password: passwordHash,
        updatedAt: now,
      })
      .where(
        and(eq(account.userId, input.id), eq(account.providerId, "credential"))
      )
  }

  return { success: true as const }
}

export async function deleteStaffUser(id: string) {
  const target = await db
    .select({ id: user.id })
    .from(user)
    .where(eq(user.id, id))
    .limit(1)

  if (target.length === 0) {
    return { success: false as const, error: "Staff account not found." }
  }

  await db.delete(user).where(eq(user.id, id))

  return { success: true as const }
}
