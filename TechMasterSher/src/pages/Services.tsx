import React, { useState, useRef } from "react";
import { Cpu, Layers, Box, Sparkles, ChevronDown, ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useData } from "../context/DataContext";

export const Services: React.FC = () => {
  const { servicesData } = useData();
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [activeAdvancedTab, setActiveAdvancedTab] = useState<number>(0);
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

  const advancedServices = [
    "Brand Promotion", "Product Reviews", "Campaign Planning", "Content Strategy", 
    "Influencer Marketing", "Corporate Shoots", "Commercial Videos", "UGC Content", 
    "Event Coverage", "Personal Branding", "Marketing Consultation", "Business Collaboration"
  ].map((title, idx) => ({
    id: idx,
    title,
    overview: `Our ${title} service is designed to elevate your brand's presence in the competitive tech landscape. We combine cinematic production with deep industry insights to deliver unparalleled results.`,
    benefits: [
      "Targeted audience reach and engagement",
      "Premium, cinematic production quality",
      "Data-driven strategic approach"
    ],
    process: [
      "Discovery & Strategy alignment",
      "Creative Production & Execution",
      "Review, Analytics & Optimization"
    ],
    gallery: [
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=400&q=80"
    ],
    cta: "Inquire Now"
  }));

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
    <div className="relative text-white min-h-screen pt-32 pb-24 px-6 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/3 right-1/4 w-[35vw] h-[35vw] aurora-glow-purple opacity-20 pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-[30vw] h-[30vw] aurora-glow-gold opacity-10 pointer-events-none" />

      {/* Hero Header */}
      <section className="max-w-7xl mx-auto text-left mb-24 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-[10px] uppercase tracking-[6px] text-gold font-bold mb-4"
        >
          CORE PORTALS
        </motion.div>
        
        <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-light leading-tight mb-8">
          Services, Courses & <br />
          <span className="text-gold italic font-bold">Keynote Bookings</span>.
        </h1>

        <p className="text-gray-400 font-light text-base md:text-lg max-w-2xl leading-relaxed mt-6">
          Explore Aman's developer training tracks, speaking keynote requests, collaborative student hackathons, and brand sponsorships.
        </p>
      </section>

      {/* Services List Section */}
      <section className="max-w-4xl mx-auto text-left flex flex-col gap-6 relative z-10">
        {servicesData.map((srv, idx) => {
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
      <section className="max-w-7xl mx-auto text-left flex flex-col gap-6 relative z-10 mt-32 mb-12">
        <div className="mb-12 text-center">
          <p className="text-[10px] uppercase tracking-[6px] text-gold font-bold mb-4">OUR EXPERTISE</p>
          <h2 className="font-serif text-3xl sm:text-5xl font-light text-white mb-6">
            Comprehensive <span className="text-gold italic font-bold">Solutions</span>
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
                          {srv.benefits.map((ben, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <span className="text-xs text-gray-300 font-light">{ben}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="text-[10px] uppercase tracking-[3px] text-gold font-bold mb-4">Process</h4>
                        <ul className="flex flex-col gap-3">
                          {srv.process.map((step, i) => (
                            <li key={i} className="flex items-start gap-3">
                              <span className="font-mono text-xs text-gold/50 mt-0.5">0{i+1}</span>
                              <span className="text-xs text-gray-300 font-light">{step}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="mb-10">
                      <h4 className="text-[10px] uppercase tracking-[3px] text-gold font-bold mb-4">Gallery</h4>
                      <div className="grid grid-cols-3 gap-4">
                        {srv.gallery.map((img, i) => (
                          <div key={i} className="aspect-video rounded-xl overflow-hidden border border-white/10">
                            <img src={img} alt="Gallery" className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" />
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="mt-auto pt-6 border-t border-white/5">
                      <button className="w-full sm:w-auto px-8 py-3 bg-gold text-black font-bold uppercase text-xs tracking-[2px] rounded-full hover:bg-white transition-colors duration-300">
                        {srv.cta}
                      </button>
                    </div>

                  </motion.div>
                )
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

    </div>
  );
};
