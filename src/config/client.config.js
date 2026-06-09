// config/client.config.js
/**
 * 🎉 CONFIGURACIÓN DEL CLIENTE - CAMBIAR AQUÍ PARA CADA NUEVO PROYECTO
 *
 * Este archivo contiene TODA la información personalizable de la invitación.
 * Solo modifica los valores aquí y se aplicarán en toda la aplicación.
 */

export const clientConfig = {
  // 👤 INFORMACIÓN PERSONAL
  quinceañera: {
    nombre: "Zafiro",
    edad: "",
    apodo: "", // Opcional, ej: 'Eli'
  },

  // 📅 INFORMACIÓN DEL EVENTO
  evento: {
    fecha: "Sábado 14 de Junio",
    // ⚠️ IMPORTANTE: Formato de fechaCompleta para countdown (YYYY-MM-DD)
    fechaCompleta: "2026-06-14",
    hora: "18:00",
    horaInicio: "18:00",
  },

  // 📍 UBICACIÓN
  ubicacion: {
    nombreLugar: "",
    direccion: "Manuel Soler 1855, Libertad Merlo",
    ciudad: "Merlo",
    provincia: "Buenos Aires",
    pais: "Argentina",
    // URLs de mapas (se generan automáticamente pero puedes personalizarlas)
    googleMapsUrl: "",
    wazeUrl: "",
    // O proporciona URLs personalizadas:
    // googleMapsUrl: 'https://maps.google.com/?q=...',
    // wazeUrl: 'https://waze.com/ul?q=...',

    // Imágenes del salón (ubicadas en /public/assets/)
    imagenesSalon: [
      "/assets/quinta1.jpeg",
      "/assets/quinta2.jpeg",
      "/assets/quinta3.jpeg",
      "/assets/quinta5.jpeg",
      "/assets/quinta6.jpeg",
    ],
  },

  // 👨‍👩‍👧‍👦 INFORMACIÓN DE CONTACTO
  contacto: {
    nombreFamilia: "Familia Magallanes",
    telefono: "+54 9 11 2776-4823",
    email: "patagoniascript@gmail.com",
    whatsapp: "+541127764823", // Sin espacios ni guiones
  },

  // 📱 REDES SOCIALES
  redes: {
    instagram: {
      usuario: "leanmaga08", // Sin @
      url: "https://instagram.com/leanmaga08",
    },
    hashtag: "#wellcomezafiro", // Déjalo vacío para generarlo automáticamente: #Elizabeth''Años
  },

  // 🎁 INFORMACIÓN BANCARIA PARA REGALOS
  regalos: {
    mostrarOpcion: true, // true o false
    alias: "lean.maga",
    cbu: "0000003100052227''3206",
    nombreCuenta: "",
    mensajePersonalizado: "",
  },

  // 📝 CONFIRMACIÓN DE ASISTENCIA (RSVP)
  rsvp: {
    fechaLimite: "20 Mayo",
    // Fecha límite en formato ISO para validaciones
    fechaLimiteISO: "2026-05-20",
    mensajeCierre: "¡Gracias por confirmar tu asistencia!",
    mostrarDietaryRestrictions: true, // Mostrar campo de restricciones alimentarias
  },

  // 🎵 MÚSICA
  musica: {
    url: "", // URL de YouTube, Spotify, etc. Déjalo vacío para desactivar
    titulo: "Canción Especial",
    autoplay: false, // true o false
  },

  // 🎨 CÓDIGO DE VESTIMENTA
  codigoVestimenta: {
    tema: "Elegante sport", // 'formal', 'casual', 'cocktail', 'black-tie'
    descripcion:
      "Preferentemente, se invita a usar prendas, accesorios, maquillaje o peinados inspirados en la temática Alicia en el País de las Maravillas.",
    coloresRestringidos: ["Naturales", "Champagne"],
    mensajeRestriccion: "s",

    // Categorías de vestimenta con sugerencias
    categorias: {
      damas: {
        titulo: "Para Damas",
        sugerencias: [
          {
            tipo: "Vestido Largo",
            descripcion: "Elegante y sofisticado",
            icono: "Dress",
          },
          {
            tipo: "Vestido Cocktail",
            descripcion: "Por encima de la rodilla",
            icono: "Sparkles",
          },
          {
            tipo: "Conjunto Elegante",
            descripcion: "Blusa y falda o pantalón",
            icono: "Star",
          },
        ],
      },
      caballeros: {
        titulo: "Para Caballeros",
        sugerencias: [
          {
            tipo: "Traje Completo",
            descripcion: "Con corbata o moño",
            icono: "User",
          },
          {
            tipo: "Traje sin Corbata",
            descripcion: "Look smart casual",
            icono: "Sparkles",
          },
          {
            tipo: "Camisa y Pantalón",
            descripcion: "Elegante formal",
            icono: "Star",
          },
        ],
      },
    },
  },

  // 🔐 CONFIGURACIÓN DE ADMINISTRADOR
  admin: {
    password: "Zafiro1234", // ⚠️ CAMBIAR ESTO en producción
    dashboardUrl: "/admin",
  },

  // 🗄️ CONFIGURACIÓN DE SERVICIOS EXTERNOS
  servicios: {
    supabase: {
      url: process.env.NEXT_PUBLIC_SUPABASE_URL || "",
      anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "",
    },
    emailjs: {
      serviceId: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "",
      templateId: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "",
      publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "",
    },
  },

  // 🌐 CONFIGURACIÓN DEL SITIO
  sitio: {
    nombre: "Invitación de Baby Shower",
    descripcion: "Una celebración especial",
    url:
      process.env.NEXT_PUBLIC_PRODUCTION_URL ||
      "https://invitacion-quinceañera.vercel.app",
    idioma: "es",
    imagenOG: "/assets/1.jpg", // Imagen para compartir en redes sociales
  },

  // 🎭 SECCIONES VISIBLES
  seccionesVisibles: {
    countdown: true,
    ubicacion: true,
    codigoVestimenta: true,
    rsvp: true,
    regalos: true,
    fotos: true,
    musica: false, // Cambiar a true si hay música
  },
};

/**
 * 🔧 FUNCIONES HELPER
 */

// Generar hashtag automáticamente
export const getHashtag = () => {
  const { nombre, edad } = clientConfig.quinceañera;
  return clientConfig.redes.hashtag || `#${nombre}${edad}Años`;
};

// Generar URLs de mapas automáticamente
export const getMapUrls = () => {
  const { nombreLugar, direccion, googleMapsUrl, wazeUrl } =
    clientConfig.ubicacion;
  const direccionCompleta = `${nombreLugar}, ${direccion}`;

  return {
    google:
      googleMapsUrl ||
      `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
        direccionCompleta,
      )}`,
    waze:
      wazeUrl ||
      `https://waze.com/ul?q=${encodeURIComponent(direccionCompleta)}`,
  };
};

// Obtener título completo del sitio
export const getSiteTitle = () => {
  const { nombre, edad } = clientConfig.quinceañera;
  return `${nombre} - Mis ${edad} Años`;
};

// Obtener descripción del sitio
export const getSiteDescription = () => {
  const { nombre, edad } = clientConfig.quinceañera;
  const { fecha } = clientConfig.evento;
  return `Te invito a celebrar mis ${edad} años el ${fecha}. ¡No te lo pierdas!`;
};

export default clientConfig;
