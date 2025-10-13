import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Sparkles, Palette, Code, Megaphone, Menu, ArrowDown } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { AnimatedSection } from "@/components/AnimatedSection";
import { CustomCursor } from "@/components/CustomCursor";
import { Spotlight } from "@/components/Spotlight";
import { NoiseOverlay } from "@/components/NoiseOverlay";
import project1 from "@/assets/project-1.jpg";
import project2 from "@/assets/project-2.jpg";
import project3 from "@/assets/project-3.jpg";
import project4 from "@/assets/project-4.jpg";

const Index = () => {
  const [currentProject, setCurrentProject] = useState(0);
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.3], [1, 0.95]);
  
  const tickerProjects = [
    "Website experience INFOCASTER",
    "Vormgeven Gin etiketten RBL-ANN",
    "Re-branding DOUCHE-CONCURRENT",
    "Videocommercial GOVOLT",
    "Website lancering Europa Park",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentProject((prev) => (prev + 1) % tickerProjects.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const services = [
    {
      icon: Code,
      title: "Web Development",
      description: "Cutting-edge websites and applications built with the latest technologies.",
    },
    {
      icon: Palette,
      title: "Brand Design",
      description: "Memorable visual identities that resonate with your audience.",
    },
    {
      icon: Sparkles,
      title: "Digital Experience",
      description: "Immersive experiences that engage and delight users.",
    },
    {
      icon: Megaphone,
      title: "Digital Marketing",
      description: "Strategic campaigns that drive growth and visibility.",
    },
  ];

  const portfolioProjects = [
    { image: project1, title: "E-Commerce Platform", category: "Web Development" },
    { image: project2, title: "Mobile Banking App", category: "App Design" },
    { image: project3, title: "Brand Identity System", category: "Branding" },
    { image: project4, title: "Digital Marketplace", category: "Full Stack" },
  ];

  return (
    <div className="min-h-screen bg-background cursor-none">
      <CustomCursor />
      <Spotlight />
      <NoiseOverlay />
      {/* Top Ticker */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-background border-b border-border overflow-hidden">
        <div className="flex items-center h-10">
          <div className="flex animate-marquee whitespace-nowrap">
            {[...Array(3)].map((_, i) => (
              <span key={i} className="text-xs font-medium tracking-wider px-8">
                NOW CREATING &nbsp;&nbsp; Website experience INFOCASTER &nbsp;|&nbsp; Vormgeven Gin etiketten RBL-ANN &nbsp;|&nbsp; Re-branding DOUCHE-CONCURRENT &nbsp;|&nbsp; Videocommercial GOVOLT &nbsp;|&nbsp; Website lancering Europa Park &nbsp;|&nbsp;
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Fixed Navigation */}
      <div className="fixed top-12 left-0 right-0 z-40 px-6 py-6">
        <div className="flex justify-center items-center gap-0">
          {/* Logo */}
          <div className="border border-creme w-12 h-12 flex items-center justify-center bg-transparent">
            <span className="text-xl font-bold text-creme">B</span>
          </div>
          
          {/* Menu */}
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="border-t border-r border-b border-creme w-12 h-12 flex items-center justify-center hover:bg-creme hover:text-background transition-all duration-300 group"
          >
            <div className="flex flex-col gap-1">
              <motion.div 
                className="w-5 h-px bg-current"
                initial={{ width: 20 }}
                whileHover={{ width: 24 }}
                transition={{ duration: 0.2 }}
              />
              <motion.div 
                className="w-5 h-px bg-current"
                initial={{ width: 20 }}
                whileHover={{ width: 16 }}
                transition={{ duration: 0.2 }}
              />
              <motion.div 
                className="w-5 h-px bg-current"
                initial={{ width: 20 }}
                whileHover={{ width: 24 }}
                transition={{ duration: 0.2 }}
              />
            </div>
          </motion.button>
        </div>
      </div>

      {/* Hero Section */}
      <motion.section 
        ref={heroRef}
        style={{ opacity, scale }}
        className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
      >
        {/* Starburst rays effect */}
        <div className="absolute inset-0 overflow-hidden">
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1920 1080" preserveAspectRatio="xMidYMid slice">
            <defs>
              <radialGradient id="ray-gradient">
                <stop offset="0%" stopColor="rgba(16, 185, 129, 0.15)" />
                <stop offset="50%" stopColor="rgba(31, 41, 55, 0.08)" />
                <stop offset="100%" stopColor="rgba(0, 0, 0, 0)" />
              </radialGradient>
            </defs>
            <g transform="translate(960, 540)">
              {[...Array(32)].map((_, i) => {
                const angle = (i * 11.25) * Math.PI / 180;
                const x2 = Math.cos(angle) * 2500;
                const y2 = Math.sin(angle) * 2500;
                return (
                  <motion.line
                    key={i}
                    x1="0"
                    y1="0"
                    x2={x2}
                    y2={y2}
                    stroke="url(#ray-gradient)"
                    strokeWidth={i % 2 === 0 ? "2" : "1"}
                    opacity={i % 3 === 0 ? 0.4 : 0.25}
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: i % 3 === 0 ? 0.4 : 0.25 }}
                    transition={{ 
                      duration: 2,
                      delay: i * 0.05,
                      ease: [0.22, 1, 0.36, 1]
                    }}
                  />
                );
              })}
            </g>
          </svg>
        </div>
        
        {/* Radial gradient background with parallax */}
        <motion.div 
          className="absolute inset-0"
          style={{
            y: useTransform(scrollYProgress, [0, 0.5], [0, -100]),
          }}
        >
          <div 
            className="absolute inset-0 opacity-20"
            style={{
              background: 'radial-gradient(circle at center, transparent 0%, transparent 45%, rgba(255,255,255,0.03) 45%, rgba(255,255,255,0.03) 45.5%, transparent 45.5%), radial-gradient(circle at center, transparent 0%, transparent 48%, rgba(255,255,255,0.03) 48%, rgba(255,255,255,0.03) 48.5%, transparent 48.5%), radial-gradient(circle at center, transparent 0%, transparent 51%, rgba(255,255,255,0.03) 51%, rgba(255,255,255,0.03) 51.5%, transparent 51.5%), radial-gradient(circle at center, transparent 0%, transparent 54%, rgba(255,255,255,0.03) 54%, rgba(255,255,255,0.03) 54.5%, transparent 54.5%), radial-gradient(circle at center, transparent 0%, transparent 57%, rgba(255,255,255,0.03) 57%, rgba(255,255,255,0.03) 57.5%, transparent 57.5%), radial-gradient(circle at center, transparent 0%, transparent 60%, rgba(255,255,255,0.03) 60%, rgba(255,255,255,0.03) 60.5%, transparent 60.5%)',
            }}
          />
        </motion.div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-6xl mx-auto text-center">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mb-12"
            >
              <span className="text-creme text-xs font-medium tracking-[0.2em] uppercase">
                Creative agency
              </span>
            </motion.div>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-16 leading-[1.1] italic text-creme">
              <motion.span className="inline-block">
                {"WE DESIGN UNIQUE".split("").map((char, index) => (
                  <motion.span
                    key={`line1-${index}`}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.7,
                      delay: 0.4 + index * 0.03,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="inline-block"
                  >
                    {char === " " ? "\u00A0" : char}
                  </motion.span>
                ))}
              </motion.span>
              <br />
              <motion.span className="inline-block">
                {"GRAPHIC AND WEB".split("").map((char, index) => (
                  <motion.span
                    key={`line2-${index}`}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.7,
                      delay: 0.9 + index * 0.03,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="inline-block"
                  >
                    {char === " " ? "\u00A0" : char}
                  </motion.span>
                ))}
              </motion.span>
              <br />
              <motion.span className="inline-block">
                {"EXPERIENCES".split("").map((char, index) => (
                  <motion.span
                    key={`line3-${index}`}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.7,
                      delay: 1.4 + index * 0.03,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="inline-block"
                  >
                    {char === " " ? "\u00A0" : char}
                  </motion.span>
                ))}
              </motion.span>
            </h1>
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 2, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col gap-0 justify-center items-center max-w-sm mx-auto w-full"
            >
              <motion.div 
                whileHover={{ 
                  scale: 1.05, 
                  y: -4,
                  transition: { 
                    duration: 0.4,
                    ease: [0.22, 1, 0.36, 1]
                  }
                }} 
                whileTap={{ scale: 0.98 }}
                className="w-full relative group"
              >
                <button
                  className="w-full h-[50px] rounded-none border-t border-l border-r border-b-0 border-creme relative overflow-hidden bg-transparent text-creme font-medium tracking-wide transition-all duration-300"
                >
                  <span className="relative z-10 group-hover:text-background transition-colors duration-500">Cases</span>
                  <motion.div 
                    className="absolute bottom-0 left-0 right-0 bg-creme"
                    initial={{ height: "0%" }}
                    whileHover={{ height: "100%" }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  />
                </button>
              </motion.div>
              <motion.div 
                whileHover={{ 
                  scale: 1.05, 
                  y: -4,
                  transition: { 
                    duration: 0.4,
                    ease: [0.22, 1, 0.36, 1]
                  }
                }} 
                whileTap={{ scale: 0.98 }}
                className="w-full relative group"
              >
                <button
                  className="w-full h-[50px] rounded-none border-l border-r border-b border-creme relative overflow-hidden bg-transparent text-creme font-medium tracking-wide transition-all duration-300"
                >
                  <span className="relative z-10 group-hover:text-background transition-colors duration-500">Contact</span>
                  <motion.div 
                    className="absolute bottom-0 left-0 right-0 bg-creme"
                    initial={{ height: "0%" }}
                    whileHover={{ height: "100%" }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  />
                </button>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0, scale: 0 }}
          animate={{ 
            opacity: 1, 
            scale: 1,
            y: [0, -10, 0],
          }}
          transition={{ 
            opacity: { duration: 0.8, delay: 2 },
            scale: { duration: 0.8, delay: 2, type: "spring" },
            y: { 
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 3,
            }
          }}
          className="absolute bottom-12 right-12 flex flex-col items-center gap-3 cursor-pointer group"
        >
          <motion.div 
            className="relative"
            whileHover={{ scale: 1.15, y: 0 }}
            whileTap={{ scale: 0.85 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <motion.div 
              className="w-32 h-32 rounded-full flex items-center justify-center backdrop-blur-sm transition-all duration-500 relative"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              {/* Rotating text in arc */}
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 120 120">
                <defs>
                  <path
                    id="circlePath"
                    d="M 60, 60 m -50, 0 a 50,50 0 1,1 100,0 a 50,50 0 1,1 -100,0"
                  />
                  <linearGradient id="textGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#10B981" />
                    <stop offset="50%" stopColor="#A855F7" />
                    <stop offset="100%" stopColor="#EC4899" />
                  </linearGradient>
                </defs>
                <text className="text-[8px] font-medium tracking-[0.15em] uppercase" fill="url(#textGradient)">
                  <textPath href="#circlePath" startOffset="0%">
                    Scroll down · Scroll down · Scroll down · 
                  </textPath>
                </text>
              </svg>
              
              {/* Center arrow pointing down - non-rotating */}
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="flex items-center justify-center"
              >
                <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <linearGradient id="arrowGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#10B981" />
                      <stop offset="50%" stopColor="#A855F7" />
                      <stop offset="100%" stopColor="#EC4899" />
                    </linearGradient>
                  </defs>
                  <path 
                    d="M12 5v14m-7-7l7 7 7-7" 
                    stroke="url(#arrowGradient)" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  />
                </svg>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.section>

      {/* Video Section */}
      <section className="py-32 relative border-t border-border">
        <div className="container mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-5xl mx-auto"
          >
            <div className="aspect-video bg-muted relative overflow-hidden border border-border">
              {/* Logo Overlay - Top Left */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="absolute top-6 left-6 z-10 flex flex-col items-start gap-2"
              >
                <div className="border-2 border-creme w-14 h-14 flex items-center justify-center bg-background/90 backdrop-blur-sm">
                  <span className="text-2xl font-bold text-creme">B</span>
                </div>
                <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-creme">
                  NEW
                </span>
              </motion.div>
              
              <iframe 
                src="https://player.vimeo.com/video/1101440320?title=0&byline=0&portrait=0"
                className="absolute inset-0 w-full h-full"
                frameBorder="0"
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </motion.div>
        </div>
      </section>

      {/* You've Got Great Taste Section */}
      <section className="py-32 relative border-t border-border">
        <div className="px-8 md:px-12 lg:px-16">
          <div className="max-w-7xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-24">
              {/* Left Column: Title + Paragraph */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="text-left"
              >
                <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 italic leading-[1.05] tracking-tight text-creme">
                  YOU'VE GOT GREAT TASTE
                </h2>
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                  className="text-base md:text-lg text-creme leading-relaxed"
                >
                  Wij staan voor digital experiences. Al meer dan 6 jaar werken wij aan mooie projecten voor o.a Dunkin', Foodticket, GoVolt, Vandal, Grolsch, Delfts Blauw, Jumbo en 50+ andere toffe merken. Met liefde voor het vak en de creatieve skills in ons team maken wij Ideeën en doelen werkelijk. Let's boost your brand!
                </motion.p>
              </motion.div>
              
              {/* Right Column: Skills */}
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                className="text-right flex flex-col relative"
              >
                {/* Vertical line on the left */}
                <div className="absolute left-0 top-0 bottom-0 w-px bg-border" />
                
                <motion.h3 
                  className="text-xs font-medium tracking-[0.3em] uppercase mb-8 text-right text-creme pl-8"
                >
                  SKILLS
                </motion.h3>
                <motion.div 
                  className="flex flex-col gap-6 pl-8"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-50px" }}
                  variants={{
                    visible: {
                      transition: {
                        staggerChildren: 0.1,
                        delayChildren: 0.3
                      }
                    }
                  }}
                >
                  {["Web Design", "Development", "Branding", "Campaigns", "Digital strategy"].map((skill, index) => (
                    <motion.div 
                      key={index}
                      variants={{
                        hidden: { opacity: 0, x: 30 },
                        visible: { 
                          opacity: 1, 
                          x: 0,
                          transition: {
                            duration: 0.5,
                            ease: [0.22, 1, 0.36, 1]
                          }
                        }
                      }}
                      whileHover={{ 
                        x: -8,
                        transition: { 
                          duration: 0.3,
                          ease: [0.22, 1, 0.36, 1]
                        }
                      }}
                      className="cursor-pointer text-right"
                    >
                      <p className="text-xl md:text-2xl font-medium italic text-creme">{skill}</p>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Client Logos Section */}
      <section className="py-20 relative border-t border-border overflow-hidden">
        <div className="container mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="text-center mb-12"
          >
            <h3 className="text-xs font-medium tracking-[0.3em] uppercase mb-8 border-b border-border inline-block pb-4 px-8">
              Aka Friends
            </h3>
          </motion.div>
          <motion.div 
            className="flex items-center justify-center gap-16 flex-wrap"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.2,
                  delayChildren: 0.2
                }
              }
            }}
          >
            {["ChristenUnie", "ASAHI", "BP"].map((logo, index) => (
              <motion.div
                key={logo}
                variants={{
                  hidden: { 
                    opacity: 0, 
                    x: index % 2 === 0 ? -50 : 50,
                  },
                  visible: { 
                    opacity: 1, 
                    x: 0,
                    transition: {
                      duration: 0.7,
                      ease: [0.22, 1, 0.36, 1]
                    }
                  }
                }}
                whileHover={{ 
                  scale: 1.12, 
                  y: -8,
                  transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] }
                }}
                className="text-4xl md:text-5xl font-bold text-muted-foreground cursor-pointer"
              >
                {logo}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-32 relative border-t border-border">
        <div className="container mx-auto px-6 relative z-10">
          <AnimatedSection className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-bold mb-6 italic text-creme">
              What We Do
            </h2>
            <p className="text-xl text-creme max-w-2xl mx-auto">
              Full-spectrum digital services tailored to elevate your brand
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card 
                  className="group p-8 bg-card border-border hover:border-creme transition-all duration-300 cursor-pointer h-full"
                >
                  <service.icon className="w-12 h-12 text-creme mb-6 group-hover:scale-110 transition-transform duration-300" />
                  <h3 className="text-2xl font-semibold mb-4 text-creme">{service.title}</h3>
                  <p className="text-creme">{service.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section className="py-32 relative border-t border-border">
        <div className="container mx-auto px-6">
          <AnimatedSection className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-bold mb-6 italic text-creme">
              Featured Work
            </h2>
            <p className="text-xl text-creme max-w-2xl mx-auto">
              A selection of our most impactful projects
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {portfolioProjects.map((project, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                whileHover={{ y: -12 }}
                animate={{ 
                  y: [0, -8, 0],
                }}
                transition={{
                  opacity: { duration: 0.6, delay: index * 0.15 },
                  scale: { duration: 0.6, delay: index * 0.15 },
                  y: {
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: index * 0.2
                  }
                }}
                className="group relative overflow-hidden cursor-pointer border border-border hover:border-creme transition-all duration-300"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img 
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="absolute inset-0 bg-background/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="text-center p-8">
                    <span className="text-creme text-sm font-medium tracking-wider uppercase mb-2 block">
                      {project.category}
                    </span>
                    <h3 className="text-3xl font-bold mb-4 italic text-creme">{project.title}</h3>
                    <Button variant="outline" size="sm">
                      View Project
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-32 relative border-t border-border">
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <AnimatedSection>
              <h2 className="text-5xl md:text-6xl font-bold mb-8 italic text-creme">
                We're Not Just Designers.
                <span className="block mt-4">
                  We're Digital Storytellers.
                </span>
              </h2>
            </AnimatedSection>
            <AnimatedSection delay={0.2}>
              <p className="text-xl text-creme mb-12 leading-relaxed">
                With a passion for innovation and an eye for detail, we transform brands through 
                creative design, strategic thinking, and cutting-edge technology. Our mission is 
                to create digital experiences that not only look stunning but deliver real results.
              </p>
            </AnimatedSection>
            <AnimatedSection delay={0.4}>
              <motion.div 
                whileHover={{ scale: 1.08, y: -5 }} 
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <Button variant="outline" size="lg" className="relative overflow-hidden group">
                  <span className="relative z-10 transition-colors duration-300 group-hover:text-background">Learn More About Us</span>
                  <motion.div 
                    className="absolute inset-0 bg-accent"
                    initial={{ x: "-100%", skewX: -20 }}
                    whileHover={{ x: 0, skewX: 0 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  />
                </Button>
              </motion.div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 relative border-t border-border">
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <AnimatedSection>
                <h2 className="text-5xl md:text-6xl font-bold mb-8 italic leading-tight text-creme">
                  READY FOR A BOOST?
                </h2>
                <motion.div 
                  whileHover={{ scale: 1.08, y: -5 }} 
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <Button variant="outline" size="lg" className="group relative overflow-hidden">
                    <span className="relative z-10 flex items-center transition-colors duration-300 group-hover:text-background">
                      Get In Touch
                      <ArrowRight className="ml-2 group-hover:translate-x-2 transition-transform duration-300" />
                    </span>
                    <motion.div 
                      className="absolute inset-0 bg-accent"
                      initial={{ x: "-100%", skewX: -20 }}
                      whileHover={{ x: 0, skewX: 0 }}
                      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    />
                  </Button>
                </motion.div>
              </AnimatedSection>
              <AnimatedSection delay={0.2}>
                <motion.div 
                  className="aspect-[4/3] bg-muted rounded-none overflow-hidden border border-border cursor-pointer"
                  whileHover={{ scale: 1.03, borderColor: "rgb(74, 222, 128)" }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                >
                  <motion.img 
                    src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop" 
                    alt="Team collaboration"
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  />
                </motion.div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12">
        <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
            <div className="flex flex-col gap-4">
              <p className="text-sm text-creme">
                © All Rights Reserved
              </p>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-accent"></div>
                <span className="text-sm text-accent">Beschikbaar voor nieuwe projecten</span>
              </div>
            </div>
            
            <div className="flex gap-6">
              <motion.a 
                href="#" 
                className="text-creme hover:text-accent transition-colors"
                whileHover={{ scale: 1.2, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22 7.5c0-.3-.2-.5-.5-.5h-3c-.3 0-.5.2-.5.5v9c0 .3.2.5.5.5h3c.3 0 .5-.2.5-.5v-9zm-4-2c0-.3-.2-.5-.5-.5h-3c-.3 0-.5.2-.5.5v11c0 .3.2.5.5.5h3c.3 0 .5-.2.5-.5v-11zm-8-3c0-.3-.2-.5-.5-.5h-3c-.3 0-.5.2-.5.5v16c0 .3.2.5.5.5h3c.3 0 .5-.2.5-.5v-16z"/>
                </svg>
              </motion.a>
              <motion.a 
                href="#" 
                className="text-creme hover:text-accent transition-colors"
                whileHover={{ scale: 1.2, rotate: -5 }}
                whileTap={{ scale: 0.9 }}
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </motion.a>
              <motion.a 
                href="#" 
                className="text-creme hover:text-accent transition-colors"
                whileHover={{ scale: 1.2, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </motion.a>
            </div>
          </div>
        </div>
      </footer>

      {/* WhatsApp Button */}
      <motion.a 
        href="https://wa.me/1234567890" 
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-8 right-8 z-50 w-14 h-14 bg-green-500 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg"
        whileHover={{ scale: 1.1, rotate: 5 }}
        whileTap={{ scale: 0.9 }}
        animate={{ y: [0, -10, 0] }}
        transition={{ 
          y: { duration: 2, repeat: Infinity, ease: "easeInOut" },
        }}
      >
        <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      </motion.a>
    </div>
  );
};

export default Index;
