import * as readline from "node:readline/promises"
import { stdin as input, stdout as output } from "node:process"
import bcrypt from "bcryptjs"
import { drizzle } from "drizzle-orm/neon-http"
import { eq } from "drizzle-orm"
import { nanoid } from "nanoid"
import * as schema from "../db/schema"

async function main() {
  const [, , emailArg, nameArg] = process.argv
  const connectionString = process.env.POSTGRES_URL

  if (!connectionString) {
    console.error("POSTGRES_URL is not set. Use --env-file=.env.local")
    process.exit(1)
  }

  if (!emailArg || !nameArg) {
    console.error(
      "Usage: pnpm dlx tsx --env-file=.env.local scripts/create-staff.ts <email> <name>"
    )
    process.exit(1)
  }

  const email = emailArg.trim().toLowerCase()
  const name = nameArg.trim()

  const rl = readline.createInterface({ input, output })
  const password = await rl.question("Password: ")
  rl.close()

  if (password.length < 10) {
    console.error("Password must be at least 10 characters.")
    process.exit(1)
  }

  const db = drizzle(connectionString)

  const existing = await db
    .select({ id: schema.user.id })
    .from(schema.user)
    .where(eq(schema.user.email, email))
    .limit(1)

  if (existing.length > 0) {
    console.error(`User already exists: ${email}`)
    process.exit(1)
  }

  const passwordHash = await bcrypt.hash(password, 10)
  const userId = nanoid()
  const now = new Date()

  await db.insert(schema.user).values({
    id: userId,
    name,
    email,
    emailVerified: true,
    createdAt: now,
    updatedAt: now,
  })

  await db.insert(schema.account).values({
    id: nanoid(),
    accountId: userId,
    providerId: "credential",
    userId,
    password: passwordHash,
    createdAt: now,
    updatedAt: now,
  })

  console.log(`Created staff user ${email} (${userId})`)
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
