import { createContext, useContext, useState, useEffect } from "react";
import { createClient } from "@sanity/client/stega";

const SANITY_PROJECT_ID = "c3139aap";
const SANITY_DATASET = "production";
const CACHE_KEY = "4giifts_season_cache";
const CACHE_TTL = 60 * 60 * 1000; // 1 hour

// Solo activar stega dentro del iframe del Sanity Presentation Tool.
// Cuando stega está siempre activo, añade caracteres Unicode invisibles a los strings
// (incluidos los colores hex como #DC143C), corrompiendo las variables CSS y perdiendo los estilos.
const isPresentation = typeof window !== "undefined" &&
  window.parent !== window;

const sanityClient = createClient({
  projectId: SANITY_PROJECT_ID,
  dataset: SANITY_DATASET,
  useCdn: false,
  apiVersion: "2024-01-01",
  stega: {
    // Solo activar dentro del iframe del Studio (Presentation Tool)
    enabled: isPresentation,
    // URL del studio para los enlaces de "clic para editar"
    studioUrl: typeof window !== "undefined" && window.location.hostname === "localhost"
      ? "http://localhost:3333"
      : "https://fourgiifts.sanity.studio",
  },
});

const defaultTheme = {
  name: "Default",
  colorPrimary: "#DC143C",
  colorSecondary: "#F75270",
  colorAccent: "#F7CAC9",
  gradientStart: "#FDEBD0",
  gradientEnd: "#F7CAC9",
  fontFamily: "Inter",
  heroTitle: "Regalos que hablan por ti",
  heroSubtitle: "Convierte tus recuerdos en el detalle perfecto.",
  heroCTA: "¡Regalar!",
  navbarStyle: "light",
  particleEffect: "none",
  featuredEmoji: "🎁",
  bannerMessage: "",
};

const SeasonalThemeContext = createContext({
  season: defaultTheme,
  loading: true,
});

function getFromCache() {
  try {
    const cached = sessionStorage.getItem(CACHE_KEY);
    if (!cached) return null;
    const { data, timestamp } = JSON.parse(cached);
    if (Date.now() - timestamp > CACHE_TTL) {
      sessionStorage.removeItem(CACHE_KEY);
      return null;
    }
    return data;
  } catch {
    return null;
  }
}

function saveToCache(data) {
  try {
    sessionStorage.setItem(
      CACHE_KEY,
      JSON.stringify({ data, timestamp: Date.now() })
    );
  } catch {
    /* storage full - ignore */
  }
}

/**
 * Limpia los caracteres de Stega (Visual Editing) de un string.
 * Sanity añade metadatos invisibles que corrompen las variables CSS.
 */
function cleanStega(value) {
  if (typeof value !== "string") return value;
  
  // Si parece un color hexadecimal, extraemos solo la parte del color
  // Sanity inyecta metadatos después (o a veces antes) del string visible
  const hexMatch = value.match(/#[0-9A-Fa-f]{3,8}/);
  if (hexMatch) return hexMatch[0];
  
  // Para otros strings (como fuentes), eliminamos caracteres de control/invisibles de Sanity.
  // Usamos un rango de caracteres más amplio para asegurar limpieza total.
  return value.replace(/[\u200B-\u200D\uFEFF\u2060\u2061\u2062\u2063\u2064\u206A-\u206F]/g, "").trim();
}

function applyThemeToDOM(theme) {
  const root = document.documentElement;
  
  // Aplicamos limpieza a todos los valores que van a CSS
  const primary = cleanStega(theme.colorPrimary);
  const secondary = cleanStega(theme.colorSecondary);
  const accent = cleanStega(theme.colorAccent);
  const gStart = cleanStega(theme.gradientStart);
  const gEnd = cleanStega(theme.gradientEnd);
  const font = cleanStega(theme.fontFamily);

  root.style.setProperty("--theme-primary", primary);
  root.style.setProperty("--theme-secondary", secondary);
  root.style.setProperty("--theme-accent", accent);
  root.style.setProperty("--theme-gradient-start", gStart);
  root.style.setProperty("--theme-gradient-end", gEnd);
  root.style.setProperty("--theme-font", font);

  // Load Google Font dynamically
  if (font && font !== "Inter") {
    const fontId = `gfont-${font.replace(/\s+/g, "-")}`;
    if (!document.getElementById(fontId)) {
      const link = document.createElement("link");
      link.id = fontId;
      link.rel = "stylesheet";
      link.href = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(font)}:wght@300;400;600;700&display=swap`;
      document.head.appendChild(link);
    }
  }
}

export function SeasonalThemeProvider({ children }) {
  const [season, setSeason] = useState(defaultTheme);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    const query = `*[_type == "season" && (isActive == true || (startDate <= $today && endDate >= $today))] | order(isActive desc, priority desc)[0]{
      _id,
      name, colorPrimary, colorSecondary, colorAccent,
      gradientStart, gradientEnd, fontFamily,
      heroTitle, heroSubtitle, heroCTA,
      "heroImageUrl": heroImage.asset->url,
      "logoOverrideUrl": logoOverride.asset->url,
      navbarStyle, particleEffect, bannerMessage, featuredEmoji,
      featuredItems[]{
        name,
        price,
        "imageUrl": image.asset->url,
        link
      }
    }`;

    // En el modo presentación (Studio), usamos la perspectiva de borradores para ver cambios en vivo
    const options = {
      perspective: isPresentation ? 'previewDrafts' : 'published'
    };

    sanityClient
      .fetch(query, { today }, options)
      .then((data) => {
        const theme = data || defaultTheme;
        const merged = { ...defaultTheme, ...theme };
        setSeason(merged);
        applyThemeToDOM(merged);
      })
      .catch((err) => {
        console.warn("Sanity fetch failed, using default theme:", err);
        applyThemeToDOM(defaultTheme);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <SeasonalThemeContext.Provider value={{ season, loading }}>
      {children}
    </SeasonalThemeContext.Provider>
  );
}

export default function useSeasonalTheme() {
  return useContext(SeasonalThemeContext);
}
