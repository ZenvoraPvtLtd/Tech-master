import React from "react";
import { motion } from "framer-motion";
import { useData } from "../context/DataContext";
import { mediaUrl } from "../utils/media";
import { LuxuryCard } from "../components/LuxuryCard";
import { Globe } from "lucide-react";

import { AnimatedCounter } from "../components/AnimatedCounter";

const Linkedin = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
);

const Twitter = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
);

const Instagram = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
);

export const About: React.FC = () => {
  const { aboutData } = useData();
  
  if (!aboutData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#060606]">
        <p className="text-gold font-mono uppercase tracking-[3px] text-xs">Loading Content...</p>
      </div>
    );
  }

  const aboutDataAny = aboutData as any;
  const sectionSettings = aboutDataAny?.sectionSettings || {};

  // Helper: check if a section is active
  const isSectionActive = (sectionId: string) => {
    const setting = sectionSettings[sectionId];
    if (!setting) return true; // default to visible if no setting
    return setting.status === "Active";
  };

  // --- Data extraction with CMS fallbacks ---

  // Introduction
  const intro = aboutDataAny?.introduction || {};

  // Philosophy, Mission, Vision → dynamic cards
  const philosophy = aboutDataAny?.philosophy || {};
  const mission = aboutDataAny?.mission || {};
  const vision = aboutDataAny?.vision || {};

  const missionVisionCards = [
    { key: "mission", title: mission.title, desc: mission.description },
    { key: "vision", title: vision.title, desc: vision.description },
    { key: "philosophy", title: philosophy.title, desc: philosophy.description },
  ].filter(c => c.title || c.desc); // only show cards that have content

  // Story
  const story = aboutDataAny?.story || {};

  // Highlights (counters)
  const highlightsList = (aboutDataAny?.highlights || []).filter((h: any) => h.status === "Active");

  // Experience
  const experiencesList = (aboutDataAny?.experience || []).filter((e: any) => e.status === "Active");

  // Achievements
  const achievementsList = (aboutDataAny?.achievements || []).filter((a: any) => a.status === "Active");

  // Awards
  const awardsList = (aboutDataAny?.awards || []).filter((a: any) => a.status === "Active");

  // Future Goals
  const futureGoals = aboutDataAny?.futureGoals || {};

  // Team
  const teamList = (aboutDataAny?.team || []).filter((t: any) => t.status === "Active" || !t.status);

  const getYear = (dateStr: string) => {
    if (!dateStr) return "";
    if (dateStr.length >= 4) return dateStr.substring(0, 4);
    return dateStr;
  };

  return (
    <div className="relative text-white min-h-screen pt-32 pb-24 px-6 overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-1/4 left-1/3 w-[30vw] h-[30vw] aurora-glow-purple opacity-20 pointer-events-none -translate-x-1/2" />
      <div className="absolute bottom-1/4 right-1/4 w-[35vw] h-[35vw] aurora-glow-gold opacity-10 pointer-events-none translate-x-1/2" />

      {/* 1. Introduction / Hero */}
      {isSectionActive("introduction") && (
        <section className="max-w-7xl mx-auto text-left mb-24 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="typo-badge mb-4"
          >
            {intro.subtitle || "FOUNDER IDENTITY"}
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, delay: 0.2 }}
            className="typo-h1 mb-8"
          >
            {intro.founderName || ""} <br />
            <span className="text-gold italic font-bold">{intro.designation || ""}</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, delay: 0.4 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-12 pt-12 border-t border-white/5"
          >
            <div>
              <p className="text-gray-400 font-light text-base md:text-lg leading-relaxed mb-4">
                {intro.shortDescription || ""}
              </p>
              {intro.fullBiography && (
                <p className="text-gray-500 font-light text-sm leading-relaxed">
                  {intro.fullBiography}
                </p>
              )}
              {intro.buttonVisible && intro.ctaButtonText && (
                <a
                  href={intro.ctaButtonLink || "#"}
                  target={intro.openInNewTab ? "_blank" : "_self"}
                  rel={intro.openInNewTab ? "noopener noreferrer" : undefined}
                  className="inline-flex items-center gap-2 mt-6 text-xs uppercase tracking-[2px] text-gold hover:text-white transition-colors duration-300 font-bold"
                >
                  {intro.ctaButtonText}
                </a>
              )}
            </div>
            <div className="glass-panel p-8 rounded-3xl relative hover:border-gold/30 transition-all duration-300 flex flex-col justify-center">
              {intro.profileImageUrl && (
                <img
                  src={mediaUrl(intro.profileImageUrl) || mediaUrl(intro.image)}
                  alt={intro.imageAltText || intro.founderName || "Profile"}
                  className="w-24 h-24 rounded-full object-cover border-2 border-gold/30 mb-4"
                />
              )}
              <h3 className="font-serif text-xl font-bold text-white mb-3">
                {philosophy.title || ""}
              </h3>
              <p className="text-gray-400 text-xs leading-relaxed font-light font-sans">
                {philosophy.description || ""}
              </p>
            </div>
          </motion.div>
        </section>
      )}

      {/* 2. Dynamic Highlights / Statistics */}
      {isSectionActive("highlights") && highlightsList.length > 0 && (
        <section className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-8 mb-32 text-left relative z-10">
          {highlightsList.map((cred: any, idx: number) => (
            <div key={cred.id || idx} className="glass-panel p-6 rounded-2xl border-t border-white/5">
              <AnimatedCounter 
                value={`${cred.prefix || ""}${cred.number}${cred.suffix || ""}`} 
                className="font-serif text-3xl font-black text-gold block mb-1"
              />
              <span className="text-gray-400 text-[10px] uppercase tracking-[1px] font-mono">
                {cred.label || ""}
              </span>
            </div>
          ))}
        </section>
      )}

      {/* 3. Mission, Vision & Philosophy Cards */}
      {missionVisionCards.length > 0 && (
        <section className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 mb-32 text-left relative z-10">
          {missionVisionCards.map((item) => (
            isSectionActive(item.key) && (
              <div key={item.key} className="glass-panel p-8 rounded-3xl relative hover:border-gold/30 transition-all duration-300">
                <h3 className="font-serif text-xl font-bold text-white mb-3">{item.title || ""}</h3>
                <p className="text-gray-400 text-xs leading-relaxed font-light">{item.desc || ""}</p>
              </div>
            )
          ))}
        </section>
      )}

      {/* 4. Story & Passion */}
      {isSectionActive("story") && (story.title || story.description) && (
        <section className="max-w-7xl mx-auto mb-32 text-left relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="typo-badge mb-4">
                {story.subtitle || "THE JOURNEY"}
              </p>
              <h2 className="typo-h2 mb-6">
                {story.title ? (
                  <>
                    {story.title.split(" ").slice(0, -2).join(" ")}{" "}
                    <span className="text-gold italic font-bold">
                      {story.title.split(" ").slice(-2).join(" ")}
                    </span>
                  </>
                ) : (
                  <>Our <span className="text-gold italic font-bold">Story & Passion</span></>
                )}
              </h2>
              <p className="text-gray-400 font-light text-base leading-relaxed">
                {story.description || ""}
              </p>
            </div>
            <div className="glass-panel p-8 rounded-3xl relative">
              <img
                src={mediaUrl(story.imageUrl) || mediaUrl(story.image) || "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=800&q=80"}
                alt={story.title || "Our story"}
                className="w-full h-auto rounded-xl object-cover"
              />
            </div>
          </div>
        </section>
      )}

      {/* 5. Professional Background & Experience */}
      {isSectionActive("experience") && experiencesList.length > 0 && (
        <section className="max-w-7xl mx-auto mb-32 text-left relative z-10">
          <div className="text-center mb-16">
            <p className="typo-badge mb-4">EXPERTISE</p>
            <h2 className="typo-h2">
              Professional <span className="text-gold italic font-bold">Background & Experience</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {experiencesList.map((exp: any) => (
              <div key={exp.id || exp._id} className="glass-panel p-8 rounded-3xl border-l-4 border-gold/50">
                <div className="flex items-start gap-4">
                  {mediaUrl(exp.logoUrl) && (
                    <img src={mediaUrl(exp.logoUrl)} alt={exp.companyName} className="w-12 h-12 rounded-lg object-cover border border-white/10 flex-shrink-0" />
                  )}
                  <div>
                    <h3 className="font-serif text-2xl text-white mb-2">{exp.designation || ""} at {exp.companyName || ""}</h3>
                    <span className="text-gold text-xs font-mono mb-4 block">
                      {getYear(exp.startDate)} - {getYear(exp.endDate)}
                      {exp.location ? ` \u2022 ${exp.location}` : ""}
                    </span>
                    <p className="typo-card-desc">
                      {exp.description || ""}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 6. Achievements & Awards */}
      {isSectionActive("achievements") && (achievementsList.length > 0 || awardsList.length > 0) && (
        <section className="max-w-7xl mx-auto mb-32 text-left relative z-10">
          <div className="glass-panel p-12 rounded-3xl border border-white/5">
            <div className="mb-12 text-center md:text-left">
               <p className="typo-badge mb-4">RECOGNITION</p>
               <h2 className="typo-h2">
                 Achievements <span className="text-gold italic font-bold">& Awards</span>
               </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {achievementsList.map((ach: any) => (
                <div key={ach.id || ach._id} className="text-center">
                  {ach.iconUrl && <span className="text-3xl block mb-2">{ach.iconUrl}</span>}
                  <h4 className="text-white font-bold mb-2">{ach.title || ""}</h4>
                  <p className="text-gray-400 text-xs font-light">
                    {ach.description || ""} {ach.year ? `(${ach.year})` : ""}
                  </p>
                </div>
              ))}
              {awardsList.map((aw: any) => (
                <div key={aw.id || aw._id} className="text-center">
                  {aw.imageUrl && <span className="text-3xl block mb-2">{aw.imageUrl}</span>}
                  <h4 className="text-white font-bold mb-2">{aw.name || ""}</h4>
                  <p className="text-gray-400 text-xs font-light">
                    {aw.organization || ""} {aw.year ? `(${aw.year})` : ""}
                  </p>
                  {aw.description && <p className="text-gray-500 text-xs font-light mt-1">{aw.description}</p>}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 7. Future Goals */}
      {isSectionActive("futureGoals") && (futureGoals.title || futureGoals.primaryDescription) && (
        <section className="max-w-7xl mx-auto mb-32 text-center relative z-10">
          <p className="typo-badge mb-4">
            {futureGoals.tag || "LOOKING AHEAD"}
          </p>
          <h2 className="typo-h2 mb-8">
            {futureGoals.title ? (
              <>
                {futureGoals.title.split(" ").slice(0, -1).join(" ")}{" "}
                <span className="text-gold italic font-bold">
                  {futureGoals.title.split(" ").slice(-1).join(" ")}
                </span>
              </>
            ) : (
              <>Future <span className="text-gold italic font-bold">Goals</span></>
            )}
          </h2>
          <div className="glass-panel p-10 rounded-3xl max-w-4xl mx-auto border-t-2 border-gold/50">
            <p className="text-gray-300 font-light text-lg leading-relaxed mb-6">
              {futureGoals.primaryDescription || ""}
            </p>
            {futureGoals.secondaryDescription && (
              <p className="text-gray-400 font-light text-sm leading-relaxed">
                {futureGoals.secondaryDescription}
              </p>
            )}
          </div>
        </section>
      )}

      {/* 8. Core Collaborators Section */}
      {aboutDataAny?.coreCollaborators?.enableSection !== false && (aboutDataAny?.coreCollaborators?.list?.length > 0 || teamList.length > 0) && (
        <section className="max-w-7xl mx-auto text-left relative z-10" style={{
          backgroundImage: aboutDataAny?.coreCollaborators?.backgroundImage ? `url(${mediaUrl(aboutDataAny?.coreCollaborators?.backgroundImage)})` : 'none',
          backgroundSize: 'cover', backgroundPosition: 'center'
        }}>
          <div className="mb-16">
            <p className="typo-badge mb-4">{aboutDataAny?.coreCollaborators?.smallHeading || aboutDataAny?.coreCollaborators?.sectionTag || "PRODUCTION TEAM"}</p>
            <h2 className="typo-h2">
              {aboutDataAny?.coreCollaborators?.mainHeading || "Core"} <span className="text-gold italic font-bold">{aboutDataAny?.coreCollaborators?.highlightHeading || "Collaborators"}</span>
            </h2>
            {aboutDataAny?.coreCollaborators?.description && (
              <p className="text-gray-400 font-light text-sm mt-4 max-w-2xl leading-relaxed">
                {aboutDataAny.coreCollaborators.description}
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {(aboutDataAny?.coreCollaborators?.list?.length > 0 ? aboutDataAny.coreCollaborators.list : teamList).map((member: any, idx: number) => (
              <LuxuryCard key={member.id || idx} accentColor="#D4AF37" index={idx}>
                <div className="aspect-square w-full overflow-hidden relative border-b border-white/5 mb-6 rounded-2xl group">
                  <img
                    src={mediaUrl(member.image) || mediaUrl(member.avatar) || mediaUrl(member.imageUrl) || ""}
                    alt={member.name || "Team member"}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* Social Links Overlay on Hover */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end items-center pb-6">
                    <div className="flex items-center gap-3">
                      {member.linkedin && <a href={member.linkedin} target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-white/10 hover:bg-gold hover:text-black text-white flex items-center justify-center transition-colors"><Linkedin className="w-4 h-4" /></a>}
                      {member.twitter && <a href={member.twitter} target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-white/10 hover:bg-gold hover:text-black text-white flex items-center justify-center transition-colors"><Twitter className="w-4 h-4" /></a>}
                      {member.instagram && <a href={member.instagram} target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-white/10 hover:bg-gold hover:text-black text-white flex items-center justify-center transition-colors"><Instagram className="w-4 h-4" /></a>}
                      {member.website && <a href={member.website} target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-white/10 hover:bg-gold hover:text-black text-white flex items-center justify-center transition-colors"><Globe className="w-4 h-4" /></a>}
                    </div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-start mb-1">
                    <span className="text-[9px] uppercase tracking-[2px] text-gold font-mono block">{member.role || ""}</span>
                    {member.company && <span className="text-[9px] uppercase tracking-[1px] text-gray-500 font-mono block text-right max-w-[50%] truncate" title={member.company}>{member.company}</span>}
                  </div>
                  <h4 className="font-serif text-lg font-bold text-white mb-3">{member.name || ""}</h4>
                  <p className="text-gray-400 text-xs leading-relaxed font-light">{member.description || member.bio || ""}</p>
                </div>
              </LuxuryCard>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
