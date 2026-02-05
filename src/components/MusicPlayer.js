import React from "react";
import { motion } from "framer-motion";
import { Music, Play, Pause, Volume2, VolumeX } from "lucide-react";
import { useAudio } from "./AudioContext";
import { useQuinceaneraConfig } from "@/hooks/useQuinceaneraConfig";

const MusicPlayer = ({ className = "", showVolumeControl = true }) => {
  // ✅ Obtener colores del theme config
  const { colores } = useQuinceaneraConfig();

  // Obtener todo el estado y las funciones del contexto global
  const {
    isPlaying,
    isLoading,
    error,
    volume,
    isMuted,
    togglePlayPause,
    handleVolumeChange,
    toggleMute,
  } = useAudio();

  // Convertir hex a rgba para las animaciones
  const hexToRgba = (hex, alpha) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };

  // Si hay error, mostrar mensaje de error
  if (error) {
    return (
      <div
        className={`inline-flex items-center px-2 py-1 rounded text-xs ${className}`}
        style={{
          backgroundColor: "#fee",
          color: "#c00",
        }}
      >
        <Music size={14} className="mr-1" />
        <span className="text-xs">Audio Error</span>
      </div>
    );
  }

  return (
    <div className={`inline-flex items-center gap-2 ${className}`}>
      {/* Botón principal de Play/Pause */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={togglePlayPause}
        disabled={isLoading}
        animate={
          !isPlaying && !isLoading
            ? {
                scale: [1, 1.08, 1],
                boxShadow: [
                  `0 4px 20px ${hexToRgba(colores.primario[500], 0.5)}`,
                  `0 6px 30px ${hexToRgba(colores.primario[500], 0.8)}`,
                  `0 4px 20px ${hexToRgba(colores.primario[500], 0.5)}`,
                ],
              }
            : {}
        }
        transition={
          !isPlaying && !isLoading
            ? {
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }
            : {}
        }
        className="flex items-center gap-1 px-3 py-1.5 text-sm font-bold rounded-full transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed relative overflow-hidden"
        style={{
          background: isPlaying
            ? `linear-gradient(to right, ${colores.primario[500]}, ${colores.terciario[400]}, ${colores.primario[500]})`
            : isLoading
            ? colores.terciario[400]
            : `linear-gradient(to right, ${colores.terciario[400]}, ${colores.terciario[500]}, ${colores.terciario[400]})`,
          backgroundSize: isPlaying ? "200% 100%" : "100% 100%",
          boxShadow: `0 10px 25px ${hexToRgba(colores.primario[500], 0.2)}`,
          color: "#ffffff",
        }}
        aria-label={isPlaying ? "Pausar música" : "Reproducir música"}
      >
        {/* Efecto de brillo cuando está reproduciéndose */}
        {isPlaying && (
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
            initial={{ x: "-100%" }}
            animate={{ x: "100%" }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        )}

        {/* Icono que rota cuando está reproduciéndose */}
        <motion.div
          animate={isPlaying ? { rotate: [0, 360] } : { rotate: 0 }}
          transition={{
            duration: 2,
            repeat: isPlaying ? Infinity : 0,
            ease: "linear",
          }}
        >
          {isLoading ? (
            <Music size={12} className="animate-spin" />
          ) : isPlaying ? (
            <Pause size={12} />
          ) : (
            <Play size={12} />
          )}
        </motion.div>

        {/* Texto que parpadea cuando está reproduciéndose */}
        <motion.span
          animate={isPlaying ? { opacity: [1, 0.7, 1] } : { opacity: 1 }}
          transition={{
            duration: 1.5,
            repeat: isPlaying ? Infinity : 0,
            ease: "easeInOut",
          }}
        >
          {isLoading ? "Cargando..." : isPlaying ? "PAUSE" : "PLAY"}
        </motion.span>
      </motion.button>

      {/* Controles de volumen (solo si showVolumeControl es true) */}
      {showVolumeControl && (
        <div className="hidden sm:flex items-center gap-1">
          {/* Botón de mute/unmute */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleMute}
            className="p-1 rounded-full transition-all duration-300"
            style={{
              color: colores.primario[500],
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = colores.primario[600];
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = colores.primario[500];
            }}
            aria-label={isMuted ? "Activar sonido" : "Silenciar"}
          >
            <motion.div
              animate={
                !isMuted && isPlaying ? { scale: [1, 1.1, 1] } : { scale: 1 }
              }
              transition={{
                duration: 0.8,
                repeat: !isMuted && isPlaying ? Infinity : 0,
                ease: "easeInOut",
              }}
            >
              {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
            </motion.div>
          </motion.button>

          {/* Slider de volumen */}
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={isMuted ? 0 : volume}
            onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
            className="w-16 h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
            style={{
              background: `linear-gradient(to right, 
                ${colores.primario[500]} 0%, 
                ${colores.primario[500]} ${(isMuted ? 0 : volume) * 100}%, 
                #e5e7eb ${(isMuted ? 0 : volume) * 100}%, 
                #e5e7eb 100%)`,
            }}
          />
        </div>
      )}
    </div>
  );
};

export default MusicPlayer;