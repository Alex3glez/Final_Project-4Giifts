import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { getPrivateData } from "../services";
import useSeasonalTheme from "../hooks/useSeasonalTheme";

export const Navbar = () => {
    const [isLogged, setIsLogged] = useState(false);
    const [user, setUser] = useState(null);
    const [scrolled, setScrolled] = useState(false);
    const navigate = useNavigate();
    const { season } = useSeasonalTheme();

    useEffect(() => {
        const checkAuth = async () => {
            const token = sessionStorage.getItem("token");
            if (!token) {
                setIsLogged(false);
                setUser(null);
                return;
            }

            setIsLogged(true);
            const resp = await getPrivateData();
            if (resp.ok) {
                const data = await resp.json();
                setUser(data.user);
            }
        };

        checkAuth();
        window.addEventListener("auth-change", checkAuth);
        return () => window.removeEventListener("auth-change", checkAuth);
    }, []);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleLogout = () => {
        sessionStorage.removeItem("token");
        window.dispatchEvent(new Event("auth-change"));
        navigate("/");
    };

    return (
        <nav className="navbar" style={{
            background: scrolled
                ? 'rgba(255, 255, 255, 0.85)'
                : 'var(--theme-accent)',
            backdropFilter: scrolled ? 'blur(20px)' : 'none',
            WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none',
            boxShadow: scrolled ? '0 4px 30px rgba(0,0,0,0.08)' : 'none',
            padding: scrolled ? '8px 0' : '12px 0',
        }}>
            <div className="container">
                <Link to="/" className="d-flex align-items-center gap-2" style={{ textDecoration: 'none' }}>
                    <img
                        src="/Logo_solo_4giifts-removebg-preview (1).png"
                        height="40"
                        alt="4Giifts Logo"
                        style={{ transition: 'transform var(--transition-spring)' }}
                        onMouseOver={e => e.target.style.transform = 'scale(1.1) rotate(-5deg)'}
                        onMouseOut={e => e.target.style.transform = 'scale(1)'}
                    />
                    {season?.emoji && (
                        <span style={{ fontSize: '1.3rem', animation: 'float 3s ease-in-out infinite' }}>
                            {season.emoji}
                        </span>
                    )}
                </Link>

                <div className="ms-auto d-flex align-items-center gap-3">

                    {!isLogged && (
                        <>
                            <Link to="/signup">
                                <button className="btn pers-secondary-btn-color fw-semibold px-4 py-2">
                                    Registrar
                                </button>
                            </Link>
                            <Link to="/login">
                                <button className="btn pers-primary-btn-color fw-semibold px-4 py-2">
                                    Login
                                </button>
                            </Link>
                        </>
                    )}

                    {isLogged && user && (
                        <div className="d-flex align-items-center gap-4">
                            <span className="nav-link-custom" onClick={() => navigate("/")}>
                                Home
                            </span>
                            <span className="nav-link-custom" onClick={() => navigate("/dashboard")}>
                                Dashboard
                            </span>

                            <img
                                src={user.profile_pic || `https://api.dicebear.com/9.x/avataaars/svg?seed=${user.first_name}`}
                                className="rounded-circle avatar-clickable"
                                width="40"
                                height="40"
                                alt="avatar"
                                style={{
                                    border: '3px solid var(--theme-primary)',
                                    objectFit: 'cover'
                                }}
                                onClick={() => navigate("/dashboard")}
                            />

                            <div className="dropdown">
                                <button
                                    className="btn pers-secondary-btn-color dropdown-toggle fw-semibold dropdown-user px-3"
                                    type="button"
                                    data-bs-toggle="dropdown"
                                >
                                    {user.first_name}
                                </button>

                                <ul className="dropdown-menu dropdown-menu-end shadow-lg border-0"
                                    style={{ borderRadius: 'var(--radius-md)' }}>
                                    <li>
                                        <button
                                            className="dropdown-item py-2"
                                            onClick={() => navigate("/profile/edit")}
                                        >
                                            <i className="bi bi-person-gear me-2"></i>
                                            Gestión de usuario
                                        </button>
                                    </li>
                                    <li><hr className="dropdown-divider" /></li>
                                    <li>
                                        <button
                                            className="dropdown-item text-danger py-2"
                                            onClick={handleLogout}
                                        >
                                            <i className="bi bi-box-arrow-right me-2"></i>
                                            Cerrar sesión
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};
