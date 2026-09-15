export const KCIC_YOUTUBE_CHANNEL_ID = "UC09nlou3Nry68ZlGOGqL_7w"

export const KCIC_YOUTUBE_CHANNEL_URL =
  "https://www.youtube.com/@KenyaClimateInnovationCenter"

const FEED_URL = `https://www.youtube.com/feeds/videos.xml?channel_id=${KCIC_YOUTUBE_CHANNEL_ID}`

export interface YouTubeEpisode {
  videoId: string
  title: string
  publishedAt: string
  thumbnailUrl: string
  url: string
}

export interface KcicYouTubeFeed {
  featured: YouTubeEpisode
  more: YouTubeEpisode[]
}

function decodeXmlEntities(value: string): string {
  return value
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'")
}

function parseFeedEntries(xml: string): YouTubeEpisode[] {
  const episodes: YouTubeEpisode[] = []
  const entryPattern = /<entry>([\s\S]*?)<\/entry>/g

  for (const match of xml.matchAll(entryPattern)) {
    if (episodes.length >= 4) break

    const block = match[1]
    const videoId =
      block.match(/<yt:videoId>([^<]+)<\/yt:videoId>/)?.[1] ??
      block.match(/<id>yt:video:([^<]+)<\/id>/)?.[1]

    const rawTitle = block.match(/<title>([^<]*)<\/title>/)?.[1]
    const published = block.match(/<published>([^<]+)<\/published>/)?.[1]

    if (!videoId || !rawTitle || !published) continue

    const thumbnailUrl =
      block.match(/<media:thumbnail[^>]+url="([^"]+)"/)?.[1] ??
      `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`

    episodes.push({
      videoId,
      title: decodeXmlEntities(rawTitle),
      publishedAt: published,
      thumbnailUrl,
      url: `https://www.youtube.com/watch?v=${videoId}`,
    })
  }

  return episodes
}

export async function fetchKcicYouTubeFeed(): Promise<
  { ok: true; data: KcicYouTubeFeed } | { ok: false; error: string }
> {
  try {
    const response = await fetch(FEED_URL, {
      next: { revalidate: 3600 },
      headers: {
        Accept: "application/atom+xml, application/xml, text/xml",
        "User-Agent": "KCIC-Website/1.0",
      },
    })

    if (!response.ok) {
      return { ok: false, error: "YouTube feed unavailable" }
    }

    const xml = await response.text()
    const episodes = parseFeedEntries(xml)

    if (episodes.length === 0) {
      return { ok: false, error: "No episodes found in feed" }
    }

    return {
      ok: true,
      data: {
        featured: episodes[0],
        more: episodes.slice(1, 4),
      },
    }
  } catch (error) {
    console.error("Error fetching KCIC YouTube feed:", error)
    return {
      ok: false,
      error:
        error instanceof Error ? error.message : "Failed to fetch YouTube feed",
    }
  }
}
