import React, { useState, useRef, useEffect } from "react";
import { Cpu, Layers, Box, Sparkles, ChevronDown, ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useData } from "../context/DataContext";
import { mediaUrl } from "../utils/media";

export const Services: React.FC = () => {
  const { servicesData, servicesPageData } = useData();
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [activeAdvancedTab, setActiveAdvancedTab] = useState<string | null>(null);
  const sidebarRef = useRef<HTMLDivElement>(null);

  const scrollSidebar = (direction: 'up' | 'down') => {
    if (sidebarRef.current) {
      const scrollAmount = 200;
      sidebarRef.current.scrollBy({
        top: direction === 'up' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const advancedServices = servicesData
    .filter(srv => srv.overview || (srv.process && srv.process.length > 0))
    .sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0));

  useEffect(() => {
    if (advancedServices.length > 0 && !activeAdvancedTab) {
      setActiveAdvancedTab(advancedServices[0].id);
    }
  }, [advancedServices, activeAdvancedTab]);

  const heroData = servicesPageData?.hero || {
    badge: "CORE PORTALS",
    title: "Services, Courses & ",
    highlightText: "Keynote Bookings.",
    description: "Explore Aman's developer training tracks, speaking keynote requests, collaborative student hackathons, and brand sponsorships."
  };

  const statistics = servicesPageData?.statistics || [];
  const testimonials = servicesPageData?.testimonials || [];
  const faqs = servicesPageData?.faqs || [];
  const cta = servicesPageData?.cta || {
    heading: "Ready to Transform Your Business?",
    subtext: "Let's discuss how we can help you achieve your goals.",
    buttonText: "Contact Us",
    buttonUrl: "/contact"
  };

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "Cpu":
        return <Cpu className="w-5 h-5" />;
      case "Layers":
        return <Layers className="w-5 h-5" />;
      case "Box":
        return <Box className="w-5 h-5" />;
      case "Sparkles":
        return <Sparkles className="w-5 h-5" />;
      default:
        return <Cpu className="w-5 h-5" />;
    }
  };

  return (
    <div className="relative text-white min-h-screen pt-24 pb-8 px-6 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/3 right-1/4 w-[35vw] h-[35vw] aurora-glow-purple opacity-20 pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-[30vw] h-[30vw] aurora-glow-gold opacity-10 pointer-events-none" />

      {/* Hero Header */}
      <section className="max-w-7xl mx-auto text-left mb-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="typo-badge mb-4"
        >
          {heroData.badge}
        </motion.div>
        
        <h1 className="typo-h1 mb-8">
          {heroData.title} <br />
          <span className="text-gold italic font-bold">{heroData.highlightText}</span>
        </h1>

        <p className="text-gray-400 font-light text-base md:text-lg max-w-2xl leading-relaxed mt-6">
          {heroData.description}
        </p>
      </section>

      {/* Services List Section */}
      <section className="max-w-4xl mx-auto text-left flex flex-col gap-6 relative z-10">
        {[...servicesData].sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0)).map((srv, idx) => {
          const isExpanded = expandedId === srv.id;

          return (
            <div
              key={srv.id}
              className="glass-panel rounded-3xl overflow-hidden border border-white/5 hover:border-gold/25 transition-all duration-500"
            >
              {/* Header trigger */}
              <button
                onClick={() => setExpandedId(isExpanded ? null : srv.id)}
                className="w-full p-8 flex items-center justify-between text-left focus:outline-none"
              >
                <div className="flex items-center gap-6">
                  <span className="font-mono text-sm opacity-30">0{idx + 1}</span>
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center border"
                    style={{
                      color: srv.accentColor,
                      borderColor: srv.accentColor + "30",
                      backgroundColor: srv.accentColor + "10",
                    }}
                  >
                    {getIcon(srv.icon)}
                  </div>
                  <div>
                    <h3 className="font-serif text-xl sm:text-2xl font-bold text-white transition-colors duration-300">
                      {srv.title}
                    </h3>
                    <span className="text-[10px] uppercase tracking-[1.5px] opacity-40 block">
                      {srv.tagline}
                    </span>
                  </div>
                </div>

                <motion.div
                  animate={{ rotate: isExpanded ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown className="w-5 h-5 text-gray-400 hover:text-white" />
                </motion.div>
              </button>

              {/* Collapsible details */}
              <AnimatePresence initial={false}>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                  >
                    <div className="px-8 pb-8 pt-2 border-t border-white/5 bg-white/[0.01]">
                      <p className="text-gray-400 font-light text-sm md:text-base leading-relaxed mb-6">
                        {srv.description}
                      </p>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {srv.features.map((feat: any, fidx: number) => (
                          <div key={fidx} className="flex items-center gap-2">
                            <span className="text-xs text-gray-400">{feat}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </section>

      {/* Comprehensive Services - Tabbed Interface */}
      <section className="max-w-7xl mx-auto text-left flex flex-col gap-6 relative z-10 mt-16 mb-12">
        <div className="mb-12 text-center">
          <p className="typo-badge mb-4">{servicesPageData?.expertise?.badge || "OUR EXPERTISE"}</p>
          <h2 className="typo-h2 mb-6">
            {servicesPageData?.expertise?.title || "Comprehensive"} <span className="text-gold italic font-bold">{servicesPageData?.expertise?.highlightText || "Solutions"}</span>
          </h2>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-1/3 flex flex-col items-center">
            <button 
              onClick={() => scrollSidebar('up')} 
              className="mb-2 p-2 rounded-full bg-white/5 border border-white/10 text-gold hover:bg-gold/20 hover:text-white transition-colors duration-300"
            >
              <ChevronUp className="w-5 h-5" />
            </button>
            <div 
              ref={sidebarRef}
              className="flex flex-col gap-2 overflow-y-auto max-h-[500px] w-full pr-2 custom-scrollbar scroll-smooth"
            >
              {advancedServices.map((srv) => (
                <button
                  key={srv.id}
                  onClick={() => setActiveAdvancedTab(srv.id)}
                  className={`text-left px-6 py-4 rounded-2xl border transition-all duration-300 ${activeAdvancedTab === srv.id ? 'bg-white/10 border-gold/50 text-gold' : 'bg-white/5 border-white/5 text-gray-400 hover:border-gold/20 hover:text-white'}`}
                >
                  <span className="font-serif text-lg font-bold">{srv.title}</span>
                </button>
              ))}
            </div>
            <button 
              onClick={() => scrollSidebar('down')} 
              className="mt-2 p-2 rounded-full bg-white/5 border border-white/10 text-gold hover:bg-gold/20 hover:text-white transition-colors duration-300"
            >
              <ChevronDown className="w-5 h-5" />
            </button>
          </div>
          
          {/* Content Area */}
          <div className="lg:w-2/3">
            <AnimatePresence mode="wait">
              {advancedServices.map((srv) => 
                activeAdvancedTab === srv.id && (
                  <motion.div
                    key={srv.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.4 }}
                    className="glass-panel p-8 md:p-12 rounded-3xl border border-white/5 h-full flex flex-col"
                  >
                    <h3 className="font-serif text-3xl font-bold text-white mb-6">{srv.title}</h3>
                    
                    <div className="mb-8">
                      <h4 className="text-[10px] uppercase tracking-[3px] text-gold font-bold mb-3">Overview</h4>
                      <p className="text-gray-400 text-sm leading-relaxed font-light">{srv.overview}</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                      <div>
                        <h4 className="text-[10px] uppercase tracking-[3px] text-gold font-bold mb-4">Benefits</h4>
                        <ul className="flex flex-col gap-3">
                          {srv.benefits.map((ben: string, i: number) => (
                            <li key={i} className="flex items-start gap-2">
                              <span className="text-xs text-gray-300 font-light">{ben}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="text-[10px] uppercase tracking-[3px] text-gold font-bold mb-4">Process</h4>
                        <ul className="flex flex-col gap-3">
                          {srv.process.map((step: string, i: number) => (
                            <li key={i} className="flex items-start gap-3">
                              <span className="font-mono text-xs text-gold/50 mt-0.5">0{i+1}</span>
                              <span className="text-xs text-gray-300 font-light">{step}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {srv.gallery && srv.gallery.length > 0 && (
                      <div className="mb-10">
                        <h4 className="text-[10px] uppercase tracking-[3px] text-gold font-bold mb-4">Gallery</h4>
                        <div className="grid grid-cols-3 gap-4">
                          {srv.gallery.map((img: string, i: number) => (
                            <div key={i} className="aspect-video rounded-xl overflow-hidden border border-white/10">
                              <img src={mediaUrl(img)} alt="Gallery" className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" />
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="mt-auto pt-6 border-t border-white/5">
                      <a href={srv.ctaUrl || "/contact"} className="w-full sm:w-auto inline-block text-center px-8 py-3 bg-gold text-black font-bold uppercase text-xs tracking-[2px] rounded-full hover:bg-white transition-colors duration-300">
                        {srv.ctaText || "Inquire Now"}
                      </a>
                    </div>

                  </motion.div>
                )
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Missing Sections Rendering */}

      {statistics.length > 0 && (
        <section className="max-w-7xl mx-auto py-24 border-t border-white/5 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {statistics.map((stat: any, idx: number) => (
              <div key={idx} className="flex flex-col gap-2">
                <span className="font-serif text-4xl md:text-5xl text-gold font-black">{stat.value}</span>
                <span className="text-[10px] uppercase tracking-[2px] opacity-50">{stat.label}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {testimonials.length > 0 && (
        <section className="max-w-7xl mx-auto py-24 relative z-10">
          <div className="mb-12 text-center">
            <p className="typo-badge mb-4">CLIENT SUCCESS</p>
            <h2 className="typo-h2">Testimonials</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((test: any, idx: number) => (
              <div key={idx} className="glass-panel p-8 rounded-3xl border border-white/5">
                <p className="text-gray-300 italic mb-6 leading-relaxed">"{test.quote}"</p>
                <div className="flex items-center gap-4">
                  {test.image && (
                    <img src={mediaUrl(test.image)} alt={test.author} className="w-12 h-12 rounded-full object-cover" />
                  )}
                  <div>
                    <h4 className="font-bold text-white text-sm">{test.author}</h4>
                    <span className="text-[10px] uppercase tracking-[1px] text-gold">{test.role}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {faqs.length > 0 && (
        <section className="max-w-3xl mx-auto py-24 relative z-10">
          <div className="mb-12 text-center">
            <p className="typo-badge mb-4">GOT QUESTIONS?</p>
            <h2 className="typo-h2">Frequently Asked Questions</h2>
          </div>
          <div className="flex flex-col gap-4">
            {faqs.map((faq: any, idx: number) => (
              <div key={idx} className="glass-panel p-6 rounded-2xl border border-white/5">
                <h3 className="font-bold text-white mb-2">{faq.question}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {cta && (
        <section className="max-w-4xl mx-auto py-24 text-center relative z-10">
          <div className="glass-panel p-12 md:p-20 rounded-[3rem] border border-gold/20 relative overflow-hidden">
            <div className="absolute inset-0 bg-gold/5 blur-[100px]" />
            <h2 className="font-serif text-3xl md:text-5xl font-bold text-white mb-6 relative z-10">{cta.heading}</h2>
            <p className="text-gray-400 mb-10 text-lg relative z-10">{cta.subtext}</p>
            <a href={cta.buttonUrl} className="inline-block px-10 py-4 bg-gold text-black font-bold uppercase tracking-[2px] rounded-full hover:bg-white transition-colors duration-300 relative z-10">
              {cta.buttonText}
            </a>
          </div>
        </section>
      )}

    </div>
  );
};
