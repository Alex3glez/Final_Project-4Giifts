import { Link, useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { checkLogin } from "../services";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

export const Login = () => {
  const { dispatch } = useGlobalReducer();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = {
      email: e.target.elements.email.value,
      password: e.target.elements.password.value,
    };

    try {
      const resp = await checkLogin(user);
      const data = await resp.json();

      if (resp.ok) {
        sessionStorage.setItem("token", data.token);

        if (data.user) {
            dispatch({ type: "setUser", payload: data.user });
        }
        
        window.dispatchEvent(new Event("auth-change"));
        
        navigate("/dashboard");
      } else {
        alert("Error en el login: " + (data.message || "Credenciales incorrectas"));
      }
    } catch (err) {
      console.error(err);
      alert("Error de conexión");
    }
  };

  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center animate-fade-in"
      style={{
        background: "linear-gradient(135deg, var(--theme-gradient-start) 0%, var(--theme-gradient-end) 100%)"
      }}>
      <div className="glass-card p-0" style={{
        maxWidth: "440px",
        width: '100%',
        margin: '20px',
        overflow: 'hidden',
      }}>

        {/* Header accent bar */}
        <div style={{
          height: '5px',
          background: 'linear-gradient(90deg, var(--theme-primary), var(--theme-secondary))',
        }} />

        <div className="p-4">
          <div className="text-center mb-4">
            <img
              src="/Logo_solo_4giifts-removebg-preview (1) - copia.png"
              width="80"
              alt="Logo"
              className="animate-scale-in"
            />
            <h5 className="mt-3 fw-bold" style={{ color: "var(--theme-primary)" }}>
              Your Perfect Gift
            </h5>
            <p className="text-muted small">Inicia sesión para continuar</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="email_login" className="form-label fw-semibold"
                style={{ color: "var(--theme-primary)" }}>
                Correo
              </label>
              <input
                type="email"
                id="email_login"
                name="email"
                className="form-control py-2"
                placeholder="tucorreo@ejemplo.com"
                required
                style={{
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid #e5e5e5',
                  transition: 'all var(--transition-fast)',
                }}
              />
            </div>

            <div className="mb-4">
              <label htmlFor="passw_login" className="form-label fw-semibold"
                style={{ color: "var(--theme-primary)" }}>
                Contraseña
              </label>
              <div className="input-group">
                <input
                  type={showPassword ? "text" : "password"}
                  id="passw_login"
                  name="password"
                  className="form-control py-2"
                  placeholder="••••••••"
                  required
                  style={{
                    borderRadius: 'var(--radius-sm) 0 0 var(--radius-sm)',
                    border: '1px solid #e5e5e5',
                  }}
                />
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{ borderRadius: '0 var(--radius-sm) var(--radius-sm) 0' }}
                >
                  <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                </button>
              </div>
            </div>

            <div className="d-grid">
              <button type="submit" className="btn btn-lg fw-bold btn-theme-gradient py-3">
                <span>Entrar</span>
              </button>
            </div>
          </form>

          <div className="text-center mt-4">
            <Link to="/signup" style={{ color: "var(--theme-secondary)", fontWeight: 600 }}>
              ¿Primera vez? Crea tu cuenta
            </Link>

            <div className="mt-2">
              <small className="text-muted">
                ¿Olvidaste tu contraseña?
                <Link to="/recover/request" className="ms-1"
                  style={{ color: 'var(--theme-primary)' }}>
                  Recuperar acceso
                </Link>
              </small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};