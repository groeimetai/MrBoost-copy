import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface MenuOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MenuOverlay = ({ isOpen, onClose }: MenuOverlayProps) => {
  const menuItems = [
    { label: "ABOUT", href: "#about" },
    { label: "CASES", href: "#cases" },
    { label: "CONTACT", href: "#contact" },
    { label: "TIKTOK", href: "https://tiktok.com" },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Full Screen Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black z-[100]"
          >
            {/* Grid Lines - 3 vertical lines */}
            <div className="absolute inset-0 pointer-events-none z-[99]">
              {/* Left vertical line at 25% */}
              <div className="absolute left-[25%] top-0 bottom-0 w-px bg-border" />
              {/* Center vertical line at 50% */}
              <div className="absolute left-1/2 top-0 bottom-0 w-px bg-border" />
              {/* Right vertical line at 75% */}
              <div className="absolute left-[75%] top-0 bottom-0 w-px bg-border" />
            </div>

            {/* Close Button - Exact Center on 50% line */}
            <motion.button
              initial={{ opacity: 0, scale: 0, x: "-50%" }}
              animate={{ opacity: 1, scale: 1, x: "-50%" }}
              exit={{ opacity: 0, scale: 0, x: "-50%" }}
              transition={{ delay: 0.1, type: "spring", stiffness: 300 }}
              onClick={onClose}
              className="absolute top-12 left-1/2 z-[102] w-12 h-12 border border-creme flex items-center justify-center hover:bg-creme hover:text-black transition-all duration-300"
            >
              <X className="w-6 h-6" />
            </motion.button>

            {/* Content Container */}
            <div className="h-full relative">
              {/* Left Side - Contact Info (text starts exactly at 25% line) */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="absolute left-[25%] top-0 bottom-0 flex flex-col justify-between py-20"
              >
                <div>
                  {/* Contact Section */}
                  <div className="mb-16">
                    <h3 className="text-sm font-normal mb-8 text-creme">Contact</h3>
                    <div className="space-y-4">
                      <a
                        href="mailto:mail@mrboost.nl"
                        className="block text-creme hover:text-accent transition-colors duration-300"
                      >
                        mail@mrboost.nl
                      </a>
                      <a
                        href="tel:+31637344570"
                        className="block text-creme hover:text-accent transition-colors duration-300"
                      >
                        +316-37344570
                      </a>
                    </div>
                  </div>

                  {/* Address Section */}
                  <div>
                    <h3 className="text-sm font-normal mb-8 text-creme">Adres</h3>
                    <div className="space-y-2 text-creme">
                      <p>Molenstraat-Centrum 481</p>
                      <p>7311 XL Apeldoorn</p>
                    </div>
                  </div>
                </div>

                {/* Social Icons - Bottom Left */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                  className="flex gap-0"
                >
                  <a
                    href="https://behance.net"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 border border-creme flex items-center justify-center hover:bg-creme hover:text-black transition-all duration-300 text-creme text-sm font-bold"
                  >
                    Be
                  </a>
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 border-t border-b border-r border-creme flex items-center justify-center hover:bg-creme hover:text-black transition-all duration-300"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </a>
                  <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 border-t border-b border-r border-creme flex items-center justify-center hover:bg-creme hover:text-black transition-all duration-300"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </a>
                </motion.div>
              </motion.div>

              {/* Right Side - Menu Items (text ends exactly at 75% line) */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="absolute right-[25%] top-0 bottom-0 flex flex-col justify-between py-20 text-right"
              >
                <div>
                  <h3 className="text-sm font-normal mb-16 text-creme">Menu</h3>

                  <nav>
                    <ul className="space-y-4">
                      {menuItems.map((item, index) => (
                        <motion.li
                          key={item.label}
                          initial={{ opacity: 0, x: 50 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{
                            delay: 0.3 + index * 0.1,
                            duration: 0.5,
                            ease: [0.22, 1, 0.36, 1],
                          }}
                        >
                          <motion.a
                            href={item.href}
                            onClick={onClose}
                            className="text-5xl md:text-6xl lg:text-7xl font-bold italic text-white hover:text-accent transition-colors duration-300 block leading-[1.1]"
                            whileHover={{ x: 10 }}
                            transition={{ type: "spring", stiffness: 300, damping: 20 }}
                          >
                            {item.label}
                          </motion.a>
                        </motion.li>
                      ))}
                    </ul>
                  </nav>
                </div>

                {/* Copyright - Bottom Right */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                  className="text-sm text-creme/50"
                >
                  © All Rights Reserved
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
