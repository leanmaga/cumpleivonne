"use client";

import { useState, useEffect } from "react";
import { Clock, Sparkles, Star, Crown, Heart } from "lucide-react";
import { useQuinceaneraConfig } from "@/hooks/useQuinceaneraConfig";
import { getPrimaryColorClasses } from "@/config/theme.config";
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

export default function CountdownSection() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [particles, setParticles] = useState([]);
  const [pulseKey, setPulseKey] = useState(0);

  const { fechaCompleta, colores, horaInicio } = useQuinceaneraConfig();

  const colorClasses = getPrimaryColorClasses();

  // Generar partículas flotantes con estrellas
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

  useEffect(() => {
    const calculateTimeLeft = () => {
      try {
        const eventDate = new Date(`${fechaCompleta}T${horaInicio}:00`);
        const now = new Date();
        const difference = eventDate - now;

        if (difference > 0) {
          setTimeLeft({
            days: Math.floor(difference / (1000 * 60 * 60 * 24)),
            hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
            minutes: Math.floor((difference / 1000 / 60) % 60),
            seconds: Math.floor((difference / 1000) % 60),
          });
        } else {
          setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        }
      } catch (error) {
        console.error("Error calculando countdown:", error);
      }
    };

    calculateTimeLeft();
    const timer = setInterval(() => {
      calculateTimeLeft();
      setPulseKey((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [fechaCompleta, horaInicio]);

  const timeUnits = {
    days: "Días",
    hours: "Horas",
    minutes: "Minutos",
    seconds: "Segundos",
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-gray-900 to-black text-white py-20 px-4">
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

      {/* Overlay adicional para mejorar la legibilidad */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent pointer-events-none" />

      {/* Partículas flotantes con estrellas */}
      <div className="absolute inset-0 pointer-events-none">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute countdown-particle-gentle"
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
      <SeaBubbles count={20} colores={colores} />
      <SmallBubbles count={15} colores={colores} />

      {/* Overlay de gradiente sutil */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />

      <style jsx>{`
        @keyframes countdown-particle-gentle {
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

        .countdown-particle-gentle {
          animation: countdown-particle-gentle var(--duration) ease-in-out
            infinite;
          animation-delay: var(--delay);
        }

        @keyframes countdown-pulse-glow {
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

        .countdown-pulse-glow {
          animation: countdown-pulse-glow 3s ease-in-out infinite;
        }

        @keyframes countdown-shimmer {
          0% {
            background-position: -1000px 0;
          }
          100% {
            background-position: 1000px 0;
          }
        }

        .countdown-shimmer-text {
          background-size: 200% 100%;
          animation: countdown-shimmer 3s linear infinite;
        }

        @keyframes countdown-slide-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .countdown-slide-in-up {
          animation: countdown-slide-in-up 0.8s ease-out forwards;
          opacity: 0;
        }

        @keyframes pulse-soft {
          0%,
          100% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.05);
            opacity: 0.9;
          }
        }

        .animate-pulse-soft {
          animation: pulse-soft 2s ease-in-out infinite;
        }

        .glass-card-dark {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.4);
        }
      `}</style>

      {/* Contenido principal */}
      <div className="relative z-10 max-w-6xl mx-auto text-center">
        {/* Título del countdown con efectos */}
        <div className="countdown-slide-in-up mb-12">
          <div className="relative inline-block mb-6">
            <div
              className="absolute inset-0 blur-3xl countdown-pulse-glow"
              style={{
                background: `linear-gradient(to right, ${colores.primario[400]}33, ${colores.terciario[400]}33)`,
              }}
            />
            <Crown
              className="relative w-16 h-16 mx-auto"
              style={{ color: colores.primario[400] }}
            />
          </div>

          <h3
            className="font-Emilys_Candy text-4xl md:text-5xl font-bold mb-4 countdown-shimmer-text"
            style={{
              background: `linear-gradient(90deg, ${colores.primario[400]} 0%, ${colores.primario[500]} 50%, ${colores.primario[400]} 100%)`,
              backgroundSize: "200% 100%",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            La Cuenta Regresiva
          </h3>

          <p className="text-xl md:text-2xl text-gray-300">
            Cada momento que pasa nos acerca más a esta celebración
          </p>

          <div className="flex items-center justify-center gap-3 mt-6">
            <Heart
              className="w-5 h-5 animate-pulse"
              style={{ color: colores.primario[400] }}
            />
            <Sparkles
              className="w-6 h-6"
              style={{ color: colores.primario[500] }}
            />
            <Heart
              className="w-5 h-5 animate-pulse"
              style={{ color: colores.primario[400] }}
            />
          </div>
        </div>

        {/* Countdown cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-4xl mx-auto mb-8 countdown-slide-in-up"
          style={{ animationDelay: "0.2s" }}>
          {Object.entries(timeLeft).map(([unit, value], index) => (
            <div
              key={unit}
              className="glass-card-dark rounded-2xl p-6 md:p-8 transform transition-all duration-300 hover:scale-105"
              style={{
                borderColor: `${colores.primario[400]}33`,
              }}
            >
              {/* Icono decorativo con glow */}
              <div className="mb-4 flex justify-center relative">
                <div
                  className="absolute inset-0 blur-xl opacity-50"
                  style={{ backgroundColor: `${colores.primario[400]}33` }}
                />
                {unit === "days" && (
                  <Star
                    className="relative w-8 h-8"
                    style={{ color: colores.primario[400] }}
                  />
                )}
                {unit === "hours" && (
                  <Clock
                    className="relative w-8 h-8"
                    style={{ color: colores.primario[400] }}
                  />
                )}
                {unit === "minutes" && (
                  <Sparkles
                    className="relative w-8 h-8"
                    style={{ color: colores.primario[400] }}
                  />
                )}
                {unit === "seconds" && (
                  <Heart
                    className="relative w-8 h-8 animate-pulse-soft"
                    style={{ color: colores.primario[400] }}
                  />
                )}
              </div>

              {/* Número */}
              <div
                className="text-5xl md:text-6xl font-bold mb-2 font-serif"
                style={{ color: colores.primario[300] }}
              >
                {String(value).padStart(2, "0")}
              </div>

              {/* Etiqueta */}
              <div
                className="text-sm md:text-base font-medium uppercase tracking-wider text-gray-300"
              >
                {timeUnits[unit]}
              </div>

              {/* Línea decorativa */}
              <div
                className="mt-4 mx-auto w-12 h-1 rounded-full"
                style={{ backgroundColor: colores.primario[400] }}
              />
            </div>
          ))}
        </div>

        {/* Mensaje motivacional */}
        <div className="glass-card-dark rounded-2xl p-6 max-w-2xl mx-auto countdown-slide-in-up"
          style={{ animationDelay: "0.4s" }}>
          <p className="text-lg md:text-xl italic text-gray-300">
            ¡Este día especial está cada vez más cerca!
          </p>
          <div className="flex justify-center gap-2 mt-4">
            <Heart
              className="w-5 h-5 animate-pulse"
              style={{ color: colores.primario[400] }}
            />
            <Heart
              className="w-5 h-5 animate-pulse"
              style={{ color: colores.primario[500] }}
            />
            <Heart
              className="w-5 h-5 animate-pulse"
              style={{ color: colores.primario[400] }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}