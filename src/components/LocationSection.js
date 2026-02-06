"use client";

import { useState, useEffect } from "react";
import { MapPin, Phone, Clock, ChevronLeft, ChevronRight, Star } from "lucide-react";
import Image from "next/image";
import { useQuinceaneraConfig } from "@/hooks/useQuinceaneraConfig";
import { useLoading } from "@/components/PageLoader";

import { motion } from "framer-motion";

const SeaBubbles = ({ count = 15, colores }) => {
  const [bubbles, setBubbles] = useState([]);

  useEffect(() => {
    const newBubbles = Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: 100 + Math.random() * 20,
      size: Math.random() * 20 + 10,
      delay: Math.random() * 5,
      duration: Math.random() * 4 + 6,
      wobble: Math.random() * 30 - 15,
    }));
    setBubbles(newBubbles);
  }, [count, colores]);

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
            background: `radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.3) 40%, rgba(255, 255, 255, 0.1))`,
            border: `1px solid rgba(255, 255, 255, 0.4)`,
            boxShadow: `
              inset -2px -2px 4px rgba(255, 255, 255, 0.6),
              0 0 8px rgba(255, 255, 255, 0.3),
              0 2px 4px rgba(0, 0, 0, 0.1)
            `,
          }}
          initial={{
            y: 0,
            opacity: 0,
            scale: 0.5,
          }}
          animate={{
            y: [-20, -window.innerHeight - 100],
            x: [0, bubble.wobble, -bubble.wobble, bubble.wobble * 0.5, 0],
            opacity: [0, 0.8, 0.8, 0.6, 0],
            scale: [0.5, 1, 1, 0.8, 0.3],
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

const SmallBubbles = ({ count = 8, colores }) => {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const newParticles = Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: 100 + Math.random() * 10,
      size: Math.random() * 12 + 6,
      delay: Math.random() * 3,
      duration: Math.random() * 5 + 4,
      wobble: Math.random() * 20 - 10,
    }));
    setParticles(newParticles);
  }, [count, colores]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            left: `${particle.x}%`,
            bottom: 0,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
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
            y: [-10, -window.innerHeight - 50],
            x: [
              0,
              particle.wobble,
              -particle.wobble * 0.8,
              particle.wobble * 0.5,
              0,
            ],
            opacity: [0, 0.9, 0.9, 0.7, 0],
            scale: [0.3, 1, 1, 0.6, 0.2],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "easeOut",
            times: [0, 0.1, 0.5, 0.8, 1],
          }}
        />
      ))}
    </div>
  );
};

export default function LocationSection() {
  const {
    lugar,
    direccion,
    telefono,
    horaInicio,
    horaFin,
    googleMapsUrl,
    wazeUrl,
    imagenesSalon,
    colores,
  } = useQuinceaneraConfig();

  const { incrementLoadedImages } = useLoading();

  const [currentSlide, setCurrentSlide] = useState(0);
  const [particles, setParticles] = useState([]);

  // Generar partículas flotantes
  useEffect(() => {
    const newParticles = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 6,
      duration: 5 + Math.random() * 4,
      size: Math.random() * 3 + 1,
    }));
    setParticles(newParticles);
  }, []);

  const handleImageLoad = () => {
    incrementLoadedImages();
    console.log(`✅ Imagen del salón cargada`);
  };

  const handleImageError = (imageSrc) => {
    console.warn(`⚠️ Error al cargar imagen del salón: ${imageSrc}`);
    incrementLoadedImages();
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % imagenesSalon.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [imagenesSalon.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % imagenesSalon.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + imagenesSalon.length) % imagenesSalon.length
    );
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <section
      id="location"
      className="py-20 min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-slate-900 via-gray-900 to-black text-white"
    >
      <style jsx>{`
        @keyframes location-particle-gentle {
          0%,
          100% {
            transform: translateY(0px) translateX(0px);
            opacity: 0.3;
          }
          25% {
            transform: translateY(-15px) translateX(10px);
            opacity: 0.6;
          }
          50% {
            transform: translateY(-30px) translateX(-5px);
            opacity: 0.8;
          }
          75% {
            transform: translateY(-15px) translateX(5px);
            opacity: 0.6;
          }
        }

        .location-particle-gentle {
          animation: location-particle-gentle var(--duration) ease-in-out
            infinite;
          animation-delay: var(--delay);
        }

        @keyframes location-pulse-glow {
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

        .location-pulse-glow {
          animation: location-pulse-glow 3s ease-in-out infinite;
        }

        @keyframes location-shimmer {
          0% {
            background-position: -1000px 0;
          }
          100% {
            background-position: 1000px 0;
          }
        }

        .location-shimmer-text {
          background-size: 200% 100%;
          animation: location-shimmer 3s linear infinite;
        }

        @keyframes location-fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .location-fade-in-up {
          animation: location-fade-in-up 0.8s ease-out forwards;
        }

        @keyframes location-fade-in-left {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .location-fade-in-left {
          animation: location-fade-in-left 0.8s ease-out forwards;
        }

        @keyframes location-fade-in-right {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .location-fade-in-right {
          animation: location-fade-in-right 0.8s ease-out forwards;
        }

        .location-scale-hover {
          transition: all 0.3s ease;
        }

        .location-scale-hover:hover {
          transform: scale(1.02);
        }

        .location-slide-transition {
          transition: transform 0.5s ease-in-out;
        }

        @keyframes location-rotate {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        .location-rotate-element {
          animation: location-rotate 20s linear infinite;
        }

        .glass-card-dark {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.4);
        }
      `}</style>

      {/* Imagen de fondo con efecto sombreado */}
      <div
        className="absolute inset-0 opacity-70"
        style={{
          backgroundImage: "url(/assets/tapiz2.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center 50%",
          backgroundRepeat: "no-repeat",
          maskImage:
            "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.4) 20%, rgba(0,0,0,0.8) 40%, rgba(0,0,0,1) 60%, rgba(0,0,0,0.8) 80%, rgba(0,0,0,0.4) 90%, rgba(0,0,0,0) 100%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.4) 20%, rgba(0,0,0,0.8) 40%, rgba(0,0,0,1) 60%, rgba(0,0,0,0.8) 80%, rgba(0,0,0,0.4) 90%, rgba(0,0,0,0) 100%)",
        }}
      />

      {/* Overlay adicional */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent pointer-events-none" />

      {/* Partículas flotantes */}
      <div className="absolute inset-0 pointer-events-none">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute location-particle-gentle"
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

      <SeaBubbles count={20} colores={colores} />
      <SmallBubbles count={15} colores={colores} />

      {/* Overlay de gradiente sutil */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 relative z-10">
        <div className="text-center mb-16 location-fade-in-up">
          <div className="relative inline-block mb-6">
            <div
              className="absolute inset-0 blur-3xl location-pulse-glow"
              style={{
                background: `linear-gradient(to right, ${colores.primario[400]}33, ${colores.terciario[400]}33)`,
              }}
            />
            <MapPin
              className="relative w-16 h-16 mx-auto"
              style={{ color: colores.primario[400] }}
            />
          </div>

          <h2
            className="font-Emilys_Candy text-5xl md:text-7xl font-bold mb-8 p-4 location-shimmer-text"
            style={{
              background: `linear-gradient(90deg, ${colores.primario[400]} 0%, ${colores.primario[500]} 50%, ${colores.primario[400]} 100%)`,
              backgroundSize: "200% 100%",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Ubicación del Evento
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Location Details */}
          <div className="space-y-8 location-fade-in-left">
            <div className="glass-card-dark rounded-3xl p-8 shadow-2xl">
              <h3
                className="font-serif text-3xl font-bold mb-6"
                style={{ color: colores.primario[300] }}
              >
                {lugar}
              </h3>

              <div className="space-y-6">
                <div
                  className="flex items-start gap-4 p-4 rounded-2xl transition-colors location-scale-hover"
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.backgroundColor = `${colores.primario[400]}33`)
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.backgroundColor = "transparent")
                  }
                >
                  <div className="relative">
                    <div
                      className="absolute inset-0 blur-lg opacity-50"
                      style={{ backgroundColor: `${colores.primario[400]}66` }}
                    />
                    <MapPin
                      className="relative w-6 h-6 flex-shrink-0 mt-1"
                      style={{ color: colores.primario[400] }}
                    />
                  </div>
                  <div>
                    <h4
                      className="font-semibold mb-1"
                      style={{ color: colores.primario[300] }}
                    >
                      Dirección
                    </h4>
                    <p className="text-gray-300">{direccion}</p>
                  </div>
                </div>

                <div
                  className="flex items-start gap-4 p-4 rounded-2xl transition-colors location-scale-hover"
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.backgroundColor = `${colores.primario[400]}33`)
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.backgroundColor = "transparent")
                  }
                >
                  <div className="relative">
                    <div
                      className="absolute inset-0 blur-lg opacity-50"
                      style={{ backgroundColor: `${colores.primario[400]}66` }}
                    />
                    <Phone
                      className="relative w-6 h-6 flex-shrink-0 mt-1"
                      style={{ color: colores.primario[400] }}
                    />
                  </div>
                  <div>
                    <h4
                      className="font-semibold mb-1"
                      style={{ color: colores.primario[300] }}
                    >
                      Contacto
                    </h4>
                    <p className="text-gray-300">{telefono}</p>
                  </div>
                </div>

                <div
                  className="flex items-start gap-4 p-4 rounded-2xl transition-colors location-scale-hover"
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.backgroundColor = `${colores.primario[400]}33`)
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.backgroundColor = "transparent")
                  }
                >
                  <div className="relative">
                    <div
                      className="absolute inset-0 blur-lg opacity-50"
                      style={{ backgroundColor: `${colores.primario[400]}66` }}
                    />
                    <Clock
                      className="relative w-6 h-6 flex-shrink-0 mt-1"
                      style={{ color: colores.primario[400] }}
                    />
                  </div>
                  <div>
                    <h4
                      className="font-semibold mb-1"
                      style={{ color: colores.primario[300] }}
                    >
                      Horario
                    </h4>
                    <p className="text-gray-300">Recepción: {horaInicio}</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex flex-col sm:flex-row gap-4 w-full">
                <button
                  className="flex-1 font-semibold px-6 py-4 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 flex items-center justify-center gap-3 border-2"
                  style={{
                    background: "linear-gradient(to right, #dc2626, #b91c1c)",
                    color: "#ffffff",
                    borderColor: "#991b1b",
                  }}
                  onClick={() => window.open(googleMapsUrl, "_blank")}
                >
                  <Image
                    src="/assets/gmaps.png"
                    alt="Google Maps"
                    width={24}
                    height={24}
                    className="w-6 h-6"
                  />
                  Google Maps
                </button>

                <button
                  className="flex-1 font-semibold px-6 py-4 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 flex items-center justify-center gap-3 border-2"
                  style={{
                    background: "linear-gradient(to right, #3b82f6, #2563eb)",
                    color: "#ffffff",
                    borderColor: "#1d4ed8",
                  }}
                  onClick={() => window.open(wazeUrl, "_blank")}
                >
                  <Image
                    src="/assets/waze.png"
                    alt="Waze"
                    width={24}
                    height={24}
                    className="w-6 h-6"
                  />
                  Waze
                </button>
              </div>
            </div>
          </div>

          {/* Image Slider */}
          <div className="relative location-fade-in-right">
            <div className="aspect-square lg:aspect-[4/3] rounded-3xl overflow-hidden shadow-xl relative glass-card-dark">
              {/* Image Container */}
              <div className="relative w-full h-full overflow-hidden">
                <div
                  className="flex h-full location-slide-transition"
                  style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                >
                  {imagenesSalon.map((image, index) => (
                    <div
                      key={index}
                      className="relative w-full h-full flex-shrink-0"
                    >
                      <Image
                        src={image}
                        alt={`Imagen del salón ${index + 1}`}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 600px"
                        className="w-full h-full object-cover"
                        onLoad={handleImageLoad}
                        onError={() => handleImageError(image)}
                        priority={true}
                      />
                    </div>
                  ))}
                </div>

                {/* Navigation Arrows */}
                <button
                  onClick={prevSlide}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transition-all duration-300 hover:scale-110 z-20"
                  aria-label="Imagen anterior"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>

                <button
                  onClick={nextSlide}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transition-all duration-300 hover:scale-110 z-20"
                  aria-label="Siguiente imagen"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>

                {/* Dots Indicator */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
                  {imagenesSalon.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => goToSlide(index)}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        index === currentSlide
                          ? "bg-white scale-125 shadow-lg"
                          : "bg-white/60 hover:bg-white/80"
                      }`}
                      aria-label={`Ir a imagen ${index + 1}`}
                    />
                  ))}
                </div>

                {/* Image Counter */}
                <div className="absolute top-4 right-4 bg-black/40 text-white px-3 py-1 rounded-full text-sm font-medium z-20">
                  {currentSlide + 1} / {imagenesSalon.length}
                </div>

                {/* Overlay with salon info */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6 z-20">
                  <div className="text-white">
                    <h3 className="font-serif text-xl font-bold mb-1">
                      {lugar}
                    </h3>
                    <p className="text-sm opacity-90">
                      Conoce nuestras instalaciones
                    </p>
                  </div>
                </div>

                {/* Decorative elements */}
                <div className="absolute top-4 left-4 z-20">
                  <div
                    className="w-8 h-8 border-2 border-dashed rounded-full location-rotate-element"
                    style={{ borderColor: "rgba(255, 255, 255, 0.4)" }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}