"use server"

import { revalidatePath } from "next/cache"
import { z } from "zod"
import { requireStaff } from "@/lib/staff/session"
import {
  createStaffUser,
  deleteStaffUser,
  listStaffUsers,
  updateStaffUser,
} from "@/lib/staff/users"
import { createStaffUserSchema, updateStaffUserSchema } from "@/lib/validators"

type ActionResponse<T = void> =
  | { success: true; data?: T }
  | { success: false; error: string }

export async function createStaffUserAction(
  input: z.infer<typeof createStaffUserSchema>
): Promise<ActionResponse<{ userId: string }>> {
  try {
    await requireStaff({ redirect: false })
    const validated = createStaffUserSchema.parse(input)
    const result = await createStaffUser(validated)

    if (!result.success) {
      return { success: false, error: result.error }
    }

    revalidatePath("/staff/users")
    return { success: true, data: { userId: result.userId } }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: error.issues.map((e) => `${e.path.join(".")}: ${e.message}`).join(", "),
      }
    }
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to create staff user",
    }
  }
}

export async function listStaffUsersAction() {
  await requireStaff({ redirect: false })
  return listStaffUsers()
}

export async function updateStaffUserAction(
  input: z.infer<typeof updateStaffUserSchema>
): Promise<ActionResponse> {
  try {
    await requireStaff({ redirect: false })
    const validated = updateStaffUserSchema.parse(input)
    const password =
      validated.password && validated.password.length > 0
        ? validated.password
        : undefined

    const result = await updateStaffUser({
      id: validated.id,
      name: validated.name,
      email: validated.email,
      password,
    })

    if (!result.success) {
      return { success: false, error: result.error }
    }

    revalidatePath("/staff/users")
    return { success: true }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: error.issues.map((e) => `${e.path.join(".")}: ${e.message}`).join(", "),
      }
    }
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to update staff user",
    }
  }
}

export async function deleteStaffUserAction(userId: string): Promise<ActionResponse> {
  try {
    const session = await requireStaff({ redirect: false })

    if (session.user.id === userId) {
      return {
        success: false,
        error: "You cannot delete your own account while signed in.",
      }
    }

    const result = await deleteStaffUser(userId)

    if (!result.success) {
      return { success: false, error: result.error }
    }

    revalidatePath("/staff/users")
    return { success: true }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to delete staff user",
    }
  }
}
