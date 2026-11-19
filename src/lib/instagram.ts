/**
 * Meta / Instagram Graph API Service
 * Fetches verified reels and media from official Instagram accounts using Meta Graph API.
 */

export interface InstagramFeedItem {
  id: string;
  title: string;
  caption: string;
  mediaType: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM";
  coverImage: string;
  videoUrl?: string;
  reelUrl: string;
  timestamp: string;
}

export interface InstagramFeedResponse {
  connected: boolean;
  error?: string;
  items: InstagramFeedItem[];
  username?: string;
}

export async function fetchInstagramMedia(
  accessToken?: string,
  userId?: string,
  limit = 12
): Promise<InstagramFeedResponse> {
  const token = (accessToken || "").trim();
  if (!token) {
    return {
      connected: false,
      error: "No Instagram Access Token configured in Admin Settings.",
      items: [],
    };
  }

  const fields = "id,caption,media_type,media_url,permalink,thumbnail_url,timestamp";
  const targetId = userId && userId.trim() ? userId.trim() : "me";

  // Try Graph Instagram endpoint first (Instagram User Token)
  const urlsToTry = [
    `https://graph.instagram.com/v19.0/${targetId}/media?fields=${fields}&limit=${limit}&access_token=${token}`,
    `https://graph.facebook.com/v19.0/${targetId}/media?fields=${fields}&limit=${limit}&access_token=${token}`,
  ];

  let lastError = "";

  for (const url of urlsToTry) {
    try {
      const res = await fetch(url, {
        next: { revalidate: 3600 }, // Cache for 1 hour to respect Meta API rate limits
      });

      const json = await res.json();

      if (json.error) {
        lastError = json.error.message || "Meta API returned an error";
        continue;
      }

      if (Array.isArray(json.data)) {
        const items: InstagramFeedItem[] = json.data.map((item: any) => {
          const rawCaption = (item.caption || "").trim();
          // Derive a short clean title from the first sentence / line
          const firstLine = rawCaption.split("\n")[0] || "BellaWoman Reel";
          const title = firstLine.length > 50 ? firstLine.slice(0, 47) + "..." : firstLine;

          const isVideo = item.media_type === "VIDEO";
          const coverImage = isVideo
            ? item.thumbnail_url || item.media_url || "/hero/hero-br1013.jpg"
            : item.media_url || "/hero/hero-br1013.jpg";

          return {
            id: item.id,
            title,
            caption: rawCaption || "Official BellaWoman update on Instagram",
            mediaType: item.media_type || "VIDEO",
            coverImage,
            videoUrl: isVideo ? item.media_url : undefined,
            reelUrl: item.permalink || `https://www.instagram.com/p/${item.id}/`,
            timestamp: item.timestamp || new Date().toISOString(),
          };
        });

        return {
          connected: true,
          items,
        };
      }
    } catch (err: any) {
      lastError = err.message || "Network error contacting Meta Graph API";
    }
  }

  return {
    connected: false,
    error: lastError || "Failed to connect to Meta Graph API. Please verify the token.",
    items: [],
  };
}
