import { Outlet } from "react-router-dom/dist"
import ScrollToTop from "../components/ScrollToTop"
import { Navbar } from "../components/Navbar"
import { Footer } from "../components/Footer"
import { ParticleEffect } from "../components/ParticleEffect"
import useSeasonalTheme from "../hooks/useSeasonalTheme"

// Base component that maintains the navbar and footer throughout the page and the scroll to top functionality.
export const Layout = () => {
    const { season } = useSeasonalTheme();

    return (
        <ScrollToTop>
            {season?.bannerMessage && (
                <div className="seasonal-banner" style={{
                    background: `linear-gradient(135deg, var(--theme-primary), var(--theme-secondary))`,
                    color: '#fff',
                    textAlign: 'center',
                    padding: '10px 20px',
                    fontSize: '0.95rem',
                    fontWeight: 600,
                    letterSpacing: '0.3px',
                    zIndex: 100,
                }}>
                    {season.bannerMessage}
                </div>
            )}
            <ParticleEffect />
            <Navbar />
            <Outlet />
            <Footer />
        </ScrollToTop>
    )
}