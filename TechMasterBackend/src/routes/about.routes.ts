import { Router } from "express";
import { About } from "../models/About";
import { CMSData } from "../models/CMSData";
import { ApiResponse } from "../utils/apiResponse";
import { authenticate } from "../middlewares/auth";
import { aboutController } from "../controllers";
import { createCmsRouter } from "./cmsRouterHelper";

const router = Router();

// GET About Page Data
router.get("/", async (req, res, next) => {
  try {
    let doc = await About.findOne({});
    if (!doc) {
      doc = await About.create({
        aboutTechMaster: {
          smallBadge: "ABOUT TECH MASTER",
          mainHeading: "What Tech Master Is",
          highlightedHeading: "Tech Master",
          description: "It started in 2019 one person, one channel, and a belief that tech content in India could be smarter than it was. That belief became Tech Master, and by 2023, it had become a company. Today, Tech Master Digital Pvt Ltd is a 50+ person team running four established channels across tech, automobiles, and entertainment with a fifth already taking shape in 3D animation out of a full production studio in Jaipur, complete with an in-house editing suite, animation team, and gaming studio. Today our content generates 1B+ views every month.",
          visibility: true
        },
        culture: {
          smallBadge: "OUR CULTURE",
          mainHeading: "Good People.",
          highlightedText: "Good Work. Good Vibes",
          description: "Ideas get clashed over here, not because we're trying to prove a point, but because everyone actually cares. We push each other, we push ourselves but nobody's burning out to do it. Somewhere between the deadlines and the chai breaks, this team just falls into a rhythm. Good People. Good Work. Good Vibes",
          bgStyle: "glass",
          borderStyle: "gold-subtle",
          order: 2,
          visibility: true,
          status: "Published"
        },
        studioCard: {
          imageUrl: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80",
          imageAlt: "Tech Master Team",
          imageSubtitle: "Jaipur Studio",
          imageDescription: "50+ Person Production & Gaming Suite",
          overlayCaption: "",
          visibility: true,
          order: 3
        },
        philosophy: {
          smallBadge: "FOUNDER PHILOSOPHY",
          quote: "Information is Wealth.",
          description: "Information is Wealth.",
          founderName: "Tech Master Founder",
          founderDesignation: "Founder & CEO",
          profileImageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1200&q=80",
          showDivider: true,
          order: 4,
          visibility: true,
          status: "Published"
        }
      });
    }
    ApiResponse.success(res, "About data retrieved successfully", doc);
  } catch (err) {
    next(err);
  }
});

// PUT / Update About Page Data (Protected)
router.put("/", authenticate as any, async (req, res, next) => {
  try {
    const doc = await About.findOneAndUpdate({}, req.body, { upsert: true, new: true });
    await CMSData.findOneAndUpdate({ key: "about" }, { value: req.body }, { upsert: true, new: true });
    ApiResponse.success(res, "About data updated successfully", doc);
  } catch (err) {
    next(err);
  }
});

// Standard router compatibility
const standardCmsRouter = createCmsRouter(aboutController);
router.use("/", standardCmsRouter);

export default router;
