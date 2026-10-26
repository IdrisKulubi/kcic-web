"use server"

import { revalidatePath } from "next/cache"
import { z } from "zod"
import { requireStaff } from "@/lib/staff/session"
import { createStaffUser, listStaffUsers } from "@/lib/staff/users"
import { createStaffUserSchema } from "@/lib/validators"

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
