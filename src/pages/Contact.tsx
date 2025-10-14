import { motion } from "framer-motion";
import { useState } from "react";
import { CustomCursor } from "@/components/CustomCursor";
import { NoiseOverlay } from "@/components/NoiseOverlay";
import { AnimeLetterReveal } from "@/components/AnimeLetterReveal";
import { Mail, Phone, MapPin, MessageCircle } from "lucide-react";

const Contact = () => {
  const [hoveredOption, setHoveredOption] = useState<string | null>(null);

  const contactMethods = [
    {
      id: "whatsapp",
      icon: MessageCircle,
      title: "WhatsApp",
      description: "Quick response via WhatsApp",
      action: "Chat Now",
      color: "from-green-400 to-green-600",
      link: "https://wa.me/31637344570"
    },
    {
      id: "email",
      icon: Mail,
      title: "Email",
      description: "Send us an email",
      action: "Email Us",
      color: "from-blue-400 to-blue-600",
      link: "mailto:mail@mrboost.nl"
    },
    {
      id: "call",
      icon: Phone,
      title: "Phone Call",
      description: "Give us a call",
      action: "Call Now",
      color: "from-purple-400 to-purple-600",
      link: "tel:+31637344570"
    },
  ];

  const briefOptions = [
    {
      title: "30 Second Request",
      duration: "30 sec",
      description: "Quick project inquiry",
      color: "from-orange-400 to-red-500",
    },
    {
      title: "2 Min Brief",
      duration: "2 min",
      description: "Detailed project questionnaire",
      color: "from-pink-400 to-purple-500",
    },
    {
      title: "30 Min Call",
      duration: "30 min",
      description: "Face-to-face consultation",
      color: "from-cyan-400 to-blue-500",
    },
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
              CONTACT
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
                Get in Touch
              </span>
            </motion.div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-16 leading-[1.1] italic text-creme">
              <AnimeLetterReveal
                text="LET'S CONNECT AND"
                className="block"
                delay={400}
                staggerDelay={35}
                triggerOnScroll={false}
              />
              <AnimeLetterReveal
                text="BOOST YOUR IDEA!"
                className="block"
                delay={900}
                staggerDelay={35}
                triggerOnScroll={false}
              />
            </h1>
          </div>
        </div>
      </section>

      {/* Contact Methods Section */}
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
              Choose Your Method
            </h2>
            <p className="text-xl text-creme max-w-2xl mx-auto">
              Pick the way you'd like to reach out to us
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {contactMethods.map((method, index) => (
              <motion.a
                key={method.id}
                href={method.link}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.1,
                  ease: [0.22, 1, 0.36, 1]
                }}
                onMouseEnter={() => setHoveredOption(method.id)}
                onMouseLeave={() => setHoveredOption(null)}
              >
                <motion.div
                  whileHover={{
                    y: -12,
                    transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] }
                  }}
                  className="group relative overflow-hidden cursor-pointer border border-border hover:border-creme transition-all duration-300 p-12 h-full"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${method.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />

                  <method.icon className="w-16 h-16 text-creme mb-6 group-hover:scale-110 transition-transform duration-300" />
                  <h3 className="text-3xl font-semibold mb-4 text-creme">{method.title}</h3>
                  <p className="text-creme/70 text-lg mb-6">{method.description}</p>

                  <motion.div
                    className="inline-flex items-center text-creme font-medium"
                    animate={{
                      x: hoveredOption === method.id ? 8 : 0
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    {method.action} →
                  </motion.div>
                </motion.div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* Brief Options Section */}
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
              Project Briefs
            </h2>
            <p className="text-xl text-creme max-w-2xl mx-auto">
              Share your project details with us
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {briefOptions.map((option, index) => (
              <motion.div
                key={option.title}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.1,
                  ease: [0.22, 1, 0.36, 1]
                }}
              >
                <motion.div
                  whileHover={{
                    scale: 1.03,
                    transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] }
                  }}
                  className="group relative overflow-hidden cursor-pointer border border-border hover:border-creme transition-all duration-300 p-12 h-full bg-card"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${option.color} opacity-0 group-hover:opacity-20 transition-opacity duration-300`} />

                  <div className="relative z-10">
                    <div className="text-6xl font-bold text-creme/20 mb-4">{option.duration}</div>
                    <h3 className="text-3xl font-semibold mb-4 text-creme">{option.title}</h3>
                    <p className="text-creme/70 text-lg">{option.description}</p>
                  </div>

                  <motion.div
                    className="absolute bottom-6 right-6 w-12 h-12 rounded-full border-2 border-creme flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    whileHover={{ scale: 1.1, rotate: 90 }}
                  >
                    <span className="text-creme text-2xl">→</span>
                  </motion.div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Information Section */}
      <section className="py-32 relative">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="text-center mb-20"
            >
              <h2 className="text-5xl md:text-6xl font-bold mb-6 italic text-creme">
                Our Details
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-center"
              >
                <Mail className="w-12 h-12 text-creme mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-creme mb-2">Email</h3>
                <a href="mailto:mail@mrboost.nl" className="text-creme/70 hover:text-creme transition-colors">
                  mail@mrboost.nl
                </a>
                <br />
                <a href="mailto:aanvraag@mrboost.nl" className="text-creme/70 hover:text-creme transition-colors">
                  aanvraag@mrboost.nl
                </a>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-center"
              >
                <Phone className="w-12 h-12 text-creme mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-creme mb-2">Phone</h3>
                <a href="tel:+31637344570" className="text-creme/70 hover:text-creme transition-colors">
                  +31 6-37344570
                </a>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-center"
              >
                <MapPin className="w-12 h-12 text-creme mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-creme mb-2">Location</h3>
                <p className="text-creme/70">
                  Molenstraat-Centrum 481<br />
                  7311 XL Apeldoorn<br />
                  Netherlands
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Map or Image Section */}
      <section className="py-32 relative">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-6xl mx-auto"
          >
            <div className="aspect-video bg-card border border-border overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&h=675&fit=crop"
                alt="Office"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
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

      {/* WhatsApp Button */}
      <motion.a
        href="https://wa.me/31637344570"
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

export default Contact;
