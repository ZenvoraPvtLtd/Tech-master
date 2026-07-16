import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { Award, ArrowUpRight } from "lucide-react";
import { LuxuryCard } from "../components/LuxuryCard";
import { useData } from "../context/DataContext";
import { mediaUrl } from "../utils/media";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const Events: React.FC = () => {
  const { eventsData: cmsEvents } = useData();
  const eventsData = cmsEvents || [];
  useEffect(() => {
    // Reveal section
    gsap.fromTo(
      ".event-card-reveal",
      { y: 60, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".events-grid-trigger",
          start: "top 80%",
        },
      }
    );
  }, []);

  return (
    <div className="relative text-white min-h-screen pt-32 pb-8 px-6 overflow-hidden">
      {/* Background aurora glows */}
      <div className="absolute top-1/4 left-1/4 w-[45vw] h-[45vw] aurora-glow-purple opacity-20 pointer-events-none -translate-x-1/2" />
      <div className="absolute bottom-1/4 right-1/4 w-[35vw] h-[35vw] aurora-glow-gold opacity-10 pointer-events-none translate-x-1/2" />

      {/* Hero Header */}
      <div className="max-w-4xl mx-auto text-center mb-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="typo-badge mb-4"
        >
          PUBLIC ENGAGEMENTS
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="typo-h2 mb-6"
        >
          Keynote Speaking & <br />
          <span className="text-gold italic font-bold">Live Coding Seminars</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-gray-400 text-sm sm:text-base font-light max-w-xl mx-auto leading-relaxed"
        >
          Aman shares developer insights, soft-skills blueprints, and live systems architecture demonstrations on global stages.
        </motion.p>
      </div>

      {/* Main events catalog */}
      <div className="max-w-6xl mx-auto relative z-10 events-grid-trigger">
        <p className="typo-badge mb-10 text-center">FEATURED CONFERENCES & KEYNOTES</p>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
          {eventsData.map((evt, idx) => (
            <LuxuryCard key={evt.id} accentColor={evt.accentColor} className="event-card-reveal" index={idx}>
              <div className="aspect-video w-full rounded-2xl overflow-hidden border border-white/5 mb-6 relative">
                <img
                  src={mediaUrl(evt.media) || mediaUrl(evt.image) || mediaUrl(evt.imageUrl) || mediaUrl(evt.bannerImage)}
                  alt={evt.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute top-3 left-3 bg-black/80 border border-white/10 px-3 py-1 rounded-full text-[9px] uppercase tracking-[1px] font-mono text-gold">
                  {evt.type}
                </div>
              </div>

              <div className="flex flex-col gap-2 mb-4">
                <div className="flex items-center gap-1.5 text-gray-400 text-[10px] uppercase font-mono tracking-[1px]">
                  <span>{evt.date}</span>
                </div>
                <div className="flex items-center gap-1.5 text-gray-400 text-[10px] uppercase font-mono tracking-[1px]">
                  <span>{evt.location}</span>
                </div>
              </div>

              <h3 className="font-serif text-xl text-white font-medium mb-3 group-hover:text-gold transition-colors duration-300">
                {evt.title}
              </h3>
              <p className="text-gray-400 text-xs leading-relaxed font-light mb-6">
                {evt.description}
              </p>

              <div className="flex items-center gap-1.5 text-[10px] text-gold font-mono uppercase tracking-[1.5px] mt-auto pt-4 border-t border-white/5">
                <span>Attendance: {evt.attendance}</span>
              </div>
            </LuxuryCard>
          ))}
        </div>

        {/* Engagement Types */}
        <section className="mb-12 pt-12 border-t border-white/5 relative z-10 text-center">
          <p className="typo-badge mb-4">CAPABILITIES</p>
          <h2 className="typo-h2 mb-10">
            Engagement <span className="text-gold italic font-bold">Types</span>
          </h2>
          <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
            {[
              "Event Hosting", "Guest Appearance", "Corporate Events", "Fashion Shows", 
              "Product Events", "Meetups", "Workshops", "Conferences"
            ].map((type, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="px-6 py-3 rounded-full border border-white/10 bg-white/5 text-gray-300 text-sm hover:border-gold hover:text-gold transition-colors duration-300 cursor-default"
              >
                {type}
              </motion.div>
            ))}
          </div>
        </section>

        {/* Media & Highlights */}
        <section className="mb-12 relative z-10">
          <div className="text-center mb-12">
            <p className="typo-badge mb-4">MEDIA ARCHIVE</p>
            <h2 className="typo-h2">
              Gallery, Videos & <span className="text-gold italic font-bold">Highlights</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Gallery Images */}
            <div className="md:col-span-2 grid grid-cols-2 gap-6">
              <div className="aspect-square rounded-2xl overflow-hidden border border-white/5 group">
                <img src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=600&q=80" alt="Event Gallery 1" loading="lazy" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              </div>
              <div className="aspect-square rounded-2xl overflow-hidden border border-white/5 group">
                <img src="https://images.unsplash.com/photo-1515169067868-5387ec356754?auto=format&fit=crop&w=600&q=80" alt="Event Gallery 2" loading="lazy" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              </div>
            </div>
            {/* Video Highlight */}
            <div className="md:col-span-1 rounded-2xl overflow-hidden border border-white/5 relative group flex items-center justify-center bg-black min-h-[300px]">
              <img src="https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=600&q=80" alt="Video Thumbnail" loading="lazy" className="w-full h-full object-cover opacity-50 group-hover:opacity-30 transition-opacity duration-700 absolute inset-0" />
              <div className="w-16 h-16 rounded-full bg-gold/20 flex items-center justify-center backdrop-blur-sm border border-gold/50 z-10 cursor-pointer group-hover:scale-110 transition-transform duration-300">
                <div className="w-0 h-0 border-t-[8px] border-t-transparent border-l-[12px] border-l-gold border-b-[8px] border-b-transparent ml-1" />
              </div>
              <div className="absolute bottom-6 left-6 z-10">
                <span className="text-[10px] uppercase font-bold tracking-[2px] text-gold block mb-1">RECAP</span>
                <span className="font-serif text-xl text-white">Mainstage 2023</span>
              </div>
            </div>
          </div>
        </section>

        {/* Booking Form CTA card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.0 }}
          className="glass-panel p-8 md:p-16 rounded-3xl text-left max-w-4xl mx-auto flex flex-col md:flex-row gap-12 items-center"
        >
          <div className="md:w-1/2">
            <span className="text-[10px] uppercase font-bold tracking-[3px] text-gold block mb-2">SPEAKER BOOKINGS</span>
            <h2 className="font-serif text-3xl font-light text-white mb-6 leading-tight">
              Bring Aman to <br />
              <span className="text-gold italic font-bold">Your Event</span>
            </h2>
            <p className="text-gray-400 text-xs md:text-sm leading-relaxed font-light mb-6">
              Aman keynote schedules fill up rapidly. Bookings are open for university developer panels, virtual technical summits, DevFests, or corporate software consulting cycles.
            </p>
            <div className="flex items-center gap-4 text-xs font-mono tracking-[1px] text-gray-400">
              <Award className="w-4 h-4 text-gold shrink-0" />
              <span>Full Press Kit and AV Rider available upon approval.</span>
            </div>
          </div>

          <div className="md:w-1/2 w-full flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="YOUR NAME"
                className="bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-xs font-mono uppercase text-white focus:outline-none focus:border-gold transition-colors duration-300"
              />
              <input
                type="email"
                placeholder="EMAIL ADDRESS"
                className="bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-xs font-mono uppercase text-white focus:outline-none focus:border-gold transition-colors duration-300"
              />
            </div>
            <input
              type="text"
              placeholder="EVENT NAME / ORGANIZATION"
              className="bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-xs font-mono uppercase text-white focus:outline-none focus:border-gold transition-colors duration-300"
            />
            <textarea
              rows={4}
              placeholder="EVENT DETAILS & SPEECH TOPICS..."
              className="bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-xs font-mono uppercase text-white focus:outline-none focus:border-gold transition-colors duration-300 resize-none"
            />
            <button className="py-3.5 bg-white text-black font-bold uppercase text-[10px] tracking-[2.5px] rounded-xl hover:bg-gold transition-all duration-300 flex items-center justify-center gap-1.5 shadow-lg">
              Submit Speaker Booking <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
