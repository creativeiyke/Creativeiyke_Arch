
import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion, useScroll, useTransform, AnimatePresence, useSpring, useMotionValue, useTime, useInView } from 'framer-motion';
import { 
  ArrowRight, 
  ArrowLeft,
  ArrowUpRight,
  Globe,
  Search,
  Code2,
  Workflow,
  BarChart3,
  Zap,
  Layers,
  Cpu,
  Shield,
  Terminal,
  MousePointer2,
  Send,
  Plus,
  Crosshair,
  Aperture,
  Hexagon,
  Power,
  Play,
  Monitor,
  Disc,
  Database,
  Network,
  Lock,
  Check,
  Image as ImageIcon,
  Download,
  Maximize2,
  RefreshCw,
  X,
  Activity,
  Sparkles,
  ScanEye,
  Phone,
  AlertTriangle,
  ChevronRight,
  ChevronLeft,
  Briefcase,
  Target,
  User,
  CreditCard,
  FileText,
  Clock,
  Hash,
  Building,
  Menu
} from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import { PROJECTS, STEPS, SECTORS, PERFORMANCE_METRICS, BLOG_POSTS } from './constants';
import { PageId, Step, BlogPost } from './types';

// Added pr-2 to prevent last character clipping on some browsers
const GRADIENT_TEXT = "text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-neon-purple pr-2";

// --- Cybernetic Brand Components ---

const CyberLogo = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#00F0FF" />
        <stop offset="100%" stopColor="#7000FF" />
      </linearGradient>
    </defs>
    <path d="M10 30 L30 10 H90 L90 70 L70 90 H10 V30 Z" stroke="url(#logoGradient)" strokeWidth="3" fill="none" />
    <rect x="35" y="35" width="30" height="30" fill="url(#logoGradient)" opacity="0.8" />
    <path d="M90 30 H100 M90 70 H100 M30 10 V0 M70 10 V0" stroke="white" strokeWidth="1" opacity="0.5" />
    <circle cx="50" cy="50" r="3" fill="white" />
  </svg>
);

const TargetingCursor = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    // Check for touch device
    if (window.matchMedia("(pointer: coarse)").matches) {
        setIsTouch(true);
        return;
    }

    const handleMouseMove = (e: MouseEvent) => setMousePos({ x: e.clientX, y: e.clientY });
    const handleHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      setIsHovering(!!target.closest('button, a, .interactive, input, textarea, select, label'));
    };
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleHover);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleHover);
    };
  }, []);

  if (isTouch) return null;

  return (
    <>
      <motion.div 
        className="fixed top-0 left-0 w-12 h-12 pointer-events-none z-[9999] hidden lg:flex items-center justify-center mix-blend-exclusion"
        animate={{ 
          x: mousePos.x - 24, 
          y: mousePos.y - 24,
          scale: isHovering ? 1.8 : 1,
          rotate: isHovering ? 90 : 0,
          borderColor: isHovering ? '#00F0FF' : 'white'
        }}
        transition={{ type: 'spring', damping: 25, stiffness: 400, mass: 0.1 }}
      >
         <div className={`absolute inset-0 border-2 rounded-full transition-colors duration-200 ${isHovering ? 'border-neon-blue' : 'border-white'}`} />
         <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1 w-[2px] h-[6px] bg-white" />
         <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1 w-[2px] h-[6px] bg-white" />
         <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1 w-[6px] h-[2px] bg-white" />
         <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1 w-[6px] h-[2px] bg-white" />
      </motion.div>
      
      <motion.div 
        className="fixed top-0 left-0 w-2 h-2 bg-neon-pink rounded-full pointer-events-none z-[9999] hidden lg:block"
        animate={{ x: mousePos.x - 4, y: mousePos.y - 4 }}
        transition={{ duration: 0 }}
      />
    </>
  );
};

const GlitchText = ({ text, className = "" }: { text: string, className?: string }) => {
  return (
    <div className={`relative inline-block group ${className}`}>
      <span className="relative z-10">{text}</span>
      <span className="absolute top-0 left-0 -z-10 w-full h-full text-neon-pink opacity-0 group-hover:opacity-70 group-hover:animate-pulse translate-x-[3px]">{text}</span>
      <span className="absolute top-0 left-0 -z-10 w-full h-full text-neon-blue opacity-0 group-hover:opacity-70 group-hover:animate-pulse -translate-x-[3px]">{text}</span>
    </div>
  );
};

// --- System Components ---

const HUDOverlay = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-[50] p-4 md:p-8 hidden lg:block mix-blend-screen text-neon-blue font-mono text-xs font-bold uppercase tracking-widest">
       {/* Bottom Corners */}
       <div className="absolute bottom-4 md:bottom-8 left-4 md:left-8 border-l-2 border-b-2 border-white/40 w-16 md:w-24 h-16 md:h-24" />
       <div className="absolute bottom-4 md:bottom-8 right-4 md:right-8 border-r-2 border-b-2 border-white/40 w-16 md:w-24 h-16 md:h-24" />

       {/* Decorative Lines */}
       <div className="absolute top-1/2 left-0 w-8 h-[2px] bg-neon-pink" />
       <div className="absolute top-1/2 right-0 w-8 h-[2px] bg-neon-pink" />
    </div>
  );
};

interface CyberButtonProps {
  children: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  active?: boolean;
  className?: string;
  variant?: 'primary' | 'secondary' | 'outline';
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
}

const CyberButton: React.FC<CyberButtonProps> = ({ children, onClick, active = false, className = "", variant = 'secondary', disabled = false, type = "button" }) => {
  const baseClasses = "relative px-6 py-3 md:px-8 md:py-4 font-mono text-xs md:text-sm font-bold uppercase tracking-wider transition-all duration-300 group interactive overflow-hidden";
  
  const variants = {
    primary: "text-black bg-neon-blue hover:bg-white",
    secondary: "text-white bg-white/5 border border-white/10 hover:border-white/40",
    outline: "text-neon-blue border border-neon-blue/50 hover:bg-neon-blue/10"
  };

  const activeClasses = active ? "bg-white/20 border-neon-blue text-white shadow-[0_0_20px_rgba(0,240,255,0.3)]" : "";
  const disabledClasses = disabled ? "opacity-50 cursor-not-allowed pointer-events-none" : "";

  return (
    <button 
      type={type}
      onClick={onClick} 
      disabled={disabled}
      className={`${baseClasses} ${variants[variant]} ${activeClasses} ${disabledClasses} ${className} clip-corner`}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-neon-blue/0 via-white/20 to-neon-blue/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out" />
      <span className="relative z-10 flex items-center gap-3">{children}</span>
    </button>
  );
};

interface HoloCardProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  hoverColor?: string;
  layoutId?: string;
  onClick?: () => void;
}

const HoloCard: React.FC<HoloCardProps> = ({ children, className = "", delay = 0, hoverColor, layoutId, onClick }) => (
  <motion.div
    layoutId={layoutId}
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ delay, duration: 0.7, ease: "easeOut" }}
    whileHover={{ y: -10, transition: { duration: 0.3 } }}
    className={`gradient-border p-6 md:p-8 backdrop-blur-md interactive group flex flex-col relative overflow-hidden ${className}`}
    onClick={onClick}
  >
    <div className={`absolute inset-0 transition-opacity duration-500 opacity-0 group-hover:opacity-100 pointer-events-none ${hoverColor || 'bg-gradient-to-b from-white/5 to-transparent'}`} />
    {children}
  </motion.div>
);

// --- Layout Sections ---

const Header = ({ setPage, currentPage, openAIModal }: { setPage: (p: PageId) => void, currentPage: PageId, openAIModal: () => void }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { id: 'services', label: 'Matrix' },
    { id: 'industries', label: 'Sectors' },
    { id: 'process', label: 'Protocol' },
    { id: 'case-studies', label: 'Assets' },
    { id: 'insights', label: 'Insights' },
    { id: 'about', label: 'Studio' },
  ];

  return (
    <>
      <motion.header 
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${scrolled ? 'bg-obsidian/90 backdrop-blur-xl border-b border-white/10 py-3 md:py-4' : 'py-6 md:py-8'}`}
      >
        <div className="max-w-[1920px] mx-auto px-6 md:px-12 flex items-center justify-between gap-4 md:gap-8">
          <div onClick={() => { setPage('home'); setMobileMenuOpen(false); }} className="flex items-center gap-4 interactive cursor-pointer group flex-shrink-0 relative z-[110]">
            <CyberLogo className="w-10 h-10 md:w-12 md:h-12 text-white group-hover:scale-110 transition-transform duration-300" />
            <div className="flex flex-col">
              <span className="font-header text-xl md:text-2xl font-black tracking-tight text-white leading-none group-hover:text-neon-blue transition-colors whitespace-nowrap">CREATIVEIYKE</span>
              <span className="font-mono text-[8px] md:text-[10px] text-neon-purple tracking-[0.3em] font-bold mt-1 whitespace-nowrap">FUTURE_ARCH.DIV</span>
            </div>
          </div>

          <nav className="hidden xl:flex items-center gap-1 bg-black/40 p-2 rounded-none border border-white/10 backdrop-blur-md clip-corner">
            {menuItems.map((item) => (
              <CyberButton 
                key={item.id} 
                active={currentPage === item.id}
                onClick={() => setPage(item.id as PageId)}
                className="px-6 py-3 text-xs"
              >
                {item.label}
              </CyberButton>
            ))}
          </nav>

          <div className="flex items-center gap-4 md:gap-8">
            <a href="tel:+447311188777" className="hidden lg:flex items-center gap-3 group interactive">
              <div className="relative w-10 h-10 flex items-center justify-center">
                  <motion.div 
                    className="absolute inset-0 border border-t-neon-green border-r-transparent border-b-neon-green border-l-transparent rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                  />
                  <motion.div 
                    className="absolute inset-1 border border-dashed border-neon-green/40 rounded-full"
                    animate={{ rotate: -360 }}
                    transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                  />
                  <Phone size={14} className="text-neon-green fill-neon-green/20" />
              </div>
              <div className="flex flex-col">
                  <span className="font-mono text-[9px] text-neon-green font-bold tracking-[0.2em] uppercase animate-pulse">
                    System Live
                  </span>
                  <span className="font-mono text-sm font-bold text-white tracking-widest group-hover:text-neon-green transition-colors">
                    CALL_HQ
                  </span>
              </div>
            </a>

            <CyberButton variant="primary" onClick={openAIModal} className="hidden md:flex flex-shrink-0 whitespace-nowrap">
              Initialise <ArrowRight className="w-4 h-4" />
            </CyberButton>

            {/* Mobile Menu Toggle - 2048 Style */}
            <button 
              className="xl:hidden text-white hover:text-neon-blue transition-colors z-[110] p-1 group"
              onClick={() => setMobileMenuOpen(true)}
            >
               <div className="w-9 h-9 flex flex-col justify-center gap-[4px] p-1.5 border border-white/10 bg-black/50 backdrop-blur-md clip-corner group-hover:border-neon-blue/50 transition-colors">
                  <div className="flex gap-[4px] justify-center">
                      <div className="w-2.5 h-2.5 bg-white group-hover:bg-neon-blue transition-colors rounded-[1px]" />
                      <div className="w-2.5 h-2.5 bg-white/50 group-hover:bg-neon-purple transition-colors rounded-[1px]" />
                  </div>
                  <div className="flex gap-[4px] justify-center">
                      <div className="w-2.5 h-2.5 bg-white/50 group-hover:bg-neon-pink transition-colors rounded-[1px]" />
                      <div className="w-2.5 h-2.5 bg-white group-hover:bg-neon-green transition-colors rounded-[1px]" />
                  </div>
               </div>
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed inset-0 z-[150] bg-obsidian flex flex-col px-6 py-6 xl:hidden"
          >
             {/* Custom Close Header inside Menu with 2048 Style Cancel Button */}
             <div className="flex justify-between items-center mb-10 border-b border-white/10 pb-6 pt-2">
                 <div className="flex items-center gap-3">
                     <div className="w-2 h-2 bg-neon-blue rounded-full animate-pulse" />
                     <span className="font-mono text-xs text-white/60 tracking-widest uppercase">Navigation Matrix</span>
                 </div>
                 
                 <button 
                    onClick={() => setMobileMenuOpen(false)}
                    className="group flex items-center gap-3"
                 >
                     <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/40 group-hover:text-neon-pink transition-colors">Terminate</span>
                     <div className="w-10 h-10 border border-white/20 group-hover:border-neon-pink bg-white/5 group-hover:bg-neon-pink/10 transition-all flex items-center justify-center relative overflow-hidden clip-corner">
                         <div className="absolute inset-0 flex items-center justify-center transform group-hover:rotate-90 transition-transform duration-500">
                             <div className="w-[120%] h-[1px] bg-white group-hover:bg-neon-pink rotate-45 absolute" />
                             <div className="w-[120%] h-[1px] bg-white group-hover:bg-neon-pink -rotate-45 absolute" />
                         </div>
                         {/* Decorative corners for 2048 aesthetic */}
                         <div className="absolute top-0 left-0 w-1.5 h-1.5 border-t border-l border-white/40 group-hover:border-neon-pink" />
                         <div className="absolute bottom-0 right-0 w-1.5 h-1.5 border-b border-r border-white/40 group-hover:border-neon-pink" />
                     </div>
                 </button>
             </div>

             <div className="flex-1 flex flex-col gap-6 overflow-y-auto">
                {menuItems.map((item, i) => (
                  <motion.button
                    key={item.id}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    onClick={() => { setPage(item.id as PageId); setMobileMenuOpen(false); }}
                    className={`text-4xl font-black uppercase text-left group flex items-start gap-4 ${currentPage === item.id ? 'text-neon-blue' : 'text-white'}`}
                  >
                     <span className={`text-xs font-mono block tracking-widest pt-3 border-t border-transparent group-hover:border-current transition-all ${currentPage === item.id ? 'text-neon-blue border-neon-blue' : 'text-white/20 group-hover:text-white/60'}`}>0{i+1}</span>
                     <span className="group-hover:translate-x-2 transition-transform duration-300">{item.label}</span>
                  </motion.button>
                ))}
             </div>
             
             <div className="mt-8 pt-8 border-t border-white/10 space-y-6">
                <CyberButton variant="primary" onClick={() => { openAIModal(); setMobileMenuOpen(false); }} className="w-full justify-center">
                  Initialise Project
                </CyberButton>
                <div className="flex justify-between items-center text-xs font-mono text-white/40">
                   <span>BIRMINGHAM, UK</span>
                   <span>SYS.ONLINE</span>
                </div>
             </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

// --- AI Consultation Components ---

const TypewriterEffect = ({ text }: { text: string }) => {
  const [displayed, setDisplayed] = useState('');
  
  useEffect(() => {
    // Reset immediately when text changes
    setDisplayed('');
    
    if (!text) return;

    let i = 0;
    // Using a slightly slower interval for better stability
    const timer = setInterval(() => {
      if (i < text.length) {
        // Using slice ensures we always render the correct substring based on the index counter.
        // This avoids potential state update race conditions that occur with concatenation.
        setDisplayed(text.slice(0, i + 1));
        i++;
      } else {
        clearInterval(timer);
      }
    }, 20); 
    
    return () => clearInterval(timer);
  }, [text]);

  return (
    <span>
      {displayed}
      <span className="animate-pulse inline-block w-2 h-4 bg-neon-blue ml-1 align-middle"></span>
    </span>
  );
};

const HeroAIWidget = ({ initialQuery = '' }: { initialQuery?: string }) => {
  const [query, setQuery] = useState(initialQuery);
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [view, setView] = useState<'input' | 'analysis' | 'unlock' | 'processing' | 'success'>('input');
  const [submissionProgress, setSubmissionProgress] = useState(0);
  
  // Update query when initialQuery prop changes
  useEffect(() => {
      if(initialQuery) setQuery(initialQuery);
  }, [initialQuery]);

  // Unlock Flow State
  const [unlockStep, setUnlockStep] = useState(1);
  const [formData, setFormData] = useState({
    sector: '',
    scope: [] as string[],
    name: '',
    email: '',
    website: '',
    budget: '',
    customBudget: '',
    honeypot: '' // CAPTCHA - Honeypot field
  });
  const [emailHint, setEmailHint] = useState<string | null>(null);

  const runAnalysis = async () => {
    if (!query.trim()) return;
    setLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      const result = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Client Request: "${query}"\n\n[System Note: Context ID ${Date.now()}. Analyse the specific domain of this request (Design vs Tech vs Hybrid) and generate a strategic response.]`,
        config: {
          systemInstruction: `You are the Lead Solutions Architect at CreativeIyke, a high-end digital agency.

RULES:
1. **Language:** Strict British English (e.g., 'visualisation', 'optimisation', 'colour'). Tone: Professional, authoritative, human.
2. **Domain Logic:**
   - **IF Cloud/App/SaaS/High-Scale:** Recommend Google Cloud Platform (GCP) & Firebase (Cloud Run, Firestore, Vertex AI). Focus on security and infinite scale.
   - **IF Branding/Logo/Creative:** Focus on "Neuro-Aesthetics", brand psychology, and scalable design systems. Do NOT mention cloud infrastructure.
   - **IF Web/Marketing/CMS:** Advocate for bespoke performance engineering (Next.js, Headless) over generic templates. Focus on speed (Core Web Vitals) and conversion.
3. **Length:** Concise (60-80 words).
4. **MANDATORY:** Conclude by stating the full strategic breakdown is available in the "Viability Roadmap" and prompt the user to unlock it.`,
          temperature: 0.7,
        }
      });
      
      const response = await result.response;
const cleanText = response.text().trim() || "Unable to decrypt. Try again.";
      setResponse(cleanText);
      setView('analysis');

    } catch (e) {
      console.error(e);
      setResponse("SYSTEM ERROR: NEURAL LINK FAILED. PLEASE RETRY.");
      setView('analysis');
    } finally {
      setLoading(false);
    }
  };

  const handleScopeToggle = (item: string) => {
    setFormData(prev => {
      if (prev.scope.includes(item)) {
        return { ...prev, scope: prev.scope.filter(i => i !== item) };
      }
      return { ...prev, scope: [...prev.scope, item] };
    });
  };

  const checkEmail = () => {
    const freeDomains = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'aol.com', 'icloud.com'];
    const emailParts = formData.email.split('@');
    if (emailParts.length === 2 && freeDomains.includes(emailParts[1])) {
      setEmailHint("Please use your work email for faster processing.");
    } else {
      setEmailHint(null);
    }
  };

  const submitLead = () => {
    // Honeypot check
    if (formData.honeypot) {
        console.warn("Bot detected via honeypot.");
        return;
    }

    // Switch to processing view
    setView('processing');
    setSubmissionProgress(0);

    const duration = 2500; // 2.5 seconds simulation
    const intervalTime = 50;
    const totalSteps = duration / intervalTime;
    let currentStep = 0;

    const timer = setInterval(() => {
        currentStep++;
        const progress = Math.min(100, Math.round((currentStep / totalSteps) * 100));
        setSubmissionProgress(progress);

        if (currentStep >= totalSteps) {
            clearInterval(timer);
            
            // Prepare Payload
            const payload = {
                query,
                aiResponse: response,
                ...formData,
                timestamp: new Date().toISOString()
            };

            // Simulate "Trigger Email" Extension
            console.group("📧 TRIGGER EMAIL EXTENSION: SENDING LEAD");
            console.log("TO: creativeiyke@gmail.com");
            console.log("SUBJECT: New Strategic Lead from " + formData.name);
            console.log("PAYLOAD:", payload);
            console.groupEnd();

            // Delay showing success slightly for effect
            setTimeout(() => {
                setView('success');
            }, 500);
        }
    }, intervalTime);
  };

  const renderStep = () => {
    switch(unlockStep) {
        case 1: // Vision / Sector
            return (
                <div className="space-y-6">
                    <div className="text-center mb-6">
                        <h4 className="font-bold text-white uppercase text-lg">Step 1: The Vision</h4>
                        <p className="text-xs text-white/50 font-mono">Identify the Sector</p>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        {[
                            { id: 'Fintech', icon: CreditCard },
                            { id: 'SaaS', icon: Layers },
                            { id: 'HealthTech', icon: Activity },
                            { id: 'PropTech', icon: Building },
                            { id: 'Other', icon: Globe },
                        ].map((s) => (
                            <button
                                key={s.id}
                                onClick={() => { setFormData({...formData, sector: s.id}); setUnlockStep(2); }}
                                className={`p-4 border bg-white/5 hover:bg-white/10 transition-all flex flex-col items-center gap-2 group ${formData.sector === s.id ? 'border-neon-blue text-white' : 'border-white/10 text-white/60'}`}
                            >
                                <s.icon className={`w-6 h-6 ${formData.sector === s.id ? 'text-neon-blue' : 'text-white/40 group-hover:text-white'}`} />
                                <span className="text-xs font-mono uppercase tracking-widest">{s.id}</span>
                            </button>
                        ))}
                    </div>
                </div>
            );
        case 2: // Scope / Need
            return (
                <div className="space-y-6">
                    <div className="text-center mb-6">
                        <h4 className="font-bold text-white uppercase text-lg">Step 2: The Scope</h4>
                        <p className="text-xs text-white/50 font-mono">Identify the Need</p>
                    </div>
                    <div className="grid grid-cols-1 gap-3">
                        {['New MVP', 'Product Scaling', 'UX Audit', 'Full Design'].map((item) => (
                            <button
                                key={item}
                                onClick={() => handleScopeToggle(item)}
                                className={`p-4 border text-left flex items-center justify-between transition-all ${formData.scope.includes(item) ? 'bg-neon-blue/10 border-neon-blue text-white' : 'bg-white/5 border-white/10 text-white/60 hover:border-white/30'}`}
                            >
                                <span className="font-mono text-sm uppercase">{item}</span>
                                {formData.scope.includes(item) && <Check size={16} className="text-neon-blue" />}
                            </button>
                        ))}
                    </div>
                    <CyberButton 
                        variant="primary" 
                        onClick={() => setUnlockStep(3)} 
                        disabled={formData.scope.length === 0}
                        className="w-full justify-center"
                    >
                        Next Step
                    </CyberButton>
                </div>
            );
        case 3: // Details / Person
            return (
                <div className="space-y-6">
                    <div className="text-center mb-6">
                        <h4 className="font-bold text-white uppercase text-lg">Step 3: The Details</h4>
                        <p className="text-xs text-white/50 font-mono">Identify the Person</p>
                    </div>
                    <div className="space-y-4">
                        <input 
                            type="text" 
                            placeholder="Full Name"
                            value={formData.name}
                            onChange={e => setFormData({...formData, name: e.target.value})}
                            className="w-full bg-white/5 border border-white/10 p-3 text-white font-mono focus:border-neon-blue outline-none text-sm transition-all focus:bg-white/10"
                        />
                        <div className="relative">
                            <input 
                                type="email" 
                                placeholder="Work Email"
                                value={formData.email}
                                onChange={e => setFormData({...formData, email: e.target.value})}
                                onBlur={checkEmail}
                                className={`w-full bg-white/5 border p-3 text-white font-mono outline-none text-sm transition-all focus:bg-white/10 ${emailHint ? 'border-amber-500/50' : 'border-white/10 focus:border-neon-blue'}`}
                            />
                            {emailHint && (
                                <div className="flex items-center gap-2 mt-2 text-amber-500 text-[10px] font-mono uppercase">
                                    <AlertTriangle size={10} /> {emailHint}
                                </div>
                            )}
                        </div>
                        <input 
                            type="url" 
                            placeholder="Website URL (Optional)"
                            value={formData.website}
                            onChange={e => setFormData({...formData, website: e.target.value})}
                            className="w-full bg-white/5 border border-white/10 p-3 text-white font-mono focus:border-neon-blue outline-none text-sm transition-all focus:bg-white/10"
                        />
                    </div>
                    <CyberButton 
                        variant="primary" 
                        onClick={() => setUnlockStep(4)} 
                        disabled={!formData.name || !formData.email}
                        className="w-full justify-center"
                    >
                        Next Step
                    </CyberButton>
                </div>
            );
        case 4: // Budget / Qualify
            return (
                <div className="space-y-6">
                    <div className="text-center mb-6">
                        <h4 className="font-bold text-white uppercase text-lg">Step 4: The Budget</h4>
                        <p className="text-xs text-white/50 font-mono">Qualify the Lead</p>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        {['£5k-£10k', '£10k-£25k', '£25k-£50k', '£50k+'].map((b) => (
                            <button
                                key={b}
                                onClick={() => setFormData({...formData, budget: b, customBudget: ''})}
                                className={`p-3 border text-xs font-mono transition-all ${formData.budget === b ? 'bg-neon-blue text-black border-neon-blue font-bold' : 'bg-white/5 border-white/10 text-white/60 hover:bg-white/10'}`}
                            >
                                {b}
                            </button>
                        ))}
                    </div>
                    <input 
                        type="text" 
                        placeholder="Other Amount (£)"
                        value={formData.customBudget}
                        onChange={e => setFormData({...formData, customBudget: e.target.value, budget: 'Custom'})}
                        className={`w-full bg-white/5 border p-3 text-white font-mono outline-none text-sm transition-all focus:bg-white/10 ${formData.budget === 'Custom' ? 'border-neon-blue' : 'border-white/10'}`}
                    />
                    
                    {/* Honeypot Field for CAPTCHA */}
                    <input 
                        type="text" 
                        name="website_hp" 
                        style={{ display: 'none' }} 
                        value={formData.honeypot}
                        onChange={e => setFormData({...formData, honeypot: e.target.value})}
                        tabIndex={-1} 
                        autoComplete="off"
                    />

                    <CyberButton 
                        variant="primary" 
                        onClick={submitLead}
                        disabled={!formData.budget && !formData.customBudget}
                        className="w-full justify-center mt-4"
                    >
                        Unlock Roadmap
                    </CyberButton>
                </div>
            );
        default:
            return null;
    }
  };

  return (
    <div className="w-full relative z-20">
        <div className="flex items-center gap-4 mb-4">
             <div className="w-2 h-2 bg-neon-green rounded-full animate-pulse" />
             <span className="font-mono text-neon-green text-sm tracking-[0.3em] uppercase">AI Solution Architect</span>
        </div>
        
        <div className="gradient-border bg-black/60 backdrop-blur-xl p-1 rounded-none clip-corner border border-white/10 relative overflow-hidden">
             {/* Background Scanline for the widget */}
             <div className="absolute inset-0 pointer-events-none opacity-20 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))]" style={{ backgroundSize: "100% 2px, 3px 100%" }} />

             <div className="bg-black/40 p-4 md:p-8 min-h-[400px] md:min-h-[450px] flex flex-col justify-center relative z-10 transition-all duration-300">
                
                <AnimatePresence mode="wait">
                  {view === 'input' && (
                    <motion.div 
                      key="input"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="space-y-6"
                    >
                       <h3 className="text-xl md:text-3xl font-black text-white text-center uppercase">
                          Define Your <span className="text-neon-blue">Objective</span>
                       </h3>
                       
                       <p className="text-center text-white/60 font-mono text-xs md:text-sm max-w-lg mx-auto">
                          Our neural network will synthesise your requirements and generate a preliminary architectural blueprint for your system's core logic.
                       </p>

                       <textarea 
                          value={query}
                          onChange={(e) => setQuery(e.target.value)}
                          placeholder="Ex: I need a high-frequency trading platform with real-time visualisation and sub-second latency..."
                          className="w-full bg-white/5 border border-white/10 p-4 text-white font-mono focus:border-neon-blue focus:outline-none focus:bg-white/10 transition-all h-24 md:h-32 resize-none placeholder:text-white/20 text-xs md:text-sm focus:shadow-[0_0_20px_rgba(0,240,255,0.1)]"
                       />
                       
                       <div className="flex justify-center">
                          <CyberButton 
                            variant="primary" 
                            onClick={runAnalysis}
                            disabled={loading}
                            className="w-full"
                          >
                             {loading ? (
                               <span className="flex items-center justify-center gap-3">
                                 <motion.div 
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                 >
                                    <ScanEye size={18} />
                                 </motion.div>
                                 <span className="animate-pulse">Processing Architecture...</span>
                               </span>
                             ) : (
                               "Unlock Scalability Roadmap"
                             )}
                          </CyberButton>
                       </div>
                    </motion.div>
                  )}

                  {view === 'analysis' && (
                    <motion.div
                      key="analysis"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="space-y-6"
                    >
                       <div className="flex justify-between items-center border-b border-white/10 pb-4">
                          <span className="font-mono text-neon-blue text-xs uppercase tracking-widest flex items-center gap-2">
                             <Activity size={14} className="animate-pulse" /> Analysis Complete
                          </span>
                          <span className="font-mono text-white/40 text-xs">ID: {Math.random().toString(36).substr(2, 9).toUpperCase()}</span>
                       </div>
                       
                       <div className="font-mono text-xs md:text-sm text-white/90 leading-relaxed max-h-[200px] md:max-h-[220px] overflow-y-auto pr-2 custom-scrollbar border-l-2 border-neon-blue/30 pl-4 bg-white/5 py-4">
                          <TypewriterEffect text={response} />
                       </div>

                       <div className="pt-4 flex flex-col items-center gap-4">
                          <CyberButton 
                             variant="primary"
                             onClick={() => setView('unlock')}
                             className="w-full"
                          >
                             <div className="flex items-center justify-center gap-2">
                                <Lock size={16} /> Unlock Full Roadmap
                             </div>
                          </CyberButton>
                          <button 
                             onClick={() => setView('input')}
                             className="text-white/40 hover:text-white text-xs font-mono uppercase underline decoration-white/20 underline-offset-4"
                          >
                             Reset Query
                          </button>
                       </div>
                    </motion.div>
                  )}

                  {view === 'unlock' && (
                     <motion.div
                        key="unlock"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        className="space-y-4"
                     >
                        {/* Progress Bar */}
                        <div className="flex gap-1 mb-4">
                            {[1,2,3,4].map(s => (
                                <div key={s} className={`h-1 flex-1 rounded-full ${s <= unlockStep ? 'bg-neon-blue' : 'bg-white/10'}`} />
                            ))}
                        </div>

                        {renderStep()}

                        {unlockStep > 1 && (
                            <button 
                                onClick={() => setUnlockStep(prev => prev - 1)}
                                className="w-full text-center text-white/40 hover:text-white text-xs font-mono uppercase mt-4 flex items-center justify-center gap-2"
                            >
                                <ChevronLeft size={12} /> Back
                            </button>
                        )}
                        
                        <button 
                             onClick={() => { setView('input'); setUnlockStep(1); }}
                             className="w-full text-center text-white/40 hover:text-white text-xs font-mono uppercase mt-2"
                        >
                             Cancel Operation
                        </button>
                     </motion.div>
                  )}

                  {view === 'processing' && (
                     <motion.div
                        key="processing"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex flex-col items-center justify-center py-8 space-y-8 min-h-[300px]"
                     >
                        <div className="relative w-32 h-32 flex items-center justify-center">
                            {/* Animated Rings */}
                            <motion.div 
                                className="absolute inset-0 border-2 border-white/5 rounded-full"
                                animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.2, 0.5] }}
                                transition={{ duration: 2, repeat: Infinity }}
                            />
                            <motion.div 
                                className="absolute inset-2 border-2 border-t-neon-blue border-r-transparent border-b-neon-purple border-l-transparent rounded-full"
                                animate={{ rotate: 360 }}
                                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                            />
                            <motion.div 
                                className="absolute inset-4 border border-dashed border-white/20 rounded-full"
                                animate={{ rotate: -180 }}
                                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                            />
                            
                            <div className="flex flex-col items-center">
                                <span className="text-3xl font-black text-white">{submissionProgress}%</span>
                            </div>
                        </div>

                        <div className="w-full max-w-[200px] space-y-2 text-center">
                            <div className="text-[10px] font-mono text-neon-blue uppercase tracking-widest animate-pulse">
                                {submissionProgress < 40 ? "Encrypting Data" : submissionProgress < 80 ? "Establishing Link" : "Transmitting"}
                            </div>
                            <div className="h-[2px] w-full bg-white/10 overflow-hidden">
                                <motion.div 
                                    className="h-full bg-gradient-to-r from-neon-blue to-neon-purple"
                                    initial={{ width: 0 }}
                                    animate={{ width: `${submissionProgress}%` }}
                                />
                            </div>
                        </div>
                     </motion.div>
                  )}
                  
                  {view === 'success' && (
                     <motion.div
                        key="success"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex flex-col items-center justify-center text-center space-y-6 py-8"
                     >
                        <div className="w-16 h-16 border-2 border-neon-green rounded-full flex items-center justify-center relative">
                           <div className="absolute inset-0 bg-neon-green/20 rounded-full animate-ping" />
                           <Check className="w-8 h-8 text-neon-green relative z-10" />
                        </div>
                        <h3 className="text-2xl font-black text-white uppercase">Blueprint Initiated</h3>
                        <p className="text-white/60 max-w-md text-sm">
                            Following an internal review, a member of the team will contact you shortly for a 1-on-1 Strategy Call to present your Full Roadmap and validate your project's viability.
                        </p>
                        <CyberButton onClick={() => { setView('input'); setQuery(''); setUnlockStep(1); setFormData({sector:'',scope:[],name:'',email:'',website:'',budget:'',customBudget:'',honeypot:''}); }} variant="outline">
                           New Query
                        </CyberButton>
                     </motion.div>
                  )}
                </AnimatePresence>

             </div>
        </div>
    </div>
  )
}

const AIModal = ({ onClose }: { onClose: () => void }) => {
    // Lock body scroll
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => { document.body.style.overflow = ''; }
    }, []);

    return createPortal(
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6"
        >
            <div className="absolute inset-0 bg-black/90 backdrop-blur-md" onClick={onClose} />
            <motion.div 
                initial={{ scale: 0.95, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.95, opacity: 0, y: 20 }}
                className="relative z-10 w-full max-w-2xl max-h-[90vh] overflow-y-auto custom-scrollbar"
                onClick={(e) => e.stopPropagation()}
            >
                 <button 
                    onClick={onClose}
                    className="absolute top-4 right-4 z-50 p-2 text-white/50 hover:text-white bg-black/50 rounded-full backdrop-blur-md transition-colors border border-white/10 hover:border-neon-blue"
                >
                    <X size={20} />
                </button>
                <HeroAIWidget />
            </motion.div>
        </motion.div>,
        document.body
    );
};

// ... (Rest of components: HeroSection, HomePage, etc are same as before, I will skip re-declaring all of them if not changed, but per instruction I need to output full content of file.
// Since file is very large and I am an AI, I will output the FULL file content as requested.)

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center bg-obsidian overflow-hidden pt-24 md:pt-32 pb-12 md:pb-20">
      {/* Background Video Layer */}
      <div className="absolute inset-0 z-0">
        <video 
          autoPlay 
          loop 
          muted 
          playsInline
          className="w-full h-full object-cover opacity-40 grayscale contrast-125 scale-105"
        >
          <source src="https://cdn.pixabay.com/video/2019/04/20/22908-331661280_large.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-obsidian via-obsidian/80 to-obsidian" />
        <div className="absolute inset-0 cyber-grid opacity-30 mix-blend-overlay" />
      </div>

      <div className="relative z-10 w-full max-w-[1920px] mx-auto px-6 md:px-12 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* Left Column: Text */}
        <div className="flex flex-col items-start text-left">
             <motion.div 
               initial={{ opacity: 0, x: -30 }}
               animate={{ opacity: 1, x: 0 }}
               transition={{ duration: 1 }}
               className="mb-6 md:mb-8"
             >
               <span className="px-3 py-1 md:px-4 md:py-2 border border-neon-blue/30 bg-neon-blue/5 rounded-full font-mono text-neon-blue text-xs md:text-sm tracking-[0.3em] backdrop-blur-md uppercase">
                 // System Online: V.5.0
               </span>
             </motion.div>
             
             <motion.h1 
               className="font-header font-black leading-[0.85] tracking-tighter text-white mb-8 md:mb-10 w-full"
               initial={{ opacity: 0, x: -50 }}
               animate={{ opacity: 1, x: 0 }}
               transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
             >
               <div className="flex flex-col items-start">
                  <span className="text-[15vw] md:text-[12vw] lg:text-[7rem] xl:text-[9rem] bg-clip-text text-transparent bg-gradient-to-br from-white via-white to-white/50 filter drop-shadow-[0_0_30px_rgba(255,255,255,0.3)]">
                    SOLUTION
                  </span>
                  <span className={`text-[15vw] md:text-[12vw] lg:text-[7rem] xl:text-[9rem] animate-pulse-fast ${GRADIENT_TEXT}`}>
                    FIRST
                  </span>
               </div>
             </motion.h1>

             <motion.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               transition={{ delay: 0.6, duration: 1 }}
               className="flex flex-col items-start gap-8 md:gap-10 max-w-2xl"
             >
               <p className="font-body text-base md:text-xl text-white/70 leading-relaxed font-light text-left">
                 A <span className="text-neon-blue font-semibold">solution-led</span> digital studio building complete digital products, not just interfaces.
                 We engineer platforms that help businesses operate better, grow faster, and adapt confidently.
               </p>

               <div className="flex flex-col sm:flex-row gap-4 md:gap-6 w-full sm:w-auto">
                 <CyberButton variant="primary" className="w-full sm:w-64 text-center justify-center">
                   Execute Strategy
                 </CyberButton>
                 <CyberButton variant="outline" className="w-full sm:w-64 text-center justify-center">
                   View Database
                 </CyberButton>
               </div>
             </motion.div>
        </div>

        {/* Right Column: AI Widget */}
        <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="w-full max-w-xl mx-auto lg:ml-auto lg:mr-0 mt-8 lg:mt-0"
        >
            <HeroAIWidget />
        </motion.div>
      </div>
      
      {/* Decorative Bottom Elements */}
      <div className="absolute bottom-12 left-0 w-full px-12 flex justify-between items-end pointer-events-none">
         <div className="hidden md:block w-64 h-[2px] bg-gradient-to-r from-neon-blue to-transparent" />
         <div className="hidden md:block font-mono text-xs text-white/40 uppercase tracking-widest animate-bounce">
            Scroll to Decrypt
         </div>
         <div className="hidden md:block w-64 h-[2px] bg-gradient-to-l from-neon-purple to-transparent" />
      </div>
    </section>
  );
};

const HomePage: React.FC<{ setPage: (p: PageId) => void }> = ({ setPage }) => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] });
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);

  const stepStyles = [
    { 
      hoverBg: "bg-gradient-to-br from-neon-blue/30 via-neon-blue/5 to-transparent",
      hoverText: "group-hover:text-neon-blue",
      hoverIconBg: "group-hover:bg-neon-blue",
      hoverBorder: "group-hover:from-neon-blue group-hover:to-neon-purple"
    },
    { 
      hoverBg: "bg-gradient-to-br from-neon-purple/30 via-neon-purple/5 to-transparent",
      hoverText: "group-hover:text-neon-purple",
      hoverIconBg: "group-hover:bg-neon-purple",
      hoverBorder: "group-hover:from-neon-purple group-hover:to-neon-pink"
    },
    { 
      hoverBg: "bg-gradient-to-br from-neon-green/30 via-neon-green/5 to-transparent",
      hoverText: "group-hover:text-neon-green",
      hoverIconBg: "group-hover:bg-neon-green",
      hoverBorder: "group-hover:from-neon-green group-hover:to-neon-blue"
    },
    { 
      hoverBg: "bg-gradient-to-br from-neon-pink/30 via-neon-pink/5 to-transparent",
      hoverText: "group-hover:text-neon-pink",
      hoverIconBg: "group-hover:bg-neon-pink",
      hoverBorder: "group-hover:from-neon-pink group-hover:to-neon-purple"
    }
  ];

  return (
    <div className="bg-obsidian">
      <HeroSection />
      
      {/* Ticker - Increased Size */}
      <div className="border-y border-white/10 bg-black/80 backdrop-blur-sm py-4 md:py-8 overflow-hidden relative z-20">
        <motion.div 
          animate={{ x: "-50%" }}
          transition={{ duration: 25, ease: "linear", repeat: Infinity }}
          className="flex whitespace-nowrap gap-16 md:gap-32 font-mono text-sm md:text-lg font-bold text-white/80 uppercase tracking-[0.2em]"
        >
           {[...PERFORMANCE_METRICS, ...PERFORMANCE_METRICS, ...PERFORMANCE_METRICS].map((m, i) => (
             <span key={i} className="flex items-center gap-6">
               <span className="w-3 h-3 bg-neon-blue shadow-[0_0_10px_#00F0FF] rotate-45" /> 
               <span className={i % 2 === 0 ? "text-white" : "text-neon-purple"}>{m}</span>
             </span>
           ))}
        </motion.div>
      </div>

      {/* Logic Matrix (Services) */}
      <section className="py-20 md:py-48 px-6 md:px-12 max-w-[1920px] mx-auto relative">
         <div className="absolute top-0 right-0 w-[300px] md:w-[800px] h-[300px] md:h-[800px] bg-neon-purple/5 rounded-full blur-[100px] md:blur-[150px] pointer-events-none" />
         
         <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 md:mb-32 gap-8 md:gap-12 relative z-10">
            <div>
               <div className="flex items-center gap-4 text-neon-blue font-mono text-xs md:text-sm font-bold mb-4 md:mb-8 uppercase tracking-widest">
                  <Aperture size={18} /> Capability Matrix
               </div>
               <h2 className="text-5xl md:text-7xl lg:text-9xl font-black text-white uppercase tracking-tighter leading-none">
                  Logic <br />
                  <span className={GRADIENT_TEXT}>Blueprints</span>
               </h2>
            </div>
            <div className="max-w-md text-left md:text-right">
               <p className="font-body text-lg md:text-xl text-white/60 leading-relaxed mb-8">
                  System architecture designed for high-velocity deployment and infinite scaling.
               </p>
               <CyberButton variant="outline" onClick={() => setPage('services')}>Explore All Services</CyberButton>
            </div>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {STEPS.map((step, i) => {
               const style = stepStyles[i] || stepStyles[0];
               return (
                  <HoloCard key={step.id} delay={i * 0.1} hoverColor={style.hoverBg} className="min-h-[400px] md:min-h-[500px] justify-between clip-corner bg-white/5">
                     <div className="flex justify-between items-start">
                        <span className="font-mono text-4xl md:text-6xl text-white/10 font-black">0{i + 1}</span>
                        <div className={`w-10 h-10 md:w-12 md:h-12 border border-white/20 flex items-center justify-center rounded-full ${style.hoverIconBg} group-hover:text-black transition-colors duration-300`}>
                           <Plus size={20} />
                        </div>
                     </div>
                     <div>
                        <h3 className={`text-2xl md:text-4xl font-black text-white uppercase mb-4 md:mb-6 ${style.hoverText} transition-colors`}>{step.title}</h3>
                        <p className="text-white/60 text-base md:text-lg leading-relaxed">{step.description}</p>
                     </div>
                     <div className={`w-full h-[2px] bg-white/10 mt-6 md:mt-8 group-hover:bg-gradient-to-r ${style.hoverBorder} transition-all duration-500`} />
                  </HoloCard>
               );
            })}
         </div>
      </section>

      {/* Deployed Assets (Portfolio) - Immersive Parallax */}
      <section ref={containerRef} className="relative py-20 md:py-48 bg-obsidian border-t border-white/5">
         <div className="max-w-[1920px] mx-auto px-6 md:px-12 mb-16 md:mb-24 flex items-end justify-between">
            <div>
              <span className="font-mono text-xs md:text-sm text-neon-pink uppercase tracking-widest mb-4 block font-bold">/ Database Access</span>
              <h2 className="text-5xl md:text-8xl lg:text-9xl font-black text-white uppercase tracking-tighter">
                Deployed <br/>
                <span className={GRADIENT_TEXT}>Assets</span>
              </h2>
            </div>
            <div className="hidden md:block">
              <span className="font-mono text-white/40 text-sm">SCROLL TO NAVIGATE RECORDS -></span>
            </div>
         </div>
         
         <div className="flex flex-col gap-16 md:gap-32 px-6 md:px-12 max-w-[1920px] mx-auto">
            {PROJECTS.map((project, i) => (
               <motion.div 
                 key={project.id}
                 initial={{ opacity: 0, y: 50 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true, margin: "-10%" }}
                 transition={{ duration: 0.8 }}
                 className="group relative"
               >
                  <div className="relative w-full min-h-[70vh] md:min-h-0 md:aspect-[21/9] overflow-hidden clip-corner border border-white/10 interactive flex flex-col justify-end md:block">
                    <motion.div 
                      className="absolute inset-0 bg-cover bg-center z-0"
                      style={{ backgroundImage: `url(${project.image})` }}
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 1.5 }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/40 to-transparent opacity-90 z-0" />
                    <div className="absolute inset-0 bg-neon-blue/10 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0" />
                    
                    {/* Content Overlay */}
                    <div className="relative md:absolute bottom-0 left-0 w-full p-6 md:p-16 flex flex-col md:flex-row justify-between items-start md:items-end z-10 gap-8 md:gap-0">
                       <div className="max-w-4xl mb-0 md:mb-0">
                          <div className="flex items-center gap-4 md:gap-6 mb-4 md:mb-6">
                            <span className="px-3 py-1 md:px-4 md:py-1 border border-neon-blue text-neon-blue font-mono text-[10px] md:text-xs font-bold uppercase bg-black/50 backdrop-blur-md">{project.category}</span>
                            <span className="font-mono text-white/60 text-xs md:text-sm">{project.id}</span>
                          </div>
                          <h3 className="text-4xl md:text-5xl lg:text-8xl font-black text-white uppercase mb-4 md:mb-6 leading-[0.9] group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-neon-blue transition-all duration-300">
                            {project.title}
                          </h3>
                          <p className="text-base md:text-xl text-white/70 max-w-2xl">{project.description}</p>
                       </div>
                       
                       <div className="text-left md:text-right w-full md:w-auto">
                          <div className="text-5xl md:text-6xl lg:text-8xl font-black text-neon-green tracking-tighter mb-2">{project.metric}</div>
                          <div className="font-mono text-xs md:text-sm text-white/40 uppercase tracking-widest Efficiency Gain">Efficiency Gain</div>
                          
                          <div className="flex gap-4 justify-start md:justify-end mt-6 md:mt-8">
                             {project.techStack.map(t => (
                               <span key={t} className="w-8 h-8 md:w-12 md:h-12 border border-white/20 rounded-full flex items-center justify-center bg-white/5 text-white/60 text-[10px] md:text-xs">
                                 {t.substring(0,2)}
                               </span>
                             ))}
                          </div>
                       </div>
                    </div>
                  </div>
               </motion.div>
            ))}
         </div>
      </section>

      {/* Metric Yield - High Impact */}
      <section className="py-32 md:py-64 relative border-t border-white/10 overflow-hidden bg-gradient-to-b from-obsidian to-black">
         <div className="absolute inset-0 cyber-grid opacity-20" />
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] bg-neon-blue/5 rounded-full blur-[200px]" />
         
         <div className="max-w-[1400px] mx-auto px-6 text-center relative z-10">
            <h2 className="text-[15vw] font-black text-white/5 leading-[0.8] tracking-tighter select-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap blur-sm">
               SYSTEM CORE
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-16 relative z-20">
               {[
                  { label: "Uptime", val: "100%", icon: Activity },
                  { label: "Throughput", val: "10TB+", icon: Zap },
                  { label: "Security", val: "TRUST", icon: Shield },
                  { label: "Global Nodes", val: "42", icon: Globe }
               ].map((stat, i) => (
                  <motion.div 
                    key={i} 
                    className="flex flex-col items-center gap-4"
                    whileHover={{ scale: 1.1 }}
                  >
                     <stat.icon className="text-neon-blue w-8 h-8 md:w-12 md:h-12 mb-2 md:mb-6 stroke-1 animate-pulse" />
                     <span className="text-4xl md:text-6xl lg:text-8xl font-black text-white tracking-tighter">{stat.val}</span>
                     <span className="font-mono text-[10px] md:text-sm text-neon-purple uppercase tracking-[0.3em] font-bold">{stat.label}</span>
                  </motion.div>
               ))}
            </div>
         </div>
      </section>
    </div>
  );
};

// --- Sub Pages (Generic Template for 2026) ---

interface PageLayoutProps {
  title: React.ReactNode;
  subtitle: string;
  children: React.ReactNode;
}

const PageLayout: React.FC<PageLayoutProps> = ({ title, subtitle, children }) => (
  <motion.div 
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="pt-32 md:pt-48 min-h-screen bg-obsidian relative"
  >
     <div className="fixed top-32 right-12 font-mono text-sm text-white/40 flex flex-col items-end gap-2 hidden lg:flex z-40">
        <span>SECTOR: {subtitle.toUpperCase()}</span>
        <span>ENCRYPTION: ENABLED</span>
     </div>

     <div className="max-w-[1920px] mx-auto px-6 md:px-12 mb-16 md:mb-32">
        <div className="flex items-center gap-6 mb-8 md:mb-12">
           <div className="w-16 md:w-24 h-[2px] bg-neon-blue" />
           <span className="font-mono text-neon-blue text-xs md:text-sm font-bold tracking-[0.3em] uppercase">{subtitle}</span>
        </div>
        <h1 className="text-5xl md:text-7xl lg:text-[10rem] font-black text-white uppercase tracking-tighter mb-8 md:mb-12 leading-[0.9] md:leading-[0.8]">
           {typeof title === 'string' ? <GlitchText text={title} /> : title}
        </h1>
     </div>
     {children}
  </motion.div>
);

// ... (ServicesPage, IndustriesPage, ProcessPage, CaseStudiesPage, InsightsPage, AboutPage components - unchanged, same as source file content)
// ... For brevity in LLM output, assuming these components remain EXACTLY as provided in the source file. 
// However, the instructions state "Full content of file_1". I will include them to be compliant.

const ServicesPage = () => {
   const [selectedStack, setSelectedStack] = useState<string[]>([]);
   const [showFeasibility, setShowFeasibility] = useState(false);

   const services = [
      { 
        title: "Strategic Audit", 
        icon: <Search />, 
        desc: "We conduct a structured assessment of existing products, platforms, and infrastructure to identify technical debt, performance gaps, and growth constraints. This includes reviewing architecture, data flows, tooling, and user experience to establish a clear baseline and a practical path forward." 
      },
      { 
        title: "System Architecture", 
        icon: <Layers />, 
        desc: "We design scalable system architectures that support speed, reliability, and long-term evolution. From data models to service layers and integrations, we build the technical foundation required for products to grow without friction or structural rewrites." 
      },
      { 
        title: "Interface Engineering", 
        icon: <Cpu />, 
        desc: "We engineer high-performance frontend experiences that are responsive, resilient, and built for real-world usage. Our focus is on clean component architecture, efficient rendering, and performance optimisation across devices and network conditions." 
      },
      { 
        title: "AI Orchestration", 
        icon: <Terminal />, 
        desc: "We integrate AI into products and workflows to accelerate development, improve operational efficiency, and enable intelligent features at scale. This includes AI-assisted product capabilities, automation pipelines, and modern development workflows such as vibe coding for rapid prototyping and iteration." 
      },
      { 
        title: "UX Logic", 
        icon: <MousePointer2 />, 
        desc: "We design user journeys based on behaviour, intent, and decision-making patterns. Every interaction is mapped to reduce friction, increase clarity, and support conversion, engagement, and long-term retention." 
      },
      { 
        title: "Branding & Brand Systems", 
        icon: <Aperture />, 
        desc: "We build brands designed to live inside digital products. Beyond visual identity, we create cohesive brand systems, tone of voice, and design foundations that scale consistently across apps, websites, platforms, and marketing touchpoints." 
      }
    ];

  const cardStyles = [
    { 
      hoverBg: "bg-gradient-to-br from-neon-blue/30 via-neon-blue/5 to-transparent",
      hoverText: "group-hover:text-neon-blue",
      hoverIconBg: "group-hover:bg-neon-blue",
      hoverBorder: "group-hover:from-neon-blue group-hover:to-neon-purple"
    },
    { 
      hoverBg: "bg-gradient-to-br from-neon-purple/30 via-neon-purple/5 to-transparent",
      hoverText: "group-hover:text-neon-purple",
      hoverIconBg: "group-hover:bg-neon-purple",
      hoverBorder: "group-hover:from-neon-purple group-hover:to-neon-pink"
    },
    { 
      hoverBg: "bg-gradient-to-br from-neon-green/30 via-neon-green/5 to-transparent",
      hoverText: "group-hover:text-neon-green",
      hoverIconBg: "group-hover:bg-neon-green",
      hoverBorder: "group-hover:from-neon-green group-hover:to-neon-blue"
    },
    { 
      hoverBg: "bg-gradient-to-br from-neon-pink/30 via-neon-pink/5 to-transparent",
      hoverText: "group-hover:text-neon-pink",
      hoverIconBg: "group-hover:bg-neon-pink",
      hoverBorder: "group-hover:from-neon-pink group-hover:to-neon-purple"
    }
  ];

  return (
    <PageLayout title={<>Capability <br /> <span className={GRADIENT_TEXT}>Matrix</span></>} subtitle="Services">
       {/* Status Board */}
       <div className="fixed top-56 right-12 z-40 hidden lg:flex flex-col items-end gap-1 font-mono text-[10px] font-bold tracking-widest text-neon-blue mix-blend-screen pointer-events-none">
            <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-neon-green rounded-full animate-pulse shadow-[0_0_5px_#00FF99]" />
                <span>UPTIME: 99.9%</span>
            </div>
            <div className="flex items-center gap-2 opacity-80">
                <Shield size={10} />
                <span>SECURITY PROTOCOL: ACTIVE</span>
            </div>
             <div className="flex items-center gap-2 opacity-80">
                <Database size={10} />
                <span>DATABASE INTEGRITY: VERIFIED</span>
            </div>
        </div>

       <div className="max-w-[1920px] mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 pb-16 md:pb-24">
          {services.map((s, i) => {
             const style = cardStyles[i % cardStyles.length];
             return (
               <HoloCard key={i} delay={i * 0.05} hoverColor={style.hoverBg} className="p-8 md:p-12 min-h-[400px] md:min-h-[500px] flex flex-col justify-between gap-6 md:gap-8 group bg-white/5 clip-corner hover:bg-white/10">
                  <div>
                    <div className={`w-12 h-12 md:w-16 md:h-16 bg-black border border-white/20 flex items-center justify-center text-white group-hover:text-black transition-all duration-300 rounded-lg mb-6 md:mb-8 ${style.hoverIconBg}`}>
                       {React.cloneElement(s.icon as React.ReactElement<any>, { size: 28 })}
                    </div>
                    
                    <h3 className={`text-2xl md:text-3xl font-black text-white uppercase mb-4 transition-colors ${style.hoverText}`}>{s.title}</h3>
                    <p className="text-base md:text-lg text-white/60 leading-relaxed">{s.desc}</p>
                  </div>
                  
                  {/* Bottom Border Effect */}
                  <div className={`w-full h-[2px] bg-white/10 mt-4 group-hover:bg-gradient-to-r ${style.hoverBorder} transition-all duration-500`} />
               </HoloCard>
             );
          })}
       </div>

       {/* Quick Action Matrix */}
       <div className="max-w-[1920px] mx-auto px-6 md:px-12 pb-20 md:pb-32">
            <div className="border border-white/10 bg-white/[0.02] p-6 md:p-12 relative overflow-hidden clip-corner">
                 <div className="absolute inset-0 cyber-grid opacity-10 pointer-events-none" />
                 
                 <div className="relative z-10">
                     <div className="flex flex-col md:flex-row justify-between items-end mb-8 md:mb-12 gap-6 md:gap-8">
                         <div>
                             <h3 className="text-2xl md:text-3xl font-black text-white uppercase mb-2">Select Your <span className="text-neon-blue">Stack</span></h3>
                             <p className="text-white/60 font-mono text-xs md:text-sm">Configure modules to initiate feasibility analysis.</p>
                         </div>
                         <div className="hidden md:block">
                             <span className="text-xs font-mono text-white/30 uppercase tracking-widest">Modules Selected: 0{selectedStack.length}</span>
                         </div>
                     </div>
                     
                     <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4 mb-8 md:mb-12">
                         {['Dashboard', 'AI Integration', 'Mobile App', 'E-Commerce', 'API Layer', 'Branding'].map((item) => (
                             <button
                                 key={item}
                                 onClick={() => {
                                     setSelectedStack(prev => prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item]);
                                     setShowFeasibility(false); 
                                 }}
                                 className={`p-3 md:p-4 border text-[10px] md:text-xs font-bold uppercase tracking-wider transition-all duration-300 flex flex-col gap-2 md:gap-3 justify-between h-20 md:h-24 group relative overflow-hidden ${selectedStack.includes(item) ? 'bg-neon-blue text-black border-neon-blue' : 'bg-black/40 border-white/10 text-white/40 hover:border-white/40 hover:text-white'}`}
                             >
                                 <div className="flex justify-between w-full">
                                     <span>{item}</span>
                                     {selectedStack.includes(item) && <Check size={12} />}
                                 </div>
                                 <div className={`w-full h-0.5 transition-all duration-500 ${selectedStack.includes(item) ? 'bg-black/20' : 'bg-white/10 group-hover:bg-neon-blue'}`} />
                             </button>
                         ))}
                     </div>
                     
                     <AnimatePresence>
                         {selectedStack.length > 0 && !showFeasibility && (
                             <motion.div 
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0 }}
                                className="flex justify-center"
                             >
                                 <CyberButton variant="primary" onClick={() => setShowFeasibility(true)} className="w-full md:w-auto justify-center">
                                     Run Feasibility Analysis
                                 </CyberButton>
                             </motion.div>
                         )}
                     </AnimatePresence>

                     <AnimatePresence>
                         {showFeasibility && (
                             <motion.div
                                 initial={{ opacity: 0, height: 0 }}
                                 animate={{ opacity: 1, height: "auto" }}
                                 className="overflow-hidden"
                             >
                                 <div className="mt-8 border-t border-white/10 pt-8">
                                     <HeroAIWidget initialQuery={`I require a system architecture including: ${selectedStack.join(', ')}. Please analyse viability.`} />
                                 </div>
                             </motion.div>
                         )}
                     </AnimatePresence>
                 </div>
            </div>
       </div>

       {/* SEO Footnote */}
       <div className="max-w-[1920px] mx-auto px-6 md:px-12 pb-16 md:pb-24">
           <p className="text-white/20 font-mono text-[10px] uppercase leading-relaxed text-justify md:text-center max-w-4xl mx-auto">
              CreativeIyke provides full-spectrum digital architecture, specialising in high-concurrence SaaS platforms, fintech infrastructure, and industrial automation across the UK and EMEA. We deploy react-based component systems, serverless edge functions, and secure database clusters to ensure 99.99% uptime for mission-critical applications.
           </p>
       </div>
    </PageLayout>
  );
};

const IndustriesPage = () => {
   const [showAudit, setShowAudit] = useState(false);

   return (
    <PageLayout title={<>Sector <br /> <span className={GRADIENT_TEXT}>Intelligence</span></>} subtitle="Industries">
        <div className="max-w-[1920px] mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 md:gap-8 pb-20 md:pb-32">
            {SECTORS.map((sector, i) => (
                <HoloCard key={sector.id} delay={i * 0.1} className={`p-8 md:p-10 flex flex-col justify-between group min-h-[350px] md:min-h-[400px] ${sector.gridSpan === 'md:col-span-2' ? 'lg:col-span-8' : 'lg:col-span-4'}`}>
                    <div className={`absolute inset-0 bg-gradient-to-br ${sector.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                    
                    <div className="relative z-10">
                        <div className="flex justify-between items-start mb-8 md:mb-12">
                            <span className="px-3 py-1 md:px-4 md:py-2 border border-white/20 rounded-full text-[10px] md:text-xs font-mono uppercase tracking-widest text-white/60 bg-black/40 backdrop-blur-md">
                                {sector.tag}
                            </span>
                            <Hexagon size={28} className="text-white/10 group-hover:text-white transition-colors duration-500" strokeWidth={1} />
                        </div>
                        
                        <h3 className="text-3xl md:text-4xl lg:text-5xl font-black text-white uppercase mb-4 md:mb-6 leading-[0.9]">{sector.title}</h3>
                        <p className="text-base md:text-lg text-white/60 leading-relaxed">{sector.benefit}</p>
                    </div>
                    
                    <div className="relative z-10 pt-6 md:pt-8 border-t border-white/10 mt-6 md:mt-8 flex justify-between items-center">
                         <span className="font-mono text-xs text-white/40 uppercase tracking-widest">Explore Vertical</span>
                         <ArrowUpRight className="text-neon-blue opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                    </div>
                </HoloCard>
            ))}
        </div>

        {/* Cross-Sector Logic (The Bridge) */}
        <div className="border-t border-white/10 bg-white/[0.02] py-20 md:py-32 relative overflow-hidden">
             {/* Decorative Background */}
             <div className="absolute -left-20 top-1/2 -translate-y-1/2 w-64 md:w-96 h-64 md:h-96 bg-neon-purple/5 rounded-full blur-[100px] md:blur-[120px] pointer-events-none" />
             
             <div className="max-w-[1920px] mx-auto px-6 md:px-12 relative z-10">
                 <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                      <div>
                           <div className="flex items-center gap-4 mb-6">
                               <div className="w-10 h-10 md:w-12 md:h-12 border border-white/10 bg-white/5 rounded-lg flex items-center justify-center">
                                   <Workflow className="text-neon-blue" size={20} />
                               </div>
                               <span className="font-mono text-neon-blue text-xs md:text-sm uppercase tracking-[0.2em] font-bold">The Bridge</span>
                           </div>
                           <h3 className="text-3xl md:text-4xl lg:text-6xl font-black text-white uppercase mb-6 md:mb-8 leading-[0.9]">
                               Cross-Pollination <br/> <span className={GRADIENT_TEXT}>of Logic.</span>
                           </h3>
                           <div className="h-1 w-24 bg-gradient-to-r from-neon-blue to-neon-purple" />
                      </div>
                      
                      <div className="relative">
                          <div className="absolute -left-8 top-0 bottom-0 w-[1px] bg-white/10 hidden lg:block" />
                          <p className="text-xl md:text-2xl lg:text-3xl text-white/80 leading-relaxed font-light pl-0 lg:pl-8">
                             "We don't work in silos. We take the high-concurrence reliability of Fintech and apply it to the scaling needs of EdTech, ensuring every system we build is battle-tested across industries."
                          </p>
                      </div>
                 </div>
             </div>
        </div>

        {/* Compliance & Security Ledger */}
        <div className="py-16 md:py-24 border-t border-white/10 bg-black relative">
             <div className="absolute inset-0 cyber-grid opacity-10 pointer-events-none" />
             <div className="max-w-[1920px] mx-auto px-6 md:px-12 relative z-10">
                 <div className="flex flex-col md:flex-row gap-6 md:gap-12 items-start md:items-center justify-between border-b border-white/10 pb-6 md:pb-8 mb-8">
                      <div>
                          <span className="font-mono text-neon-green text-xs uppercase tracking-[0.3em] font-bold block mb-2">Security Signature</span>
                          <h4 className="text-2xl md:text-3xl font-black text-white uppercase">Compliance & Security</h4>
                      </div>
                      <div className="font-mono text-xs text-white/30">
                          // STATUS: ENFORCED
                      </div>
                 </div>

                 <div className="space-y-3 md:space-y-4">
                     {[
                         "DATA ENCRYPTION: AES-256",
                         "COMPLIANCE: GDPR / HIPAA READY",
                         "PRIVACY: ARCHITECTED BY DESIGN"
                     ].map((item, i) => (
                         <div key={i} className="group flex items-center gap-4 p-3 md:p-4 border border-white/10 bg-white/[0.02] hover:bg-neon-green/[0.05] hover:border-neon-green/30 transition-all clip-corner">
                             <div className="w-5 h-5 flex items-center justify-center">
                                 <Shield className="text-neon-green w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity" />
                             </div>
                             <span className="font-mono text-sm md:text-lg lg:text-xl text-white group-hover:text-neon-green transition-colors font-bold tracking-tight truncate">
                                 [ {item} ]
                             </span>
                             <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity">
                                 <Check className="text-neon-green w-4 h-4" />
                             </div>
                         </div>
                     ))}
                 </div>
             </div>
        </div>

        {/* Global Deployment Reach */}
        <div className="py-20 md:py-32 border-t border-white/10 relative overflow-hidden bg-gradient-to-b from-black to-obsidian">
             <div className="max-w-[1920px] mx-auto px-6 md:px-12 relative z-10">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                       {/* Visual */}
                       <div className="order-2 lg:order-1 flex justify-center">
                           <div className="relative w-64 h-64 md:w-96 md:h-96 border border-white/10 rounded-full flex items-center justify-center overflow-hidden bg-black/80">
                               {/* World Map Background */}
                               <div 
                                   className="absolute inset-0 bg-contain bg-center bg-no-repeat opacity-20 transition-opacity duration-1000"
                                   style={{ 
                                       backgroundImage: `url('https://upload.wikimedia.org/wikipedia/commons/2/2f/World_map_blank_black.svg')`, 
                                       filter: 'invert(1) brightness(2)'
                                   }} 
                               />
                               
                               {/* Rotating Radar Scan */}
                               <motion.div 
                                  className="absolute inset-0 rounded-full"
                                  style={{ background: 'conic-gradient(from 0deg, transparent 0deg, transparent 270deg, rgba(0, 240, 255, 0.1) 360deg)' }}
                                  animate={{ rotate: 360 }}
                                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                               />

                               {/* Grid Overlay */}
                               <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:20px_20px] opacity-30 rounded-full pointer-events-none" />

                               {/* Outer Decoration */}
                               <div className="absolute inset-0 border border-white/5 rounded-full" />
                               <motion.div 
                                    className="absolute inset-2 border border-dashed border-neon-blue/30 rounded-full"
                                    animate={{ rotate: -360 }}
                                    transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                               />
                               
                               {/* Central Node */}
                               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-neon-blue rounded-full shadow-[0_0_20px_rgba(0,240,255,1)] animate-pulse" />
                               
                               {/* Active Nodes on Map (Simulated) */}
                               {[...Array(5)].map((_, i) => (
                                   <motion.div
                                      key={i}
                                      className="absolute w-1 h-1 bg-white rounded-full"
                                      initial={{ opacity: 0, scale: 0 }}
                                      animate={{ opacity: [0, 1, 0], scale: [0, 1.5, 0] }}
                                      transition={{ duration: 2, delay: i * 0.5, repeat: Infinity, repeatDelay: Math.random() * 2 }}
                                      style={{ 
                                          top: `${30 + Math.random() * 40}%`, 
                                          left: `${30 + Math.random() * 40}%`,
                                          boxShadow: '0 0 5px white'
                                      }}
                                   />
                               ))}
                           </div>
                       </div>
                       
                       {/* Content */}
                       <div className="order-1 lg:order-2">
                           <div className="flex items-center gap-4 mb-6">
                               <div className="w-10 h-10 md:w-12 md:h-12 border border-white/10 bg-white/5 rounded-lg flex items-center justify-center">
                                   <Globe className="text-neon-blue" size={20} />
                               </div>
                               <span className="font-mono text-neon-blue text-xs md:text-sm uppercase tracking-[0.2em] font-bold">Global Deployment</span>
                           </div>
                           
                           <h3 className="text-3xl md:text-4xl lg:text-6xl font-black text-white uppercase mb-6 md:mb-8 leading-[0.9]">
                               Multi-Market <br/> <span className={GRADIENT_TEXT}>Architecture.</span>
                           </h3>
                           
                           <div className="h-1 w-24 bg-gradient-to-r from-neon-blue to-neon-purple mb-6 md:mb-8" />
                           
                           <p className="text-xl md:text-2xl text-white/80 leading-relaxed font-light">
                               "Our systems are engineered to adapt. Whether it’s multi-currency for E-commerce or multi-language compliance for European manufacturing, we build for global growth."
                           </p>
                       </div>
                  </div>
             </div>
        </div>

        {/* Sector-Specific CTA */}
        <div className="py-20 md:py-32 border-t border-white/10 bg-white/[0.02]">
             <div className="max-w-4xl mx-auto px-6 text-center">
                  <h3 className="text-3xl md:text-4xl lg:text-5xl font-black text-white uppercase mb-6 md:mb-8">
                      HAVE A <span className="text-neon-blue">SECTOR-SPECIFIC</span> CHALLENGE?
                  </h3>
                  
                  <AnimatePresence mode="wait">
                      {!showAudit ? (
                          <motion.div
                              key="button"
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -20 }}
                              className="flex justify-center"
                          >
                              <CyberButton variant="primary" onClick={() => setShowAudit(true)} className="px-8 py-4 md:px-12 md:py-6 text-base md:text-lg">
                                  RUN SECTOR FEASIBILITY AUDIT
                              </CyberButton>
                          </motion.div>
                      ) : (
                          <motion.div
                              key="widget"
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              className="overflow-hidden mt-8 text-left"
                          >
                              <HeroAIWidget initialQuery="I have a specific sector challenge regarding..." />
                              <button 
                                onClick={() => setShowAudit(false)}
                                className="mt-6 text-white/40 hover:text-white text-xs font-mono uppercase tracking-widest flex items-center gap-2 mx-auto"
                              >
                                <X size={14} /> Close Audit Tool
                              </button>
                          </motion.div>
                      )}
                  </AnimatePresence>
             </div>
        </div>

    </PageLayout>
   );
};

const ProcessPage = () => {
    const statusLabels = ["DISCOVERY", "BLUEPRINTING", "DEPLOYMENT", "PERFORMANCE"];
    const [showWidget, setShowWidget] = useState(false);

    return (
        <PageLayout title={<>System <br /> <span className={GRADIENT_TEXT}>Protocol</span></>} subtitle="Methodology">
           <div className="max-w-[1920px] mx-auto px-6 md:px-12 pb-20 md:pb-32">
              <div className="space-y-0">
                  {STEPS.map((step, i) => (
                      <div key={step.id} className="group relative border-b border-white/10 py-16 md:py-24 last:border-0 hover:bg-white/[0.02] transition-colors duration-500">
                          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-start relative z-10 px-0 md:px-8">
                               <div className="lg:col-span-2 hidden lg:flex flex-col items-start pt-4">
                                   <span className="font-mono text-xs text-neon-blue uppercase tracking-[0.2em] mb-4">Phase</span>
                                   <span className="font-mono text-6xl font-black text-white/20 group-hover:text-white transition-colors duration-300">{step.number}</span>
                               </div>
                               
                               <div className="lg:col-span-4">
                                   <div className="flex items-center gap-4 mb-4 lg:hidden">
                                       <span className="font-mono text-xs text-neon-blue uppercase tracking-widest">Phase {step.number}</span>
                                   </div>
                                   {/* Status Tag */}
                                   <div className="mb-4">
                                     <span className="font-mono text-xs text-neon-purple font-bold tracking-widest bg-white/5 px-2 py-1 rounded-sm border border-white/10">
                                       [ STATUS: {statusLabels[i]} ]
                                     </span>
                                   </div>
                                   <h3 className="text-4xl md:text-5xl lg:text-7xl font-black text-white uppercase mb-6 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-neon-blue transition-all duration-500 pr-2 pb-2">
                                       {step.title}
                                   </h3>
                               </div>
                               
                               <div className="lg:col-span-6 pt-0 lg:pt-2 lg:pl-12 lg:border-l border-white/10 h-full">
                                   <p className="text-lg md:text-xl lg:text-2xl text-white/70 leading-relaxed max-w-2xl">{step.description}</p>
                                   
                                   <ul className="mt-8 space-y-2">
                                       {[1,2,3].map((item) => (
                                           <li key={item} className="flex items-center gap-3 text-xs md:text-sm font-mono text-white/40 uppercase tracking-widest">
                                                <div className="w-1 h-1 bg-neon-blue rounded-full" />
                                                <span>Sub-Routine {step.number}.{item}</span>
                                           </li>
                                       ))}
                                   </ul>
                               </div>
                          </div>
                      </div>
                  ))}
              </div>

              {/* 1. Definition of Done */}
              <div className="py-20 md:py-32 border-b border-white/10">
                 <div className="mb-12 md:mb-16">
                    <span className="font-mono text-neon-green text-sm uppercase tracking-[0.3em] font-bold block mb-4">Quality Assurance</span>
                    <h3 className="text-3xl md:text-4xl lg:text-6xl font-black text-white uppercase tracking-tighter">
                        Definition of <span className={GRADIENT_TEXT}>Done</span>
                    </h3>
                 </div>
                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                    {[
                        { title: "Performance", val: "Lighthouse 90+", desc: "All assets optimised for Core Web Vitals.", icon: Zap },
                        { title: "Security", val: "Verified", desc: "Multi-layer auth & Firestore rules verified.", icon: Shield },
                        { title: "Scalability", val: "10x Growth", desc: "Infrastructure ready for 10x user load.", icon: Activity },
                        { title: "Handover", val: "Complete", desc: "Full documentation & team training.", icon: FileText },
                    ].map((item, i) => (
                        <div key={i} className="gradient-border p-6 md:p-8 clip-corner relative group transition-all duration-500 hover:bg-gradient-to-br hover:from-neon-blue/10 hover:to-neon-purple/10">
                            <div className="relative z-10">
                                <item.icon className="text-neon-green mb-6 w-8 h-8" />
                                <h4 className="text-xl font-bold text-white uppercase mb-2">{item.title}</h4>
                                <div className="text-2xl font-black text-white/90 mb-4 font-mono">{item.val}</div>
                                <p className="text-white/50 text-sm leading-relaxed">{item.desc}</p>
                                <div className="absolute top-0 right-0 p-4 text-[10px] font-mono text-white/20">[chk]</div>
                            </div>
                        </div>
                    ))}
                 </div>
              </div>

              {/* 2. Pre-Flight Checklist */}
              <div className="py-20 md:py-32 border-b border-white/10 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                 <div>
                    <span className="font-mono text-neon-blue text-sm uppercase tracking-[0.3em] font-bold block mb-4">Initialisation</span>
                    <h3 className="text-3xl md:text-4xl lg:text-6xl font-black text-white uppercase tracking-tighter mb-6 md:mb-8">
                        Pre-Flight <br/><span className={GRADIENT_TEXT}>Checklist</span>
                    </h3>
                    <p className="text-white/70 text-base md:text-lg leading-relaxed max-w-md">
                        Before a single line of code is written, we validate the mission parameters. This phase builds value and identifies risks early in the trajectory.
                    </p>
                 </div>
                 <div className="bg-black border border-white/20 p-6 md:p-12 font-mono text-xs md:text-base relative overflow-hidden shadow-2xl">
                    <div className="absolute top-0 left-0 w-full h-8 bg-white/10 border-b border-white/10 flex items-center px-4 gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-500/50" />
                        <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                        <div className="w-3 h-3 rounded-full bg-green-500/50" />
                        <span className="ml-4 text-xs text-white/30 uppercase">SYSTEM_CHECK.SH</span>
                    </div>
                    <div className="mt-8 space-y-4 md:space-y-6">
                        {[
                            "Technical Debt Assessment",
                            "Market Viability Stress Test",
                            "Database Schema Mapping",
                            "API Integration Audit"
                        ].map((item, i) => (
                            <div key={i} className="flex items-start gap-4 text-white/80">
                                <span className="text-neon-blue">[{' '}]</span>
                                <span className="uppercase tracking-wider">{item}</span>
                                <motion.span 
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 1 }}
                                    transition={{ delay: i * 0.5 + 1, duration: 0.1 }}
                                    className="ml-auto text-neon-green text-xs hidden sm:block"
                                >
                                    READY
                                </motion.span>
                            </div>
                        ))}
                        <div className="pt-4 border-t border-white/10 text-white/40 animate-pulse">
                            _ WAITING FOR INPUT...
                        </div>
                    </div>
                 </div>
              </div>

              {/* 3. Communication Loop */}
              <div className="py-20 md:py-32 border-b border-white/10">
                 <div className="mb-12 md:mb-16">
                    <span className="font-mono text-neon-purple text-sm uppercase tracking-[0.3em] font-bold block mb-4">Transparency Layer</span>
                    <h3 className="text-3xl md:text-4xl lg:text-6xl font-black text-white uppercase tracking-tighter">
                        Communication <span className={GRADIENT_TEXT}>Loop</span>
                    </h3>
                 </div>
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                    {[
                        { title: "Weekly Sprint Reports", desc: "A technical breakdown of progress vs. roadmap. No fluff, just shipping metrics.", icon: Activity },
                        { title: "Staging Access", desc: "Watch the build happen in real-time on a private Firebase staging URL.", icon: Globe },
                        { title: "Direct Architect Access", desc: "No account managers filtering your feedback. You speak directly to the engineers.", icon: User },
                    ].map((item, i) => (
                        <div key={i} className="group relative p-6 md:p-8 border-l-2 border-white/10 hover:border-neon-purple transition-all bg-white/[0.02] hover:bg-white/5">
                            <div className="mb-6 bg-white/5 w-12 h-12 md:w-16 md:h-16 flex items-center justify-center rounded-full text-white/50 group-hover:text-neon-purple transition-colors">
                                <item.icon size={24} className="md:w-7 md:h-7" />
                            </div>
                            <h4 className="text-xl md:text-2xl lg:text-3xl font-bold text-white uppercase mb-4">{item.title}</h4>
                            <p className="text-white/70 leading-relaxed text-base md:text-lg">{item.desc}</p>
                        </div>
                    ))}
                 </div>
              </div>

              {/* 4. Tech Debt Guarantee */}
              <div className="py-20 md:py-32 border-b border-white/10 relative overflow-hidden">
                 <div className="absolute inset-0 bg-neon-blue/5 skew-y-3 scale-110 pointer-events-none" />
                 <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                    <div className="lg:col-span-8">
                        <span className="font-mono text-neon-blue text-sm uppercase tracking-[0.3em] font-bold block mb-6">Guarantee Protocol</span>
                        <h3 className="text-3xl md:text-5xl lg:text-7xl font-black text-white uppercase tracking-tighter mb-8 leading-[0.9]">
                            The <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-neon-purple">Future-Proof</span> <br/> Promise.
                        </h3>
                        <p className="text-lg md:text-xl text-white/80 leading-relaxed font-light max-w-2xl">
                            We don't build with 'disposable' code. Our protocol ensures that every system is built on a modular foundation, meaning you can add new features or AI integrations in two years without having to start from scratch.
                        </p>
                    </div>
                    <div className="lg:col-span-4 flex justify-center lg:justify-end">
                        <div className="w-32 h-32 md:w-48 md:h-48 border-2 border-dashed border-white/20 rounded-full flex items-center justify-center animate-spin-slow">
                             <div className="w-24 h-24 md:w-40 md:h-40 border border-neon-blue/30 rounded-full flex items-center justify-center">
                                 <span className="font-mono text-[10px] md:text-xs text-center text-neon-blue uppercase font-bold">Zero<br/>Tech<br/>Debt</span>
                             </div>
                        </div>
                    </div>
                 </div>
              </div>
              
              <div className="mt-16 md:mt-24 gradient-border bg-white/[0.02] p-8 md:p-24 text-center clip-corner relative overflow-hidden group">
                   <div className="absolute inset-0 cyber-grid opacity-10" />
                   <div className="relative z-10">
                        <h4 className="text-3xl md:text-4xl lg:text-7xl font-black text-white uppercase mb-8 tracking-tighter">
                            Ready to <span className={GRADIENT_TEXT}>Execute?</span>
                        </h4>
                        
                        <AnimatePresence mode="wait">
                          {!showWidget ? (
                              <motion.div
                                  key="button"
                                  initial={{ opacity: 0, y: 20 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  exit={{ opacity: 0, y: -20 }}
                                  className="flex justify-center"
                              >
                                  <CyberButton variant="primary" onClick={() => setShowWidget(true)} className="px-8 py-4 md:px-12 md:py-6 text-base md:text-lg">
                                      Initialise Protocol
                                  </CyberButton>
                              </motion.div>
                          ) : (
                              <motion.div
                                  key="widget"
                                  initial={{ opacity: 0, height: 0 }}
                                  animate={{ opacity: 1, height: "auto" }}
                                  exit={{ opacity: 0, height: 0 }}
                                  className="overflow-hidden mt-8 text-left max-w-3xl mx-auto relative z-20"
                              >
                                  <HeroAIWidget initialQuery="I am ready to initiate the protocol sequence. Please advise on next steps." />
                                  <button 
                                    onClick={() => setShowWidget(false)}
                                    className="mt-6 text-white/40 hover:text-white text-xs font-mono uppercase tracking-widest flex items-center gap-2 mx-auto"
                                  >
                                    <X size={14} /> Cancel Sequence
                                  </button>
                              </motion.div>
                          )}
                        </AnimatePresence>
                   </div>
              </div>
           </div>
        </PageLayout>
    );
};

const CaseStudiesPage = () => {
  const [showBlueprint, setShowBlueprint] = useState(false);

  return (
    <PageLayout title={<>Deployed <br /> <span className={GRADIENT_TEXT}>Assets</span></>} subtitle="Case Studies">
       <div className="max-w-[1920px] mx-auto px-6 md:px-12 pb-20 md:pb-32 flex flex-col gap-20 md:gap-32">
           {PROJECTS.map((project, i) => (
               <motion.div 
                 key={project.id}
                 initial={{ opacity: 0, y: 50 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true, margin: "-100px" }}
                 className="group relative"
               >
                  {/* Technical Header Line */}
                  <div className="flex items-center justify-between border-t border-white/20 pt-4 mb-8 md:mb-12">
                      <div className="flex items-center gap-4">
                          <span className="font-mono text-neon-blue text-lg md:text-xl font-bold">0{i+1}</span>
                          <div className="h-[1px] w-8 md:w-12 bg-neon-blue/50" />
                          <span className="font-mono text-[10px] md:text-xs uppercase tracking-[0.3em] text-white/60">{project.category}</span>
                      </div>
                      <span className="font-mono text-xs text-white/20 uppercase hidden md:block">System Status: Optimal</span>
                  </div>

                  {/* Main Grid */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 border border-white/10 bg-white/[0.02] group-hover:border-white/30 transition-colors duration-500">
                      
                      {/* Left: Info Panel */}
                      <div className="lg:col-span-5 p-6 md:p-12 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-white/10 relative overflow-hidden order-2 lg:order-1">
                          <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-white/5 to-transparent pointer-events-none" />
                          
                          <div className="relative z-10">
                              <h3 className="text-4xl md:text-5xl lg:text-7xl font-black text-white uppercase leading-[0.85] mb-6 md:mb-8 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-neon-blue group-hover:to-neon-purple transition-all duration-500">
                                  {project.title}
                              </h3>
                              <p className="text-white/60 text-base md:text-lg leading-relaxed mb-8 md:mb-12 font-light">
                                  {project.description}
                              </p>
                          </div>

                          <div className="relative z-10">
                              <div className="mb-8">
                                  <span className="block text-xs font-mono text-white/40 uppercase tracking-widest mb-2">Impact Metric</span>
                                  <span className="text-4xl md:text-5xl font-black text-neon-green tracking-tighter">{project.metric}</span>
                              </div>

                              <div className="flex flex-wrap gap-2 mt-6 md:mt-8">
                                  {project.techStack.map(t => (
                                      <span key={t} className="px-3 py-1 border border-white/10 text-[10px] font-mono uppercase text-white/50 hover:text-white hover:border-white/30 transition-colors">
                                          {t}
                                      </span>
                                  ))}
                              </div>
                              
                              <div className="mt-8 md:mt-12">
                                  <CyberButton variant="outline" className="w-full justify-between group/btn">
                                      <span>Initialise Case Study</span>
                                      <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                                  </CyberButton>
                              </div>
                          </div>
                      </div>

                      {/* Right: Image Panel */}
                      <div className="lg:col-span-7 relative h-[300px] md:h-[500px] lg:h-auto overflow-hidden group/image cursor-none order-1 lg:order-2">
                          <div className="absolute inset-0 bg-black/20 z-10 group-hover/image:bg-transparent transition-colors duration-500" />
                          
                          {/* REDACTED BADGE */}
                          <div className="absolute top-4 md:top-6 left-4 md:left-6 z-40 bg-black/90 backdrop-blur border border-red-500/30 px-3 py-1.5 flex items-center gap-2 clip-corner shadow-lg">
                              <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" />
                              <span className="font-mono text-[10px] text-red-500 font-bold tracking-widest">
                                  [ REDACTED ]
                              </span>
                          </div>

                          {/* Image */}
                          <img 
                              src={project.image} 
                              alt={project.title}
                              className="w-full h-full object-cover grayscale contrast-125 transition-transform duration-1000 group-hover/image:scale-105 group-hover/image:grayscale-0"
                          />
                          
                          {/* Overlay Grid */}
                          <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.5)_1px,transparent_1px)] bg-[size:40px_40px] opacity-20 pointer-events-none z-20" />
                          
                          {/* Center Glitch Text on Hover */}
                          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-30 opacity-0 group-hover/image:opacity-100 transition-opacity duration-300 mix-blend-difference hidden md:flex">
                              <span className="text-[10vw] font-black text-white uppercase tracking-tighter opacity-20">VIEW</span>
                          </div>
                          
                          {/* Corner Accents */}
                          <div className="absolute top-4 right-4 w-4 h-4 border-t-2 border-r-2 border-neon-blue z-30" />
                          <div className="absolute bottom-4 left-4 w-4 h-4 border-b-2 border-l-2 border-neon-blue z-30" />
                      </div>
                  </div>
               </motion.div>
           ))}
       </div>

       {/* NEW CTA SECTION */}
       <div className="py-20 md:py-32 border-t border-white/10 bg-white/[0.02]">
            <div className="max-w-4xl mx-auto px-6 text-center">
                 <h3 className="text-3xl md:text-4xl lg:text-6xl font-black text-white uppercase mb-8 tracking-tighter">
                     READY TO DEFINE <br/><span className={GRADIENT_TEXT}>YOUR OWN?</span>
                 </h3>
                 
                 <AnimatePresence mode="wait">
                    {!showBlueprint ? (
                        <motion.div
                           initial={{ opacity: 0, y: 20 }}
                           whileInView={{ opacity: 1, y: 0 }}
                           exit={{ opacity: 0, y: -20 }}
                           className="flex justify-center"
                        >
                            <CyberButton variant="primary" onClick={() => setShowBlueprint(true)} className="px-8 py-4 md:px-12 md:py-6 text-base md:text-lg">
                                INITIATE MY BLUEPRINT
                            </CyberButton>
                        </motion.div>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="overflow-hidden mt-8 text-left"
                        >
                            <HeroAIWidget initialQuery="I want to initiate a new project blueprint..." />
                            <div className="flex justify-center mt-8">
                                <button 
                                    onClick={() => setShowBlueprint(false)}
                                    className="text-white/40 hover:text-white text-xs font-mono uppercase tracking-widest flex items-center gap-2"
                                >
                                    <X size={14} /> Cancel Sequence
                                </button>
                            </div>
                        </motion.div>
                    )}
                 </AnimatePresence>
            </div>
       </div>
    </PageLayout>
  );
};

// --- Reading Protocol Components ---

const ArticleReader = ({ post, onClose }: { post: BlogPost, onClose: () => void }) => {
    // Lock body scroll when reader is open
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => { document.body.style.overflow = ''; }
    }, []);

    // Use portal to break out of stacking context and ensure full screen coverage
    return createPortal(
        <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[200] bg-obsidian flex flex-col overflow-y-auto"
        >
            {/* Reader Header */}
            <div className="flex items-center justify-between p-4 md:p-6 lg:p-8 border-b border-white/10 bg-black/80 backdrop-blur-md sticky top-0 z-50">
                <div className="flex items-center gap-6">
                    <button 
                        onClick={onClose} 
                        className="group flex items-center gap-2 px-3 py-2 border border-neon-blue/30 bg-neon-blue/5 hover:bg-neon-blue/10 transition-all rounded-sm mr-4"
                    >
                        <ChevronLeft size={16} className="text-neon-blue" />
                        <span className="font-mono text-[10px] md:text-xs text-neon-blue font-bold uppercase tracking-widest hidden md:inline">Back to Insights</span>
                        <span className="font-mono text-[10px] text-neon-blue font-bold uppercase tracking-widest md:hidden">Back</span>
                    </button>
                    <div className="h-8 w-[1px] bg-white/10 hidden md:block" />
                    <span className="text-white font-bold uppercase truncate max-w-[150px] md:max-w-md hidden md:block opacity-50">{post.title}</span>
                </div>
                
                <div className="flex items-center gap-4">
                     <CyberButton onClick={onClose} variant="outline" className="px-4 py-2 md:px-6 md:py-2">
                        Close <span className="hidden md:inline">File</span> <X size={14} />
                     </CyberButton>
                </div>
            </div>

            {/* Reader Content */}
            <div className="flex-1 relative">
                <div className="max-w-4xl mx-auto px-6 md:px-12 py-12 md:py-16">
                     {/* Article Meta */}
                     <div className="mb-8 md:mb-12 border-l-2 border-neon-blue pl-4 md:pl-6">
                        <div className="flex flex-wrap gap-4 font-mono text-xs text-neon-purple uppercase tracking-widest mb-4">
                            <span>{post.category}</span>
                            <span>//</span>
                            <span>ID: {post.id}</span>
                        </div>
                        <h1 className="text-3xl md:text-4xl lg:text-6xl font-black text-white uppercase leading-tight mb-6 md:mb-8">
                            {post.title}
                        </h1>
                        <p className="text-lg md:text-xl text-white/70 leading-relaxed font-light border-b border-white/10 pb-8">
                            {post.excerpt}
                        </p>
                     </div>

                     {/* Main Image */}
                     <div className="w-full aspect-video bg-white/5 mb-12 md:mb-16 relative overflow-hidden clip-corner border border-white/10 group">
                        <img src={post.image} alt={post.title} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-700" />
                        <div className="absolute inset-0 cyber-grid opacity-20 pointer-events-none" />
                        <div className="absolute bottom-4 left-4 bg-black/80 px-3 py-1 text-[10px] font-mono text-white/60 uppercase">
                            Fig 1.1 - Visual Data Representation
                        </div>
                     </div>

                     {/* HTML Content Render */}
                     <div 
                        className="prose prose-invert prose-lg max-w-none prose-headings:font-bold prose-headings:uppercase prose-headings:text-white prose-p:text-white/70 prose-p:font-light prose-p:leading-loose prose-a:text-neon-blue prose-strong:text-white prose-ul:list-disc prose-ul:pl-4 prose-li:text-white/70"
                        dangerouslySetInnerHTML={{ __html: post.content }}
                     />

                     {/* Footer of Article */}
                     <div className="mt-16 md:mt-24 pt-8 md:pt-12 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
                        <div className="text-white/40 font-mono text-xs uppercase tracking-widest mb-4 md:mb-0">
                            <span>End of File // Encrypted 256-bit</span>
                        </div>
                        <CyberButton onClick={onClose} variant="primary" className="w-full md:w-auto justify-center">
                            <span className="flex items-center gap-2"><ChevronLeft size={16} /> Back to Insights</span>
                        </CyberButton>
                     </div>
                </div>
            </div>
        </motion.div>,
        document.body
    );
};

const InsightsPage = () => {
    // Logic: Reverse posts so last is first
    const sortedPosts = [...BLOG_POSTS].reverse();
    
    // Pagination Logic
    const [currentPage, setCurrentPage] = useState(0);
    const ITEMS_PER_PAGE = 4;
    const totalPages = Math.ceil(sortedPosts.length / ITEMS_PER_PAGE);
    const paginatedPosts = sortedPosts.slice(currentPage * ITEMS_PER_PAGE, (currentPage + 1) * ITEMS_PER_PAGE);

    const [activePostId, setActivePostId] = useState<string | null>(null);
    const [isReading, setIsReading] = useState(false);
    
    // Auto-select first post of page for preview pane if none selected or if page changes
    useEffect(() => {
        if (paginatedPosts.length > 0) {
             setActivePostId(paginatedPosts[0].id);
        }
    }, [currentPage]);
    
    const activePost = BLOG_POSTS.find(p => p.id === activePostId) || sortedPosts[0];

    return (
        <PageLayout title={<>Neural <br /> <span className={GRADIENT_TEXT}>Stream</span></>} subtitle="Insights">
           <AnimatePresence>
               {isReading && (
                   <ArticleReader 
                       post={activePost} 
                       onClose={() => setIsReading(false)} 
                   />
               )}
           </AnimatePresence>

           <div className="max-w-[1920px] mx-auto px-6 md:px-12 pb-20 md:pb-32">
               {/* Dashboard Interface Container */}
               <div className="flex flex-col lg:flex-row border border-white/10 bg-black/40 backdrop-blur-sm min-h-[600px] lg:min-h-[800px] relative overflow-hidden clip-corner">
                   
                   {/* Left Pane: Neural Index (Stream List) */}
                   <div className="w-full lg:w-1/3 border-b lg:border-b-0 lg:border-r border-white/10 flex flex-col bg-black/20">
                       <div className="p-4 md:p-6 border-b border-white/10 bg-white/5 flex items-center justify-between">
                           <span className="font-mono text-xs text-neon-blue uppercase tracking-widest flex items-center gap-2">
                               <Activity size={12} className="animate-pulse" /> Live Stream
                           </span>
                           <span className="font-mono text-xs text-white/30">PAGE {currentPage + 1} / {totalPages}</span>
                       </div>
                       
                       <div className="flex-1 overflow-y-auto custom-scrollbar relative">
                           {paginatedPosts.map((post) => (
                               <div 
                                   key={post.id}
                                   onClick={() => { 
                                       setActivePostId(post.id); 
                                       // On mobile/tablet, immediate open. On desktop, select for preview.
                                       if(window.innerWidth < 1024) setIsReading(true); 
                                   }}
                                   className={`p-6 md:p-8 border-b border-white/5 cursor-pointer group transition-all duration-300 relative overflow-hidden ${activePostId === post.id ? 'bg-white/5' : 'hover:bg-white/[0.02]'}`}
                               >
                                   {/* Active Marker */}
                                   {activePostId === post.id && (
                                       <motion.div layoutId="activeMarker" className="absolute left-0 top-0 bottom-0 w-[4px] bg-neon-blue hidden lg:block" />
                                   )}
                                   
                                   <div className="flex items-center justify-between mb-2 md:mb-4">
                                       <span className={`font-mono text-[9px] md:text-[10px] uppercase tracking-widest transition-colors ${activePostId === post.id ? 'text-neon-blue' : 'text-white/40'}`}>
                                           BY CREATIVEIYKE
                                       </span>
                                       <span className="font-mono text-[9px] md:text-[10px] text-white/20 uppercase border border-white/10 px-2 py-1 rounded-sm">{post.category}</span>
                                   </div>
                                   
                                   <h4 className={`text-xl md:text-2xl font-black uppercase leading-[0.9] transition-colors mb-2 ${activePostId === post.id ? 'text-white' : 'text-white/60 group-hover:text-white'}`}>
                                       {post.title}
                                   </h4>

                                   <div className="mt-4 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity hidden lg:flex">
                                       <span className="text-[10px] font-mono text-neon-purple uppercase">:: Select Data</span>
                                   </div>
                                   
                                    {/* Mobile Read Indicator */}
                                    <div className="mt-4 flex lg:hidden items-center gap-2">
                                       <span className="text-[10px] font-mono text-neon-blue uppercase">Tap to Decrypt</span>
                                       <ArrowRight size={12} className="text-neon-blue" />
                                   </div>
                               </div>
                           ))}
                       </div>

                       {/* Pagination Controls */}
                       <div className="p-4 border-t border-white/10 flex justify-between items-center bg-white/5">
                            <button 
                                onClick={() => setCurrentPage(p => Math.max(0, p - 1))}
                                disabled={currentPage === 0}
                                className="p-3 hover:bg-white/10 disabled:opacity-30 disabled:hover:bg-transparent transition-colors flex items-center justify-center rounded-sm"
                            >
                                <ChevronLeft size={20} className="text-white" />
                            </button>
                            <span className="font-mono text-xs text-neon-blue font-bold tracking-widest">
                                {currentPage + 1} <span className="text-white/30">/</span> {totalPages}
                            </span>
                            <button 
                                onClick={() => setCurrentPage(p => Math.min(totalPages - 1, p + 1))}
                                disabled={currentPage === totalPages - 1}
                                className="p-3 hover:bg-white/10 disabled:opacity-30 disabled:hover:bg-transparent transition-colors flex items-center justify-center rounded-sm"
                            >
                                <ChevronRight size={20} className="text-white" />
                            </button>
                       </div>
                   </div>

                   {/* Right Pane: Visualiser (Desktop Preview) */}
                   <div className="hidden lg:flex w-2/3 relative flex-col relative">
                       {/* Background Image Layer */}
                       <div className="absolute inset-0 z-0 overflow-hidden">
                           <AnimatePresence mode="wait">
                               <motion.img 
                                   key={activePost.image}
                                   src={activePost.image}
                                   initial={{ opacity: 0, scale: 1.1 }}
                                   animate={{ opacity: 0.4, scale: 1 }}
                                   exit={{ opacity: 0 }}
                                   transition={{ duration: 0.7 }}
                                   className="w-full h-full object-cover grayscale mix-blend-luminosity"
                               />
                           </AnimatePresence>
                           <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                           <div className="absolute inset-0 cyber-grid opacity-20" />
                       </div>

                       {/* Content Layer */}
                       <div className="relative z-10 flex-1 flex flex-col justify-end p-16">
                           <div className="max-w-3xl">
                               <motion.div 
                                   key={activePost.id}
                                   initial={{ opacity: 0, y: 20 }}
                                   animate={{ opacity: 1, y: 0 }}
                                   transition={{ duration: 0.5 }}
                               >
                                   <div className="flex items-center gap-4 mb-6">
                                       <span className="px-3 py-1 border border-neon-blue/50 text-neon-blue font-mono text-xs font-bold uppercase bg-neon-blue/10 backdrop-blur-md">
                                           {activePost.category}
                                       </span>
                                   </div>

                                   <h2 className="text-6xl font-black text-white uppercase leading-none mb-8 tracking-tighter">
                                       {activePost.title}
                                   </h2>

                                   <p className="text-xl text-white/70 leading-relaxed mb-12 max-w-2xl font-light border-l-2 border-white/20 pl-6">
                                       {activePost.excerpt}
                                   </p>

                                   <div className="flex gap-6">
                                       <CyberButton variant="primary" onClick={() => setIsReading(true)}>
                                           Initialise Read Protocol
                                       </CyberButton>
                                       <button className="flex items-center gap-2 text-white/40 hover:text-white font-mono uppercase text-xs tracking-widest transition-colors">
                                            <Hash size={14} /> Copy Hash Link
                                       </button>
                                   </div>
                               </motion.div>
                           </div>
                       </div>

                       {/* Decorative Overlay Elements */}
                       <div className="absolute top-8 right-8 flex flex-col items-end gap-1">
                           <div className="flex gap-1">
                                <div className="w-1 h-1 bg-white/20" />
                                <div className="w-1 h-1 bg-white/20" />
                                <div className="w-1 h-1 bg-neon-blue" />
                           </div>
                           <span className="font-mono text-[9px] text-neon-blue uppercase">Visual Feed Active</span>
                       </div>
                   </div>
               </div>
            </div>
        </PageLayout>
    );
};

const AboutPage = () => {
  return (
    <PageLayout title={<>Architectural <br /> <span className={GRADIENT_TEXT}>Operations</span></>} subtitle="Deployment Unit">
       {/* Intro */}
       <div className="max-w-[1920px] mx-auto px-6 md:px-12 pb-16 md:pb-24">
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-light text-white/90 leading-tight max-w-5xl border-l-2 border-neon-blue pl-6 md:pl-8">
                Moving beyond aesthetics to engineer reliability. We are a deployment-focused unit dedicated to the <span className="text-neon-blue font-semibold">architecture of high-performance digital systems.</span>
            </h2>
       </div>

       {/* New Section: Studio Manifest */}
       <div className="py-20 md:py-24 border-t border-white/10 bg-white/[0.02]">
            <div className="max-w-[1920px] mx-auto px-6 md:px-12">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
                    <div className="lg:col-span-4">
                        <span className="font-mono text-neon-blue text-sm uppercase tracking-[0.3em] font-bold mb-4 block">Identity</span>
                        <h3 className="text-4xl md:text-5xl lg:text-7xl font-black text-white uppercase tracking-tighter leading-none">
                            STUDIO <br /><span className={GRADIENT_TEXT}>MANIFEST</span>
                        </h3>
                    </div>
                    <div className="lg:col-span-8">
                         <div className="space-y-6 md:space-y-8 text-lg md:text-xl text-white/70 font-light leading-relaxed columns-1 md:columns-2 gap-12">
                            <p>
                                CreativeIyke is a <span className="text-neon-blue font-semibold">full-stack digital studio</span> focused on solving real business problems through thoughtful design, reliable engineering, and modern AI technology. While many agencies stop at UX/UI design, we go further, building <span className="text-neon-blue font-semibold">complete systems</span> that are ready for real users, real data, and real growth.
                            </p>
                            <p>
                                We work across UX/UI design, frontend and backend development, WordPress, custom web applications, mobile apps, and AI-driven solutions. Our approach is always <span className="text-neon-blue font-semibold">solution-first</span>. We start by understanding the challenge, the users, and the business goals, then design and build the right technology to support them.
                            </p>
                            <p>
                                Whether you are launching a new product, modernising an existing platform, or looking to scale operations using AI and automation, we focus on <span className="text-neon-blue font-semibold">clarity, usability, and long-term value</span>. Every decision is intentional. Every feature exists for a reason.
                            </p>
                            <p>
                                CreativeIyke supports startups, SMEs, charities, and established organisations across the UK and beyond, delivering digital products that are not only visually strong, but <span className="text-neon-blue font-semibold">technically sound and commercially effective</span>.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
       </div>

       {/* Section 01: Comparison Grid - Modernized */}
       <div className="border-t border-white/10 bg-white/[0.02] py-20 md:py-32">
            <div className="max-w-[1920px] mx-auto px-6 md:px-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16">
                    {/* Left: Traditional */}
                    <div className="p-8 md:p-12 border border-white/10 bg-black/20 hover:bg-red-500/5 transition-colors duration-500 group">
                        <span className="font-mono text-xs md:text-sm text-red-500 uppercase tracking-widest mb-4 md:mb-6 block font-bold group-hover:text-red-400">THE TRADITIONAL APPROACH</span>
                        <h3 className="text-3xl md:text-5xl font-black text-white uppercase mb-6 md:mb-8 opacity-50 group-hover:opacity-100 transition-opacity">SURFACE-LEVEL DESIGN</h3>
                        <p className="text-white/60 text-base md:text-lg mb-6 md:mb-8 leading-relaxed">
                            Agencies that focus on awards over functionality. The reliance on heavy templates and visual gimmicks often creates technical debt before launch.
                        </p>
                        <ul className="space-y-4 text-base md:text-lg">
                            <li className="flex items-start gap-4 text-white/40 group-hover:text-white/60">
                                <X className="w-5 h-5 text-red-900 group-hover:text-red-500 mt-1 flex-shrink-0 transition-colors" />
                                <span>Prioritises aesthetics over logic</span>
                            </li>
                            <li className="flex items-start gap-4 text-white/40 group-hover:text-white/60">
                                <X className="w-5 h-5 text-red-900 group-hover:text-red-500 mt-1 flex-shrink-0 transition-colors" />
                                <span>Heavy use of page builders/templates</span>
                            </li>
                            <li className="flex items-start gap-4 text-white/40 group-hover:text-white/60">
                                <X className="w-5 h-5 text-red-900 group-hover:text-red-500 mt-1 flex-shrink-0 transition-colors" />
                                <span>Fragile, unscalable infrastructure</span>
                            </li>
                        </ul>
                    </div>

                    {/* Right: Solution First - Enhanced Visuals */}
                    <div className="p-8 md:p-12 gradient-border bg-neon-blue/5 relative overflow-hidden group clip-corner hover:bg-neon-blue/10 transition-colors duration-500">
                        <div className="absolute inset-0 cyber-grid opacity-10 pointer-events-none" />
                        <div className="absolute -right-20 -top-20 w-64 h-64 bg-neon-blue/20 rounded-full blur-[100px] pointer-events-none group-hover:bg-neon-blue/30 transition-colors" />
                        
                        <span className="font-mono text-xs md:text-sm text-neon-blue uppercase tracking-widest mb-4 md:mb-6 block font-bold shadow-neon">THE SOLUTION-FIRST APPROACH</span>
                        <h3 className="text-3xl md:text-5xl font-black text-white uppercase mb-6 md:mb-8">DEEP-SYSTEM ARCHITECTURE</h3>
                        <p className="text-white/90 text-lg md:text-xl mb-6 md:mb-8 leading-relaxed font-light">
                            We reverse-engineer the product from the database up. By prioritising data integrity and speed, the visual layer becomes a highly efficient interface for the core logic.
                        </p>
                        <ul className="space-y-4 text-base md:text-lg font-medium">
                            <li className="flex items-start gap-4 text-white">
                                <Check className="w-5 h-5 text-neon-green mt-1 flex-shrink-0 drop-shadow-[0_0_5px_rgba(0,255,153,0.8)]" />
                                <span>Prioritises data integrity & speed</span>
                            </li>
                            <li className="flex items-start gap-4 text-white">
                                <Check className="w-5 h-5 text-neon-green mt-1 flex-shrink-0 drop-shadow-[0_0_5px_rgba(0,255,153,0.8)]" />
                                <span>Bespoke, component-based engineering</span>
                            </li>
                            <li className="flex items-start gap-4 text-white">
                                <Check className="w-5 h-5 text-neon-green mt-1 flex-shrink-0 drop-shadow-[0_0_5px_rgba(0,255,153,0.8)]" />
                                <span>Project viability & long-term scale</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
       </div>

       {/* Section 02: Protocol Deep Dive - Increased Text Sizes */}
       <div className="py-20 md:py-32 max-w-[1920px] mx-auto px-6 md:px-12 border-t border-white/10">
            <div className="mb-16 md:mb-24 text-center md:text-left">
                <h3 className="text-4xl md:text-7xl font-black text-white uppercase mb-6 tracking-tighter">EXECUTION <span className={GRADIENT_TEXT}>PROTOCOL</span></h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    { title: "AUDIT", icon: Search, desc: "We identify technical debt and market gaps before writing a line of code." },
                    { title: "ARCHITECT", icon: Hexagon, desc: "We map user journeys and database schemas to ensure logical flow." },
                    { title: "BUILD", icon: Code2, desc: "We deploy using the Core Stack (Firebase, React) for maximum resilience." },
                    { title: "OPTIMISE", icon: Activity, desc: "We use post-launch data to refine the product for conversion." }
                ].map((step, i) => (
                    <div key={i} className="group p-8 md:p-10 gradient-border bg-white/[0.02] hover:bg-white/[0.05] transition-all duration-500 relative flex flex-col justify-between min-h-[350px] md:min-h-[400px]">
                         <div className={`absolute inset-0 bg-gradient-to-br from-neon-blue/0 to-neon-purple/0 group-hover:from-neon-blue/10 group-hover:to-neon-purple/10 transition-all duration-500 opacity-0 group-hover:opacity-100`} />
                        
                        <div className="relative z-10">
                            <div className="w-12 h-12 md:w-16 md:h-16 bg-white/5 rounded-lg flex items-center justify-center mb-8 md:mb-10 text-white/60 group-hover:text-neon-blue group-hover:bg-black border border-white/10 group-hover:border-neon-blue/50 transition-all duration-300 shadow-[0_0_0_0_rgba(0,240,255,0)] group-hover:shadow-[0_0_20px_rgba(0,240,255,0.2)]">
                                <step.icon size={28} className="md:w-8 md:h-8" />
                            </div>
                            <h4 className="text-2xl md:text-4xl font-black text-white uppercase mb-4 md:mb-6 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-neon-blue transition-all">{step.title}</h4>
                            <p className="text-white/80 text-base md:text-xl leading-relaxed font-light">{step.desc}</p>
                        </div>
                        <span className="absolute top-6 right-6 font-mono text-xl text-white/10 font-bold group-hover:text-neon-blue/50 transition-colors">0{i+1}</span>
                    </div>
                ))}
            </div>
       </div>

       {/* Section 03: The Core Stack - Consistent Headers */}
       <div className="bg-black py-20 md:py-32 border-y border-white/10">
            <div className="max-w-[1920px] mx-auto px-6 md:px-12">
                 <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 md:mb-24 gap-8">
                     <div>
                        <span className="font-mono text-neon-purple text-sm uppercase tracking-widest mb-4 block font-bold">OUR MACHINERY</span>
                        <h2 className="text-4xl md:text-7xl font-black text-white uppercase tracking-tighter">THE CORE <span className={GRADIENT_TEXT}>STACK</span></h2>
                     </div>
                 </div>

                 {/* Tech Grid - slightly polished */}
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                     {[
                        { title: "Cloud & Logic", icon: Database, color: "text-neon-blue", border: "hover:border-neon-blue/50", tools: ['Google Cloud', 'Firebase', 'Node.js', 'PostgreSQL', 'Docker', 'Vercel'] },
                        { title: "Frontend", icon: Monitor, color: "text-neon-purple", border: "hover:border-neon-purple/50", tools: ['React 19', 'Next.js', 'TypeScript', 'Tailwind', 'Framer Motion', 'Three.js'] },
                        { title: "Integration", icon: Network, color: "text-neon-pink", border: "hover:border-neon-pink/50", tools: ['Stripe', 'SendGrid', 'Twilio', 'Algolia', 'OpenAI', 'Sentry'] }
                     ].map((stack) => (
                         <div key={stack.title} className="border-t border-white/20 pt-8 group">
                             <h3 className="text-2xl md:text-3xl font-bold text-white mb-6 md:mb-8 flex items-center gap-4 uppercase">
                                <stack.icon className={stack.color} size={24} className="md:w-7 md:h-7" /> {stack.title}
                             </h3>
                             <div className="grid grid-cols-2 gap-4">
                                 {stack.tools.map(t => (
                                     <div key={t} className={`p-3 md:p-4 border border-white/10 bg-white/[0.02] text-white/70 font-mono text-xs md:text-sm ${stack.border} hover:text-white transition-all cursor-default hover:bg-white/5`}>
                                         {t}
                                     </div>
                                 ))}
                             </div>
                         </div>
                     ))}
                 </div>
            </div>
       </div>

       {/* Section 04: Operating Principles - Consistent Headers */}
       <div className="py-20 md:py-32 max-w-[1920px] mx-auto px-6 md:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
                <div className="lg:col-span-5">
                    <h2 className="text-4xl md:text-7xl font-black text-white uppercase leading-none mb-8 tracking-tighter">
                        OPERATING <br /> <span className={GRADIENT_TEXT}>PRINCIPLES</span>
                    </h2>
                </div>
                <div className="lg:col-span-7 space-y-6 md:space-y-10">
                    {[
                        { 
                          title: "ARCHITECTURE OVER AESTHETICS", 
                          desc: "We do not skin a project until the bones are solid. The database structure dictates the user interface, not the other way around. Form follows function, but data defines the form." 
                        },
                        { 
                          title: "SPEED AS A FEATURE", 
                          desc: "Latency is a bug. We engineer for sub-100ms interactions using optimistic UI patterns and edge caching. Every millisecond saved is a direct increase in user trust." 
                        },
                        { 
                          title: "TRANSPARENT SCALABILITY", 
                          desc: "We build for where you will be in 5 years. No 'throwaway' MVP code. We build the foundation right the first time. Future-proofing is not an option; it is a standard." 
                        }
                    ].map((p, i) => (
                        <div key={i} className="flex gap-4 md:gap-8 group hover:bg-white/[0.02] p-4 md:p-8 -mx-4 md:-mx-8 rounded-lg transition-colors border-l-2 border-transparent hover:border-neon-blue">
                             <div className="font-mono text-neon-blue font-bold text-xl md:text-2xl pt-1">0{i+1}</div>
                             <div>
                                 <h3 className="text-2xl md:text-4xl font-black text-white uppercase mb-2 md:mb-4 group-hover:text-neon-blue transition-colors">{p.title}</h3>
                                 <p className="text-white/70 leading-relaxed font-light text-lg md:text-xl">{p.desc}</p>
                             </div>
                        </div>
                    ))}
                </div>
            </div>
       </div>

       {/* Section 05: Global Reach - Modernized with Map */}
       <div className="border-t border-white/10 bg-black relative overflow-hidden py-20 md:py-48">
            {/* Background Map Effect */}
            <div className="absolute inset-0 opacity-20 pointer-events-none mix-blend-screen bg-center bg-no-repeat bg-contain" 
                 style={{ backgroundImage: `url('https://upload.wikimedia.org/wikipedia/commons/2/2f/World_map_blank_black.svg')`, filter: 'invert(1)' }} 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black" />
            
            <div className="max-w-[1920px] mx-auto px-6 md:px-12 relative z-10">
                 <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-end">
                      {/* Left Side: Title */}
                      <div className="lg:col-span-5 flex flex-col items-start text-left">
                          <span className="font-mono text-neon-blue text-sm uppercase tracking-[0.3em] font-bold mb-6 animate-pulse">Network Status: Online</span>
                          <h2 className="text-4xl md:text-8xl font-black text-white uppercase tracking-tighter mb-8 leading-[0.9]">GLOBAL <br /><span className={GRADIENT_TEXT}>OPERATIONS</span></h2>
                      </div>

                      {/* Right Side: Cards */}
                      <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 w-full">
                           <div className="group p-6 md:p-8 border border-white/10 bg-black/60 backdrop-blur-md hover:border-neon-blue/50 transition-all clip-corner">
                               <span className="block text-neon-blue font-mono text-sm uppercase tracking-widest mb-4 font-bold group-hover:text-white transition-colors">HQ Coordinates</span>
                               <span className="block text-3xl md:text-5xl font-black text-white uppercase mb-4">BIRMINGHAM</span>
                               <div className="flex items-center gap-4 text-white/50 font-mono text-xs">
                                   <span>52.4725° N</span>
                                   <div className="w-1 h-1 bg-neon-blue rounded-full" />
                                   <span>1.9226° W</span>
                               </div>
                           </div>

                           <div className="group p-6 md:p-8 border border-white/10 bg-black/60 backdrop-blur-md hover:border-neon-purple/50 transition-all clip-corner">
                               <span className="block text-neon-purple font-mono text-sm uppercase tracking-widest mb-4 font-bold group-hover:text-white transition-colors">Remote Nodes</span>
                               <span className="block text-3xl md:text-5xl font-black text-white uppercase mb-4">WORLDWIDE</span>
                               <div className="flex items-center gap-4 text-white/50 font-mono text-xs">
                                   <span>EMEA ZONE</span>
                                   <div className="w-1 h-1 bg-neon-purple rounded-full" />
                                   <span>AMER ZONE</span>
                               </div>
                           </div>
                      </div>
                 </div>
            </div>
       </div>

       {/* Final Call to Action - Gradient Update */}
       <div className="py-20 md:py-48 px-6 md:px-12 bg-gradient-to-b from-black to-obsidian border-t border-white/10">
            <div className="max-w-6xl mx-auto text-center">
                 <span className="font-mono text-neon-blue text-xs md:text-sm uppercase tracking-[0.3em] font-bold mb-6 md:mb-8 block">Project Initiation</span>
                 <h2 className="text-4xl md:text-9xl font-black text-white uppercase tracking-tighter mb-12 md:mb-16 leading-[0.8]">
                    Ready to <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-neon-purple">Architect?</span>
                 </h2>
                 
                 <div className="w-full max-w-3xl mx-auto text-left">
                     <HeroAIWidget />
                 </div>
            </div>
       </div>
    </PageLayout>
  );
};

// --- Mobile Fixed Menu (2048 Style) ---

const MobileFixedMenu = ({ openAIModal }: { openAIModal: () => void }) => {
  return (
    <motion.div 
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ delay: 1, type: "spring", stiffness: 200, damping: 20 }}
      className="fixed bottom-0 left-0 right-0 z-[140] p-3 pb-5 md:hidden pointer-events-none"
    >
      {/* Background Gradient for legibility */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-obsidian via-obsidian/90 to-transparent pointer-events-none -z-10" />

      <div className="flex gap-3 pointer-events-auto">
        {/* CALL_HQ Tile */}
        <a href="tel:+447311188777" className="flex-1 h-14 relative group interactive shadow-lg shadow-neon-green/5">
            <div className="absolute inset-0 bg-obsidian/90 border border-white/20 backdrop-blur-xl clip-corner transition-all group-active:scale-95 duration-200" />
            <div className="absolute inset-0 flex items-center justify-between px-4">
                <div className="flex flex-col items-start leading-none gap-1">
                     <span className="font-mono text-[9px] text-neon-green uppercase tracking-widest font-bold animate-pulse">SYS.VOICE</span>
                     <span className="font-bold text-white tracking-wider text-sm">CALL_HQ</span>
                </div>
                {/* 2048-style decoration */}
                <div className="w-6 h-6 grid grid-cols-2 gap-[2px] opacity-80">
                    <div className="bg-neon-green rounded-[1px]" />
                    <div className="bg-white/10 rounded-[1px]" />
                    <div className="bg-white/20 rounded-[1px]" />
                    <div className="bg-white/5 rounded-[1px]" />
                </div>
            </div>
        </a>

        {/* INITIALISE Tile */}
        <button onClick={openAIModal} className="flex-1 h-14 relative group interactive shadow-lg shadow-neon-blue/20">
            <div className="absolute inset-0 bg-neon-blue border border-neon-blue clip-corner transition-all group-active:scale-95 duration-200" />
            <div className="absolute inset-0 flex items-center justify-between px-4">
                 <div className="flex flex-col items-start leading-none gap-1">
                     <span className="font-mono text-[9px] text-black/60 uppercase tracking-widest font-bold">SYS.AI</span>
                     <span className="font-bold text-black tracking-wider text-sm">INITIALISE</span>
                </div>
                {/* 2048-style decoration */}
                <div className="w-6 h-6 grid grid-cols-2 gap-[2px]">
                    <div className="bg-black rounded-[1px]" />
                    <div className="bg-black/40 rounded-[1px]" />
                    <div className="bg-black/20 rounded-[1px]" />
                    <div className="bg-black rounded-[1px]" />
                </div>
            </div>
        </button>
      </div>
    </motion.div>
  );
};

// --- Footer ---

const Footer = ({ setPage }: { setPage: (p: PageId) => void }) => {
   return (
      <footer className="bg-black border-t border-white/10 pt-20 md:pt-32 pb-12 relative overflow-hidden">
         <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-full bg-white/10 hidden md:block" />
         
         <div className="max-w-[1920px] mx-auto px-6 md:px-12 relative z-10">
            <div className="flex flex-col md:flex-row justify-between items-start mb-16 md:mb-32 gap-12">
               <div className="md:w-1/2">
                  <CyberLogo className="w-16 h-16 md:w-24 md:h-24 text-white mb-8 md:mb-12" />
                  <h2 className="text-4xl md:text-8xl font-black text-white uppercase tracking-tighter max-w-3xl mb-8 md:mb-12 leading-[0.9]">
                     Rewrite the <span className={GRADIENT_TEXT}>Scale</span>.
                  </h2>
                  <div className="font-mono text-xs md:text-sm text-white/40 max-w-md leading-relaxed">
                     CREATIVEIYKE ARCHITECTURAL DIVISION. <br/>
                     EST. 2024 // UPDATED 2026 // BIRMINGHAM // LONDON
                  </div>
               </div>
               
               <div className="grid grid-cols-2 gap-8 md:gap-24 text-left md:text-right mt-0 md:mt-24 w-full md:w-1/2">
                  <div className="flex flex-col gap-4 md:gap-6">
                     <span className="font-mono text-sm text-neon-blue font-bold uppercase tracking-widest">Navigation</span>
                     {[
                        { id: 'services', label: 'Matrix' },
                        { id: 'industries', label: 'Sectors' },
                        { id: 'process', label: 'Protocol' },
                        { id: 'case-studies', label: 'Assets' },
                        { id: 'insights', label: 'Insights' },
                        { id: 'about', label: 'Studio' },
                     ].map((item) => (
                        <button 
                           key={item.id} 
                           onClick={() => { setPage(item.id as PageId); window.scrollTo({top:0, behavior:'smooth'}); }}
                           className="text-white/70 hover:text-white uppercase font-bold text-base md:text-xl transition-colors text-left md:text-right"
                        >
                           {item.label}
                        </button>
                     ))}
                  </div>
                  <div className="flex flex-col gap-4 md:gap-6">
                     <span className="font-mono text-sm text-neon-blue font-bold uppercase tracking-widest">Sectors</span>
                     {['FINTECH', 'SAAS', 'HEALTHTECH', 'PROPTECH', 'EDTECH', 'ECOMTECH'].map(l => (
                        <button key={l} className="text-white/70 hover:text-white uppercase font-bold text-base md:text-xl transition-colors text-left md:text-right">{l}</button>
                     ))}
                  </div>
               </div>
            </div>

            <div className="pt-8 md:pt-12 border-t border-white/10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 md:gap-6 font-mono text-[10px] md:text-xs text-white/30 uppercase tracking-widest">
               <span>© 2026 CREATIVEIYKE. ALL RIGHTS RESERVED.</span>
               <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-neon-green rounded-full animate-pulse shadow-[0_0_10px_#00FF99]" />
                  <span className="text-white">System Optimal</span>
               </div>
            </div>
         </div>
      </footer>
   );
};

// --- App Root ---

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<PageId>('home');
  const [isAIModalOpen, setIsAIModalOpen] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [currentPage]);

  return (
    <div className="bg-obsidian min-h-screen text-white selection:bg-neon-blue selection:text-black font-sans relative overflow-x-hidden">
      <div className="scanlines" />
      <TargetingCursor />
      <HUDOverlay />
      
      {/* Mobile Footer Menu (Fixed) */}
      <MobileFixedMenu openAIModal={() => setIsAIModalOpen(true)} />

      <AnimatePresence>
        {isAIModalOpen && <AIModal onClose={() => setIsAIModalOpen(false)} />}
      </AnimatePresence>

      <Header setPage={setCurrentPage} currentPage={currentPage} openAIModal={() => setIsAIModalOpen(true)} />
      
      <main className="relative z-10 pb-20 md:pb-0">
        <AnimatePresence mode="wait">
          {currentPage === 'home' && <HomePage key="home" setPage={setCurrentPage} />}
          {currentPage === 'services' && <ServicesPage key="services" />}
          {currentPage === 'industries' && <IndustriesPage key="industries" />}
          {currentPage === 'process' && <ProcessPage key="process" />}
          {currentPage === 'case-studies' && <CaseStudiesPage key="case-studies" />}
          {currentPage === 'insights' && <InsightsPage key="insights" />}
          {currentPage === 'about' && <AboutPage key="about" />}
        </AnimatePresence>
      </main>

      <Footer setPage={setCurrentPage} />
    </div>
  );
};

export default App;
