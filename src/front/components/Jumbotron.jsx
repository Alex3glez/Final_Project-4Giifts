import { Link } from "react-router-dom";
import useSeasonalTheme from "../hooks/useSeasonalTheme";

export const Jumbotron = () => {
    const { season, loading } = useSeasonalTheme();

    // Build a dynamic background based on season gradients
    const heroStyle = {
        minHeight: '90vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '80px 20px',
        background: season?.heroImageUrl 
            ? 'none' // Handled by class and backgroundImage
            : `
                radial-gradient(ellipse 80% 60% at 50% 0%, 
                    color-mix(in srgb, var(--theme-primary) 55%, transparent), 
                    transparent 65%),
                linear-gradient(160deg, 
                    var(--theme-gradient-start) 0%, 
                    var(--theme-gradient-end) 50%,
                    color-mix(in srgb, var(--theme-secondary) 15%, white) 100%)
            `,
        backgroundImage: season?.heroImageUrl ? `url(${season.heroImageUrl})` : undefined,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        position: 'relative',
        overflow: 'hidden',
    };

    return (
        <div className="animate-fade-in">
            {/* Decorative background shapes */}
            <div style={{ position: 'relative' }}>
                {/* Geometric blobs */}
                <div style={{
                    position: 'absolute', top: '-10%', right: '-5%',
                    width: '450px', height: '450px', borderRadius: '50%',
                    background: `radial-gradient(circle, color-mix(in srgb, var(--theme-secondary) 20%, transparent), transparent)`,
                    filter: 'blur(60px)', zIndex: 0,
                }} />
                <div style={{
                    position: 'absolute', bottom: '0', left: '-5%',
                    width: '350px', height: '350px', borderRadius: '50%',
                    background: `radial-gradient(circle, color-mix(in srgb, var(--theme-primary) 20%, transparent), transparent)`,
                    filter: 'blur(50px)', zIndex: 0,
                }} />

                <div
                    className={`jumbotron m-0 p-0 text-center ${season?.heroImageUrl ? 'pers-bg-img-jumbotron' : ''}`}
                    style={heroStyle}
                >
                    {/* Emoji badge */}
                    {season?.featuredEmoji && (
                        <div className="animate-float mb-4" style={{ position: 'relative', zIndex: 2 }}>
                            <span style={{
                                fontSize: '4rem',
                                display: 'inline-block',
                                filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.15))',
                            }}>
                                {season.featuredEmoji}
                            </span>
                        </div>
                    )}

                    {/* Season tag */}
                    {season?.name && season.name !== 'Default' && (
                        <div className="animate-fade-in-up delay-1 mb-3" style={{ position: 'relative', zIndex: 2 }}>
                            <span style={{
                                background: 'rgba(255,255,255,0.25)',
                                backdropFilter: 'blur(12px)',
                                border: '1px solid rgba(255,255,255,0.4)',
                                color: '#fff',
                                padding: '6px 20px',
                                borderRadius: '100px',
                                fontSize: '0.82rem',
                                fontWeight: 700,
                                letterSpacing: '1.5px',
                                textTransform: 'uppercase',
                                display: 'inline-block',
                            }}>
                                ✦ Temporada: {season.name}
                            </span>
                        </div>
                    )}

                    {/* Main headline */}
                    <h1 className="animate-fade-in-up delay-2" style={{
                        fontSize: 'clamp(2.4rem, 5.5vw, 4.5rem)',
                        fontWeight: 900,
                        letterSpacing: '-0.03em',
                        lineHeight: 1.05,
                        marginBottom: '24px',
                        maxWidth: '750px',
                        color: '#fff',
                        textShadow: '0 2px 20px rgba(0,0,0,0.18)',
                        position: 'relative',
                        zIndex: 2,
                    }}>
                        {season?.heroTitle || 'Regalos que hablan por ti'}
                    </h1>

                    {/* Subtitle */}
                    <p className="animate-fade-in-up delay-3" style={{
                        fontSize: 'clamp(1.05rem, 2.2vw, 1.4rem)',
                        fontWeight: 400,
                        opacity: 0.92,
                        maxWidth: '580px',
                        lineHeight: 1.6,
                        marginBottom: '8px',
                        color: '#fff',
                        position: 'relative',
                        zIndex: 2,
                    }}>
                        {season?.heroSubtitle || 'Convierte tus recuerdos en el detalle perfecto.'}
                    </p>

                    {/* Divider */}
                    <div className="animate-fade-in delay-4" style={{
                        width: '60px', height: '3px',
                        background: 'rgba(255,255,255,0.55)',
                        borderRadius: '4px',
                        margin: '28px auto',
                        position: 'relative', zIndex: 2,
                    }} />

                    {/* Tagline */}
                    <p className="animate-fade-in-up delay-4" style={{
                        fontSize: '1rem',
                        fontWeight: 400,
                        opacity: 0.8,
                        marginBottom: '40px',
                        color: '#fff',
                        position: 'relative', zIndex: 2,
                    }}>
                        Cuando las palabras no bastan, un regalo lo dice todo
                    </p>

                    {/* CTA Buttons */}
                    <div className="animate-fade-in-up delay-5 d-flex flex-wrap gap-3 justify-content-center" style={{ position: 'relative', zIndex: 2 }}>
                        <Link to="/dashboard" style={{ textDecoration: 'none' }}>
                            <button
                                className="btn btn-lg"
                                style={{
                                    background: '#fff',
                                    color: 'var(--theme-primary)',
                                    fontWeight: 700,
                                    fontSize: '1.1rem',
                                    padding: '14px 36px',
                                    borderRadius: '100px',
                                    border: 'none',
                                    boxShadow: '0 8px 32px rgba(0,0,0,0.15)',
                                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                }}
                                onMouseEnter={e => {
                                    e.currentTarget.style.transform = 'translateY(-3px)';
                                    e.currentTarget.style.boxShadow = '0 14px 40px rgba(0,0,0,0.22)';
                                }}
                                onMouseLeave={e => {
                                    e.currentTarget.style.transform = 'translateY(0)';
                                    e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,0,0,0.15)';
                                }}
                            >
                                {season?.featuredEmoji || '🎁'} {season?.heroCTA || '¡Generar ideas!'}
                            </button>
                        </Link>
                        <Link to="/signup" style={{ textDecoration: 'none' }}>
                            <button
                                className="btn btn-lg"
                                style={{
                                    background: 'rgba(255,255,255,0.18)',
                                    color: '#fff',
                                    fontWeight: 600,
                                    fontSize: '1.05rem',
                                    padding: '14px 36px',
                                    borderRadius: '100px',
                                    border: '2px solid rgba(255,255,255,0.5)',
                                    backdropFilter: 'blur(10px)',
                                    transition: 'all 0.3s ease',
                                }}
                                onMouseEnter={e => {
                                    e.currentTarget.style.background = 'rgba(255,255,255,0.28)';
                                    e.currentTarget.style.transform = 'translateY(-2px)';
                                }}
                                onMouseLeave={e => {
                                    e.currentTarget.style.background = 'rgba(255,255,255,0.18)';
                                    e.currentTarget.style.transform = 'translateY(0)';
                                }}
                            >
                                Crear cuenta gratis →
                            </button>
                        </Link>
                    </div>

                    {/* Stats bar */}
                    <div className="animate-fade-in delay-6" style={{
                        marginTop: '64px',
                        display: 'flex',
                        gap: '40px',
                        justifyContent: 'center',
                        flexWrap: 'wrap',
                        position: 'relative', zIndex: 2,
                    }}>
                        {[
                            { value: '+10K', label: 'Regalos generados' },
                            { value: '98%', label: 'Usuarios satisfechos' },
                            { value: '24/7', label: 'Disponible siempre' },
                        ].map(({ value, label }) => (
                            <div key={label} style={{ textAlign: 'center', color: '#fff' }}>
                                <div style={{ fontSize: '2rem', fontWeight: 800, lineHeight: 1 }}>{value}</div>
                                <div style={{ fontSize: '0.85rem', opacity: 0.75, marginTop: '4px', fontWeight: 500 }}>{label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};