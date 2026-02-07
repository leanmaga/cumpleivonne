// config/theme.config.js
/**
 * 🎨 CONFIGURACIÓN DE TEMA Y COLORES
 * Cambia aquí todos los colores para personalizar la invitación
 */

export const themeConfig = {
  // 🌈 COLORES PRINCIPALES
  colores: {
    // Color primario (azul océano)
    primario: {
      50: "#e6f7ff", // Celeste muy muy claro
      100: "#bae7ff", // Celeste muy claro
      200: "#91d5ff", // Celeste claro
      300: "#69c0ff", // Celeste medio claro
      400: "#40a9ff", // Celeste medio
      500: "#1890ff", // Color base - Azul océano brillante (franja superior)
      600: "#096dd9", // Azul océano medio
      700: "#0050b3", // Azul océano oscuro
      800: "#003a8c", // Azul profundo
      900: "#002766", // Azul muy oscuro
    },

    // Color secundario (beige/arena) - Perfecto para tema playa
    secundario: {
      50: "#faf8f6", // Beige casi blanco
      100: "#f4f0eb", // Beige muy claro (arena clara)
      200: "#ede7dc", // Beige claro
      300: "#e6ddd0", // Beige medio claro
      400: "#e1cfc4", // Beige medio (franja 3)
      500: "#d4bfb0", // Color base - Beige arena
      600: "#c0a999", // Beige oscuro
      700: "#a38977", // Beige más oscuro
      800: "#7a6557", // Marrón beige
      900: "#5a4a3f", // Marrón oscuro
    },

    // Color terciario (turquesa/celeste para acentos)
    terciario: {
      50: "#e6fffb",
      100: "#b5f5ec",
      200: "#87e8de",
      300: "#5cdbd3", // Turquesa claro (franja 2)
      400: "#36cfc9", // Turquesa medio
      500: "#13c2c2", // Color base - Turquesa
      600: "#08979c", // Turquesa oscuro
      700: "#006d75", // Verde azulado
      800: "#00474f", // Verde azulado oscuro
      900: "#002329", // Verde azulado muy oscuro
    },

    // Colores elegantes (grises/negros)
    elegante: {
      50: "#f8fafc",
      100: "#f1f5f9",
      200: "#e2e8f0",
      300: "#cbd5e1",
      400: "#94a3b8",
      500: "#64748b",
      600: "#475569",
      700: "#334155",
      800: "#1e293b",
      900: "#0f172a",
      950: "#020617",
    },

    // Colores de acento
    acento: "#1890ff", // Azul océano
    acentoSecundario: "#5cdbd3", // Turquesa claro
    fondo: "#f0f9ff", // Fondo celeste muy claro (cielo/agua)
    texto: "#002766", // Texto azul muy oscuro
    textoClaro: "#0050b3", // Texto azul medio
  },

  // 🎭 CÓDIGO DE VESTIMENTA - Colores restringidos
  codigoVestimenta: {
    coloresRestringidos: ["Azul océano", "Turquesa"],
    mensajeRestriccion:
      "",
  },

  // ✨ EFECTOS Y ANIMACIONES
  efectos: {
    glassMorphism: {
      background: "rgba(24, 144, 255, 0.15)", // Azul con transparencia
      backdropBlur: "6.1px",
      borderRadius: "16px",
      border: "1px solid rgba(24, 144, 255, 0.35)", // Borde azul
    },
    transicion: "0.3s ease",
    duracionAnimacion: "0.8s",
  },

  // 🔤 TIPOGRAFÍA
  fuentes: {
    titulo: "var(--font-Emilys_Candy)", // Fuente elegante para títulos
    cursiva: "var(--font-dancing)", // Fuente decorativa
    texto: "var(--font-sans)", // Fuente para texto normal
    especial: "var(--font-Emilys_Candy)", // Fuente especial
  },

  // 📐 ESPACIADO Y TAMAÑOS
  espaciado: {
    radius: {
      sm: "0.375rem",
      md: "0.5rem",
      lg: "0.75rem",
      xl: "1rem",
      "2xl": "1.5rem",
    },
  },
};

/**
 * 🎨 FUNCIÓN HELPER: Obtener color con opacidad
 * Uso: getColorWithOpacity('primario', 500, 0.8)
 */
export function getColorWithOpacity(categoria, tono, opacidad = 1) {
  const color = themeConfig.colores[categoria]?.[tono];
  if (!color) return null;

  // Convertir hex a rgba si se necesita opacidad
  if (opacidad < 1) {
    const hex = color.replace("#", "");
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    return `rgba(${r}, ${g}, ${b}, ${opacidad})`;
  }

  return color;
}

/**
 * 🎨 FUNCIÓN HELPER: Obtener clase de Tailwind según el color primario
 */
export function getPrimaryColorClasses() {
  return {
    bg: "bg-[#1890ff]", // Azul océano
    bgHover: "hover:bg-[#096dd9]", // Azul océano más oscuro
    text: "text-[#1890ff]", // Azul océano
    border: "border-[#1890ff]", // Azul océano
    gradient: "from-[#5cdbd3] via-[#1890ff] to-[#e1cfc4]", // Degradado turquesa > azul > arena
    gradientReverse: "from-[#e1cfc4] via-[#5cdbd3] to-[#1890ff]", // Degradado inverso
  };
}

/**
 * 🎨 FUNCIÓN HELPER: Obtener clases de color secundario (beige/arena)
 */
export function getSecondaryColorClasses() {
  return {
    bg: "bg-[#e1cfc4]", // Beige arena
    bgHover: "hover:bg-[#d4bfb0]", // Beige oscuro
    text: "text-[#e1cfc4]", // Beige arena
    border: "border-[#e1cfc4]", // Beige arena
  };
}

export default themeConfig;