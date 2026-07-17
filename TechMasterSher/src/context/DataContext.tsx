import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { normalizeCmsMedia } from "../utils/media";

interface DataContextType {
  homeData: any;
  aboutData: any;
  journeyData: any[];
  journeyHero: any;
  servicesData: any[];
  servicesPageData: any;
  campaignsData: any[];
  faqData: any[];
  blogsData: any[];
  careerData: any[];
  eventsData: any[];
  testimonialsData: any[];
  testimonialsPageData: any;
  termsPolicyData: any;
  privacyPolicyData: any;
  cookiePolicyData: any;
  legalSettingsData: any;
  missionVisionData: any;
  whatWeDoData: any;
  portfolioData: any[];
  galleryData: any[];
  mediaCoverageData: any;
  collaborationsData: any;
  contactData: any;
  launchesData: any;
  blogHeroData: any;
  featuredStrategyData: any;
  strategyStatsData: any[];
  strategyPillarsData: any[];
  strategyPresetsData: any[];
  blogCategoriesData: any[];
  latestInsightsData: any;
  blogPageSettingsData: any;
  blogSEOData: any;
  isLoading: boolean;
  isBackendConnected: boolean;
  dbData: any;
  websiteSettings: any;
  coreServicesConfig: any;
  refreshData: () => Promise<void>;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [homeData, setHomeData] = useState<any>(null);
  const [aboutData, setAboutData] = useState<any>(null);
  const [journeyData, setJourneyData] = useState<any[]>([]);
  const [journeyHero, setJourneyHero] = useState<any>(null);
  const [servicesData, setServicesData] = useState<any[]>([]);
  const [servicesPageData, setServicesPageData] = useState<any>(null);
  const [campaignsData, setCampaignsData] = useState<any[]>([]);
  const [faqData, setFaqData] = useState<any[]>([]);
  const [blogsData, setBlogsData] = useState<any[]>([]);
  const [careerData, setCareerData] = useState<any[]>([]);
  const [eventsData, setEventsData] = useState<any[]>([]);
  const [testimonialsData, setTestimonialsData] = useState<any[]>([]);
  const [testimonialsPageData, setTestimonialsPageData] = useState<any>(null);
  const [termsPolicyData, setTermsPolicyData] = useState<any>(null);
  const [privacyPolicyData, setPrivacyPolicyData] = useState<any>(null);
  const [cookiePolicyData, setCookiePolicyData] = useState<any>(null);
  const [legalSettingsData, setLegalSettingsData] = useState<any>(null);
  const [missionVisionData, setMissionVisionData] = useState<any>(null);
  const [whatWeDoData, setWhatWeDoData] = useState<any>(null);
  const [portfolioData, setPortfolioData] = useState<any[]>([]);
  const [galleryData, setGalleryData] = useState<any[]>([]);
  const [mediaCoverageData, setMediaCoverageData] = useState<any>(null);
  const [collaborationsData, setCollaborationsData] = useState<any>(null);
  const [contactData, setContactData] = useState<any>(null);
  const [launchesData, setLaunchesData] = useState<any>(null);
  const [websiteSettings, setWebsiteSettings] = useState<any>(null);
  const [coreServicesConfig, setCoreServicesConfig] = useState<any>(null);

  // Blog CMS Additional States
  const [blogHeroData, setBlogHeroData] = useState<any>(null);
  const [featuredStrategyData, setFeaturedStrategyData] = useState<any>(null);
  const [strategyStatsData, setStrategyStatsData] = useState<any[]>([]);
  const [strategyPillarsData, setStrategyPillarsData] = useState<any[]>([]);
  const [strategyPresetsData, setStrategyPresetsData] = useState<any[]>([]);
  const [blogCategoriesData, setBlogCategoriesData] = useState<any[]>([]);
  const [latestInsightsData, setLatestInsightsData] = useState<any>(null);
  const [blogPageSettingsData, setBlogPageSettingsData] = useState<any>(null);
  const [blogSEOData, setBlogSEOData] = useState<any>(null);

  const [isLoading, setIsLoading] = useState(true);
  const [isBackendConnected, setIsBackendConnected] = useState(false);
  const [dbData, setDbData] = useState<any>(null);
  const REFRESH_INTERVAL_MS = 5000;
  const CMS_API_URL = `${import.meta.env.VITE_API_URL || "https://tech-master-6km7.onrender.com/api/v1"}/cms`;

  const applyCmsDataToState = useCallback((db: any) => {
    db = normalizeCmsMedia(db);
    setDbData(db);
    setIsBackendConnected(true);

    if (db.homepage) setHomeData(db.homepage);
    if (db.about) setAboutData(db.about);
    if (db.founderJourney) {
      setJourneyData(db.founderJourney.milestones || []);
      setJourneyHero(db.founderJourney.hero || null);
    }
    if (db.services) setServicesData(db.services);
    if (db.campaigns) setCampaignsData(db.campaigns);
    if (db.faqs) setFaqData(db.faqs);
    if (db.blogs) setBlogsData(db.blogs);
    if (db.careers) setCareerData(db.careers);
    
    // Events comes from either homepage.events.list or db.events in backend
    if (db.events) setEventsData(db.events);
    else if (db.homepage?.events?.list) setEventsData(db.homepage.events.list);
    
    if (db.testimonials) setTestimonialsData(db.testimonials);
    if (db.testimonialsPage) setTestimonialsPageData(db.testimonialsPage);
    if (db.termsPolicy) setTermsPolicyData(db.termsPolicy);
    if (db.privacyPolicy) setPrivacyPolicyData(db.privacyPolicy);
    if (db.cookiePolicy) setCookiePolicyData(db.cookiePolicy);
    if (db.legalSettings) setLegalSettingsData(db.legalSettings);
    if (db.missionVision) setMissionVisionData(db.missionVision);
    if (db.whatWeDo) setWhatWeDoData(db.whatWeDo);
    if (db.portfolio) setPortfolioData(db.portfolio);
    if (db.mediaGallery) setGalleryData(db.mediaGallery);
    
    setMediaCoverageData({
      hero: db.mediaHero || null,
      showreels: db.mediaShowreels || [],
      downloads: db.mediaDownloads || [],
      articles: db.mediaCoverage || []
    });
    
    if (db.collaborationsPage) setCollaborationsData(db.collaborationsPage);
    else if (db.collaborations) setCollaborationsData(db.collaborations);

    // Contact Data Mapping - Just inject exactly what backend gave under `contact`
    if (db.contact) {
      setContactData(db.contact);
    } else {
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
    }

    if (db.productLaunches) setLaunchesData(db.productLaunches);
    else if (db.launches) setLaunchesData(db.launches);

    if (db.websiteSettings) setWebsiteSettings(db.websiteSettings);
    if (db.coreServicesConfig) setCoreServicesConfig(db.coreServicesConfig);
    if (db.servicesPage) setServicesPageData(db.servicesPage);

    // Blog CMS Hydration
    if (db.blogHero) setBlogHeroData(db.blogHero);
    if (db.featuredStrategy) setFeaturedStrategyData(db.featuredStrategy);
    if (db.strategyStats) setStrategyStatsData(db.strategyStats);
    if (db.strategyPillars) setStrategyPillarsData(db.strategyPillars);
    if (db.strategyPresets) setStrategyPresetsData(db.strategyPresets);
    if (db.blogCategories) setBlogCategoriesData(db.blogCategories);
    if (db.latestInsights) setLatestInsightsData(db.latestInsights);
    if (db.blogPageSettings) setBlogPageSettingsData(db.blogPageSettings);
    if (db.blogSEO) setBlogSEOData(db.blogSEO);

  }, []);

  const refreshData = useCallback(async () => {
    try {
      // 1. Health check - using the base API URL without /cms
      const healthUrl = import.meta.env.VITE_API_URL ? import.meta.env.VITE_API_URL.replace("/api/v1", "/health") : "https://tech-master-6km7.onrender.com/health";
      const healthRes = await fetch(healthUrl);
      if (!healthRes.ok) {
         throw new Error("Backend health check failed");
      }
      setIsBackendConnected(true);

      // 2. CMS fetch
      const response = await fetch(CMS_API_URL);
      if (!response.ok) {
        console.warn("Backend is reachable but CMS fetch failed, falling back to empty/default data.");
        setDbData({}); // Prevents the application from throwing "API CONNECTION ERROR"
      } else {
        const result = await response.json();
        if (result.success && result.data) {
          console.log('Fetched CMS data:', result.data);
          applyCmsDataToState(result.data);
        } else {
          setDbData({});
        }
      }
    } catch (err) {
      console.error('Backend CMS sync failed:', err);
      setIsBackendConnected(false);
    } finally {
      setIsLoading(false);
    }
  }, [CMS_API_URL, applyCmsDataToState]);

  useEffect(() => {
    void refreshData();

    const handleCmsUpdated = () => {
      void refreshData();
    };

    const handleStorage = (event: StorageEvent) => {
      if (event.key === 'techmaster-cms-last-updated') {
        void refreshData();
      }
    };

    window.addEventListener('techmaster-cms-updated', handleCmsUpdated);
    window.addEventListener('storage', handleStorage);

    const interval = window.setInterval(() => {
      void refreshData();
    }, REFRESH_INTERVAL_MS);

    return () => {
      window.removeEventListener('techmaster-cms-updated', handleCmsUpdated);
      window.removeEventListener('storage', handleStorage);
      window.clearInterval(interval);
    };
  }, [refreshData]);

  return (
    <DataContext.Provider
      value={{
        homeData,
        aboutData,
        journeyData,
        journeyHero,
        servicesData,
        servicesPageData,
        campaignsData,
        faqData,
        blogsData,
        careerData,
        eventsData,
        testimonialsData,
        testimonialsPageData,
        termsPolicyData,
        privacyPolicyData,
        cookiePolicyData,
        legalSettingsData,
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
        websiteSettings,
        coreServicesConfig,
        refreshData,
        // Blog CMS Properties
        blogHeroData,
        featuredStrategyData,
        strategyStatsData,
        strategyPillarsData,
        strategyPresetsData,
        blogCategoriesData,
        latestInsightsData,
        blogPageSettingsData,
        blogSEOData
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
