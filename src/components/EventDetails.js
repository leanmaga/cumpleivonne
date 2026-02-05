"use client";

import { useState, useEffect } from "react";
import { Calendar, Clock, MapPin, Sparkles, Crown, Gift, Copy, Check } from "lucide-react";
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

  // ✅ Usar configuración centralizada con propiedades individuales
  const { 
    fechaEvento, 
    horaEvento, 
    lugar, 
    direccion, 
    colores,
    mostrarRegalos,
    alias,
    nombreCuentaBancaria,
    mensajeRegalos,
    nombre 
  } = useQuinceaneraConfig();

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
    <section
      className="relative py-8 overflow-hidden"
      style={{
        background: `linear-gradient(135deg, ${colores.primario[50]} 0%, ${colores.fondo} 50%, ${colores.secundario[100]} 100%)`,
      }}
    >
      {/* Elementos decorativos de fondo */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Sparkles flotantes con colores oceánicos */}
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="absolute animate-pulse"
            style={{
              left: `${15 + i * 12}%`,
              top: `${20 + (i % 3) * 25}%`,
              animationDelay: `${i * 0.8}s`,
            }}
          >
            <Sparkles
              className="w-3 h-3 opacity-40"
              style={{ color: colores.primario[300] }}
            />
          </div>
        ))}
      </div>

      <div className="max-w-4xl mx-auto px-4 relative z-10">
        {/* Header elegante y delicado */}
        <div className="text-center mb-10">
          <div className="relative inline-block mb-3">
            <div
              className="absolute inset-0 blur-lg rounded-full"
              style={{
                background: `linear-gradient(to right, ${colores.primario[200]}80, ${colores.terciario[200]}80)`,
              }}
            />
            <Crown
              className="relative w-6 h-6 mx-auto"
              style={{ color: colores.primario[600] }}
            />
          </div>

          <SeaBubbles count={20} colores={colores} />
          <SmallBubbles count={15} colores={colores} />

          <h2
            className="font-Emilys_Candy text-xl md:text-2xl font-semibold mb-2"
            style={{
              background: `linear-gradient(to right, ${colores.primario[700]}, ${colores.terciario[600]})`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Detalles del Evento
          </h2>

          <div
            className="w-12 h-px mx-auto rounded-full"
            style={{
              background: `linear-gradient(to right, ${colores.primario[400]}, ${colores.terciario[400]})`,
            }}
          />
        </div>

        {/* Cards de información - compactas y elegantes */}
        <div className="grid md:grid-cols-3 gap-4 mb-10">
          {details.map((detail, index) => {
            const IconComponent = detail.icon;
            return (
              <div
                key={detail.title}
                className="relative bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02]"
                style={{
                  border: `1px solid ${colores.primario[200]}80`,
                }}
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                {/* Icono */}
                <div className="text-center mb-3">
                  <div
                    className="inline-flex items-center justify-center w-10 h-10 rounded-xl mb-2 shadow-md"
                    style={detail.gradientStyle}
                  >
                    <IconComponent className="w-5 h-5 text-white" />
                  </div>

                  <h3
                    className="font-serif text-base font-semibold"
                    style={{ color: colores.primario[800] }}
                  >
                    {detail.title}
                  </h3>
                </div>

                {/* Contenido */}
                <div className="text-center space-y-1">
                  <p
                    className="text-sm font-medium"
                    style={{ color: colores.primario[700] }}
                  >
                    {detail.value}
                  </p>

                  {detail.description && (
                    <p
                      className="text-xs"
                      style={{ color: colores.primario[600] }}
                    >
                      {detail.description}
                    </p>
                  )}
                </div>

                {/* Línea decorativa */}
                <div className="mt-3 flex justify-center">
                  <div
                    className="h-0.5 w-8 rounded-full"
                    style={{
                      background: `linear-gradient(to right, ${colores.primario[400]}, ${colores.terciario[400]})`,
                    }}
                  />
                </div>

                {/* Efectos hover sutiles */}
                {hoveredCard === index && (
                  <div
                    className="absolute inset-0 rounded-xl pointer-events-none"
                    style={{
                      background: `linear-gradient(135deg, ${colores.primario[100]}40, ${colores.terciario[100]}40)`,
                    }}
                  >
                    <div className="absolute top-2 right-2">
                      <Sparkles
                        className="w-3 h-3 animate-spin"
                        style={{ color: colores.primario[500] }}
                      />
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* 🎁 Sección de Regalos */}
        {mostrarRegalos && alias && (
          <div className="mt-8">
            <div 
              className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300"
              style={{
                border: `1px solid ${colores.primario[200]}80`,
              }}
            >
              {/* Header con icono */}
              <div className="text-center mb-4">
                <div className="relative inline-block mb-2">
                  <div
                    className="absolute inset-0 blur-lg rounded-full"
                    style={{
                      background: `linear-gradient(to right, ${colores.primario[300]}60, ${colores.terciario[300]}60)`,
                    }}
                  />
                  <Gift
                    className="relative w-8 h-8 mx-auto"
                    style={{ color: colores.primario[600] }}
                  />
                </div>

                <h3
                  className="font-Emilys_Candy text-xl font-semibold mb-2"
                  style={{
                    background: `linear-gradient(to right, ${colores.primario[700]}, ${colores.terciario[600]})`,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  Lluvia de Sobres
                </h3>

                <div
                  className="w-12 h-px mx-auto rounded-full mb-3"
                  style={{
                    background: `linear-gradient(to right, ${colores.primario[400]}, ${colores.terciario[400]})`,
                  }}
                />
              </div>

              {/* Mensaje personalizado */}
              <p
                className="text-center text-sm md:text-base italic mb-4 px-4"
                style={{ color: colores.primario[700] }}
              >
                {mensajeRegalos || 
                  `Si querés hacerme un regalo, tu presencia es el mejor obsequio. Pero si preferís contribuir de otra forma, acá te dejo mis datos`}
              </p>

              {/* Alias con botón para copiar */}
              <div className="max-w-md mx-auto">
                <div
                  className="bg-white/80 rounded-xl p-4 flex items-center justify-between gap-3 shadow-sm"
                  style={{
                    border: `1.5px solid ${colores.primario[300]}`,
                  }}
                >
                  <div className="flex-1 text-center">
                    {nombreCuentaBancaria && (
                      <p
                        className="text-xs font-medium mb-1"
                        style={{ color: colores.primario[600] }}
                      >
                        {nombreCuentaBancaria}
                      </p>
                    )}
                    <p
                      className="font-mono text-base md:text-lg font-bold tracking-wide"
                      style={{ color: colores.primario[800] }}
                    >
                      {alias}
                    </p>
                  </div>

                  <button
                    onClick={handleCopyAlias}
                    className="p-2 rounded-lg hover:scale-110 transition-all duration-200 flex-shrink-0"
                    style={{
                      background: `linear-gradient(to bottom right, ${colores.primario[500]}, ${colores.terciario[500]})`,
                    }}
                    title="Copiar alias"
                  >
                    {copied ? (
                      <Check className="w-5 h-5 text-white" />
                    ) : (
                      <Copy className="w-5 h-5 text-white" />
                    )}
                  </button>
                </div>

                {/* Mensaje de copiado */}
                {copied && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="text-center text-sm font-medium mt-2"
                    style={{ color: colores.primario[600] }}
                  >
                    ✓ Alias copiado al portapapeles
                  </motion.p>
                )}
              </div>

              {/* Decoración inferior */}
              <div className="flex justify-center gap-2 mt-4">
                <Sparkles
                  className="w-4 h-4 animate-pulse"
                  style={{ color: colores.primario[400] }}
                />
                <Sparkles
                  className="w-5 h-5"
                  style={{ color: colores.primario[500] }}
                />
                <Sparkles
                  className="w-4 h-4 animate-pulse"
                  style={{ color: colores.primario[400] }}
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Estilos adicionales para animaciones suaves */}
      <style jsx>{`
        @keyframes float-sparkle {
          0%,
          100% {
            transform: translateY(0px);
            opacity: 0.4;
          }
          50% {
            transform: translateY(-10px);
            opacity: 0.7;
          }
        }
      `}</style>
    </section>
  );
}