import { useState, useEffect } from "react";

const BRAND_COLOR = "#9b7c50";
const BRAND_DARK = "#7a6040";
const BRAND_LIGHT = "#c4a97a";
const BRAND_BG = "#faf8f5";
const BRAND_BG2 = "#f3ede4";
const TEXT_MAIN = "#2d2217";
const TEXT_MUTED = "#7a6a55";

// ── SVG Logo idéntico al loader original ───────────────────────────────────
function MusesIcon({ size = 48, color = BRAND_COLOR, spinning = false }) {
  return (
    <svg
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        width: size,
        height: size,
        color,
        animation: spinning ? "spin 2s linear infinite" : "none",
        display: "block",
      }}
    >
      <g clipPath="url(#hers-clip)">
        <path d="M30.7358 18.7749L34.5301 9.77829C35.7531 6.88074 37.8029 4.40789 40.4234 2.66877C43.0439 0.929645 46.1188 0.00138685 49.2638 0L45.4696 8.99657C44.2481 11.8952 42.1986 14.369 39.5778 16.1084C36.957 17.8477 33.8813 18.7753 30.7358 18.7749Z" fill="currentColor" />
        <path opacity="0.4" d="M30.7358 80L34.5301 71.0034C35.7531 68.1058 37.8029 65.633 40.4234 63.8939C43.0439 62.1547 46.1188 61.2265 49.2638 61.2251L45.4696 70.2217C44.2481 73.1203 42.1986 75.5941 39.5778 77.3335C36.957 79.0728 33.8813 80.0004 30.7358 80Z" fill="currentColor" />
        <path opacity="0.2" d="M61.2251 30.7361L70.2217 34.5304C73.1203 35.7519 75.5941 37.8013 77.3335 40.4221C79.0728 43.0429 80.0004 46.1186 80 49.2641L71.0034 45.4698C68.1058 44.2468 65.633 42.197 63.8939 39.5765C62.1547 36.9561 61.2265 33.8811 61.2251 30.7361Z" fill="currentColor" />
        <path opacity="0.7" d="M0 30.7361L8.99657 34.5304C11.8952 35.7519 14.369 37.8013 16.1084 40.4221C17.8477 43.0429 18.7753 46.1186 18.7749 49.2641L9.77829 45.4698C6.88074 44.2468 4.40789 42.197 2.66877 39.5765C0.929645 36.9561 0.00138685 33.8811 0 30.7361Z" fill="currentColor" />
        <path opacity="0.1" d="M48.457 18.4411L57.5016 14.7611C60.4155 13.5773 63.6136 13.2785 66.6963 13.9021C69.779 14.5258 72.6096 16.0441 74.8342 18.2674L65.7919 21.9428C62.8782 23.1277 59.6798 23.4274 56.5967 22.8046C53.5135 22.1818 50.6824 20.6641 48.457 18.4411Z" fill="currentColor" />
        <path opacity="0.5" d="M5.16553 61.7326L14.2078 58.0571C17.1215 56.8723 20.3199 56.5725 23.403 57.1953C26.4862 57.8181 29.3173 59.3359 31.5427 61.5589L22.4981 65.2389C19.5842 66.4227 16.3861 66.7214 13.3034 66.0978C10.2207 65.4742 7.39015 63.9559 5.16553 61.7326Z" fill="currentColor" />
        <path opacity="0.3" d="M61.5587 48.4572L65.2387 57.5017C66.4225 60.4156 66.7213 63.6137 66.0977 66.6964C65.4741 69.7791 63.9557 72.6097 61.7325 74.8343L58.057 65.792C56.8722 62.8783 56.5724 59.68 57.1952 56.5968C57.818 53.5137 59.3358 50.6825 61.5587 48.4572Z" fill="currentColor" />
        <path opacity="0.8" d="M18.2674 5.16577L21.9428 14.2081C23.1277 17.1218 23.4274 20.3201 22.8046 23.4033C22.1818 26.4864 20.6641 29.3176 18.4411 31.5429L14.7611 22.4983C13.5773 19.5845 13.2785 16.3864 13.9021 13.3036C14.5258 10.2209 16.0441 7.39039 18.2674 5.16577Z" fill="currentColor" />
      </g>
      <defs>
        <clipPath id="hers-clip">
          <rect width="80" height="80" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}

// ── Pantallas ──────────────────────────────────────────────────────────────
function InitialLoader({ onDone }) {
  useEffect(() => {
    const t = setTimeout(() => onDone(), 2200);
    return () => clearTimeout(t);
  }, [onDone]);

  return (
    <div style={{
      position: "fixed", inset: 0, display: "flex", alignItems: "center",
      justifyContent: "center", background: "#fff", zIndex: 9999,
      transition: "opacity 0.5s ease",
    }}>
      <MusesIcon size={80} color={BRAND_COLOR} spinning />
    </div>
  );
}

function SignInScreen({ onSignIn, onGoRegister, onGoForgot }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [focusedField, setFocusedField] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    if (!email || !password) {
      setError("Por favor, completa todos los campos.");
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Ingresa un correo electrónico válido.");
      return;
    }
    setLoading(true);
    // TODO: Conectar con API de autenticación real
    // Ejemplo: await authService.signIn({ email, password })
    await new Promise(r => setTimeout(r, 1800));
    setLoading(false);
    onSignIn({ email });
  }

  const inputStyle = (field) => ({
    width: "100%",
    padding: "14px 16px",
    border: `1.5px solid ${focusedField === field ? BRAND_COLOR : "#ddd5c8"}`,
    borderRadius: 12,
    fontSize: 15,
    fontFamily: "'Outfit', 'Poppins', sans-serif",
    color: TEXT_MAIN,
    background: focusedField === field ? "#fffdf9" : "#fff",
    outline: "none",
    transition: "border-color 0.2s, background 0.2s, box-shadow 0.2s",
    boxShadow: focusedField === field ? `0 0 0 3px ${BRAND_COLOR}22` : "none",
    boxSizing: "border-box",
  });

  return (
    <div style={{
      minHeight: "100dvh",
      background: BRAND_BG,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "24px 16px",
      fontFamily: "'Outfit', 'Poppins', sans-serif",
    }}>
      {/* Decorative blobs */}
      <div style={{
        position: "fixed", top: -120, right: -80, width: 380, height: 380,
        borderRadius: "50%", background: `${BRAND_COLOR}12`, pointerEvents: "none",
      }} />
      <div style={{
        position: "fixed", bottom: -100, left: -60, width: 280, height: 280,
        borderRadius: "50%", background: `${BRAND_LIGHT}10`, pointerEvents: "none",
      }} />

      <div style={{
        width: "100%", maxWidth: 440,
        background: "#fff",
        borderRadius: 24,
        boxShadow: "0 8px 48px rgba(155,124,80,0.10), 0 2px 8px rgba(155,124,80,0.06)",
        padding: "40px 40px 36px",
        position: "relative",
        zIndex: 1,
      }}>
        {/* Logo + Brand */}
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{
            display: "inline-flex", alignItems: "center", justifyContent: "center",
            width: 72, height: 72, borderRadius: 20,
            background: `linear-gradient(135deg, ${BRAND_BG2} 0%, ${BRAND_BG} 100%)`,
            marginBottom: 16, boxShadow: `0 4px 16px ${BRAND_COLOR}22`,
          }}>
            <MusesIcon size={40} color={BRAND_COLOR} />
          </div>
          <h1 style={{
            fontSize: 28, fontWeight: 700, color: TEXT_MAIN,
            margin: 0, letterSpacing: "-0.3px",
            fontFamily: "'Poppins', sans-serif",
          }}>
            HERS
          </h1>
          <p style={{
            fontSize: 14, color: TEXT_MUTED, margin: "6px 0 0",
            fontWeight: 400, letterSpacing: "0.3px",
          }}>
            Tu plataforma de empoderamiento
          </p>
        </div>

        {/* Título del formulario */}
        <div style={{ marginBottom: 24 }}>
          <h2 style={{
            fontSize: 20, fontWeight: 600, color: TEXT_MAIN,
            margin: "0 0 4px", fontFamily: "'Poppins', sans-serif",
          }}>
            Iniciar sesión
          </h2>
          <p style={{ fontSize: 14, color: TEXT_MUTED, margin: 0 }}>
            Bienvenida de vuelta — continúa tu camino
          </p>
        </div>

        {/* Error */}
        {error && (
          <div style={{
            background: "#fff0f0", border: "1px solid #f5c0c0",
            borderRadius: 10, padding: "10px 14px", marginBottom: 18,
            fontSize: 13, color: "#c0392b", display: "flex", alignItems: "center", gap: 8,
          }}>
            <span>⚠️</span> {error}
          </div>
        )}

        {/* Formulario */}
        <form onSubmit={handleSubmit} noValidate>
          {/* Email */}
          <div style={{ marginBottom: 18 }}>
            <label style={{
              display: "block", fontSize: 13, fontWeight: 600,
              color: TEXT_MAIN, marginBottom: 6, letterSpacing: "0.1px",
            }}>
              Correo electrónico
            </label>
            <input
              type="email"
              placeholder="tu@correo.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              onFocus={() => setFocusedField("email")}
              onBlur={() => setFocusedField(null)}
              style={inputStyle("email")}
              autoComplete="email"
            />
          </div>

          {/* Password */}
          <div style={{ marginBottom: 12 }}>
            <label style={{
              display: "block", fontSize: 13, fontWeight: 600,
              color: TEXT_MAIN, marginBottom: 6, letterSpacing: "0.1px",
            }}>
              Contraseña
            </label>
            <div style={{ position: "relative" }}>
              <input
                type={showPass ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={e => setPassword(e.target.value)}
                onFocus={() => setFocusedField("password")}
                onBlur={() => setFocusedField(null)}
                style={{ ...inputStyle("password"), paddingRight: 48 }}
                autoComplete="current-password"
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                style={{
                  position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)",
                  background: "none", border: "none", cursor: "pointer",
                  color: TEXT_MUTED, fontSize: 18, padding: 0, display: "flex",
                  alignItems: "center",
                }}
                aria-label={showPass ? "Ocultar contraseña" : "Mostrar contraseña"}
              >
                {showPass ? "🙈" : "👁️"}
              </button>
            </div>
          </div>

          {/* Forgot */}
          <div style={{ textAlign: "right", marginBottom: 24 }}>
            <button
              type="button"
              onClick={onGoForgot}
              style={{
                background: "none", border: "none", cursor: "pointer",
                fontSize: 13, color: BRAND_COLOR, fontWeight: 600,
                fontFamily: "'Outfit', 'Poppins', sans-serif",
                padding: 0, textDecoration: "none",
              }}
            >
              ¿Olvidaste tu contraseña?
            </button>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              padding: "15px",
              background: loading
                ? "#c4a97a"
                : `linear-gradient(135deg, ${BRAND_COLOR} 0%, ${BRAND_DARK} 100%)`,
              color: "#fff",
              border: "none",
              borderRadius: 12,
              fontSize: 16,
              fontWeight: 600,
              fontFamily: "'Poppins', sans-serif",
              cursor: loading ? "not-allowed" : "pointer",
              letterSpacing: "0.2px",
              transition: "opacity 0.2s, transform 0.1s",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 10,
              boxShadow: loading ? "none" : `0 4px 16px ${BRAND_COLOR}44`,
            }}
            onMouseEnter={e => { if (!loading) e.currentTarget.style.opacity = "0.92"; }}
            onMouseLeave={e => { e.currentTarget.style.opacity = "1"; }}
            onMouseDown={e => { if (!loading) e.currentTarget.style.transform = "scale(0.99)"; }}
            onMouseUp={e => { e.currentTarget.style.transform = "scale(1)"; }}
          >
            {loading ? (
              <>
                <MusesIcon size={20} color="#fff" spinning />
                Iniciando sesión...
              </>
            ) : "Iniciar sesión"}
          </button>
        </form>

        {/* Divider */}
        <div style={{
          display: "flex", alignItems: "center", gap: 12, margin: "24px 0",
        }}>
          <div style={{ flex: 1, height: 1, background: "#e8ddd0" }} />
          <span style={{ fontSize: 12, color: TEXT_MUTED, fontWeight: 500 }}>o continúa con</span>
          <div style={{ flex: 1, height: 1, background: "#e8ddd0" }} />
        </div>

        {/* Social buttons */}
        <div style={{ display: "flex", gap: 12, marginBottom: 28 }}>
          {[
            { label: "Google", icon: "G", bg: "#fff", textColor: "#444" },
            { label: "Apple", icon: "🍎", bg: "#000", textColor: "#fff" },
          ].map(({ label, icon, bg, textColor }) => (
            <button
              key={label}
              type="button"
              // TODO: Implementar OAuth con Google / Apple
              onClick={() => {}}
              style={{
                flex: 1,
                padding: "12px",
                background: bg,
                color: textColor,
                border: "1.5px solid #e0d6cb",
                borderRadius: 12,
                fontSize: 14,
                fontWeight: 600,
                fontFamily: "'Outfit', 'Poppins', sans-serif",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
                transition: "background 0.15s, box-shadow 0.15s",
                boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
              }}
              onMouseEnter={e => { e.currentTarget.style.boxShadow = "0 2px 12px rgba(0,0,0,0.12)"; }}
              onMouseLeave={e => { e.currentTarget.style.boxShadow = "0 1px 4px rgba(0,0,0,0.06)"; }}
            >
              <span style={{ fontWeight: 800, fontSize: 15 }}>{icon}</span>
              {label}
            </button>
          ))}
        </div>

        {/* Register link */}
        <p style={{ textAlign: "center", fontSize: 14, color: TEXT_MUTED, margin: 0 }}>
          ¿Eres nueva aquí?{" "}
          <button
            type="button"
            onClick={onGoRegister}
            style={{
              background: "none", border: "none", cursor: "pointer",
              color: BRAND_COLOR, fontWeight: 700, fontSize: 14,
              fontFamily: "'Outfit', 'Poppins', sans-serif", padding: 0,
            }}
          >
            Crear cuenta
          </button>
        </p>
      </div>
    </div>
  );
}

function RegisterScreen({ onBack, onRegister }) {
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [focusedField, setFocusedField] = useState(null);
  const [showPass, setShowPass] = useState(false);

  function setField(k, v) { setForm(f => ({ ...f, [k]: v })); }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    if (!form.name || !form.email || !form.password || !form.confirm) {
      setError("Por favor, completa todos los campos."); return;
    }
    if (!/\S+@\S+\.\S+/.test(form.email)) {
      setError("Correo electrónico inválido."); return;
    }
    if (form.password.length < 8) {
      setError("La contraseña debe tener al menos 8 caracteres."); return;
    }
    if (form.password !== form.confirm) {
      setError("Las contraseñas no coinciden."); return;
    }
    setLoading(true);
    // TODO: Llamar a API de registro
    await new Promise(r => setTimeout(r, 1800));
    setLoading(false);
    onRegister({ email: form.email, name: form.name });
  }

  const inputStyle = (field) => ({
    width: "100%",
    padding: "14px 16px",
    border: `1.5px solid ${focusedField === field ? BRAND_COLOR : "#ddd5c8"}`,
    borderRadius: 12,
    fontSize: 15,
    fontFamily: "'Outfit', 'Poppins', sans-serif",
    color: TEXT_MAIN,
    background: focusedField === field ? "#fffdf9" : "#fff",
    outline: "none",
    transition: "border-color 0.2s, box-shadow 0.2s",
    boxShadow: focusedField === field ? `0 0 0 3px ${BRAND_COLOR}22` : "none",
    boxSizing: "border-box",
  });

  return (
    <div style={{
      minHeight: "100dvh", background: BRAND_BG,
      display: "flex", alignItems: "center", justifyContent: "center",
      padding: "24px 16px", fontFamily: "'Outfit', 'Poppins', sans-serif",
    }}>
      <div style={{
        position: "fixed", top: -120, left: -80, width: 380, height: 380,
        borderRadius: "50%", background: `${BRAND_LIGHT}10`, pointerEvents: "none",
      }} />
      <div style={{
        width: "100%", maxWidth: 440, background: "#fff",
        borderRadius: 24, boxShadow: "0 8px 48px rgba(155,124,80,0.10)",
        padding: "40px 40px 36px", position: "relative", zIndex: 1,
      }}>
        {/* Back */}
        <button
          type="button"
          onClick={onBack}
          style={{
            background: "none", border: "none", cursor: "pointer",
            color: TEXT_MUTED, fontSize: 13, fontWeight: 600, padding: 0,
            marginBottom: 20, display: "flex", alignItems: "center", gap: 6,
            fontFamily: "'Outfit', 'Poppins', sans-serif",
          }}
        >
          ← Volver
        </button>

        <div style={{ textAlign: "center", marginBottom: 28 }}>
          <div style={{
            display: "inline-flex", alignItems: "center", justifyContent: "center",
            width: 64, height: 64, borderRadius: 18,
            background: `linear-gradient(135deg, ${BRAND_BG2} 0%, ${BRAND_BG} 100%)`,
            marginBottom: 14, boxShadow: `0 4px 16px ${BRAND_COLOR}22`,
          }}>
            <MusesIcon size={36} color={BRAND_COLOR} />
          </div>
          <h1 style={{
            fontSize: 24, fontWeight: 700, color: TEXT_MAIN,
            margin: 0, fontFamily: "'Poppins', sans-serif",
          }}>Crear cuenta HERS</h1>
          <p style={{ fontSize: 13, color: TEXT_MUTED, margin: "6px 0 0" }}>
            Únete a nuestra comunidad de mujeres empoderadas
          </p>
        </div>

        {error && (
          <div style={{
            background: "#fff0f0", border: "1px solid #f5c0c0",
            borderRadius: 10, padding: "10px 14px", marginBottom: 16,
            fontSize: 13, color: "#c0392b",
          }}>
            ⚠️ {error}
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate>
          {[
            { key: "name", label: "Nombre completo", type: "text", placeholder: "Tu nombre" },
            { key: "email", label: "Correo electrónico", type: "email", placeholder: "tu@correo.com" },
          ].map(({ key, label, type, placeholder }) => (
            <div key={key} style={{ marginBottom: 16 }}>
              <label style={{
                display: "block", fontSize: 13, fontWeight: 600,
                color: TEXT_MAIN, marginBottom: 6,
              }}>{label}</label>
              <input
                type={type}
                placeholder={placeholder}
                value={form[key]}
                onChange={e => setField(key, e.target.value)}
                onFocus={() => setFocusedField(key)}
                onBlur={() => setFocusedField(null)}
                style={inputStyle(key)}
              />
            </div>
          ))}

          <div style={{ marginBottom: 16 }}>
            <label style={{
              display: "block", fontSize: 13, fontWeight: 600,
              color: TEXT_MAIN, marginBottom: 6,
            }}>Contraseña</label>
            <div style={{ position: "relative" }}>
              <input
                type={showPass ? "text" : "password"}
                placeholder="Mínimo 8 caracteres"
                value={form.password}
                onChange={e => setField("password", e.target.value)}
                onFocus={() => setFocusedField("password")}
                onBlur={() => setFocusedField(null)}
                style={{ ...inputStyle("password"), paddingRight: 48 }}
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                style={{
                  position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)",
                  background: "none", border: "none", cursor: "pointer",
                  color: TEXT_MUTED, fontSize: 18, padding: 0,
                }}
              >{showPass ? "🙈" : "👁️"}</button>
            </div>
          </div>

          <div style={{ marginBottom: 24 }}>
            <label style={{
              display: "block", fontSize: 13, fontWeight: 600,
              color: TEXT_MAIN, marginBottom: 6,
            }}>Confirmar contraseña</label>
            <input
              type={showPass ? "text" : "password"}
              placeholder="Repite tu contraseña"
              value={form.confirm}
              onChange={e => setField("confirm", e.target.value)}
              onFocus={() => setFocusedField("confirm")}
              onBlur={() => setFocusedField(null)}
              style={inputStyle("confirm")}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%", padding: "15px",
              background: loading ? "#c4a97a" : `linear-gradient(135deg, ${BRAND_COLOR} 0%, ${BRAND_DARK} 100%)`,
              color: "#fff", border: "none", borderRadius: 12,
              fontSize: 16, fontWeight: 600,
              fontFamily: "'Poppins', sans-serif",
              cursor: loading ? "not-allowed" : "pointer",
              display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
              boxShadow: loading ? "none" : `0 4px 16px ${BRAND_COLOR}44`,
              transition: "opacity 0.2s",
            }}
          >
            {loading ? (
              <><MusesIcon size={20} color="#fff" spinning /> Creando cuenta...</>
            ) : "Crear mi cuenta"}
          </button>
        </form>

        <p style={{ textAlign: "center", fontSize: 13, color: TEXT_MUTED, margin: "20px 0 0" }}>
          Al registrarte, aceptas nuestros{" "}
          <span style={{ color: BRAND_COLOR, fontWeight: 600, cursor: "pointer" }}>Términos</span>
          {" "}y{" "}
          <span style={{ color: BRAND_COLOR, fontWeight: 600, cursor: "pointer" }}>Privacidad</span>
        </p>
      </div>
    </div>
  );
}

function ForgotScreen({ onBack }) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    // TODO: Llamar a API de recuperación de contraseña
    await new Promise(r => setTimeout(r, 1600));
    setLoading(false);
    setSent(true);
  }

  return (
    <div style={{
      minHeight: "100dvh", background: BRAND_BG,
      display: "flex", alignItems: "center", justifyContent: "center",
      padding: "24px 16px", fontFamily: "'Outfit', 'Poppins', sans-serif",
    }}>
      <div style={{
        width: "100%", maxWidth: 420, background: "#fff",
        borderRadius: 24, boxShadow: "0 8px 48px rgba(155,124,80,0.10)",
        padding: "40px 40px 36px",
      }}>
        <button
          type="button"
          onClick={onBack}
          style={{
            background: "none", border: "none", cursor: "pointer",
            color: TEXT_MUTED, fontSize: 13, fontWeight: 600, padding: 0,
            marginBottom: 24, display: "flex", alignItems: "center", gap: 6,
            fontFamily: "'Outfit', 'Poppins', sans-serif",
          }}
        >
          ← Volver
        </button>

        {sent ? (
          <div style={{ textAlign: "center", padding: "16px 0" }}>
            <div style={{
              fontSize: 56, marginBottom: 20,
            }}>✉️</div>
            <h2 style={{
              fontSize: 22, fontWeight: 700, color: TEXT_MAIN,
              margin: "0 0 12px", fontFamily: "'Poppins', sans-serif",
            }}>¡Correo enviado!</h2>
            <p style={{ fontSize: 14, color: TEXT_MUTED, lineHeight: 1.6, margin: 0 }}>
              Si existe una cuenta con <strong style={{ color: TEXT_MAIN }}>{email}</strong>,
              recibirás un enlace para restablecer tu contraseña.
            </p>
            <button
              type="button"
              onClick={onBack}
              style={{
                marginTop: 28, padding: "13px 32px",
                background: `linear-gradient(135deg, ${BRAND_COLOR} 0%, ${BRAND_DARK} 100%)`,
                color: "#fff", border: "none", borderRadius: 12,
                fontSize: 15, fontWeight: 600, cursor: "pointer",
                fontFamily: "'Poppins', sans-serif",
                boxShadow: `0 4px 16px ${BRAND_COLOR}44`,
              }}
            >
              Volver al inicio
            </button>
          </div>
        ) : (
          <>
            <div style={{ textAlign: "center", marginBottom: 28 }}>
              <div style={{
                display: "inline-flex", alignItems: "center", justifyContent: "center",
                width: 64, height: 64, borderRadius: 18,
                background: `linear-gradient(135deg, ${BRAND_BG2} 0%, ${BRAND_BG} 100%)`,
                marginBottom: 14, fontSize: 28,
                boxShadow: `0 4px 16px ${BRAND_COLOR}22`,
              }}>🔑</div>
              <h2 style={{
                fontSize: 22, fontWeight: 700, color: TEXT_MAIN,
                margin: "0 0 8px", fontFamily: "'Poppins', sans-serif",
              }}>¿Olvidaste tu contraseña?</h2>
              <p style={{ fontSize: 14, color: TEXT_MUTED, margin: 0, lineHeight: 1.5 }}>
                Ingresa tu correo y te enviaremos un enlace para restablecerla.
              </p>
            </div>

            <form onSubmit={handleSubmit} noValidate>
              <div style={{ marginBottom: 24 }}>
                <label style={{
                  display: "block", fontSize: 13, fontWeight: 600,
                  color: TEXT_MAIN, marginBottom: 6,
                }}>Correo electrónico</label>
                <input
                  type="email"
                  placeholder="tu@correo.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  onFocus={() => setFocusedField("email")}
                  onBlur={() => setFocusedField(null)}
                  style={{
                    width: "100%", padding: "14px 16px",
                    border: `1.5px solid ${focusedField === "email" ? BRAND_COLOR : "#ddd5c8"}`,
                    borderRadius: 12, fontSize: 15,
                    fontFamily: "'Outfit', 'Poppins', sans-serif",
                    color: TEXT_MAIN, background: "#fff", outline: "none",
                    boxSizing: "border-box",
                    boxShadow: focusedField === "email" ? `0 0 0 3px ${BRAND_COLOR}22` : "none",
                    transition: "border-color 0.2s, box-shadow 0.2s",
                  }}
                />
              </div>
              <button
                type="submit"
                disabled={loading || !email}
                style={{
                  width: "100%", padding: "15px",
                  background: loading || !email ? "#c4a97a" : `linear-gradient(135deg, ${BRAND_COLOR} 0%, ${BRAND_DARK} 100%)`,
                  color: "#fff", border: "none", borderRadius: 12,
                  fontSize: 16, fontWeight: 600,
                  fontFamily: "'Poppins', sans-serif",
                  cursor: loading || !email ? "not-allowed" : "pointer",
                  display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
                  boxShadow: loading ? "none" : `0 4px 16px ${BRAND_COLOR}44`,
                  transition: "opacity 0.2s",
                }}
              >
                {loading ? <><MusesIcon size={20} color="#fff" spinning />Enviando...</> : "Enviar enlace"}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

function DashboardScreen({ user, onSignOut }) {
  const [activeTab, setActiveTab] = useState("inicio");

  const tabs = [
    { id: "inicio", label: "Inicio", icon: "🏠" },
    { id: "cursos", label: "Cursos", icon: "📚" },
    { id: "comunidad", label: "Comunidad", icon: "💬" },
    { id: "perfil", label: "Perfil", icon: "👤" },
  ];

  const courses = [
    { id: 1, title: "Liderazgo Femenino", category: "Desarrollo personal", duration: "6 horas", progress: 65, emoji: "🌟", color: "#f3e8d5" },
    { id: 2, title: "Finanzas para Emprendedoras", category: "Finanzas", duration: "4 horas", progress: 30, emoji: "💰", color: "#e8f0f3" },
    { id: 3, title: "Comunicación Asertiva", category: "Habilidades blandas", duration: "3 horas", progress: 0, emoji: "🎙️", color: "#f5e8f3" },
    { id: 4, title: "Mindfulness y Productividad", category: "Bienestar", duration: "5 horas", progress: 90, emoji: "🧘‍♀️", color: "#e8f5e9" },
  ];

  const community = [
    { id: 1, author: "María G.", avatar: "👩‍💼", time: "hace 2h", text: "¡Acabo de terminar el módulo de liderazgo! Increíble experiencia 🌟", likes: 14 },
    { id: 2, author: "Laura M.", avatar: "👩‍🎨", time: "hace 5h", text: "¿Alguien más está en el curso de finanzas? Me encantaría formar un grupo de estudio 📊", likes: 8 },
    { id: 3, author: "Sofía R.", avatar: "👩‍🔬", time: "hace 1d", text: "La plataforma HERS cambió mi perspectiva profesional por completo. ¡Gracias a todas! 💪", likes: 32 },
  ];

  return (
    <div style={{
      minHeight: "100dvh", background: BRAND_BG,
      fontFamily: "'Outfit', 'Poppins', sans-serif",
      display: "flex", flexDirection: "column",
      maxWidth: 480, margin: "0 auto",
    }}>
      {/* Header */}
      <header style={{
        background: "#fff", padding: "20px 24px 16px",
        borderBottom: "1px solid #f0e8df",
        boxShadow: "0 2px 12px rgba(155,124,80,0.06)",
        position: "sticky", top: 0, zIndex: 100,
      }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <MusesIcon size={32} color={BRAND_COLOR} />
            <span style={{
              fontSize: 20, fontWeight: 800, color: TEXT_MAIN,
              letterSpacing: "-0.3px", fontFamily: "'Poppins', sans-serif",
            }}>HERS</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <button style={{
              background: "none", border: "none", cursor: "pointer",
              fontSize: 20, padding: 4,
            }}>🔔</button>
            <div style={{
              width: 36, height: 36, borderRadius: "50%",
              background: `linear-gradient(135deg, ${BRAND_COLOR}, ${BRAND_DARK})`,
              display: "flex", alignItems: "center", justifyContent: "center",
              color: "#fff", fontWeight: 700, fontSize: 14,
              cursor: "pointer",
            }}>
              {user?.email?.[0]?.toUpperCase() || "H"}
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <main style={{ flex: 1, overflowY: "auto", paddingBottom: 80 }}>

        {/* INICIO */}
        {activeTab === "inicio" && (
          <div>
            {/* Hero */}
            <div style={{
              background: `linear-gradient(135deg, ${BRAND_COLOR} 0%, ${BRAND_DARK} 100%)`,
              padding: "32px 24px 28px", color: "#fff",
            }}>
              <p style={{ margin: "0 0 4px", fontSize: 14, opacity: 0.85 }}>¡Bienvenida de vuelta!</p>
              <h2 style={{
                margin: "0 0 4px", fontSize: 22, fontWeight: 700,
                fontFamily: "'Poppins', sans-serif",
              }}>
                {user?.name || user?.email?.split("@")[0] || "Lideresa"} 🌟
              </h2>
              <p style={{ margin: "12px 0 0", fontSize: 13, opacity: 0.8 }}>
                Llevas 12 días aprendiendo consecutivamente
              </p>
              {/* Stats row */}
              <div style={{
                display: "flex", gap: 12, marginTop: 20,
              }}>
                {[
                  { label: "Cursos activos", value: "3" },
                  { label: "Horas completadas", value: "18h" },
                  { label: "Logros", value: "7" },
                ].map(({ label, value }) => (
                  <div key={label} style={{
                    flex: 1, background: "rgba(255,255,255,0.18)",
                    borderRadius: 12, padding: "12px 10px", textAlign: "center",
                  }}>
                    <div style={{ fontSize: 18, fontWeight: 800 }}>{value}</div>
                    <div style={{ fontSize: 10, opacity: 0.85, marginTop: 2 }}>{label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Continuar aprendiendo */}
            <div style={{ padding: "24px 24px 0" }}>
              <h3 style={{
                margin: "0 0 16px", fontSize: 16, fontWeight: 700, color: TEXT_MAIN,
                fontFamily: "'Poppins', sans-serif",
              }}>Continuar aprendiendo</h3>
              <div style={{
                background: "#fff", borderRadius: 16, padding: "20px",
                boxShadow: "0 2px 12px rgba(155,124,80,0.08)",
                border: `1px solid #f0e8df`,
              }}>
                <div style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                  <div style={{
                    width: 52, height: 52, borderRadius: 14, background: "#f3e8d5",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 24, flexShrink: 0,
                  }}>🌟</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 15, fontWeight: 700, color: TEXT_MAIN, marginBottom: 4 }}>
                      Liderazgo Femenino
                    </div>
                    <div style={{ fontSize: 12, color: TEXT_MUTED, marginBottom: 10 }}>
                      Módulo 4 · Comunicación con impacto
                    </div>
                    <div style={{
                      height: 6, background: "#f0e8df", borderRadius: 3, marginBottom: 6,
                    }}>
                      <div style={{
                        height: "100%", borderRadius: 3, width: "65%",
                        background: `linear-gradient(90deg, ${BRAND_COLOR}, ${BRAND_LIGHT})`,
                      }} />
                    </div>
                    <div style={{ fontSize: 12, color: TEXT_MUTED }}>65% completado</div>
                  </div>
                </div>
                <button style={{
                  width: "100%", marginTop: 16, padding: "12px",
                  background: `linear-gradient(135deg, ${BRAND_COLOR} 0%, ${BRAND_DARK} 100%)`,
                  color: "#fff", border: "none", borderRadius: 10,
                  fontSize: 14, fontWeight: 600, cursor: "pointer",
                  fontFamily: "'Outfit', 'Poppins', sans-serif",
                }}>
                  Continuar módulo →
                </button>
              </div>
            </div>

            {/* Explorar */}
            <div style={{ padding: "24px 24px 0" }}>
              <h3 style={{
                margin: "0 0 16px", fontSize: 16, fontWeight: 700, color: TEXT_MAIN,
                fontFamily: "'Poppins', sans-serif",
              }}>Logros recientes</h3>
              <div style={{ display: "flex", gap: 12 }}>
                {["🏆 Primera lección", "🔥 Racha de 7 días", "💡 Exploradora"].map(badge => (
                  <div key={badge} style={{
                    flex: 1, background: "#fff", borderRadius: 14, padding: "14px 10px",
                    textAlign: "center", boxShadow: "0 2px 8px rgba(155,124,80,0.07)",
                    border: "1px solid #f0e8df", fontSize: 11, color: TEXT_MAIN,
                    fontWeight: 600, lineHeight: 1.4,
                  }}>{badge}</div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* CURSOS */}
        {activeTab === "cursos" && (
          <div style={{ padding: "24px" }}>
            <h3 style={{
              margin: "0 0 6px", fontSize: 20, fontWeight: 700, color: TEXT_MAIN,
              fontFamily: "'Poppins', sans-serif",
            }}>Mis cursos</h3>
            <p style={{ margin: "0 0 20px", fontSize: 14, color: TEXT_MUTED }}>
              Continúa donde lo dejaste
            </p>

            {/* Filter chips */}
            <div style={{ display: "flex", gap: 8, marginBottom: 20, overflowX: "auto", paddingBottom: 4 }}>
              {["Todos", "En progreso", "Completados", "Nuevos"].map((f, i) => (
                <button key={f} style={{
                  padding: "8px 16px", borderRadius: 20, border: "none",
                  background: i === 0 ? BRAND_COLOR : "#fff",
                  color: i === 0 ? "#fff" : TEXT_MUTED,
                  fontSize: 13, fontWeight: 600, cursor: "pointer",
                  whiteSpace: "nowrap",
                  boxShadow: i === 0 ? `0 2px 8px ${BRAND_COLOR}44` : "0 1px 4px rgba(0,0,0,0.06)",
                  fontFamily: "'Outfit', 'Poppins', sans-serif",
                }}>
                  {f}
                </button>
              ))}
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {courses.map(c => (
                <div key={c.id} style={{
                  background: "#fff", borderRadius: 16, padding: "20px",
                  boxShadow: "0 2px 12px rgba(155,124,80,0.07)",
                  border: "1px solid #f0e8df",
                }}>
                  <div style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                    <div style={{
                      width: 52, height: 52, borderRadius: 14, background: c.color,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: 24, flexShrink: 0,
                    }}>{c.emoji}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 15, fontWeight: 700, color: TEXT_MAIN, marginBottom: 2 }}>
                        {c.title}
                      </div>
                      <div style={{ display: "flex", gap: 8, marginBottom: 10 }}>
                        <span style={{
                          fontSize: 11, color: BRAND_COLOR, fontWeight: 600,
                          background: `${BRAND_COLOR}15`, padding: "2px 8px", borderRadius: 6,
                        }}>{c.category}</span>
                        <span style={{ fontSize: 11, color: TEXT_MUTED }}>⏱ {c.duration}</span>
                      </div>
                      {c.progress > 0 ? (
                        <>
                          <div style={{ height: 5, background: "#f0e8df", borderRadius: 3, marginBottom: 5 }}>
                            <div style={{
                              height: "100%", borderRadius: 3, width: `${c.progress}%`,
                              background: c.progress === 100
                                ? "#27ae60"
                                : `linear-gradient(90deg, ${BRAND_COLOR}, ${BRAND_LIGHT})`,
                              transition: "width 0.5s ease",
                            }} />
                          </div>
                          <div style={{ fontSize: 11, color: TEXT_MUTED }}>{c.progress}% completado</div>
                        </>
                      ) : (
                        <span style={{
                          fontSize: 11, color: "#888", background: "#f5f5f5",
                          padding: "2px 8px", borderRadius: 6, fontWeight: 600,
                        }}>Sin comenzar</span>
                      )}
                    </div>
                  </div>
                  <button style={{
                    width: "100%", marginTop: 14, padding: "11px",
                    background: c.progress > 0
                      ? `linear-gradient(135deg, ${BRAND_COLOR} 0%, ${BRAND_DARK} 100%)`
                      : "#fff",
                    color: c.progress > 0 ? "#fff" : BRAND_COLOR,
                    border: c.progress > 0 ? "none" : `1.5px solid ${BRAND_COLOR}`,
                    borderRadius: 10, fontSize: 14, fontWeight: 600,
                    cursor: "pointer", fontFamily: "'Outfit', 'Poppins', sans-serif",
                  }}>
                    {c.progress > 0
                      ? c.progress === 100 ? "Repasar curso" : "Continuar →"
                      : "Comenzar curso"}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* COMUNIDAD */}
        {activeTab === "comunidad" && (
          <div style={{ padding: "24px" }}>
            <h3 style={{
              margin: "0 0 6px", fontSize: 20, fontWeight: 700, color: TEXT_MAIN,
              fontFamily: "'Poppins', sans-serif",
            }}>Comunidad HERS</h3>
            <p style={{ margin: "0 0 20px", fontSize: 14, color: TEXT_MUTED }}>
              Conecta con otras mujeres empoderadas
            </p>

            <button style={{
              width: "100%", padding: "14px 16px", marginBottom: 20,
              background: "#fff", border: `1.5px dashed ${BRAND_COLOR}66`,
              borderRadius: 14, textAlign: "left",
              fontSize: 14, color: TEXT_MUTED, cursor: "pointer",
              fontFamily: "'Outfit', 'Poppins', sans-serif",
              display: "flex", alignItems: "center", gap: 10,
            }}>
              <span style={{ fontSize: 20 }}>✏️</span>
              Comparte algo con la comunidad…
            </button>

            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {community.map(post => (
                <div key={post.id} style={{
                  background: "#fff", borderRadius: 16, padding: "18px 20px",
                  boxShadow: "0 2px 8px rgba(155,124,80,0.06)",
                  border: "1px solid #f0e8df",
                }}>
                  <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                    <div style={{
                      width: 40, height: 40, borderRadius: "50%",
                      background: BRAND_BG2, display: "flex", alignItems: "center",
                      justifyContent: "center", fontSize: 22, flexShrink: 0,
                    }}>{post.avatar}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                        <span style={{ fontSize: 14, fontWeight: 700, color: TEXT_MAIN }}>
                          {post.author}
                        </span>
                        <span style={{ fontSize: 11, color: TEXT_MUTED }}>{post.time}</span>
                      </div>
                      <p style={{ margin: 0, fontSize: 14, color: TEXT_MAIN, lineHeight: 1.5 }}>
                        {post.text}
                      </p>
                      <div style={{ display: "flex", gap: 16, marginTop: 12 }}>
                        <button style={{
                          background: "none", border: "none", cursor: "pointer",
                          fontSize: 13, color: TEXT_MUTED, padding: 0,
                          display: "flex", alignItems: "center", gap: 4,
                          fontFamily: "'Outfit', 'Poppins', sans-serif",
                        }}>
                          ❤️ {post.likes}
                        </button>
                        <button style={{
                          background: "none", border: "none", cursor: "pointer",
                          fontSize: 13, color: TEXT_MUTED, padding: 0,
                          fontFamily: "'Outfit', 'Poppins', sans-serif",
                        }}>
                          💬 Responder
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* PERFIL */}
        {activeTab === "perfil" && (
          <div style={{ padding: "24px" }}>
            {/* Avatar card */}
            <div style={{
              background: "#fff", borderRadius: 20, padding: "28px 24px",
              textAlign: "center", marginBottom: 20,
              boxShadow: "0 2px 12px rgba(155,124,80,0.08)",
              border: "1px solid #f0e8df",
            }}>
              <div style={{
                width: 80, height: 80, borderRadius: "50%",
                background: `linear-gradient(135deg, ${BRAND_COLOR}, ${BRAND_DARK})`,
                display: "flex", alignItems: "center", justifyContent: "center",
                margin: "0 auto 14px",
                fontSize: 32, color: "#fff", fontWeight: 700,
                boxShadow: `0 4px 16px ${BRAND_COLOR}44`,
              }}>
                {user?.email?.[0]?.toUpperCase() || "H"}
              </div>
              <h3 style={{
                margin: "0 0 4px", fontSize: 18, fontWeight: 700, color: TEXT_MAIN,
                fontFamily: "'Poppins', sans-serif",
              }}>
                {user?.name || user?.email?.split("@")[0] || "Usuaria HERS"}
              </h3>
              <p style={{ margin: "0 0 16px", fontSize: 13, color: TEXT_MUTED }}>
                {user?.email || ""}
              </p>
              <div style={{
                display: "inline-flex", alignItems: "center", gap: 6,
                background: `${BRAND_COLOR}15`, borderRadius: 20,
                padding: "6px 14px", color: BRAND_COLOR, fontSize: 12, fontWeight: 700,
              }}>
                ✨ Miembro HERS
              </div>
            </div>

            {/* Menu items */}
            {[
              { icon: "👤", label: "Editar perfil", desc: "Actualiza tus datos personales" },
              { icon: "🎯", label: "Mis objetivos", desc: "Gestiona tus metas de aprendizaje" },
              { icon: "🏆", label: "Mis logros", desc: "Ver todos tus certificados" },
              { icon: "🔔", label: "Notificaciones", desc: "Configura tus alertas" },
              { icon: "🔒", label: "Seguridad", desc: "Contraseña y privacidad" },
              { icon: "❓", label: "Ayuda y soporte", desc: "Centro de ayuda" },
            ].map(({ icon, label, desc }) => (
              <div key={label} style={{
                background: "#fff", borderRadius: 14, padding: "16px 18px",
                marginBottom: 10, display: "flex", alignItems: "center",
                gap: 14, cursor: "pointer",
                boxShadow: "0 1px 6px rgba(155,124,80,0.06)",
                border: "1px solid #f0e8df",
                transition: "box-shadow 0.15s",
              }}
                onMouseEnter={e => { e.currentTarget.style.boxShadow = "0 4px 16px rgba(155,124,80,0.14)"; }}
                onMouseLeave={e => { e.currentTarget.style.boxShadow = "0 1px 6px rgba(155,124,80,0.06)"; }}
              >
                <div style={{
                  width: 42, height: 42, borderRadius: 12, background: BRAND_BG2,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 20, flexShrink: 0,
                }}>{icon}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, fontWeight: 700, color: TEXT_MAIN }}>{label}</div>
                  <div style={{ fontSize: 12, color: TEXT_MUTED, marginTop: 2 }}>{desc}</div>
                </div>
                <span style={{ color: TEXT_MUTED, fontSize: 18 }}>›</span>
              </div>
            ))}

            {/* Cerrar sesión */}
            <button
              onClick={onSignOut}
              style={{
                width: "100%", marginTop: 8, padding: "14px",
                background: "#fff5f5", border: "1.5px solid #fcc", borderRadius: 14,
                color: "#c0392b", fontSize: 15, fontWeight: 700,
                cursor: "pointer", fontFamily: "'Outfit', 'Poppins', sans-serif",
                transition: "background 0.15s",
              }}
              onMouseEnter={e => { e.currentTarget.style.background = "#ffe8e8"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "#fff5f5"; }}
            >
              Cerrar sesión
            </button>
          </div>
        )}
      </main>

      {/* Bottom nav */}
      <nav style={{
        position: "fixed", bottom: 0, left: "50%", transform: "translateX(-50%)",
        width: "100%", maxWidth: 480,
        background: "#fff", borderTop: "1px solid #f0e8df",
        display: "flex", zIndex: 200,
        boxShadow: "0 -4px 20px rgba(155,124,80,0.08)",
      }}>
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              flex: 1, padding: "12px 0 10px",
              background: "none", border: "none", cursor: "pointer",
              display: "flex", flexDirection: "column",
              alignItems: "center", gap: 4,
              color: activeTab === tab.id ? BRAND_COLOR : TEXT_MUTED,
              transition: "color 0.15s",
            }}
          >
            <span style={{ fontSize: 22 }}>{tab.icon}</span>
            <span style={{
              fontSize: 10, fontWeight: activeTab === tab.id ? 700 : 500,
              fontFamily: "'Outfit', 'Poppins', sans-serif",
              letterSpacing: "0.2px",
            }}>{tab.label}</span>
            {activeTab === tab.id && (
              <div style={{
                width: 4, height: 4, borderRadius: "50%",
                background: BRAND_COLOR, marginTop: 1,
              }} />
            )}
          </button>
        ))}
      </nav>
    </div>
  );
}

// ── App principal ──────────────────────────────────────────────────────────
export default function App() {
  const [screen, setScreen] = useState("loader"); // loader | signin | register | forgot | dashboard
  const [user, setUser] = useState(null);

  function handleSignIn(userData) {
    setUser(userData);
    setScreen("dashboard");
  }

  function handleRegister(userData) {
    setUser(userData);
    setScreen("dashboard");
  }

  function handleSignOut() {
    setUser(null);
    setScreen("signin");
  }

  if (screen === "loader") {
    return <InitialLoader onDone={() => setScreen("signin")} />;
  }

  if (screen === "signin") {
    return (
      <SignInScreen
        onSignIn={handleSignIn}
        onGoRegister={() => setScreen("register")}
        onGoForgot={() => setScreen("forgot")}
      />
    );
  }

  if (screen === "register") {
    return (
      <RegisterScreen
        onBack={() => setScreen("signin")}
        onRegister={handleRegister}
      />
    );
  }

  if (screen === "forgot") {
    return <ForgotScreen onBack={() => setScreen("signin")} />;
  }

  if (screen === "dashboard") {
    return <DashboardScreen user={user} onSignOut={handleSignOut} />;
  }

  return null;
}