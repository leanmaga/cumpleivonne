"use client";

import { useState, useEffect } from "react";
import { Calendar, Clock, MapPin, Sparkles, Crown, Copy, Check, Star } from "lucide-react";
import { useQuinceaneraConfig } from "@/hooks/useQuinceaneraConfig";

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

export default function DelicateEventDetails() {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [copied, setCopied] = useState(false);
  const [particles, setParticles] = useState([]);

  // ✅ Usar configuración centralizada - INCLUIR ALIAS
  const { fechaEvento, horaEvento, lugar, direccion, colores, alias, mostrarRegalos } =
    useQuinceaneraConfig();

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

  // Función para copiar el alias al portapapeles
  const handleCopyAlias = async () => {
    if (alias) {
      try {
        await navigator.clipboard.writeText(alias);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error("Error al copiar:", err);
      }
    }
  };

  // Configuración de las cards de detalles con gradientes inline
  const details = [
    {
      icon: Calendar,
      title: "Fecha",
      value: fechaEvento,
      gradientStyle: {
        background: `linear-gradient(to bottom right, ${colores.primario[400]}, ${colores.terciario[400]})`,
      },
    },
    {
      icon: Clock,
      title: "Hora",
      value: horaEvento,
      gradientStyle: {
        background: `linear-gradient(to bottom right, ${colores.terciario[400]}, ${colores.primario[400]})`,
      },
    },
    {
      icon: MapPin,
      title: "Lugar",
      value: lugar,
      description: direccion,
      gradientStyle: {
        background: `linear-gradient(to bottom right, ${colores.primario[500]}, ${colores.terciario[400]})`,
      },
    },
  ];

  return (
    <section className="relative py-20 overflow-hidden bg-gradient-to-br from-slate-900 via-gray-900 to-black text-white">
      <style jsx>{`
        @keyframes details-particle-gentle {
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

        .details-particle-gentle {
          animation: details-particle-gentle var(--duration) ease-in-out infinite;
          animation-delay: var(--delay);
        }

        @keyframes details-pulse-glow {
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

        .details-pulse-glow {
          animation: details-pulse-glow 3s ease-in-out infinite;
        }

        @keyframes details-shimmer {
          0% {
            background-position: -1000px 0;
          }
          100% {
            background-position: 1000px 0;
          }
        }

        .details-shimmer-text {
          background-size: 200% 100%;
          animation: details-shimmer 3s linear infinite;
        }

        @keyframes details-fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .details-fade-in-up {
          animation: details-fade-in-up 0.8s ease-out forwards;
        }

        .glass-card-dark {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.4);
        }

        .details-scale-hover {
          transition: all 0.3s ease;
        }

        .details-scale-hover:hover {
          transform: translateY(-5px) scale(1.02);
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
            className="absolute details-particle-gentle"
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

      <div className="max-w-4xl mx-auto px-4 relative z-10">
        {/* Header elegante y delicado */}
        <div className="text-center mb-16 details-fade-in-up">
          <div className="relative inline-block mb-6">
            <div
              className="absolute inset-0 blur-3xl details-pulse-glow"
              style={{
                background: `linear-gradient(to right, ${colores.primario[400]}33, ${colores.terciario[400]}33)`,
              }}
            />
            <Crown
              className="relative w-12 h-12 mx-auto"
              style={{ color: colores.primario[400] }}
            />
          </div>

          <h2
            className="font-Emilys_Candy text-4xl md:text-5xl font-bold mb-4 details-shimmer-text"
            style={{
              background: `linear-gradient(90deg, ${colores.primario[400]} 0%, ${colores.primario[500]} 50%, ${colores.primario[400]} 100%)`,
              backgroundSize: "200% 100%",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Detalles del Evento
          </h2>

          <div
            className="w-20 h-1 mx-auto rounded-full"
            style={{
              background: `linear-gradient(to right, ${colores.primario[400]}, ${colores.terciario[400]})`,
            }}
          />
        </div>

        {/* Cards de información */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {details.map((detail, index) => {
            const IconComponent = detail.icon;
            return (
              <div
                key={detail.title}
                className="relative glass-card-dark rounded-2xl p-6 shadow-xl details-scale-hover"
                style={{
                  animationDelay: `${index * 0.1}s`,
                }}
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                {/* Icono con glow */}
                <div className="text-center mb-4">
                  <div className="relative inline-block">
                    <div
                      className="absolute inset-0 blur-xl opacity-50"
                      style={{ backgroundColor: `${colores.primario[400]}66` }}
                    />
                    <div
                      className="relative inline-flex items-center justify-center w-14 h-14 rounded-xl mb-3 shadow-lg"
                      style={detail.gradientStyle}
                    >
                      <IconComponent className="w-7 h-7 text-white" />
                    </div>
                  </div>

                  <h3
                    className="font-serif text-xl font-semibold"
                    style={{ color: colores.primario[300] }}
                  >
                    {detail.title}
                  </h3>
                </div>

                {/* Contenido */}
                <div className="text-center space-y-2">
                  <p
                    className="text-base font-medium text-gray-200"
                  >
                    {detail.value}
                  </p>

                  {detail.description && (
                    <p className="text-sm text-gray-400">
                      {detail.description}
                    </p>
                  )}
                </div>

                {/* Línea decorativa */}
                <div className="mt-4 flex justify-center">
                  <div
                    className="h-1 w-12 rounded-full"
                    style={{
                      background: `linear-gradient(to right, ${colores.primario[400]}, ${colores.terciario[400]})`,
                    }}
                  />
                </div>

                {/* Efectos hover sutiles */}
                {hoveredCard === index && (
                  <div className="absolute inset-0 rounded-2xl pointer-events-none"
                    style={{
                      background: `linear-gradient(135deg, ${colores.primario[400]}20, ${colores.terciario[400]}20)`,
                    }}
                  >
                    <div className="absolute top-3 right-3">
                      <Sparkles
                        className="w-4 h-4 animate-spin"
                        style={{ color: colores.primario[400] }}
                      />
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Sección de Alias */}
        {mostrarRegalos && alias && (
          <div className="mt-12 details-fade-in-up" style={{ animationDelay: "0.3s" }}>
            <div className="glass-card-dark rounded-2xl p-8 shadow-xl">
              <div className="text-center">
                <div className="relative inline-block mb-4">
                  <div
                    className="absolute inset-0 blur-xl opacity-50"
                    style={{ backgroundColor: `${colores.primario[400]}66` }}
                  />
                  <Sparkles
                    className="relative w-8 h-8 mx-auto"
                    style={{ color: colores.primario[400] }}
                  />
                </div>

                <h3
                  className="font-serif text-2xl font-semibold mb-3"
                  style={{ color: colores.primario[300] }}
                >
                  Si querés sorprenderme
                </h3>
                
                <p className="text-base mb-6 max-w-md mx-auto text-gray-300">
                  Tu presencia es el mejor regalo, pero si deseás hacerme un presente, también podés hacerlo de esta forma:
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-lg mx-auto">
                  <div
                    className="flex-1 w-full px-6 py-4 rounded-xl font-mono text-lg font-semibold"
                    style={{
                      background: `linear-gradient(to right, ${colores.primario[400]}33, ${colores.terciario[400]}33)`,
                      color: colores.primario[300],
                      border: `1px solid ${colores.primario[400]}66`,
                    }}
                  >
                    {alias}
                  </div>

                  <button
                    onClick={handleCopyAlias}
                    className="p-4 rounded-xl transition-all duration-300 hover:scale-110 shadow-lg"
                    style={{
                      background: copied
                        ? `linear-gradient(to right, ${colores.primario[400]}, ${colores.terciario[400]})`
                        : `linear-gradient(to right, ${colores.primario[500]}, ${colores.terciario[500]})`,
                    }}
                    title="Copiar alias"
                  >
                    {copied ? (
                      <Check className="w-6 h-6 text-white" />
                    ) : (
                      <Copy className="w-6 h-6 text-white" />
                    )}
                  </button>
                </div>

                {copied && (
                  <p
                    className="text-base mt-4 animate-pulse font-medium"
                    style={{ color: colores.primario[400] }}
                  >
                    ✨ ¡Alias copiado al portapapeles!
                  </p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}