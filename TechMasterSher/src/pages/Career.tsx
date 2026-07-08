import React, { useState } from "react";
import { Briefcase, MapPin, DollarSign, Send } from "lucide-react";
import { motion } from "framer-motion";
import careerData from "../data/career.json";

export const Career: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleApplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="relative text-white min-h-screen pt-32 pb-24 px-6 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/4 left-1/3 w-[30vw] h-[30vw] aurora-glow-blue opacity-15 pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-[30vw] h-[30vw] aurora-glow-purple opacity-10 pointer-events-none" />

      {/* Hero Header */}
      <section className="max-w-7xl mx-auto text-left mb-20 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-[10px] uppercase tracking-[6px] text-gold font-bold mb-4"
        >
          JOIN THE TEAM
        </motion.div>
        
        <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-light leading-tight mb-8">
          Join Aman's <br />
          <span className="text-gold italic font-bold">Creator & Education Lab</span>.
        </h1>

        <p className="text-gray-400 font-light text-base md:text-lg max-w-2xl leading-relaxed mt-6">
          We look for cinematic editors, curriculum writers, and developer advocates who want to construct the future of tech education.
        </p>
      </section>

      {/* Active Roles */}
      <section className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 text-left mb-24 relative z-10">
        {/* Roles List */}
        <div>
          <h3 className="font-serif text-2xl text-white font-bold mb-6">Open Positions</h3>
          <div className="flex flex-col gap-6">
            {careerData.map((role) => (
              <div key={role.id} className="glass-panel p-6 rounded-3xl border border-white/5 hover:border-gold/25 transition-all duration-300">
                <span className="text-gold font-mono text-[9px] uppercase tracking-[1.5px] block mb-1">
                  Team: {role.team}
                </span>
                <h4 className="font-serif text-xl font-bold text-white mb-4">{role.role}</h4>
                <p className="text-gray-400 text-xs font-light leading-relaxed mb-6">
                  {role.description}
                </p>
                <div className="flex flex-wrap gap-4 text-xs text-gray-400 font-light pt-4 border-t border-white/5">
                  <span className="flex items-center gap-1.5">
                    <Briefcase className="w-3.5 h-3.5 text-gold" />
                    Full Time
                  </span>
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-gold" />
                    {role.location}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <DollarSign className="w-3.5 h-3.5 text-gold" />
                    {role.salary}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Culture Application Form */}
        <div className="glass-panel p-8 rounded-3xl border border-white/5 relative h-fit">
          <h3 className="font-serif text-2xl text-white font-bold mb-6">Direct Application</h3>
          
          {submitted ? (
            <div className="py-12 text-center">
              <span className="text-gold text-4xl block mb-4">✓</span>
              <h4 className="font-serif text-xl font-bold mb-2">Application Received</h4>
              <p className="text-gray-400 text-xs font-light">
                Our operations director will review your materials and reach out soon.
              </p>
            </div>
          ) : (
            <form onSubmit={handleApplySubmit} className="flex flex-col gap-5">
              <div>
                <label className="text-[9px] uppercase tracking-[2px] text-gold font-bold block mb-2">FULL NAME</label>
                <input
                  type="text"
                  required
                  placeholder="Arya Patel"
                  className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-3 text-xs uppercase text-white placeholder-white/20 focus:outline-none focus:border-gold transition-colors duration-300"
                />
              </div>

              <div>
                <label className="text-[9px] uppercase tracking-[2px] text-gold font-bold block mb-2">EMAIL ADDRESS</label>
                <input
                  type="email"
                  required
                  placeholder="arya@code.net"
                  className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-3 text-xs uppercase text-white placeholder-white/20 focus:outline-none focus:border-gold transition-colors duration-300"
                />
              </div>

              <div>
                <label className="text-[9px] uppercase tracking-[2px] text-gold font-bold block mb-2">PORTFOLIO / GITHUB LINK</label>
                <input
                  type="url"
                  required
                  placeholder="https://github.com/arya"
                  className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-3 text-xs text-white placeholder-white/20 focus:outline-none focus:border-gold transition-colors duration-300"
                />
              </div>

              <div>
                <label className="text-[9px] uppercase tracking-[2px] text-gold font-bold block mb-2">WHY JOIN TECH MASTER?</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Briefly tell us how you want to contribute to the education space."
                  className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-3 text-xs text-white placeholder-white/20 focus:outline-none focus:border-gold transition-colors duration-300"
                />
              </div>

              <div>
                <label className="text-[9px] uppercase tracking-[2px] text-gold font-bold block mb-2">UPLOAD RESUME (PDF/DOC)</label>
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  required
                  className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-3 text-xs text-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-[9px] file:uppercase file:tracking-[1px] file:font-bold file:bg-gold file:text-black hover:file:bg-gold/80 transition-colors duration-300 cursor-pointer"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-gold hover:bg-gold-light text-black font-bold uppercase text-xs tracking-[2px] rounded-xl flex items-center justify-center gap-2 transition-colors duration-300"
                data-cursor="submit"
              >
                Send Application
                <Send className="w-4 h-4" />
              </button>
            </form>
          )}
        </div>
      </section>

      {/* Culture & Benefits */}
      <section className="max-w-7xl mx-auto mt-16 mb-24 relative z-10 text-left">
        <div className="text-center mb-16">
          <p className="text-[10px] uppercase tracking-[6px] text-gold font-bold mb-4">OUR DNA</p>
          <h2 className="font-serif text-3xl sm:text-5xl font-light text-white mb-6">
            Culture & <span className="text-gold italic font-bold">Benefits</span>
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="glass-panel p-8 rounded-3xl border-t border-white/5 hover:border-gold/30 transition-all duration-300 text-center">
            <h4 className="font-serif text-xl font-bold text-white mb-3">Remote First</h4>
            <p className="text-gray-400 text-sm font-light">Work from anywhere in the world. We believe in output, not office hours.</p>
          </div>
          <div className="glass-panel p-8 rounded-3xl border-t border-white/5 hover:border-gold/30 transition-all duration-300 text-center">
            <h4 className="font-serif text-xl font-bold text-white mb-3">Learning Budget</h4>
            <p className="text-gray-400 text-sm font-light">$2,000 annual stipend for courses, books, and conference tickets.</p>
          </div>
          <div className="glass-panel p-8 rounded-3xl border-t border-white/5 hover:border-gold/30 transition-all duration-300 text-center">
            <h4 className="font-serif text-xl font-bold text-white mb-3">Health & Wellness</h4>
            <p className="text-gray-400 text-sm font-light">Premium global health coverage and mental wellness stipends.</p>
          </div>
          <div className="glass-panel p-8 rounded-3xl border-t border-white/5 hover:border-gold/30 transition-all duration-300 text-center">
            <h4 className="font-serif text-xl font-bold text-white mb-3">Creator Autonomy</h4>
            <p className="text-gray-400 text-sm font-light">Own your projects. We cultivate leaders who can drive their own vision.</p>
          </div>
        </div>
      </section>

      {/* Hiring Process */}
      <section className="max-w-5xl mx-auto mb-32 relative z-10">
        <div className="text-center mb-16">
          <p className="text-[10px] uppercase tracking-[6px] text-gold font-bold mb-4">HOW WE HIRE</p>
          <h2 className="font-serif text-3xl sm:text-5xl font-light text-white mb-6">
            The <span className="text-gold italic font-bold">Process</span>
          </h2>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-start gap-8 relative before:absolute before:top-8 before:left-8 md:before:left-0 md:before:top-12 before:w-0.5 md:before:w-full before:h-full md:before:h-0.5 before:bg-white/10">
          {[
            { step: "01", title: "Application Review", desc: "We review your portfolio, GitHub, and application answers." },
            { step: "02", title: "Intro Call", desc: "A 30-minute culture and vibe check with our ops team." },
            { step: "03", title: "Technical Task", desc: "A paid, asynchronous take-home project relevant to your role." },
            { step: "04", title: "Final Interview", desc: "A conversation with Aman and the leads. No live whiteboarding." }
          ].map((item, idx) => (
            <div key={idx} className="relative z-10 flex md:flex-col items-start md:items-center gap-6 md:gap-4 text-left md:text-center">
              <div className="w-16 h-16 rounded-full bg-[#0d0d0d] border border-gold flex items-center justify-center font-serif text-xl text-gold font-bold shrink-0 shadow-[0_0_15px_rgba(212,175,55,0.3)]">
                {item.step}
              </div>
              <div>
                <h4 className="font-bold text-white mb-2">{item.title}</h4>
                <p className="text-gray-400 text-xs font-light max-w-[200px]">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};
