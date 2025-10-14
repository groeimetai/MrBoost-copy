import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { CustomCursor } from "@/components/CustomCursor";
import { NoiseOverlay } from "@/components/NoiseOverlay";
import { AnimeLetterReveal } from "@/components/AnimeLetterReveal";

const Cases = () => {
  const cases = [
    { client: "Dunkin'", category: "Website Experience", year: "2024" },
    { client: "GoVolt", category: "Videocommercial", year: "2024" },
    { client: "Vandal", category: "Branding & Web Design", year: "2023" },
    { client: "Grolsch", category: "Campaign Design", year: "2023" },
    { client: "Foodticket", category: "Digital Platform", year: "2023" },
    { client: "Delfts Blauw", category: "E-commerce", year: "2023" },
    { client: "Jumbo", category: "Marketing Campaign", year: "2022" },
    { client: "Land Rover", category: "Web Experience", year: "2022" },
    { client: "Finca", category: "Brand Identity", year: "2022" },
    { client: "ConFuego", category: "Web Design", year: "2022" },
    { client: "ChristenUnie", category: "Digital Strategy", year: "2021" },
    { client: "BrainBakery", category: "UX Design", year: "2021" },
    { client: "Asahi", category: "Campaign", year: "2021" },
    { client: "BP", category: "Digital Experience", year: "2021" },
    { client: "Avia", category: "Branding", year: "2020" },
  ];

  return (
    <div className="min-h-screen bg-background cursor-none relative">
      <CustomCursor />
      <NoiseOverlay />

      {/* Fixed Navigation */}
      <div className="fixed top-12 left-0 right-0 z-40 px-6 py-6 bg-transparent pointer-events-none">
        <div className="flex justify-center items-center gap-0 relative pointer-events-auto">
          {/* Logo */}
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
      <section className="pt-40 pb-20 relative">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="text-center mb-12"
          >
            <p
              className="mb-6"
              style={{
                fontFamily: "'Gilroy-Bold', 'Gilroy', Arial, sans-serif",
                fontWeight: 600,
                fontSize: '16px',
                lineHeight: '18px',
                color: 'rgb(202, 196, 184)',
                textTransform: 'uppercase',
                letterSpacing: '0.2em'
              }}
            >
              Our Work
            </p>
            <h1 className="text-5xl md:text-6xl lg:text-8xl font-bold italic text-creme mb-8" style={{ wordBreak: 'keep-all', hyphens: 'none' }}>
              <AnimeLetterReveal
                text="MADE WITH LOVE"
                className="block"
                delay={200}
                staggerDelay={40}
                triggerOnScroll={false}
              />
              <AnimeLetterReveal
                text="& ATTENTION"
                className="block"
                delay={800}
                staggerDelay={40}
                triggerOnScroll={false}
              />
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Cases Grid */}
      <section className="pb-32 relative">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 border-t border-l border-creme max-w-7xl mx-auto">
            {cases.map((caseItem, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.05,
                  ease: [0.22, 1, 0.36, 1]
                }}
                className="border-r border-b border-creme relative group"
              >
                <motion.a
                  href={`/case/${caseItem.client.toLowerCase()}`}
                  className="block p-10 h-full min-h-[320px] relative overflow-hidden bg-background"
                  whileHover="hover"
                >
                  {/* Background slide effect */}
                  <motion.div
                    className="absolute inset-0 bg-creme/5"
                    variants={{
                      hover: { y: "0%" },
                    }}
                    initial={{ y: "100%" }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  />

                  {/* Content */}
                  <div className="relative z-10 flex flex-col h-full justify-between">
                    <div>
                      <motion.p
                        className="text-xs font-medium tracking-[0.2em] uppercase mb-4 text-creme/60"
                        variants={{
                          hover: { x: 5 },
                        }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      >
                        {caseItem.year}
                      </motion.p>
                      <motion.h2
                        className="text-3xl md:text-4xl font-bold italic text-creme mb-3"
                        style={{
                          fontFamily: "'Gilroy-Bold', 'Gilroy', sans-serif",
                          wordBreak: 'keep-all',
                          hyphens: 'none'
                        }}
                        variants={{
                          hover: { x: 5 },
                        }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      >
                        {caseItem.client}
                      </motion.h2>
                      <motion.p
                        className="text-sm text-creme/70 mb-8"
                        variants={{
                          hover: { x: 5 },
                        }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      >
                        {caseItem.category}
                      </motion.p>
                    </div>

                    {/* View Case Link */}
                    <motion.div
                      className="flex items-center gap-2 text-creme"
                      variants={{
                        hover: { x: 10 },
                      }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <span className="text-sm font-medium uppercase tracking-wider">View Case</span>
                      <ArrowRight className="w-4 h-4" />
                    </motion.div>
                  </div>

                  {/* Hover accent line */}
                  <motion.div
                    className="absolute bottom-0 left-0 h-1 bg-accent"
                    variants={{
                      hover: { width: "100%" },
                    }}
                    initial={{ width: "0%" }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  />
                </motion.a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 relative border-t border-border">
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <h2 className="text-5xl md:text-6xl font-bold italic text-creme mb-8" style={{ wordBreak: 'keep-all', hyphens: 'none' }}>
                LET'S BOOST<br />YOUR BRAND
              </h2>
              <motion.a
                href="/#contact"
                initial="initial"
                whileHover="hover"
                whileTap={{ scale: 0.98 }}
                className="inline-block px-8 py-3 rounded-none border border-creme relative overflow-hidden bg-transparent text-creme font-medium tracking-wide group cursor-pointer text-lg"
              >
                <motion.span
                  className="relative z-10 flex items-center"
                  variants={{
                    initial: { color: "rgb(234, 229, 219)" },
                    hover: { color: "rgb(0, 0, 0)" }
                  }}
                  transition={{ duration: 0.3 }}
                >
                  Get In Touch
                  <ArrowRight className="ml-2 group-hover:translate-x-2 transition-transform duration-300" />
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
      <footer className="border-t border-border">
        <div className="grid grid-cols-1 md:grid-cols-3 divide-x divide-border">
          <div className="flex items-center justify-center md:justify-start px-6 py-8 md:py-12">
            <p className="text-sm text-creme">© All Rights Reserved</p>
          </div>
          <div className="flex items-center justify-center px-6 py-8 md:py-12 border-t md:border-t-0 border-border">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
              <span className="text-sm text-creme underline">Beschikbaar voor nieuwe projecten</span>
            </div>
          </div>
          <div className="flex items-center justify-center md:justify-end gap-6 px-6 py-8 md:py-12 border-t md:border-t-0 border-border">
            <motion.a href="#" className="text-creme hover:text-accent transition-colors" whileHover={{ scale: 1.2, rotate: 5 }} whileTap={{ scale: 0.9 }}>
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </motion.a>
            <motion.a href="#" className="text-creme hover:text-accent transition-colors" whileHover={{ scale: 1.2, rotate: -5 }} whileTap={{ scale: 0.9 }}>
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

export default Cases;
