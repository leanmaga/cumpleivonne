"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Music, Star } from "lucide-react";
import MusicPlayer from "./MusicPlayer";
import { useQuinceaneraConfig } from "@/hooks/useQuinceaneraConfig";

const navItems = [
  { name: "Inicio", href: "#hero" },
  { name: "Detalles", href: "#details" },
  { name: "Dress Code", href: "#dresscode" },
  { name: "Ubicación", href: "#location" },
  { name: "RSVP", href: "#rsvp" },
];

const NavBubbles = ({ count = 8 }) => {
  const [bubbles, setBubbles] = useState([]);

  useEffect(() => {
    const newBubbles = Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: 100 + Math.random() * 10,
      size: Math.random() * 12 + 6,
      delay: Math.random() * 3,
      duration: Math.random() * 5 + 4,
      wobble: Math.random() * 20 - 10,
    }));
    setBubbles(newBubbles);
  }, [count]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {bubbles.map((bubble) => (
        <motion.div
          key={bubble.id}
          className="absolute rounded-full"
          style={{
            left: `${bubble.x}%`,
            bottom: 0,
            width: `${bubble.size}px`,
            height: `${bubble.size}px`,
            background: `radial-gradient(circle at 35% 35%, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.4) 35%, rgba(255, 255, 255, 0.1))`,
            border: `0.5px solid rgba(255, 255, 255, 0.5)`,
            boxShadow: `
              inset -1px -1px 2px rgba(255, 255, 255, 0.7),
              0 0 6px rgba(255, 255, 255, 0.2)
            `,
          }}
          initial={{
            y: 0,
            opacity: 0,
            scale: 0.3,
          }}
          animate={{
            y: [-10, -200],
            x: [
              0,
              bubble.wobble,
              -bubble.wobble * 0.8,
              bubble.wobble * 0.5,
              0,
            ],
            opacity: [0, 0.9, 0.9, 0.7, 0],
            scale: [0.3, 1, 1, 0.6, 0.2],
          }}
          transition={{
            duration: bubble.duration,
            delay: bubble.delay,
            repeat: Infinity,
            ease: "easeOut",
            times: [0, 0.1, 0.5, 0.8, 1],
          }}
        />
      ))}
    </div>
  );
};

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [particles, setParticles] = useState([]);

  const { nombre, colores } = useQuinceaneraConfig();

  // Generar partículas
  useEffect(() => {
    const newParticles = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 6,
      duration: 5 + Math.random() * 4,
      size: Math.random() * 2 + 1,
    }));
    setParticles(newParticles);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <>
      <style jsx>{`
        @keyframes nav-particle-gentle {
          0%,
          100% {
            transform: translateY(0px) translateX(0px);
            opacity: 0.3;
          }
          25% {
            transform: translateY(-10px) translateX(8px);
            opacity: 0.6;
          }
          50% {
            transform: translateY(-20px) translateX(-5px);
            opacity: 0.8;
          }
          75% {
            transform: translateY(-10px) translateX(3px);
            opacity: 0.6;
          }
        }

        .nav-particle-gentle {
          animation: nav-particle-gentle var(--duration) ease-in-out infinite;
          animation-delay: var(--delay);
        }

        @keyframes nav-pulse-glow {
          0%,
          100% {
            opacity: 0.4;
            transform: scale(1);
          }
          50% {
            opacity: 0.8;
            transform: scale(1.1);
          }
        }

        .nav-pulse-glow {
          animation: nav-pulse-glow 3s ease-in-out infinite;
        }

        @keyframes nav-shimmer {
          0% {
            background-position: -200px 0;
          }
          100% {
            background-position: 200px 0;
          }
        }

        .nav-shimmer-text {
          background-size: 200% 100%;
          animation: nav-shimmer 3s linear infinite;
        }
      `}</style>

      {/* Navbar fijo siempre arriba */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 w-full z-50 transition-all duration-300 bg-gradient-to-br from-slate-900 via-gray-900 to-black text-white ${
          scrolled ? "shadow-2xl" : "shadow-lg"
        }`}
        style={{
          backdropFilter: scrolled ? "blur(16px)" : "blur(12px)",
          WebkitBackdropFilter: scrolled ? "blur(16px)" : "blur(12px)",
        }}
      >
        {/* Imagen de fondo con efecto sombreado */}
        <div
          className="absolute inset-0 opacity-70"
          style={{
            backgroundImage: "url(/assets/tapiz2.jpg)",
            backgroundSize: "cover",
            backgroundPosition: "center 50%",
            backgroundRepeat: "no-repeat",
            maskImage:
              "linear-gradient(to bottom, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.6) 50%, rgba(0,0,0,0.3) 100%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.6) 50%, rgba(0,0,0,0.3) 100%)",
          }}
        />

        {/* Overlay adicional */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-transparent pointer-events-none" />

        {/* Partículas flotantes */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {particles.map((particle) => (
            <div
              key={particle.id}
              className="absolute nav-particle-gentle"
              style={{
                left: `${particle.x}%`,
                top: `${particle.y}%`,
                "--delay": `${particle.delay}s`,
                "--duration": `${particle.duration}s`,
                width: `${particle.size}px`,
                height: `${particle.size}px`,
              }}
            >
              <Star className="w-full h-full text-white" />
            </div>
          ))}
        </div>

        {/* Burbujas */}
        <NavBubbles count={8} />

        {/* Overlay de gradiente sutil */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-transparent pointer-events-none" />

        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex justify-between items-center h-16 md:h-20">
            {/* Logo */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="font-Emilys_Candy text-xl sm:text-2xl md:text-3xl font-bold flex-shrink-0 relative"
            >
              <div
                className="absolute inset-0 blur-xl nav-pulse-glow"
                style={{
                  background: `${colores.primario[400]}66`,
                }}
              />
              <span
                className="relative nav-shimmer-text"
                style={{
                  background: `linear-gradient(90deg, ${colores.primario[400]} 0%, ${colores.primario[500]} 50%, ${colores.primario[400]} 100%)`,
                  backgroundSize: "200% 100%",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                {nombre}
              </span>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-4 lg:space-x-6">
              {navItems.map((item, index) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{
                    scale: 1.05,
                    textShadow: `0 0 8px ${colores.primario[400]}`,
                  }}
                  className="font-semibold transition-all text-sm lg:text-base whitespace-nowrap px-3 py-2 rounded-lg text-gray-100"
                  onMouseEnter={(e) => {
                    e.target.style.color = colores.primario[300];
                    e.target.style.backgroundColor = `${colores.primario[400]}33`;
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.color = "rgb(243, 244, 246)";
                    e.target.style.backgroundColor = "transparent";
                  }}
                >
                  {item.name}
                </motion.a>
              ))}

              {/* Reproductor de música en desktop */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navItems.length * 0.1 }}
                className="ml-2 lg:ml-4"
              >
                <MusicPlayer showVolumeControl={true} />
              </motion.div>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center gap-2">
              {/* Reproductor de música en móvil */}
              <div>
                <MusicPlayer showVolumeControl={false} />
              </div>

              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 rounded-lg transition-all text-gray-100 relative"
                style={{
                  boxShadow: `0 2px 8px ${colores.primario[400]}66`,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = colores.primario[300];
                  e.currentTarget.style.backgroundColor = `${colores.primario[400]}33`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "rgb(243, 244, 246)";
                  e.currentTarget.style.backgroundColor = "transparent";
                }}
              >
                <div
                  className="absolute inset-0 blur-lg opacity-30"
                  style={{ backgroundColor: colores.primario[400] }}
                />
                {isOpen ? (
                  <X size={24} className="relative z-10" />
                ) : (
                  <Menu size={24} className="relative z-10" />
                )}
              </motion.button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Overlay */}
        <AnimatePresence>
          {isOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsOpen(false)}
                className="md:hidden fixed inset-0 backdrop-blur-sm bg-black/50"
                style={{
                  top: "64px",
                }}
              />

              {/* Menu Panel */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
                className="md:hidden absolute top-full left-0 right-0 w-full bg-gradient-to-br from-slate-900 via-gray-900 to-black"
                style={{
                  backdropFilter: "blur(16px)",
                  WebkitBackdropFilter: "blur(16px)",
                  borderTop: "1px solid rgba(255, 255, 255, 0.1)",
                  boxShadow: `0 8px 32px ${colores.primario[400]}33`,
                }}
              >
                {/* Imagen de fondo en menú móvil */}
                <div
                  className="absolute inset-0 opacity-60"
                  style={{
                    backgroundImage: "url(/assets/tapiz2.jpg)",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                  }}
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60" />

                <div className="px-4 py-4 space-y-1 relative z-10">
                  {navItems.map((item, index) => (
                    <motion.a
                      key={item.name}
                      href={item.href}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      onClick={handleLinkClick}
                      whileHover={{
                        scale: 1.02,
                        textShadow: `0 0 8px ${colores.primario[400]}`,
                      }}
                      className="block py-3 px-3 font-semibold rounded-lg transition-all text-gray-100"
                      onMouseEnter={(e) => {
                        e.target.style.color = colores.primario[300];
                        e.target.style.backgroundColor = `${colores.primario[400]}33`;
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.color = "rgb(243, 244, 246)";
                        e.target.style.backgroundColor = "transparent";
                      }}
                    >
                      {item.name}
                    </motion.a>
                  ))}

                  {/* Control de música adicional en menú móvil */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: navItems.length * 0.1 }}
                    className="pt-2 mt-2"
                    style={{
                      borderTop: `1px solid ${colores.primario[400]}66`,
                    }}
                  >
                    <div className="py-2 px-3 text-sm font-semibold flex items-center gap-2 text-gray-300">
                      <motion.div
                        animate={{
                          rotate: [0, 360],
                          color: [
                            colores.primario[300],
                            colores.primario[400],
                            colores.primario[500],
                            colores.primario[400],
                            colores.primario[300],
                          ],
                          filter: [
                            `drop-shadow(0 0 8px ${colores.primario[400]})`,
                            `drop-shadow(0 0 12px ${colores.primario[500]})`,
                            `drop-shadow(0 0 8px ${colores.primario[400]})`,
                          ],
                        }}
                        transition={{
                          rotate: {
                            duration: 3,
                            repeat: Infinity,
                            ease: "linear",
                          },
                          color: {
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut",
                          },
                          filter: {
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut",
                          },
                        }}
                      >
                        <Music size={16} />
                      </motion.div>
                      Control de Música
                    </div>
                    <div className="px-3 py-2">
                      <MusicPlayer
                        className="w-full justify-center"
                        showVolumeControl={true}
                      />
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Spacer para compensar el navbar fijo */}
      <div className="h-16 md:h-20" />
    </>
  );
}