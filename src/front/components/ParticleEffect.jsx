import { useEffect, useRef } from "react";
import useSeasonalTheme from "../hooks/useSeasonalTheme";

const PARTICLES = {
  snow: { chars: ["❄", "❅", "❆", "✦"], count: 35, speed: 8 },
  hearts: { chars: ["❤", "💕", "💖", "♥"], count: 25, speed: 6 },
  leaves: { chars: ["🍂", "🍁", "🌿", "🍃"], count: 20, speed: 7 },
  confetti: { chars: ["🎊", "✨", "⭐", "🎉"], count: 30, speed: 5 },
};

export const ParticleEffect = () => {
  const { season } = useSeasonalTheme();
  const containerRef = useRef(null);

  useEffect(() => {
    const effect = season?.particleEffect;
    if (!effect || effect === "none" || !PARTICLES[effect]) return;

    const container = containerRef.current;
    if (!container) return;

    const config = PARTICLES[effect];
    const particles = [];

    for (let i = 0; i < config.count; i++) {
      const el = document.createElement("span");
      el.textContent = config.chars[Math.floor(Math.random() * config.chars.length)];
      el.className = "particle-item";
      el.style.cssText = `
        position: fixed;
        top: -40px;
        left: ${Math.random() * 100}vw;
        font-size: ${12 + Math.random() * 18}px;
        opacity: ${0.4 + Math.random() * 0.5};
        pointer-events: none;
        z-index: 9999;
        animation: particleFall ${config.speed + Math.random() * 6}s linear ${Math.random() * 8}s infinite;
        animation-delay: ${Math.random() * config.speed}s;
      `;
      container.appendChild(el);
      particles.push(el);
    }

    return () => {
      particles.forEach((p) => p.remove());
    };
  }, [season?.particleEffect]);

  if (!season?.particleEffect || season.particleEffect === "none") return null;

  return <div ref={containerRef} className="particle-container" />;
};
