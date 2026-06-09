// config/theme.config.js
/**
 * 🎨 CONFIGURACIÓN DE TEMA Y COLORES (BABY SHOWER - ROSA PASTEL)
 */

export const themeConfig = {
  // 🌈 COLORES PRINCIPALES
  colores: {
    // 🌸 Primario (rosa pastel)
    primario: {
      50: "#fff0f6",
      100: "#ffd6e7",
      200: "#ffadd2",
      300: "#ff85c0",
      400: "#ff5ca8",
      500: "#ff85c0", // base
      600: "#f759ab",
      700: "#d63384",
      800: "#b0256a",
      900: "#7a1e4d",
    },

    // 🎀 Secundario (rosa suave / nude)
    secundario: {
      50: "#fffafa",
      100: "#fff0f3",
      200: "#ffe4e9",
      300: "#ffd6dd",
      400: "#ffc2cc",
      500: "#ffb3c1", // base
      600: "#ff8fab",
      700: "#fb6f92",
      800: "#e05780",
      900: "#b9375d",
    },

    // ✨ Terciario (lavanda pastel)
    terciario: {
      50: "#f9f0ff",
      100: "#efdbff",
      200: "#d3adf7",
      300: "#b37feb",
      400: "#9254de",
      500: "#b37feb", // base
      600: "#722ed1",
      700: "#531dab",
      800: "#391085",
      900: "#22075e",
    },

    // ⚪ Elegantes (rosados oscuros para contraste)
    elegante: {
      50: "#fff1f2",
      100: "#ffe4e6",
      200: "#fecdd3",
      300: "#fda4af",
      400: "#fb7185",
      500: "#f43f5e",
      600: "#e11d48",
      700: "#be123c",
      800: "#9f1239",
      900: "#881337",
      950: "#4c0519",
    },

    // 💖 Acentos globales
    acento: "#ff85c0",
    acentoSecundario: "#b37feb",
    fondo: "#fff0f6",
    texto: "#7a1e4d",
    textoClaro: "#d63384",
  },

  // 🎭 CÓDIGO DE VESTIMENTA
  codigoVestimenta: {
    coloresRestringidos: [],
    mensajeRestriccion: "",
  },

  // ✨ EFECTOS Y ANIMACIONES
  efectos: {
    glassMorphism: {
      background: "rgba(255, 133, 192, 0.15)",
      backdropBlur: "6.1px",
      borderRadius: "16px",
      border: "1px solid rgba(255, 133, 192, 0.35)",
    },
    transicion: "0.3s ease",
    duracionAnimacion: "0.8s",
  },

  // 🔤 TIPOGRAFÍA
  fuentes: {
    titulo: "var(--font-Emilys_Candy)",
    cursiva: "var(--font-dancing)",
    texto: "var(--font-sans)",
    especial: "var(--font-Emilys_Candy)",
  },

  // 📐 ESPACIADO
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
 * 🎨 HELPER: Obtener color con opacidad
 */
export function getColorWithOpacity(categoria, tono, opacidad = 1) {
  const color = themeConfig.colores[categoria]?.[tono];
  if (!color) return null;

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
 * 🎨 HELPER: Clases Tailwind primarias
 */
export function getPrimaryColorClasses() {
  return {
    bg: "bg-[#ff85c0]",
    bgHover: "hover:bg-[#f759ab]",
    text: "text-[#ff85c0]",
    border: "border-[#ff85c0]",
    gradient: "from-[#ffd6e7] via-[#ff85c0] to-[#ffb3c1]",
    gradientReverse: "from-[#ffb3c1] via-[#ffd6e7] to-[#ff85c0]",
  };
}

/**
 * 🎨 HELPER: Clases secundarias
 */
export function getSecondaryColorClasses() {
  return {
    bg: "bg-[#ffb3c1]",
    bgHover: "hover:bg-[#ff8fab]",
    text: "text-[#ffb3c1]",
    border: "border-[#ffb3c1]",
  };
}

export default themeConfig;