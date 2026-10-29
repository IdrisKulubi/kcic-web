import { neon } from "@neondatabase/serverless"

/**
 * Creates the Knowledge Hub table if it does not exist yet. Safe to re-run.
 * Usage: pnpm dlx tsx --env-file=.env.local scripts/create-knowledge-items.ts
 */
async function main() {
  const connectionString = process.env.POSTGRES_URL

  if (!connectionString) {
    console.error("POSTGRES_URL is not set. Use --env-file=.env.local")
    process.exit(1)
  }

  const sql = neon(connectionString)

  await sql`
    CREATE TABLE IF NOT EXISTS knowledge_items (
      id text PRIMARY KEY,
      section text NOT NULL,
      title text NOT NULL,
      slug text NOT NULL UNIQUE,
      summary text NOT NULL,
      content text,
      cover_image text NOT NULL,
      attachment_url text,
      attachment_name text,
      attachment_size integer,
      published_at timestamp NOT NULL,
      created_at timestamp NOT NULL DEFAULT now(),
      updated_at timestamp NOT NULL DEFAULT now()
    )
  `
  await sql`CREATE INDEX IF NOT EXISTS knowledge_items_section_idx ON knowledge_items (section)`
  await sql`CREATE INDEX IF NOT EXISTS knowledge_items_published_at_idx ON knowledge_items (published_at)`

  console.log("knowledge_items table is ready.")
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
