import { connection } from "next/server"

/** Opt CMS-backed pages out of the full-route cache so admin DB writes show up. */
export async function ensureLiveCmsData() {
  await connection()
}
