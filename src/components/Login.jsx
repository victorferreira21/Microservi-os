import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { PawPrint, Mail, Eye, EyeOff } from "lucide-react";
import "../style/Login.css";
import axios from "axios";


function LoginPage({ onLoginSuccess }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const isEmailValid = (e) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);
  const canSubmit = email && password.length >= 6 && isEmailValid(email);

  async function loginApi({ email, password }) {
  try {
    const response = await axios.post(
      "https://608d4c26c74f.ngrok-free.app/login",
      { email, password }
    );
    return { ok: true, token: response.data.token };
  } catch (error) {
    return {
      ok: false,
      message: error.response?.data?.message || "Credenciais inválidas",
    };
  }
}

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!isEmailValid(email)) {
      setError("Insira um e-mail válido");
      return;
    }
    if (password.length < 6) {
      setError("Senha precisa ter ao menos 6 caracteres");
      return;
    }

    setLoading(true);
    try {
      const res = await loginApi({ email, password });
      if (res.ok) {
        setSuccess(true);
        if (remember) localStorage.setItem("vet_auth_token", res.token);
        else sessionStorage.setItem("vet_auth_token", res.token);

        if (typeof onLoginSuccess === "function") onLoginSuccess(res);
        else navigate("/home");
      } else {
        setError(res.message || "Erro ao autenticar");
      }
    } catch (err) {
      setError("Erro de rede. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-left">
        <div className="logo-box">
          <PawPrint className="logo-icon-big" />
          <h2 className="logo-text">VetControl</h2>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.45 }}
        className="login-right"
      >
        <div className="login-box">
          <h1 className="welcome-text">Bem-Vindo!</h1>

          <form onSubmit={handleSubmit} className="login-form" noValidate>
            <div>
              <label htmlFor="email" className="login-label">
                Usuário
              </label>
              <div className="input-group">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input-field"
                  placeholder="seu@exemplo.com"
                />
                <div className="input-icon">
                  <Mail className="icon" />
                </div>
              </div>
            </div>

            <div>
              <label htmlFor="password" className="login-label">
                Senha
              </label>
              <div className="input-group">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input-field"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  className="toggle-btn"
                  aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
                >
                  {showPassword ? <EyeOff className="icon" /> : <Eye className="icon" />}
                </button>
              </div>
              <p className="password-hint">Mínimo 6 caracteres.</p>
            </div>

            <div className="login-options">
              <label className="remember">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                />
                Lembrar-me
              </label>
              <a href="#" className="forgot-link">
                Esqueceu a senha?
              </a>
            </div>

            {error && <div className="error-text">{error}</div>}
            {success && (
              <div className="success-text">Login bem-sucedido! Redirecionando…</div>
            )}

            <div>
              <button
                type="submit"
                disabled={!canSubmit || loading}
                className="login-btn"
              >
                {loading ? <span className="spinner"></span> : "Entrar"}
              </button>
            </div>
          </form>

          <div className="demo-text">
            <p>
              Credenciais demo: <strong>admin@vet.com</strong> /{" "}
              <strong>password123</strong>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default LoginPage;
