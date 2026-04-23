import { createContext, useContext, useState, useEffect } from "react";
import { createClient } from "@sanity/client";

const SANITY_PROJECT_ID = "c3139aap";
const SANITY_DATASET = "production";
const CACHE_KEY = "4giifts_season_cache";
const CACHE_TTL = 60 * 60 * 1000; // 1 hour

const sanityClient = createClient({
  projectId: SANITY_PROJECT_ID,
  dataset: SANITY_DATASET,
  useCdn: false,
  apiVersion: "2024-01-01",
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

function applyThemeToDOM(theme) {
  const root = document.documentElement;
  root.style.setProperty("--theme-primary", theme.colorPrimary);
  root.style.setProperty("--theme-secondary", theme.colorSecondary);
  root.style.setProperty("--theme-accent", theme.colorAccent);
  root.style.setProperty("--theme-gradient-start", theme.gradientStart);
  root.style.setProperty("--theme-gradient-end", theme.gradientEnd);
  root.style.setProperty("--theme-font", theme.fontFamily);

  // Load Google Font dynamically
  if (theme.fontFamily && theme.fontFamily !== "Inter") {
    const fontId = `gfont-${theme.fontFamily.replace(/\s+/g, "-")}`;
    if (!document.getElementById(fontId)) {
      const link = document.createElement("link");
      link.id = fontId;
      link.rel = "stylesheet";
      link.href = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(theme.fontFamily)}:wght@300;400;600;700&display=swap`;
      document.head.appendChild(link);
    }
  }
}

export function SeasonalThemeProvider({ children }) {
  const [season, setSeason] = useState(defaultTheme);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    const query = `*[_type == "season" && (isActive == true || (startDate <= $today && endDate >= $today))] | order(priority desc)[0]{
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

    sanityClient
      .fetch(query, { today })
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
