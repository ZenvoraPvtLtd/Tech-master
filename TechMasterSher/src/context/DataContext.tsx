import React, { createContext, useContext, useState, useEffect } from "react";

// Static JSON Fallbacks
import homeFallback from "../data/home.json";
import aboutFallback from "../data/about.json";
import journeyFallback from "../data/journey.json";
import servicesFallback from "../data/services.json";
import campaignsFallback from "../data/campaigns.json";
import faqFallback from "../data/faq.json";
import blogsFallback from "../data/blogs.json";
import careerFallback from "../data/career.json";
import eventsFallback from "../data/events.json";
import testimonialsFallback from "../data/testimonials.json";

interface HeroData {
  tag: string;
  headline: string;
  paragraph: string;
  ctaPrimary: string;
  ctaSecondary: string;
}

interface StatItem {
  value: string;
  label: string;
}

interface ValueItem {
  title: string;
  description: string;
}

interface HomeData {
  hero: HeroData;
  stats: StatItem[];
  values: ValueItem[];
}

interface AboutData {
  name: string;
  title: string;
  bio: string;
  philosophy: {
    title: string;
    paragraph: string;
  };
  credentials: {
    metric: string;
    count: string;
  }[];
}

interface JourneyItem {
  year: string;
  title: string;
  subtitle: string;
  description: string;
}

interface DataContextType {
  homeData: HomeData;
  aboutData: AboutData;
  journeyData: JourneyItem[];
  journeyHero: {
    badgeText: string;
    heading: string;
    highlightWord: string;
    description: string;
    scrollIndicatorText: string;
  };
  servicesData: any[];
  campaignsData: any[];
  faqData: any[];
  blogsData: any[];
  careerData: any[];
  eventsData: any[];
  testimonialsData: any[];
  missionVisionData: any;
  whatWeDoData: any;
  portfolioData: any[];
  galleryData: any[];
  mediaCoverageData: any;
  collaborationsData: any;
  contactData: any;
  launchesData: any;
  isLoading: boolean;
  isBackendConnected: boolean;
  dbData: any;
  refreshData: () => Promise<void>;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [homeData, setHomeData] = useState<HomeData>(homeFallback);
  const [aboutData, setAboutData] = useState<AboutData>(aboutFallback);
  const [journeyData, setJourneyData] = useState<JourneyItem[]>(journeyFallback);
  const [journeyHero, setJourneyHero] = useState({
    badgeText: "FOUNDER CHRONICLES",
    heading: "The Journey of",
    highlightWord: "Tech Master",
    description: "Tracing the evolution of Aman's personal brand from writing basic pointers on a whiteboard in 2015 to building global tech learning ecosystems.",
    scrollIndicatorText: "Explore timeline"
  });

  const [servicesData, setServicesData] = useState<any[]>(servicesFallback);
  const [campaignsData, setCampaignsData] = useState<any[]>(campaignsFallback);
  const [faqData, setFaqData] = useState<any[]>(faqFallback);
  const [blogsData, setBlogsData] = useState<any[]>(blogsFallback);
  const [careerData, setCareerData] = useState<any[]>(careerFallback);
  const [eventsData, setEventsData] = useState<any[]>(eventsFallback);
  const [testimonialsData, setTestimonialsData] = useState<any[]>(testimonialsFallback);

  // New state for additional admin-managed sections
  const [missionVisionData, setMissionVisionData] = useState<any>(null);
  const [whatWeDoData, setWhatWeDoData] = useState<any>(null);
  const [portfolioData, setPortfolioData] = useState<any[]>([]);
  const [galleryData, setGalleryData] = useState<any[]>([]);
  const [mediaCoverageData, setMediaCoverageData] = useState<any>(null);
  const [collaborationsData, setCollaborationsData] = useState<any>(null);
  const [contactData, setContactData] = useState<any>(null);
  const [launchesData, setLaunchesData] = useState<any>(null);

  const [isLoading, setIsLoading] = useState(true);
  const [isBackendConnected, setIsBackendConnected] = useState(false);
  const [dbData, setDbData] = useState<any>(null);
  const REFRESH_INTERVAL_MS = 60000;

  const refreshData = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/v1/cms");
      if (!response.ok) throw new Error("Failed to fetch from backend");
      const result = await response.json();
      if (result.success && result.data) {
        console.log('Fetched CMS data:', result.data);
        setDbData(result.data);
        setIsBackendConnected(true);
        if (result.data.homepage) {
          const rawHero = result.data.homepage.hero || {};
          setHomeData({
            hero: {
              tag: rawHero.title || homeFallback.hero.tag,
              headline: rawHero.highlightTitle || homeFallback.hero.headline,
              paragraph: rawHero.description || homeFallback.hero.paragraph,
              ctaPrimary: rawHero.ctaButtonText || homeFallback.hero.ctaPrimary,
              ctaSecondary: rawHero.ctaButtonUrl || homeFallback.hero.ctaSecondary,
            },
            stats: Array.isArray(result.data.homepage.statisticsCounters) && result.data.homepage.statisticsCounters.length > 0
              ? result.data.homepage.statisticsCounters
                  .filter((s: any) => s.status === "Active" || s.status === true || s.status === undefined)
                  .map((s: any) => ({
                    value: `${s.prefix || ""}${s.number}${s.suffix || ""}`,
                    label: s.label,
                  }))
              : homeFallback.stats,
            values: Array.isArray(result.data.homepage.coreValues) && result.data.homepage.coreValues.length > 0
              ? result.data.homepage.coreValues
                  .filter((v: any) => v.status === "Active" || v.status === true || v.status === undefined)
                  .map((v: any) => ({
                    title: v.valueName || v.title,
                    description: v.description,
                  }))
              : homeFallback.values,
          });
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/v1/cms");
        if (!response.ok) {
          throw new Error("Failed to fetch from backend");
        }
        const result = await response.json();
        if (result.success && result.data) {
          console.log('Initial fetch CMS data:', result.data);
          const db = result.data;
          setDbData(db);
          setIsBackendConnected(true);

          if (db.homepage) {
            const rawHero = db.homepage.hero || {};
            setHomeData({
              hero: {
                tag: rawHero.title || homeFallback.hero.tag,
                headline: rawHero.highlightTitle || homeFallback.hero.headline,
                paragraph: rawHero.description || homeFallback.hero.paragraph,
                ctaPrimary: rawHero.ctaButtonText || homeFallback.hero.ctaPrimary,
                ctaSecondary: rawHero.ctaButtonUrl || homeFallback.hero.ctaSecondary,
              },
              stats: Array.isArray(db.homepage.statisticsCounters) && db.homepage.statisticsCounters.length > 0
                ? db.homepage.statisticsCounters
                    .filter((s: any) => s.status === "Active" || s.status === true || s.status === undefined)
                    .map((s: any) => ({
                      value: `${s.prefix || ""}${s.number}${s.suffix || ""}`,
                      label: s.label,
                    }))
                : homeFallback.stats,
              values: Array.isArray(db.homepage.coreValues) && db.homepage.coreValues.length > 0
                ? db.homepage.coreValues
                    .filter((v: any) => v.status === "Active" || v.status === true || v.status === undefined)
                    .map((v: any) => ({
                      title: v.valueName || v.title,
                      description: v.description,
                    }))
                : homeFallback.values,
            });
          }
          if (db.about) {
            const rawIntro = db.about.introduction || {};
            setAboutData({
              name: rawIntro.founderName || aboutFallback.name,
              title: rawIntro.designation || aboutFallback.title,
              bio: rawIntro.shortDescription || aboutFallback.bio,
              philosophy: {
                title: db.about.philosophy?.title || aboutFallback.philosophy.title,
                paragraph: db.about.philosophy?.description || aboutFallback.philosophy.paragraph,
              },
              credentials: Array.isArray(db.about.highlights) && db.about.highlights.length > 0
                ? db.about.highlights
                    .filter((h: any) => h.status === "Active" || h.status === true || h.status === undefined)
                    .map((h: any) => ({
                      metric: h.label,
                      count: `${h.prefix || ""}${h.number}${h.suffix || ""}`,
                    }))
                : aboutFallback.credentials,
            });
            
            const rawHero = db.founderJourney.hero || {};

            setJourneyHero({
              badgeText: rawHero.badgeText || "FOUNDER CHRONICLES",
              heading: rawHero.heading || "The Journey of",
              highlightWord: rawHero.highlightWord || "Tech Master",
              description: rawHero.description || "Tracing the evolution of Aman's personal brand from writing basic pointers on a whiteboard in 2015 to building global tech learning ecosystems.",
              scrollIndicatorText: rawHero.scrollIndicatorText || "Explore timeline"
            });

            if (Array.isArray(db.founderJourney.milestones) && db.founderJourney.milestones.length > 0) {
              setJourneyData(
                db.founderJourney.milestones
                  .filter((m: any) => m.status === "Active" || m.status === true || m.status === undefined)
                  .map((m: any) => ({
                    year: m.year,
                    title: m.title,
                    subtitle: m.subtitle,
                    description: m.description
                  }))
              );
            }
          }

          // 4. Map Services Data
          if (Array.isArray(db.services) && db.services.length > 0) {
            setServicesData(
              db.services
                .filter((s: any) => s.status === "Active" || s.status === true || s.status === undefined)
                .map((s: any) => ({
                  id: s.id,
                  title: s.title,
                  tagline: s.tagline,
                  description: s.description,
                  features: s.features || [],
                  icon: s.icon || "Cpu",
                  accentColor: s.accentColor || "#D4AF37"
                }))
            );
          }

          // 5. Map Campaigns Data
          if (Array.isArray(db.campaigns) && db.campaigns.length > 0) {
            setCampaignsData(
              db.campaigns
                .filter((c: any) => c.status === "Active" || c.status === true || c.status === undefined)
                .map((c: any) => ({
                  id: c.id,
                  title: c.title,
                  subtitle: c.subtitle,
                  description: c.description,
                  coverImage: c.coverImage || c.bannerUrl || c.image || "",
                  accentColor: c.accentColor || "#D4AF37"
                }))
            );
          }

          // 6. Map FAQ Data
          if (Array.isArray(db.faqs) && db.faqs.length > 0) {
            setFaqData(
              db.faqs
                .filter((f: any) => f.status === "Active" || f.status === true || f.status === undefined)
                .map((f: any) => ({
                  id: f.id,
                  question: f.question,
                  answer: f.answer
                }))
            );
          }

          // 7. Map Blogs Data
          if (Array.isArray(db.blogs) && db.blogs.length > 0) {
            setBlogsData(
              db.blogs
                .filter((b: any) => b.status === "Active" || b.status === true || b.status === undefined)
                .map((b: any) => ({
                  id: b.id,
                  title: b.title,
                  category: b.category,
                  readTime: b.readTime,
                  date: b.date,
                  excerpt: b.excerpt,
                  content: b.content,
                  image: b.image
                }))
            );
          }

          // 8. Map Careers Data
          if (Array.isArray(db.careers) && db.careers.length > 0) {
            setCareerData(
              db.careers
                .filter((c: any) => c.status === "Active" || c.status === true || c.status === undefined)
                .map((c: any) => ({
                  id: c.id,
                  title: c.title,
                  department: c.department,
                  location: c.location,
                  type: c.type,
                  description: c.description,
                  requirements: c.requirements || []
                }))
            );
          }

          // 9. Map Events Data
          if (db.homepage?.events?.list && Array.isArray(db.homepage.events.list)) {
            setEventsData(
              db.homepage.events.list
                .filter((e: any) => e.status === "Active" || e.status === true || e.status === undefined)
                .map((e: any) => ({
                  id: e.id,
                  title: e.eventName,
                  date: e.eventDate,
                  location: e.eventLocation,
                  description: e.shortDescription,
                  category: e.eventCategory,
                  image: e.eventImage
                }))
            );
          } else if (Array.isArray(db.events) && db.events.length > 0) {
            setEventsData(
              db.events
                .filter((e: any) => e.status === "Active" || e.status === true || e.status === undefined)
                .map((e: any) => ({
                  id: e.id,
                  title: e.eventName || e.title,
                  date: e.eventDate || e.date,
                  location: e.eventLocation || e.location,
                  description: e.shortDescription || e.description,
                  category: e.eventCategory || e.category,
                  image: e.eventImage || e.image
                }))
            );
          }

          // 10. Map Testimonials Data
          if (Array.isArray(db.testimonials) && db.testimonials.length > 0) {
            setTestimonialsData(
              db.testimonials
                .filter((t: any) => t.status === "Active" || t.status === true || t.status === undefined)
                .map((t: any) => ({
                  id: t.id,
                  name: t.name,
                  role: t.role,
                  company: t.company,
                  content: t.content,
                  avatar: t.avatar,
                  rating: t.rating || 5
                }))
            );
          }

          // 11. Map Mission & Vision Data
          if (db.missionVision) {
            setMissionVisionData(db.missionVision);
          }

          // 12. Map What We Do Data
          if (db.whatWeDo) {
            setWhatWeDoData({
              hero: db.whatWeDo.hero || {},
              operations: Array.isArray(db.whatWeDo.operations)
                ? db.whatWeDo.operations.filter((w: any) => w.status === "Active" || w.status === true || w.status === undefined)
                : [],
              servicesList: Array.isArray(db.whatWeDo.servicesList)
                ? db.whatWeDo.servicesList.filter((s: any) => s.status === "Active" || s.status === true || s.status === undefined)
                : [],
              quoteBanner: db.whatWeDo.quoteBanner || {}
            });
          }

          // 13. Map Portfolio Data
          if (Array.isArray(db.portfolio) && db.portfolio.length > 0) {
            setPortfolioData(
              db.portfolio
                .filter((p: any) => p.status === "Active" || p.status === true || p.status === undefined)
                .map((p: any) => ({
                  id: p.id,
                  title: p.title,
                  category: p.category,
                  categories: p.categories || [],
                  description: p.description,
                  image: p.coverImage || p.image || p.thumbnailUrl || "",
                  link: p.link || p.liveUrl || "",
                  client: p.client || ""
                }))
            );
          }

          // 14. Map Gallery Data
          if (Array.isArray(db.mediaGallery) && db.mediaGallery.length > 0) {
            setGalleryData(
              db.mediaGallery
                .filter((g: any) => g.status === "Active" || g.status === true || g.status === undefined)
                .map((g: any) => ({
                  id: g.id,
                  title: g.title || g.alt || "",
                  type: g.type || g.category || "Photos",
                  category: g.category || g.type || "Photos",
                  url: g.url || g.imageUrl || "",
                  thumbnail: g.thumbnail || g.url || g.imageUrl || ""
                }))
            );
          }

          // 15. Map Media Coverage Data
          if (db.mediaCoverage || db.mediaHero || db.mediaShowreels || db.mediaDownloads) {
            setMediaCoverageData({
              hero: db.mediaHero || null,
              showreels: db.mediaShowreels || [],
              downloads: db.mediaDownloads || [],
              articles: db.mediaCoverage || []
            });
          }

          // 16. Map Collaborations Data
          if (db.collaborationsPage) {
            setCollaborationsData(db.collaborationsPage);
          }

          // 17. Map Contact Data
          setContactData({
            heroSetup: db.contactHeroSetup || null,
            infoSetup: db.contactInfoSetup || null,
            whatsAppSetup: db.contactWhatsAppSetup || null,
            mapSetup: db.contactMapSetupData || db.contactMapSetup || null,
            formConfig: db.contactFormConfig || null,
            formFields: db.contactFormFields || [],
            categories: db.contactCategoriesSetup || [],
            socialLinks: db.contactSocialLinksSetup || db.contactSocials || [],
            seo: db.contactSEOSetup || null,
            visibility: db.contactVisibilitySetup || null
          });

          // 18. Map Launches Data
          if (db.launchesPage) {
            setLaunchesData({
              hero: db.launchesPage.hero || {},
              products: Array.isArray(db.launchesPage.products)
                ? db.launchesPage.products.filter((p: any) => p.status === "Active" || p.status === true || p.status === undefined)
                : [],
              featureVideo: db.launchesPage.featureVideo || {},
              initiatives: Array.isArray(db.launchesPage.initiatives)
                ? db.launchesPage.initiatives.filter((i: any) => i.status === "Active" || i.status === true || i.status === undefined)
                : []
            });
          } else if (Array.isArray(db.launches) && db.launches.length > 0) {
            setLaunchesData({
              hero: {},
              products: db.launches
                .filter((l: any) => l.status === "Active" || l.status === true || l.status === undefined)
                .map((l: any) => ({
                  id: l.id,
                  title: l.productName,
                  tagline: l.brandDetails || "",
                  description: l.launchEventTitle || "",
                  status: l.isActive ? "Active Launch" : "Draft",
                  accentColor: "#D4AF37"
                }))
            });
          }
        }
      } catch (error) {
        console.warn("Backend dynamic CMS not reachable, falling back to static files:", error);
        setIsBackendConnected(false);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <DataContext.Provider
      value={{
        homeData,
        aboutData,
        journeyData,
        journeyHero,
        servicesData,
        campaignsData,
        faqData,
        blogsData,
        careerData,
        eventsData,
        testimonialsData,
        missionVisionData,
        whatWeDoData,
        portfolioData,
        galleryData,
        mediaCoverageData,
        collaborationsData,
        contactData,
        launchesData,
        isLoading,
        isBackendConnected,
        dbData,
        refreshData
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
};
