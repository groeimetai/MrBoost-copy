import { motion } from "framer-motion";
import { useRef } from "react";
import { CustomCursor } from "@/components/CustomCursor";
import { NoiseOverlay } from "@/components/NoiseOverlay";
import { AnimeLetterReveal } from "@/components/AnimeLetterReveal";
import { Code, Palette, Sparkles } from "lucide-react";

const About = () => {
  const teamMembers = [
    { name: "Team Member 1", role: "Creative Director", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop" },
    { name: "Team Member 2", role: "Developer", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop" },
    { name: "Team Member 3", role: "Designer", image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&h=400&fit=crop" },
    { name: "Team Member 4", role: "Developer", image: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=400&h=400&fit=crop" },
    { name: "Team Member 5", role: "Marketing", image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop" },
    { name: "Team Member 6", role: "Designer", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop" },
  ];

  const services = [
    {
      icon: Sparkles,
      title: "UI/UX Design",
      description: "Award winning websites by focusing on digital experience",
    },
    {
      icon: Code,
      title: "Development",
      description: "Cutting-edge web applications built with modern technology",
    },
    {
      icon: Palette,
      title: "Branding",
      description: "Creative brand identities that stand out",
    },
  ];

  const clients = [
    "Dunkin'", "Vandal", "Land Rover", "Grolsch", "Finca", "ConFuego",
    "ChristenUnie", "BrainBakery", "Asahi", "BP", "1NUL8", "Avia",
    "GoVolt", "Foodticket", "Delfts Blauw", "Jumbo", "Karvan Cévitam",
    "Gloow", "Sjiek", "Sven Scholten"
  ];

  return (
    <div className="min-h-screen bg-background cursor-none relative">
      <CustomCursor />
      <NoiseOverlay />

      {/* Top Ticker - MrBoost Style */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-background overflow-hidden">
        <div className="relative h-12 flex items-center border-b border-creme/20">
          <div className="absolute left-0 z-10 bg-background pr-12 pl-6 h-full flex items-center border-r border-creme/20">
            <span
              className="uppercase text-creme whitespace-nowrap italic"
              style={{
                fontFamily: "'Gilroy-Bold', 'Gilroy', Arial, sans-serif",
                fontWeight: 900,
                fontSize: '15px',
                lineHeight: '24px',
                letterSpacing: '0',
                color: 'rgb(234, 229, 219)'
              }}
            >
              ABOUT US
            </span>
          </div>
        </div>
      </div>

      {/* Fixed Navigation */}
      <div className="fixed top-12 left-0 right-0 z-40 px-6 py-6 bg-transparent pointer-events-none">
        <div className="flex justify-center items-center gap-0 relative pointer-events-auto">
          <motion.a
            href="/"
            whileHover={{ backgroundColor: "rgb(168, 85, 247)" }}
            className="border border-creme w-12 h-12 flex items-center justify-center bg-black transition-colors duration-300 cursor-pointer"
          >
            <span className="text-2xl font-bold italic text-creme" style={{ fontFamily: "'Gilroy-Bold', 'Gilroy', sans-serif" }}>B</span>
          </motion.a>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-32 pb-20">
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-6xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mb-12"
            >
              <span className="text-creme text-xs font-medium tracking-[0.2em] uppercase">
                About MrBoost
              </span>
            </motion.div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-16 leading-[1.1] italic text-creme">
              <AnimeLetterReveal
                text="DRIVEN BY TEAMWORK"
                className="block"
                delay={400}
                staggerDelay={35}
                triggerOnScroll={false}
              />
              <AnimeLetterReveal
                text="DIGITAL SOLUTIONS"
                className="block"
                delay={900}
                staggerDelay={35}
                triggerOnScroll={false}
              />
              <AnimeLetterReveal
                text="& THE PEOPLE THAT USE THEM"
                className="block"
                delay={1400}
                staggerDelay={35}
                triggerOnScroll={false}
              />
            </h1>
          </div>
        </div>
      </section>

      {/* Meet the Boosters Section */}
      <section className="py-32 relative">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl md:text-6xl font-bold mb-6 italic text-creme">
              Meet the Boosters
            </h2>
            <p className="text-xl text-creme max-w-2xl mx-auto">
              Our talented team of designers, developers, and strategists
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.1,
                  ease: [0.22, 1, 0.36, 1]
                }}
              >
                <motion.div
                  whileHover={{
                    y: -8,
                    scale: 1.02,
                    transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] }
                  }}
                  className="group relative overflow-hidden cursor-pointer border border-border hover:border-creme transition-all duration-300"
                >
                  <div className="aspect-square overflow-hidden">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="absolute inset-0 bg-background/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center">
                    <h3 className="text-2xl font-bold mb-2 italic text-creme">{member.name}</h3>
                    <p className="text-creme/70">{member.role}</p>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Services Section */}
      <section className="py-32 relative">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl md:text-6xl font-bold mb-6 italic text-creme">
              What We Do
            </h2>
            <p className="text-xl text-creme max-w-2xl mx-auto">
              Award winning websites by focusing on digital experience
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.1,
                  ease: [0.22, 1, 0.36, 1]
                }}
              >
                <motion.div
                  whileHover={{
                    y: -8,
                    transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] }
                  }}
                  className="group p-8 bg-card border border-border hover:border-creme transition-all duration-300 cursor-pointer h-full"
                >
                  <service.icon className="w-16 h-16 text-creme mb-6 group-hover:scale-110 transition-transform duration-300" />
                  <h3 className="text-3xl font-semibold mb-4 text-creme">{service.title}</h3>
                  <p className="text-creme/70 text-lg">{service.description}</p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Clients Section */}
      <section className="py-32 relative">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl md:text-6xl font-bold mb-6 italic text-creme">
              Clients aka Friends
            </h2>
            <p className="text-xl text-creme max-w-2xl mx-auto">
              We've had the privilege of working with amazing brands
            </p>
          </motion.div>

          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {clients.map((client, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.4,
                    delay: index * 0.05,
                    ease: [0.22, 1, 0.36, 1]
                  }}
                  whileHover={{
                    scale: 1.05,
                    y: -4,
                    transition: { duration: 0.2 }
                  }}
                  className="p-6 bg-card border border-border hover:border-creme transition-all duration-300 cursor-pointer flex items-center justify-center"
                >
                  <span
                    className="text-creme italic font-bold text-center"
                    style={{
                      fontFamily: "'Gilroy-Bold', 'Gilroy', Arial, sans-serif",
                      fontSize: '16px',
                      fontWeight: 900
                    }}
                  >
                    {client}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 relative">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <h2 className="text-5xl md:text-6xl font-bold mb-8 italic text-creme">
                Ready to Boost Your Brand?
              </h2>
              <p className="text-xl text-creme mb-12">
                Let's create something amazing together
              </p>
              <motion.a
                href="/contact"
                initial="initial"
                whileHover="hover"
                whileTap={{ scale: 0.98 }}
                className="inline-block px-8 py-3 rounded-none border border-creme relative overflow-hidden bg-transparent text-creme font-medium tracking-wide group cursor-pointer text-lg"
              >
                <motion.span
                  className="relative z-10"
                  variants={{
                    initial: { color: "rgb(234, 229, 219)" },
                    hover: { color: "rgb(0, 0, 0)" }
                  }}
                  transition={{ duration: 0.3 }}
                >
                  Get In Touch
                </motion.span>
                <motion.div
                  className="absolute inset-0 bg-[#cac4b8]"
                  variants={{
                    initial: { y: "100%" },
                    hover: { y: "0%" }
                  }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  style={{ transformStyle: "preserve-3d" }}
                />
              </motion.a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="">
        <div className="grid grid-cols-1 md:grid-cols-3 divide-x divide-border">
          <div className="flex items-center justify-center md:justify-start px-6 py-8 md:py-12">
            <p className="text-sm text-creme">
              © All Rights Reserved
            </p>
          </div>
          <div className="flex items-center justify-center px-6 py-8 md:py-12 border-t md:border-t-0 border-border">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
              <span className="text-sm text-creme underline">Beschikbaar voor nieuwe projecten</span>
            </div>
          </div>
          <div className="flex items-center justify-center md:justify-end gap-6 px-6 py-8 md:py-12 border-t md:border-t-0 border-border">
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
      </footer>
    </div>
  );
};

export default About;
