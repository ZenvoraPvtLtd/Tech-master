import React, { useState, useEffect } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { Magnetic } from "../components/Magnetic";
import gsap from "gsap";
import logo1 from "../assets/logo_transparent-removebg-preview.png";
import { motion, AnimatePresence } from "framer-motion";
import { useData } from "../context/DataContext";
import { mediaUrl } from "../utils/media";


interface HeaderProps {
  activePage: string;
  onChangePage: (page: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ activePage, onChangePage }) => {
  const { dbData, websiteSettings } = useData();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  const [isTermsOpen, setIsTermsOpen] = useState(false);

  const identityItems = dbData?.navigation?.identityItems || [
    { name: "Home", id: "home" },
    { name: "About Founder", id: "about" },
    { name: "Founder's Journey", id: "journey" },
    { name: "Mission & Vision", id: "mission" },
    { name: "What We Do", id: "what-we-do" },
  ];

  const engagementItems = dbData?.navigation?.engagementItems || [
    { name: "Brand Collabs", id: "collaborations" },
    { name: "Campaigns", id: "campaigns" },
    { name: "Product Launches", id: "product-launches" },
    { name: "Events & Talks", id: "events" },
    { name: "Student Work", id: "portfolio" },
    { name: "Media Gallery", id: "gallery" },
    { name: "Careers", id: "career" },
    { name: "Insights / Blog", id: "blog" },
  ];

  const quickLinksItems = dbData?.navigation?.quickLinksItems || [
    { name: "Core Services", id: "services" },
    { name: "Testimonials", id: "testimonials" },
    { name: "FAQ Portal", id: "faq" },
    { name: "Contact Page", id: "contact" },
    { name: "Privacy Policy", id: "privacy" },
    { name: "Terms of Service", id: "terms" },
  ];

  const handleNavClick = (pageId: string) => {
    if (pageId === "privacy") {
      setIsPrivacyOpen(true);
    } else if (pageId === "terms") {
      setIsTermsOpen(true);
    } else {
      setIsMenuOpen(false);
      onChangePage(pageId);
    }
  };

  useEffect(() => {
    if (isMenuOpen) {
      // Fullscreen menu open animation
      gsap.to(".menu-overlay", {
        clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
        duration: 0.8,
        ease: "power4.inOut"
      });
      gsap.fromTo(".menu-link", 
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.03, ease: "power3.out", delay: 0.3 }
      );
    } else {
      // Close animation
      gsap.to(".menu-overlay", {
        clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)",
        duration: 0.6,
        ease: "power4.inOut"
      });
    }
  }, [isMenuOpen]);

  return (
    <>
      <header
  className="glass-nav fixed top-0 left-0 w-full z-[999] py-1 md:py-2 px-4 md:px-12 flex justify-between items-center transition-all duration-300"
  style={{
    filter: `
      drop-shadow(0 0 8px rgba(212, 175, 55, 0.8))
      drop-shadow(0 0 18px rgba(212, 175, 55, 0.6))
      drop-shadow(0 0 30px rgba(212, 175, 55, 0.4))
    `,
    background:`black`,
  }}
>
        {/* Brand Logo */}
        <div 
          onClick={() => handleNavClick("home")} 
          className="flex items-center gap-2.5 cursor-pointer group"
          data-cursor="home"
        >
          <img
            src={mediaUrl(websiteSettings?.companyLogo) || logo1}
            alt="Tech Master Logo"
            className="h-16 sm:h-20 lg:h-28 w-auto object-contain -my-4 sm:-my-6 lg:-my-8"
            style={{
              imageRendering: "-webkit-optimize-contrast",
              filter: `
                drop-shadow(0 0 8px rgba(212, 175, 55, 0.8))
                drop-shadow(0 0 18px rgba(212, 175, 55, 0.6))
                drop-shadow(0 0 30px rgba(212, 175, 55, 0.4))
                drop-shadow(0 0 30px rgba(212, 175, 55, 0.4))
                drop-shadow(0 0 30px rgba(212, 175, 55, 0.4))
              `,
            }}
          />
        </div>

        {/* Desktop Navigation Link Cluster */}
        <nav className="hidden lg:flex items-center gap-5">
          {(dbData?.navigation?.desktopLinks || [
            { name: "Home", id: "home" },
            { name: "About", id: "about" },
            { name: "Journey", id: "journey" },
            { name: "Media Gallery", id: "gallery" },
            { name: "Portfolio", id: "portfolio" },
            { name: "Careers", id: "career" },
            { name: "Blog", id: "blog" },
          ]).map((item: any) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`text-xs uppercase tracking-[2px] transition-all duration-300 relative py-1 hover:text-gold font-black ${
                activePage === item.id ? "text-gold" : "text-white"
              }`}
            >
              {item.name}
              {activePage === item.id && (
                <span className="absolute bottom-0 left-0 w-full h-[1px] bg-gold" />
              )}
            </button>
          ))}
        </nav>

        {/* Action Button & Hamburger Toggle */}
        <div className="flex items-center gap-6">
          <div className="hidden sm:block">
            <Magnetic strength={0.3}>
              <button
                onClick={() => handleNavClick("contact")}
                className="light-sweep px-5 py-2.5 rounded-full border border-gold/30 hover:border-gold hover:text-black hover:bg-gold transition-all duration-500 text-xs font-bold uppercase tracking-[2px] text-gold flex items-center gap-2"
              >
                Let's Talk
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </Magnetic>
          </div>

          {/* Menu Button Toggle */}
          <Magnetic strength={0.25}>
            <button
  onClick={() => setIsMenuOpen(!isMenuOpen)}
  className="w-10 h-10 rounded-full border flex items-center justify-center bg-black/5 transition-all duration-300"
  style={{
    color: "#D4AF37"
  }}
  data-cursor={isMenuOpen ? "close" : "menu"}
>
              {isMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </Magnetic>
        </div>
      </header>
      {/* Fullscreen Overlay Menu */}
      <div 
        className="menu-overlay fixed inset-0 bg-[#060606]/98 backdrop-blur-2xl z-[998] overflow-y-auto flex flex-col justify-start py-20 px-6 md:px-16"
        style={{ clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)" }}
      >
        {/* Background glow effects */}
        <div className="absolute top-1/4 left-1/4 w-[50vw] h-[50vw] aurora-glow-purple -translate-x-1/2 -translate-y-1/2 opacity-10 pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-[40vw] h-[40vw] aurora-glow-blue translate-x-1/2 translate-y-1/2 opacity-10 pointer-events-none" />

        <div className="w-full max-w-6xl mx-auto my-auto grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 z-10 py-8 md:py-24">
          
          {/* Column 1: Identity */}
          <div className="flex flex-col gap-4 text-center items-center">
            <p className="text-[10px] uppercase tracking-[6px] text-gold/80 mb-2 font-bold border-b border-white/5 pb-2 w-full text-center">IDENTITY</p>
            <div className="flex flex-col gap-2 w-full">
              {identityItems.map((item: any) => (
                <div key={item.id} className="overflow-hidden">
                  <button
                    onClick={() => handleNavClick(item.id)}
                    className="menu-link mx-auto flex items-center justify-center gap-3 text-sm md:text-base font-serif text-white hover:text-gold transition-colors duration-300 py-1.5 relative group font-light"
                  >
                    <span className="inline-block transition-transform duration-300 group-hover:scale-105">
                      {item.name}
                    </span>
                    {activePage === item.id && (
                      <span className="text-[8px] font-sans text-gold border border-gold/40 px-1.5 py-0.5 rounded-full tracking-[1.5px] uppercase bg-gold/5 shrink-0">
                        Active
                      </span>
                    )}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Column 2: Engagement */}
          <div className="flex flex-col gap-4 text-center items-center">
            <p className="text-[10px] uppercase tracking-[6px] text-gold/80 mb-2 font-bold border-b border-white/5 pb-2 w-full text-center">ENGAGEMENT</p>
            <div className="flex flex-col gap-2 w-full">
              {engagementItems.map((item: any) => (
                <div key={item.id} className="overflow-hidden">
                  <button
                    onClick={() => handleNavClick(item.id)}
                    className="menu-link mx-auto flex items-center justify-center gap-3 text-sm md:text-base font-serif text-white hover:text-gold transition-colors duration-300 py-1.5 relative group font-light"
                  >
                    <span className="inline-block transition-transform duration-300 group-hover:scale-105">
                      {item.name}
                    </span>
                    {activePage === item.id && (
                      <span className="text-[8px] font-sans text-gold border border-gold/40 px-1.5 py-0.5 rounded-full tracking-[1.5px] uppercase bg-gold/5 shrink-0">
                        Active
                      </span>
                    )}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Column 3: Quick Links */}
          <div className="flex flex-col gap-4 text-center items-center">
            <p className="text-[10px] uppercase tracking-[6px] text-gold/80 mb-2 font-bold border-b border-white/5 pb-2 w-full text-center">QUICK LINKS</p>
            <div className="flex flex-col gap-2 w-full">
              {quickLinksItems.map((item: any) => (
                <div key={item.id} className="overflow-hidden">
                  <button
                    onClick={() => handleNavClick(item.id)}
                    className="menu-link mx-auto flex items-center justify-center gap-3 text-sm md:text-base font-serif text-white hover:text-gold transition-colors duration-300 py-1.5 relative group font-light"
                  >
                    <span className="inline-block transition-transform duration-300 group-hover:scale-105">
                      {item.name}
                    </span>
                    {activePage === item.id && (
                      <span className="text-[8px] font-sans text-gold border border-gold/40 px-1.5 py-0.5 rounded-full tracking-[1.5px] uppercase bg-gold/5 shrink-0">
                        Active
                      </span>
                    )}
                  </button>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* Privacy Policy Modal */}
      <AnimatePresence>
        {isPrivacyOpen && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-[99999] flex items-center justify-center p-6 text-left">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="glass-panel max-w-2xl w-full p-8 rounded-3xl relative max-h-[80vh] overflow-y-auto"
            >
              <button 
                onClick={() => setIsPrivacyOpen(false)}
                className="absolute top-6 right-6 text-gray-400 hover:text-gold transition-colors duration-300 w-8 h-8 rounded-full border border-white/10 flex items-center justify-center bg-black/40 font-bold"
              >
                ✕
              </button>
              <h3 className="font-serif text-2xl text-gold font-bold mb-6">Privacy Policy</h3>
              <div className="text-gray-300 text-xs md:text-sm leading-relaxed space-y-4 font-light">
                <p><strong>Effective Date: {dbData?.settings?.privacyEffectiveDate || "July 7, 2026"}</strong></p>
                <p>{dbData?.settings?.privacyIntro || "Aman & Tech Master Media Labs operates this portfolio and education portal. We respect your privacy and only collect direct email addresses when you subscribe to our newsletter."}</p>
                <p><strong>Data Collection & Use:</strong> {dbData?.settings?.privacyDataCollection || "We collect email addresses solely for sending newsletter digests, cohort details, and technical blogs. Your information is never sold, traded, or shared with third-party advertising companies."}</p>
                <p><strong>Cookies:</strong> {dbData?.settings?.privacyCookies || "This platform utilizes basic localized storage and caching systems to maintain animations, 3D settings, and user navigation states smoothly."}</p>
                <p><strong>Security:</strong> {dbData?.settings?.privacySecurity || "All direct inquiries and newsletter transmissions are protected with industry-standard cryptographic handshakes."}</p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Terms of Service Modal */}
      <AnimatePresence>
        {isTermsOpen && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-[99999] flex items-center justify-center p-6 text-left">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="glass-panel max-w-2xl w-full p-8 rounded-3xl relative max-h-[80vh] overflow-y-auto"
            >
              <button 
                onClick={() => setIsTermsOpen(false)}
                className="absolute top-6 right-6 text-gray-400 hover:text-gold transition-colors duration-300 w-8 h-8 rounded-full border border-white/10 flex items-center justify-center bg-black/40 font-bold"
              >
                ✕
              </button>
              <h3 className="font-serif text-2xl text-gold font-bold mb-6">Terms of Service</h3>
              <div className="text-gray-300 text-xs md:text-sm leading-relaxed space-y-4 font-light">
                <p><strong>Effective Date: {dbData?.settings?.termsEffectiveDate || "July 7, 2026"}</strong></p>
                <p>{dbData?.settings?.termsIntro || "By browsing this platform, subscribing to our mailing list, or submitting inquiries, you agree to these Terms of Service."}</p>
                <p><strong>Intellectual Property:</strong> {dbData?.settings?.termsIntellectualProperty || "All site designs, 3D shaders, systems blueprints, and video snippets are the trademark properties of Aman and Tech Master Labs unless stated otherwise."}</p>
                <p><strong>User License:</strong> {dbData?.settings?.termsUserLicense || "You are granted a limited license to explore our portfolio and code projects for educational research. Scraping, cloning, or distributing source codes commercially without express written consent is strictly prohibited."}</p>
                <p><strong>Sandbox Declarations:</strong> {dbData?.settings?.termsSandboxDeclarations || "All forms, databases, and estimates operate in safe sandbox demonstration pipelines."}</p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};


