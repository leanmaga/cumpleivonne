"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { useQuinceaneraConfig } from "@/hooks/useQuinceaneraConfig";

const SeaHearts = ({ count = 15, colores }) => {
  const [hearts, setHearts] = useState([]);

  useEffect(() => {
    const newHearts = Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: 100 + Math.random() * 20,
      size: Math.random() * 20 + 10,
      delay: Math.random() * 5,
      duration: Math.random() * 4 + 6,
      wobble: Math.random() * 30 - 15,
    }));
    setHearts(newHearts);
  }, [count, colores]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          className="absolute"
          style={{
            left: `${heart.x}%`,
            bottom: 0,
          }}
          initial={{ y: 0, opacity: 0, scale: 0.5 }}
          animate={{
            y: [-20, -window.innerHeight - 100],
            x: [0, heart.wobble, -heart.wobble, heart.wobble * 0.5, 0],
            opacity: [0, 0.8, 0.8, 0.6, 0],
            scale: [0.5, 1, 1, 0.8, 0.3],
          }}
          transition={{
            duration: heart.duration,
            delay: heart.delay,
            repeat: Infinity,
            ease: "easeOut",
            times: [0, 0.1, 0.5, 0.8, 1],
          }}
        >
          <Heart
            size={heart.size}
            strokeWidth={1}
            className="text-red-400 fill-red-400"
          />
        </motion.div>
      ))}
    </div>
  );
};

const SmallHearts = ({ count = 8, colores }) => {
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
          className="absolute"
          style={{
            left: `${particle.x}%`,
            bottom: 0,
          }}
          initial={{ y: 0, opacity: 0, scale: 0.3 }}
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
        >
          <Heart
            size={particle.size}
            strokeWidth={1}
            className="text-pink-400 fill-pink-400"
          />
        </motion.div>
      ))}
    </div>
  );
};

export default function HeroSection() {
  const { colores } = useQuinceaneraConfig();

  const titleStyles = {
    className: "text-6xl md:text-8xl lg:text-9xl font-bold relative z-10",
    style: {
      fontFamily: "var(--font-Emilys_Candy)",
      color: colores.primario[200],
      textShadow: `0 0 20px ${colores.primario[400]}, 0 0 40px ${colores.primario[500]}, 0 0 60px ${colores.terciario[400]}, 2px 2px 8px rgba(0,0,0,0.8)`,
    },
  };

  return (
    <section
      id="hero"
      className="flex flex-col justify-between relative w-full aspect-[852/1846] md:aspect-[1086/1448]"
    >
      {/* Mobile: mobile.png */}
      <div
        className="absolute inset-0 md:hidden"
        style={{
          backgroundImage: `url('/assets/mobile.png')`,
          backgroundSize: "cover",
          backgroundPosition: "center center",
          backgroundRepeat: "no-repeat",
          mixBlendMode: "multiply",
        }}
      />
      {/* Desktop: tapiz2.png */}
      <div
        className="absolute inset-0 hidden md:block"
        style={{
          backgroundImage: `url('/assets/tapiz2.png')`,
          backgroundSize: "cover",
          backgroundPosition: "center center",
          backgroundRepeat: "no-repeat",
          backgroundColor: "#1a0a0a",
          mixBlendMode: "multiply",
        }}
      />

      {/* Overlay sutil */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            linear-gradient(to bottom, 
              ${colores.primario[50]}20, 
              transparent 30%, 
              transparent 70%, 
              ${colores.primario[100]}30
            )
          `,
        }}
      />

      <SeaHearts count={20} colores={colores} />
      <SmallHearts count={15} colores={colores} />

      {/* Luciérnagas decorativas */}
      <motion.div
        className="absolute top-10 left-10"
        animate={{
          opacity: [0.5, 1, 0.5],
          scale: [0.8, 1.2, 0.8],
          x: [0, 10, -5, 0],
          y: [0, -8, 5, 0],
        }}
        transition={{ duration: 5, repeat: Infinity, delay: 1 }}
      >
        <div
          className="w-3 h-3 rounded-full"
          style={{
            backgroundColor: colores.primario[400],
            boxShadow: `0 0 15px ${colores.primario[400]}, 0 0 30px ${colores.primario[400]}60`,
          }}
        />
      </motion.div>

      <motion.div
        className="absolute top-20 right-16"
        animate={{
          opacity: [0.3, 0.8, 0.3],
          scale: [0.6, 1, 0.6],
          x: [0, -15, 8, 0],
          y: [0, 12, -6, 0],
        }}
        transition={{ duration: 6, repeat: Infinity, delay: 2 }}
      >
        <div
          className="w-2 h-2 rounded-full"
          style={{
            backgroundColor: colores.terciario[300],
            boxShadow: `0 0 12px ${colores.terciario[300]}, 0 0 24px ${colores.terciario[300]}40`,
          }}
        />
      </motion.div>

      <motion.div
        className="absolute bottom-32 left-20"
        animate={{
          opacity: [0.4, 0.9, 0.4],
          scale: [0.7, 1.1, 0.7],
          x: [0, 18, -10, 0],
          y: [0, -12, 8, 0],
        }}
        transition={{ duration: 4, repeat: Infinity, delay: 0.5 }}
      >
        <div
          className="w-4 h-4 rounded-full"
          style={{
            backgroundColor: colores.primario[400],
            boxShadow: `0 0 18px ${colores.primario[400]}, 0 0 36px ${colores.primario[400]}50`,
          }}
        />
      </motion.div>

      <motion.div
        className="absolute bottom-20 right-24"
        animate={{
          opacity: [0.6, 1, 0.4, 0.8],
          scale: [0.8, 1.2, 0.9, 1],
          x: [0, -20, 15, 0],
          y: [0, -18, 10, 0],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 3,
        }}
      >
        <div
          className="w-2.5 h-2.5 rounded-full"
          style={{
            backgroundColor: colores.terciario[300],
            boxShadow: `0 0 14px ${colores.terciario[300]}, 0 0 28px ${colores.terciario[300]}40`,
          }}
        />
      </motion.div>
    </section>
  );
}
