import React, { useRef, useState, useEffect } from "react";
import { ArrowUpRight, Mail, Phone, MapPin } from "lucide-react";
import { Magnetic } from "../components/Magnetic";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import * as THREE from "three";
import { useData } from "../context/DataContext";

interface FooterProps {
  onChangePage: (page: string) => void;
}

// 3D Scene Component for the Footer
const MorphingTorus: React.FC = () => {
  const outerRingRef = useRef<THREE.Mesh>(null);
  const innerRingRef = useRef<THREE.Mesh>(null);
  const coreRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    
    // Rotate outer ring on two axes
    if (outerRingRef.current) {
      outerRingRef.current.rotation.x = time * 0.35;
      outerRingRef.current.rotation.y = time * 0.2;
    }
    
    // Rotate inner ring in opposite directions
    if (innerRingRef.current) {
      innerRingRef.current.rotation.y = -time * 0.45;
      innerRingRef.current.rotation.z = time * 0.3;
    }

    // Spin core slowly
    if (coreRef.current) {
      coreRef.current.rotation.y = time * 0.15;
      coreRef.current.rotation.x = Math.sin(time * 0.5) * 0.1;
    }
  });

  return (
    <group scale={1.25}>
      {/* Outer Gold Ring */}
      <mesh ref={outerRingRef}>
        <torusGeometry args={[0.7, 0.022, 16, 80]} />
        <meshStandardMaterial
          color="#D4AF37"
          metalness={0.95}
          roughness={0.15}
        />
      </mesh>

      {/* Inner Cyan/Electric Blue Ring */}
      <mesh ref={innerRingRef}>
        <torusGeometry args={[0.45, 0.016, 16, 80]} />
        <meshStandardMaterial
          color="#00E5FF"
          metalness={0.9}
          roughness={0.2}
        />
      </mesh>

      {/* Center Glass Sphere */}
      <mesh ref={coreRef}>
        <sphereGeometry args={[0.22, 32, 32]} />
        <meshPhysicalMaterial
          color="#ffffff"
          roughness={0.02}
          transmission={1.0}
          thickness={0.5}
          ior={1.4}
          transparent
          opacity={0.9}
        />
      </mesh>
    </group>
  );
};

// Custom Particle Emitter Component inside the footer
const ParticleCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const particles: Array<{
      x: number;
      y: number;
      size: number;
      speedY: number;
      opacity: number;
    }> = [];

    // Initialize particles
    for (let i = 0; i < 40; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 2 + 0.5,
        speedY: -Math.random() * 0.5 - 0.1,
        opacity: Math.random() * 0.5 + 0.1,
      });
    }

    const handleResize = () => {
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener("resize", handleResize);

    // Emitter Loop
    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = "rgba(212, 175, 55, 0.4)";

      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.globalAlpha = p.opacity;
        ctx.fill();

        // Update position
        p.y += p.speedY;

        // Reset particles at top boundary
        if (p.y < 0) {
          p.y = height;
          p.x = Math.random() * width;
        }
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none opacity-40 z-0" />;
};

// Animated 3D Contact Card Component
interface ContactCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  href?: string;
  accent: string;
}

const ContactCard: React.FC<ContactCardProps> = ({ icon, label, value, href, accent }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [10, -10]), { damping: 20, stiffness: 200 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-10, 10]), { damping: 20, stiffness: 200 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const relX = (e.clientX - rect.left) / rect.width - 0.5;
    const relY = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(relX);
    y.set(relY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const Content = (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      data-cursor="none"
      style={{ rotateX, rotateY, perspective: 800 }}
      className="group glass-panel p-3 md:p-4 rounded-2xl flex flex-col xl:flex-row items-center xl:items-start gap-3 hover:border-white/20 transition-all duration-300 select-none cursor-pointer text-center xl:text-left"
      whileHover={{ scale: 1.02 }}
    >
      <div 
        className="w-10 h-10 shrink-0 rounded-xl bg-white/5 border flex items-center justify-center transition-colors duration-300"
        style={{ color: accent, borderColor: accent + "30" }}
      >
        {icon}
      </div>
      <div className="w-full overflow-hidden">
        <span className="text-[9px] uppercase tracking-[1px] opacity-40 block mb-0.5">{label}</span>
        <span className="text-xs font-bold text-white transition-all duration-300 group-hover:text-gold block truncate group-hover:whitespace-normal group-hover:break-words w-full" title={value}>
          {value}
        </span>
      </div>
    </motion.div>
  );

  return href ? (
    <a href={href} target="_blank" rel="noopener noreferrer">
      {Content}
    </a>
  ) : (
    Content
  );
};

export const Footer: React.FC<FooterProps> = ({ onChangePage }) => {
  const { dbData, websiteSettings, contactData } = useData();
  const footerRef = useRef<HTMLElement>(null);
  const [mouseGlow, setMouseGlow] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!footerRef.current) return;
    const rect = footerRef.current.getBoundingClientRect();
    setMouseGlow({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleNavClick = (pageId: string) => {
    if (pageId === "privacy") {
      window.dispatchEvent(new CustomEvent("open-privacy-modal"));
    } else if (pageId === "terms") {
      window.dispatchEvent(new CustomEvent("open-terms-modal"));
    } else {
      onChangePage(pageId);
    }
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Inquiry successfully logged in sandbox environment.");
  };

  return (
    <footer 
      ref={footerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative bg-gradient-to-b from-black via-[#060606] to-black border-t border-white/10 pt-16 pb-12 px-6 sm:px-10 md:px-16 lg:px-20 overflow-hidden text-left"
    >
      {/* Interactive Mouse Glow Spotlight */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-700 z-0"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(500px circle at ${mouseGlow.x}px ${mouseGlow.y}px, rgba(212, 175, 55, 0.07), transparent 70%)`,
        }}
      />

      {/* HTML5 Particle Canvas */}
      <ParticleCanvas />

      {/* Ambient Rotating Background Glow */}
      <div className="absolute bottom-[-120px] right-[-100px] w-[500px] h-[500px] aurora-glow-purple opacity-15 pointer-events-none blur-[120px] animate-pulse" />

      {/* Main 12-Column Footer Grid Layout */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 relative z-10 mb-12">
        
        {/* LEFT SIDE (lg:col-span-4): Newsletter & Branding */}
        <div className="lg:col-span-4 flex flex-col justify-between gap-8">
          <div>
            <div className="inline-block mb-4">
              <span className="text-[10px] font-mono tracking-[3px] text-gold uppercase px-3 py-1 rounded-full bg-gold/10 border border-gold/25">
                CREATOR PLATFORM
              </span>
            </div>
            <h2 className="font-sans text-3xl sm:text-4xl lg:text-5xl font-light text-white leading-snug tracking-tight mb-4">
              Let's create the <br />
              <span className="text-gold italic font-bold">future of code</span>.
            </h2>
            <p className="text-gray-400 text-xs sm:text-sm font-light max-w-sm leading-relaxed">
              Subscribe to Aman's newsletter. Receive exclusive design mockups, platform beta keys, systems tips, and speaking logs.
            </p>
          </div>

          <form onSubmit={handleSubscribe} className="relative w-full max-w-md">
            <div className="relative flex items-center">
              <input
                type="email"
                required
                placeholder="ENTER EMAIL"
                className="w-full bg-black/70 border border-white/15 rounded-full pl-5 pr-36 py-3.5 text-xs font-mono tracking-widest uppercase text-white placeholder-gray-500 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold/50 transition-all duration-300 backdrop-blur-md"
              />
              <button
                type="submit"
                className="absolute right-1.5 top-1.5 bottom-1.5 bg-gradient-to-r from-gold to-gold-light hover:brightness-110 text-black font-bold uppercase text-[10px] tracking-widest px-4 rounded-full flex items-center gap-1.5 transition-all duration-300 shadow-md"
                data-cursor="submit"
              >
                Subscribe
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </form>
        </div>

        {/* CENTER SIDE (lg:col-span-5): 3 Sitemap Columns */}
        <div className="lg:col-span-5 grid grid-cols-2 sm:grid-cols-3 gap-6 sm:gap-8">
          
          {/* Column 1: Identity */}
          <div>
            <p className="text-[10px] uppercase tracking-[3px] text-gold font-mono font-bold mb-5 block">IDENTITY</p>
            <ul className="flex flex-col gap-2">
              {(dbData?.navigation?.identityItems || [
                { name: "About Founder", id: "about" },
                { name: "Founder's Journey", id: "journey" },
                { name: "Mission & Vision", id: "mission" },
                { name: "What We Do", id: "what-we-do" },
              ]).map((link: any) => (
                <li key={link.id}>
                  <button
                    onClick={() => handleNavClick(link.id)}
                    className="text-xs uppercase tracking-wider text-gray-400 hover:text-gold transition-colors duration-200 text-left font-light block"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2: Engagement */}
          <div>
            <p className="text-[10px] uppercase tracking-[3px] text-gold font-mono font-bold mb-5 block">ENGAGEMENT</p>
            <ul className="flex flex-col gap-2">
              {(dbData?.navigation?.engagementItems || [
                { name: "Brand Collabs", id: "collaborations" },
                { name: "Campaigns", id: "campaigns" },
                { name: "Product Launches", id: "product-launches" },
                { name: "Events & Talks", id: "events" },
                { name: "Student Work", id: "portfolio" },
                { name: "Media Gallery", id: "gallery" },
              ]).map((link: any) => (
                <li key={link.id}>
                  <button
                    onClick={() => handleNavClick(link.id)}
                    className="text-xs uppercase tracking-wider text-gray-400 hover:text-gold transition-colors duration-200 text-left font-light block"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Quick Links */}
          <div>
            <p className="text-[10px] uppercase tracking-[3px] text-gold font-mono font-bold mb-5 block">QUICK LINKS</p>
            <ul className="flex flex-col gap-2">
              {(dbData?.navigation?.quickLinksItems || [
                { name: "Core Services", id: "services" },
                { name: "Testimonials", id: "testimonials" },
                { name: "FAQ Portal", id: "faq" },
                { name: "Contact Page", id: "contact" },
                { name: "Privacy Policy", id: "privacy" },
                { name: "Terms of Service", id: "terms" },
              ]).map((link: any) => (
                <li key={link.id}>
                  <button
                    onClick={() => handleNavClick(link.id)}
                    className="text-xs uppercase tracking-wider text-gray-400 hover:text-gold transition-colors duration-200 text-left font-light block"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* RIGHT SIDE (lg:col-span-3): Unified Luxury Contact & 3D Spatial Panel */}
        <div className="lg:col-span-3 flex flex-col gap-4">
          <div className="glass-panel p-5 rounded-3xl border border-white/10 bg-black/60 backdrop-blur-xl flex flex-col gap-4 shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
            
            {/* 3D Scene Viewport */}
            <div className="h-40 w-full rounded-2xl border border-white/10 overflow-hidden relative glass-panel bg-black/40 flex items-center justify-center">
              <div className="absolute inset-0 z-0">
                <Canvas camera={{ position: [0, 0, 3], fov: 45 }} gl={{ antialias: true, alpha: true }}>
                  <ambientLight intensity={0.6} />
                  <directionalLight position={[2, 2, 2]} intensity={1.5} color="#ffffff" />
                  <pointLight position={[-2, -2, 2]} intensity={2.0} color="#aa3bff" />
                  <MorphingTorus />
                  <Environment preset="studio" />
                </Canvas>
              </div>
              <div className="absolute bottom-3 left-3 z-10 pointer-events-none">
                <span className="text-[8px] font-mono tracking-widest text-gold uppercase bg-black/80 px-2 py-0.5 rounded border border-gold/30">
                  3D Spatial Node
                </span>
              </div>
            </div>

            {/* Contact Panel Cards */}
            <div className="flex flex-col gap-2.5">
              <ContactCard
                icon={<Mail className="w-3.5 h-3.5" />}
                label="DIRECT MAIL"
                value={contactData?.heroSetup?.email || websiteSettings?.email || "hello@techmaster.com"}
                href={`mailto:${contactData?.heroSetup?.email || websiteSettings?.email || ""}`}
                accent="#D4AF37"
              />
              <ContactCard
                icon={<Phone className="w-3.5 h-3.5" />}
                label="BOOKING OFFICE"
                value={contactData?.heroSetup?.phone || websiteSettings?.phone || "+1 (800) 555-CODE"}
                href={`tel:${contactData?.heroSetup?.phone || websiteSettings?.phone || ""}`}
                accent="#00E5FF"
              />
              <ContactCard
                icon={<MapPin className="w-3.5 h-3.5" />}
                label="CREATOR HQ"
                value={websiteSettings?.address || "Silicon Valley Creator Labs, Suite 40"}
                href={websiteSettings?.googleMapsUrl}
                accent="#aa3bff"
              />
            </div>
          </div>
        </div>

      </div>

      {/* Footer Bottom copyright and social handles */}
      <div className="max-w-7xl mx-auto pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6 relative z-10">
        <div className="text-left">
          <p className="text-[10px] uppercase tracking-[2px] text-gray-300 font-light">
            &copy; {new Date().getFullYear()} {websiteSettings?.copyrightText || websiteSettings?.companyName || "TECH MASTER MEDIA & CREATIVE LABS"}. ALL RIGHTS RESERVED.
          </p>
          <p className="text-[9px] uppercase tracking-[1px] text-gray-500 mt-1">
            Designed and developed by .......
          </p>
        </div>

        {/* Floating Magnetic Social Icons */}
        <div className="flex gap-3.5">
          {[
            { 
              // YouTube
              icon: (
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.11C19.517 3.545 12 3.545 12 3.545s-7.517 0-9.388.508a3.003 3.003 0 0 0-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 0 0 2.11 2.11c1.871.508 9.388.508 9.388.508s7.517 0 9.388-.508a3.003 3.003 0 0 0 2.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              ), 
              href: "https://youtube.com/c/techmasterf" 
            },
            { 
              // LinkedIn
              icon: (
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              ), 
              href: "https://linkedin.com/in/techmasterf" 
            },
            { 
              // Instagram
              icon: (
                <svg className="w-4 h-4 fill-none stroke-current" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              ), 
              href: "https://instagram.com/techmasterf" 
            },
            { 
              // Facebook
              icon: (
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                </svg>
              ), 
              href: "https://facebook.com/techmasterf" 
            },
            { 
              // GitHub
              icon: (
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              ), 
              href: "https://github.com/techmasterf" 
            },
            { 
              // Twitter/X
              icon: (
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              ), 
              href: "https://twitter.com/techmasterf" 
            },
          ].map((soc, idx) => (
            <Magnetic key={idx} strength={0.3}>
              <motion.a
                href={soc.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full border border-white/10 hover:border-gold/50 flex items-center justify-center text-gray-400 hover:text-gold bg-white/5 transition-all duration-300 shadow-sm"
                animate={{ y: [0, -4, 0] }}
                transition={{
                  repeat: Infinity,
                  duration: 4,
                  delay: idx * 0.5,
                  ease: "easeInOut",
                }}
              >
                {soc.icon}
              </motion.a>
            </Magnetic>
          ))}
        </div>
      </div>
    </footer>
  );
};
