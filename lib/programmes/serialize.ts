import type { ProgrammeData } from "@/lib/actions/programmes"
import {
  programmeExcerpt,
  type ProgrammeListItem,
} from "@/lib/data/programmes"

export function toProgrammeListItem(programme: ProgrammeData): ProgrammeListItem {
  return {
    id: programme.id,
    slug: programme.slug,
    title: programme.title,
    excerpt: programmeExcerpt(programme.description),
    image: programme.image,
    category: programme.category,
    isActive: programme.isActive,
    applicationLink: programme.applicationLink,
  }
}
