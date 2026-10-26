"use client"

import { useOptimistic, useTransition } from "react"
import { useRouter } from "next/navigation"
import { toggleFeaturedNews } from "@/lib/actions/news"
import { Switch } from "@/components/ui/switch"

interface NewsFeaturedSwitchProps {
  articleId: string
  featured: boolean
}

export function NewsFeaturedSwitch({
  articleId,
  featured,
}: NewsFeaturedSwitchProps) {
  const router = useRouter()
  const [optimisticFeatured, setOptimisticFeatured] = useOptimistic(
    featured,
    (_current, next: boolean) => next
  )
  const [pending, startTransition] = useTransition()

  return (
    <Switch
      checked={optimisticFeatured}
      disabled={pending}
      aria-label={optimisticFeatured ? "Featured article" : "Not featured"}
      onCheckedChange={(checked) => {
        startTransition(async () => {
          setOptimisticFeatured(checked)
          const result = await toggleFeaturedNews(articleId)
          if (!result.success) {
            router.refresh()
          }
        })
      }}
    />
  )
}
