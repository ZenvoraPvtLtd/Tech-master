import { Router, Request, Response } from "express";
import { FeaturedVideo } from "../models/FeaturedVideo";
import { ApiResponse } from "../utils/apiResponse";

const router = Router();

// Helper to auto-detect platform & extract metadata from URL
export async function extractVideoMetadata(url: string) {
  const cleanUrl = (url || "").trim();
  let platform: "youtube" | "instagram" = "youtube";
  let title = "Featured Video";
  let channelName = "@techmasterhq";
  let thumbnail = "";
  let viewCount = "";

  if (cleanUrl.includes("instagram.com") || cleanUrl.includes("/reel/") || cleanUrl.includes("/p/")) {
    platform = "instagram";
    const reelMatch = cleanUrl.match(/\/(?:reel|p)\/([^/?#]+)/i);
    const reelId = reelMatch ? reelMatch[1] : "";
    
    // Auto handle detection from url if present e.g. instagram.com/techmasterco/reel/...
    const userMatch = cleanUrl.match(/instagram\.com\/([^/]+)\/reel/i);
    if (userMatch && userMatch[1]) {
      channelName = `@${userMatch[1]}`;
    } else {
      channelName = "@techmasterco";
    }

    title = `Instagram Reel (${reelId || "Spotlight"})`;
    // Fallback thumbnail if oEmbed unavailable
    thumbnail = `https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?q=80&w=800&auto=format&fit=crop`;
  } else {
    platform = "youtube";
    const ytMatch = cleanUrl.match(/(?:shorts\/|youtu\.be\/|v=|\/v\/|embed\/)([^"&?/\s]{11})/i);
    const ytId = ytMatch ? ytMatch[1] : "";
    
    if (ytId) {
      thumbnail = `https://img.youtube.com/vi/${ytId}/hqdefault.jpg`;
      title = cleanUrl.includes("shorts/") ? "YouTube Short" : "YouTube Video";
    }
    channelName = "@techmasterhq";
    viewCount = "1.2M views";

    // Attempt YouTube oEmbed fetch
    try {
      const oembedRes = await fetch(`https://www.youtube.com/oembed?url=${encodeURIComponent(cleanUrl)}&format=json`);
      if (oembedRes.ok) {
        const data: any = await oembedRes.json();
        if (data.title) title = data.title;
        if (data.author_name) channelName = data.author_name.startsWith("@") ? data.author_name : `@${data.author_name.toLowerCase().replace(/[^a-z0-9]/g, "")}`;
        if (data.thumbnail_url) thumbnail = data.thumbnail_url;
      }
    } catch (e) {
      // Fallback silently if oembed fails
    }
  }

  return {
    platform,
    title,
    url: cleanUrl,
    thumbnail,
    channelName,
    viewCount
  };
}

// 1. PUBLIC: GET /api/v1/featured-videos
router.get("/", async (req: Request, res: Response) => {
  try {
    const videos = await FeaturedVideo.find({ isActive: true }).sort({ displayOrder: 1, createdAt: -1 });
    return ApiResponse.success(res, "Featured videos fetched successfully", videos);
  } catch (error: any) {
    return ApiResponse.error(res, error.message || "Failed to fetch featured videos", 500);
  }
});

// 2. ADMIN: GET /api/v1/featured-videos/admin/all
router.get("/admin/all", async (req: Request, res: Response) => {
  try {
    const videos = await FeaturedVideo.find().sort({ displayOrder: 1, createdAt: -1 });
    return ApiResponse.success(res, "All featured videos fetched for admin", videos);
  } catch (error: any) {
    return ApiResponse.error(res, error.message || "Failed to fetch featured videos", 500);
  }
});

// 3. ADMIN: POST /api/v1/featured-videos/extract-metadata
router.post("/extract-metadata", async (req: Request, res: Response) => {
  try {
    const { url } = req.body;
    if (!url) {
      return ApiResponse.error(res, "URL is required", 400);
    }
    const metadata = await extractVideoMetadata(url);
    return ApiResponse.success(res, "Metadata extracted successfully", metadata);
  } catch (error: any) {
    return ApiResponse.error(res, error.message || "Failed to extract metadata", 500);
  }
});

// 4. ADMIN: POST /api/v1/featured-videos
router.post("/", async (req: Request, res: Response) => {
  try {
    const {
      platform,
      title,
      url,
      videoUrl,
      thumbnail,
      channelName,
      viewCount,
      displayOrder,
      isFeatured,
      isActive
    } = req.body;

    if (!url || !title) {
      return ApiResponse.error(res, "Title and URL are required", 400);
    }

    const count = await FeaturedVideo.countDocuments();
    
    const newVideo = new FeaturedVideo({
      platform: platform || (url.includes("instagram.com") ? "instagram" : "youtube"),
      title,
      url,
      videoUrl: videoUrl || "",
      thumbnail: thumbnail || "",
      channelName: channelName || "@techmasterhq",
      viewCount: viewCount || "",
      displayOrder: typeof displayOrder === "number" ? displayOrder : count + 1,
      isFeatured: isFeatured !== undefined ? isFeatured : true,
      isActive: isActive !== undefined ? isActive : true
    });

    await newVideo.save();
    return ApiResponse.success(res, "Featured video created successfully", newVideo, 201);
  } catch (error: any) {
    return ApiResponse.error(res, error.message || "Failed to create featured video", 500);
  }
});

// 5. ADMIN: PUT /api/v1/featured-videos/reorder
router.put("/reorder", async (req: Request, res: Response) => {
  try {
    const { orders } = req.body; // Array of { id, displayOrder }
    if (!Array.isArray(orders)) {
      return ApiResponse.error(res, "Invalid orders payload", 400);
    }

    const bulkOps = orders.map((item: { id: string; displayOrder: number }) => ({
      updateOne: {
        filter: { _id: item.id },
        update: { displayOrder: item.displayOrder }
      }
    }));

    await FeaturedVideo.bulkWrite(bulkOps);
    const updatedVideos = await FeaturedVideo.find().sort({ displayOrder: 1 });
    return ApiResponse.success(res, "Reorder successful", updatedVideos);
  } catch (error: any) {
    return ApiResponse.error(res, error.message || "Failed to reorder featured videos", 500);
  }
});

// 6. ADMIN: PUT /api/v1/featured-videos/:id
router.put("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const updatedVideo = await FeaturedVideo.findByIdAndUpdate(id, updateData, { new: true });
    if (!updatedVideo) {
      return ApiResponse.error(res, "Featured video not found", 404);
    }

    return ApiResponse.success(res, "Featured video updated successfully", updatedVideo);
  } catch (error: any) {
    return ApiResponse.error(res, error.message || "Failed to update featured video", 500);
  }
});

// 7. ADMIN: DELETE /api/v1/featured-videos/:id
router.delete("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedVideo = await FeaturedVideo.findByIdAndDelete(id);
    if (!deletedVideo) {
      return ApiResponse.error(res, "Featured video not found", 404);
    }

    return ApiResponse.success(res, "Featured video deleted successfully", null);
  } catch (error: any) {
    return ApiResponse.error(res, error.message || "Failed to delete featured video", 500);
  }
});

export default router;
