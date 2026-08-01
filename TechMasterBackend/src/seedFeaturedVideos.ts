import mongoose from "mongoose";
import dotenv from "dotenv";
import { FeaturedVideo } from "./models/FeaturedVideo";
import { connectDB } from "./config/database";

dotenv.config();

const INITIAL_URLS = [
  "https://youtube.com/shorts/YP4CdON5rrQ?si=DOx4bPZIJPpc2LSa",
  "https://www.youtube.com/watch?v=3VuyriEkDwg",
  "https://youtu.be/vW2K0L-vUgw?si=4KrnU7BeuuZIlO97",
  "https://www.instagram.com/reel/DAs7dOoyU9d/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
  "https://www.instagram.com/reel/DGdKcjNymR4/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
  "https://youtu.be/iVGAICmKlpk?si=cL_9koXbTowODWEx",
  "https://www.youtube.com/watch?v=oXr9B3Hg4fo",
  "https://www.instagram.com/reel/Da1kOKEqys7/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
  "https://www.youtube.com/watch?v=pGdwMZ_O_0A",
  "https://youtube.com/shorts/gP7t0_5qMa4?si=1A54F_DsBGGlaPPF",
  "https://youtu.be/Wnid6auAxbE?si=mJKMPlZLMcCTLnuz",
  "https://www.youtube.com/watch?v=uMW9UyONsOk",
  "https://www.instagram.com/techmasterco/reel/DPOfpSGgRkN/?hl=en",
  "https://www.instagram.com/reel/DCRQiCgyu5W/?igsh=ZGVyMTRnOGpqNDVi",
  "https://youtu.be/iNtv0Yl1DB4?si=TTeocdaRSPQnL8_U",
  "https://www.youtube.com/watch?v=CaNEbx-Kwzc",
  "https://www.youtube.com/watch?v=ClgRNy0QBWk",
  "https://www.youtube.com/watch?v=mAXjgBDK3Gs",
  "https://www.instagram.com/reel/DW3uoC8CXWf/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
  "https://www.instagram.com/reel/DZHCtuzJzxn/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
  "https://www.instagram.com/reel/DZt-HodJ94O/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
  "https://www.instagram.com/reel/DYZnd2FpY7O/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
  "https://www.instagram.com/reel/DT7z9b0gTCi/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA=="
];

const SEED_DATA = [
  { title: "Tech Master Viral Short", channelName: "@techmasterhq", viewCount: "5.4M views" },
  { title: "Tech Master Official Video", channelName: "@techmasterhq", viewCount: "3.8M views" },
  { title: "Tech Master Exclusive Showcase", channelName: "@techmasterhq", viewCount: "4.2M views" },
  { title: "Tech Master Instagram Reel #1", channelName: "@techmasterco", viewCount: "" },
  { title: "Trendz Talk Viral Reel", channelName: "@trendztalk", viewCount: "" },
  { title: "Master Wheels High-Speed Breakdown", channelName: "@masterwheel1", viewCount: "3.2M views" },
  { title: "Next Univerz Masterclass", channelName: "@NextUniverz", viewCount: "2.7M views" },
  { title: "Full Circle Creator Story", channelName: "@fullcircle_in", viewCount: "" },
  { title: "Tech Master Hardware Teardown", channelName: "@techmasterhq", viewCount: "8.4M views" },
  { title: "Pop Tech Short-Form Reel", channelName: "@trendztalk", viewCount: "9.1M views" },
  { title: "Automotive Tech Special", channelName: "@masterwheel1", viewCount: "4.1M views" },
  { title: "Developer Deep Dive", channelName: "@NextUniverz", viewCount: "2.2M views" },
  { title: "Tech Master Official Reel", channelName: "@techmasterco", viewCount: "" },
  { title: "Viral Pop Culture Tech", channelName: "@trendztalk", viewCount: "" },
  { title: "Full Circle Podcast Highlight", channelName: "@fullcircle_in", viewCount: "1.9M views" },
  { title: "Tech Master Cinematic Reveal", channelName: "@techmasterhq", viewCount: "4.4M views" },
  { title: "Future Gadget Breakdown", channelName: "@techmasterhq", viewCount: "3.9M views" },
  { title: "Supercar Track Telemetry Test", channelName: "@masterwheel1", viewCount: "7.2M views" },
  { title: "Tech Master Instagram Special", channelName: "@techmasterco", viewCount: "" },
  { title: "Trendz Talk Pop Reel", channelName: "@trendztalk", viewCount: "" },
  { title: "Full Circle Studio Reel", channelName: "@fullcircle_in", viewCount: "" },
  { title: "Next Univerz Tech Highlight", channelName: "@NextUniverz", viewCount: "" },
  { title: "Master Wheels Track Performance", channelName: "@masterwheel1", viewCount: "" }
];

async function seed() {
  try {
    await connectDB();
    console.log("Connected to MongoDB for seeding Featured Videos...");

    await FeaturedVideo.deleteMany({});
    console.log("Cleared existing Featured Videos.");

    const itemsToInsert = INITIAL_URLS.map((url, idx) => {
      const isInsta = url.includes("instagram.com");
      const platform = isInsta ? "instagram" : "youtube";
      const meta = SEED_DATA[idx] || { title: `Featured Item #${idx + 1}`, channelName: "@techmasterhq", viewCount: "" };

      let thumbnail = "";
      if (!isInsta) {
        const match = url.match(/(?:shorts\/|youtu\.be\/|v=|\/v\/|embed\/)([^"&?/\s]{11})/i);
        if (match && match[1]) {
          thumbnail = `https://img.youtube.com/vi/${match[1]}/hqdefault.jpg`;
        }
      } else {
        thumbnail = "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?q=80&w=800&auto=format&fit=crop";
      }

      return {
        platform,
        title: meta.title,
        url,
        videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-vertical-animation-of-a-futuristic-robot-41527-large.mp4",
        thumbnail,
        channelName: meta.channelName,
        viewCount: isInsta ? "" : meta.viewCount,
        displayOrder: idx + 1,
        isFeatured: true,
        isActive: true
      };
    });

    await FeaturedVideo.insertMany(itemsToInsert);
    console.log(`Successfully seeded ${itemsToInsert.length} Featured Videos into MongoDB!`);
    process.exit(0);
  } catch (e) {
    console.error("Seeding error:", e);
    process.exit(1);
  }
}

seed();
