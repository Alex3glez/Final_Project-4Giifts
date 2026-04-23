import React, { useEffect, useState } from "react";

import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { Jumbotron } from "../components/Jumbotron.jsx";
import Card from "../components/Card.jsx";
import { Instrucciones } from "../components/Instrucciones.jsx";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import { Autoplay } from "swiper/modules";
import useSeasonalTheme from "../hooks/useSeasonalTheme.jsx";

const button = "Comprar";

const features = [
    { emoji: "🤖", title: "IA Inteligente", desc: "Nuestro motor analiza personalidad, hobbies y presupuesto para sugerirte el regalo ideal." },
    { emoji: "🎯", title: "100% Personalizado", desc: "Cada recomendación está adaptada a la persona, la ocasión y tu relación con ella." },
    { emoji: "💡", title: "Sin inspiración", desc: "¿No sabes qué regalar? En segundos tendrás ideas únicas y originales." },
    { emoji: "💌", title: "Para toda ocasión", desc: "Cumpleaños, Navidad, San Valentín, Día de la Madre... Siempre a punto." },
];

export const Home = () => {
    const { store, dispatch } = useGlobalReducer();
    const { season } = useSeasonalTheme();
    const [favoriteUser, setFavoriteUser] = useState([]);

    const loadMessage = async () => {
        try {
            const backendUrl = import.meta.env.VITE_BACKEND_URL;
            if (!backendUrl) throw new Error("VITE_BACKEND_URL is not defined in .env file");
            const response = await fetch(backendUrl + "/api/hello");
            const data = await response.json();
            if (response.ok) dispatch({ type: "set_hello", payload: data.message });
            return data;
        } catch (error) {
            if (error.message) throw new Error(`Could not fetch the message from the backend.`);
        }
    };

    useEffect(() => {
        loadMessage();
        loadFavoriteUser();
    }, []);

    const loadFavoriteUser = async () => {
        try {
            const backendUrl = import.meta.env.VITE_BACKEND_URL;
            if (!backendUrl) return;
            const response = await fetch(backendUrl + "/api/get_favorite_user");
            const data = await response.json();
            setFavoriteUser(data);
        } catch (error) { }
    };

    return (
        <div className="w-100" style={{ background: '#fafafa' }}>

            {/* HERO SECTION */}
            <Jumbotron />

            {/* FEATURES SECTION */}
            <section className="py-5" style={{
                background: 'linear-gradient(180deg, #ffffff 0%, #fafafa 100%)'
            }}>
                <div className="container py-3">
                    <div className="text-center mb-5 animate-fade-in-up">
                        {season?.name && season.name !== 'Default' && (
                            <div className="mb-3">
                                <span className="season-tag">
                                    {season.featuredEmoji} {season.name}
                                </span>
                            </div>
                        )}
                        <h2 style={{
                            fontSize: 'clamp(1.8rem, 4vw, 2.6rem)',
                            fontWeight: 800,
                            color: '#1a1a2e',
                            letterSpacing: '-0.02em',
                            marginBottom: '12px',
                        }}>
                            ¿Por qué <span className="gradient-text">4Giifts</span>?
                        </h2>
                        <p className="text-muted" style={{ maxWidth: '500px', margin: '0 auto', lineHeight: 1.7 }}>
                            La plataforma más inteligente para encontrar el regalo perfecto
                        </p>
                    </div>

                    <div className="row g-4">
                        {features.map(({ emoji, title, desc }, i) => (
                            <div key={i} className={`col-12 col-sm-6 col-lg-3 animate-fade-in-up delay-${i + 1}`}>
                                <div className="glass-card-premium card-glow h-100 p-4">
                                    <div className="feature-icon-wrap">
                                        {emoji}
                                    </div>
                                    <h5 style={{ fontWeight: 700, fontSize: '1.1rem', color: '#1a1a2e', marginBottom: '8px' }}>
                                        {title}
                                    </h5>
                                    <p style={{ fontSize: '0.9rem', color: '#666', lineHeight: 1.65, marginBottom: 0 }}>
                                        {desc}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* HOW IT WORKS */}
            <section className="py-5 section-theme-gradient">
                <Instrucciones />
            </section>

            {/* FAVORITES CAROUSEL */}
            <section className="py-5" style={{ background: '#fff' }}>
                <div className="container">
                    <div className="text-center mb-5 animate-fade-in-up">
                        <span className="seasonal-badge mb-3 d-inline-block">
                            {season?.featuredEmoji || '🔥'} Popular ahora
                        </span>
                        <h2 className="mt-3" style={{
                            fontSize: 'clamp(1.8rem, 3.5vw, 2.4rem)',
                            fontWeight: 800,
                            color: '#1a1a2e',
                            letterSpacing: '-0.02em',
                        }}>
                            Los más elegidos por la comunidad
                        </h2>
                        <p className="text-muted mt-2" style={{ maxWidth: '500px', margin: '12px auto 0' }}>
                            Descubre las ideas más populares que otros usuarios han seleccionado
                        </p>
                    </div>

                    <Swiper
                        modules={[Autoplay]}
                        autoplay={{ delay: 3000, disableOnInteraction: false }}
                        spaceBetween={24}
                        slidesPerView={1}
                        loop={true}
                        breakpoints={{
                            768: { slidesPerView: 2 },
                            1024: { slidesPerView: 3 }
                        }}
                        className="mySwiper px-2"
                    >
                        {favoriteUser.length > 0 ? (
                            favoriteUser.map((fav, index) => (
                                <SwiperSlide key={index} className="d-flex justify-content-center h-auto my-3">
                                    <Card
                                        imageUrl={fav.img}
                                        title={fav.name}
                                        description={`Precio: ${fav.price}`}
                                        button={button}
                                        linkButton={fav.link}
                                    />
                                </SwiperSlide>
                            ))
                        ) : (
                            <>
                                {[
                                    { img: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&auto=format&fit=crop&q=60', title: 'Regalo Especial', price: '50-100€' },
                                    { img: 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=400&auto=format&fit=crop&q=60', title: 'Detalle Único', price: '20-40€' },
                                    { img: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=400&auto=format&fit=crop&q=60', title: 'Sorpresa Perfecta', price: '30-60€' },
                                ].map((item, i) => (
                                    <SwiperSlide key={i} className="d-flex justify-content-center h-auto my-3">
                                        <Card
                                            imageUrl={item.img}
                                            title={item.title}
                                            description={`Precio aprox: ${item.price}`}
                                            button={button}
                                        />
                                    </SwiperSlide>
                                ))}
                            </>
                        )}
                    </Swiper>
                </div>
            </section>

            {/* STATS SECTION */}
            <section className="py-5 section-theme-gradient">
                <div className="container">
                    <div className="row g-4 text-center">
                        {[
                            { number: '+10K', label: 'Regalos generados', emoji: '🎁' },
                            { number: '98%', label: 'Usuarios satisfechos', emoji: '😊' },
                            { number: '+500', label: 'Ideas únicas al día', emoji: '💡' },
                            { number: '24/7', label: 'Siempre disponible', emoji: '⚡' },
                        ].map(({ number, label, emoji }, i) => (
                            <div key={i} className={`col-6 col-lg-3 animate-fade-in-up delay-${i + 1}`}>
                                <div className="glass-card-premium p-4">
                                    <div style={{ fontSize: '2rem', marginBottom: '8px' }}>{emoji}</div>
                                    <div className="stat-number">{number}</div>
                                    <p className="text-muted mt-2 mb-0" style={{ fontSize: '0.9rem', fontWeight: 500 }}>
                                        {label}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA SECTION */}
            <section className="py-5 text-center" style={{ background: '#fff' }}>
                <div className="container animate-fade-in-up py-4">
                    <div style={{
                        background: `linear-gradient(135deg, var(--theme-gradient-start), var(--theme-gradient-end))`,
                        borderRadius: 'var(--radius-xl)',
                        padding: 'clamp(40px, 6vw, 80px) 40px',
                        position: 'relative',
                        overflow: 'hidden',
                    }}>
                        {/* Decorative blob */}
                        <div style={{
                            position: 'absolute', top: '-30%', right: '-10%',
                            width: '300px', height: '300px', borderRadius: '50%',
                            background: `radial-gradient(circle, color-mix(in srgb, var(--theme-primary) 20%, transparent), transparent)`,
                            filter: 'blur(40px)', pointerEvents: 'none',
                        }} />

                        {season?.featuredEmoji && (
                            <div style={{ fontSize: '3rem', marginBottom: '16px' }} className="animate-float">
                                {season.featuredEmoji}
                            </div>
                        )}

                        <h2 style={{
                            fontSize: 'clamp(1.8rem, 4vw, 2.6rem)',
                            fontWeight: 900,
                            color: '#1a1a2e',
                            marginBottom: '16px',
                            letterSpacing: '-0.02em',
                        }}>
                            ¿Listo para encontrar el regalo perfecto?
                        </h2>
                        <p style={{
                            color: '#555', maxWidth: '460px', margin: '0 auto 32px',
                            fontSize: '1.1rem', lineHeight: 1.6,
                        }}>
                            Únete a miles de personas que ya aciertan con sus regalos usando IA
                        </p>
                        <div className="d-flex flex-wrap gap-3 justify-content-center">
                            <a href="/signup" style={{ textDecoration: 'none' }}>
                                <button className="btn btn-lg btn-theme-gradient px-5 py-3"
                                    style={{ fontSize: '1.1rem', borderRadius: '100px' }}>
                                    <span>🚀 Crear cuenta gratis</span>
                                </button>
                            </a>
                            <a href="/login" style={{ textDecoration: 'none' }}>
                                <button className="btn btn-lg" style={{
                                    border: '2px solid var(--theme-primary)',
                                    color: 'var(--theme-primary)',
                                    fontWeight: 600,
                                    padding: '12px 32px',
                                    borderRadius: '100px',
                                    background: 'white',
                                    fontSize: '1.05rem',
                                    transition: 'all 0.25s ease',
                                }}
                                    onMouseEnter={e => { e.currentTarget.style.background = 'var(--theme-primary)'; e.currentTarget.style.color = '#fff'; }}
                                    onMouseLeave={e => { e.currentTarget.style.background = 'white'; e.currentTarget.style.color = 'var(--theme-primary)'; }}>
                                    Iniciar sesión →
                                </button>
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};