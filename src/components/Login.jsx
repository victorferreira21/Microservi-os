// components/Login.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { PawPrint, Mail, Eye, EyeOff } from "lucide-react";
import "../style/Login.css";
import api from "../service/api";

function LoginPage({ onLoginSuccess }) {
  const navigate = useNavigate();
  const [loginField, setLoginField] = useState(""); 
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const canSubmit = loginField && password.length >= 8;

  async function loginApi({ login, password }) {
    try {
      const response = await api.post("/auth/login/", { login, password });
      console.log("🔑 Resposta do login:", response.data);

      // Captura qualquer campo possível
      const token =
        response.data.token ||
        response.data.access ||
        response.data.jwt ||
        response.data.auth_token;

      console.log("🟢 Token capturado:", token);

      if (!token) {
        return { ok: false, message: "Token não encontrado na resposta." };
      }
      return { ok: true, token };
    } catch (error) {
      console.error("❌ Erro no login:", error.response?.data || error.message);
      return {
        ok: false,
        message: error.response?.data?.detail || "Credenciais inválidas",
      };
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await loginApi({ login: loginField, password });
      if (res.ok) {
        setSuccess(true);

        if (remember) {
          localStorage.setItem("vet_auth_token", res.token);
        } else {
          sessionStorage.setItem("vet_auth_token", res.token);
        }

        console.log("✅ Token salvo:", res.token);

        if (typeof onLoginSuccess === "function") onLoginSuccess(res);

        navigate("/home", { replace: true });
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
              <label htmlFor="login" className="login-label">E-mail ou Username</label>
              <div className="input-group">
                <input
                  id="login"
                  type="text"
                  value={loginField}
                  onChange={(e) => setLoginField(e.target.value)}
                  className="input-field"
                  placeholder="seu@exemplo.com ou username"
                />
                <div className="input-icon"><Mail className="icon" /></div>
              </div>
            </div>

            <div>
              <label htmlFor="password" className="login-label">Senha</label>
              <div className="input-group">
                <input
                  id="password"
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
                >
                  {showPassword ? <EyeOff className="icon" /> : <Eye className="icon" />}
                </button>
              </div>
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
            </div>

            {error && <div className="error-text">{error}</div>}
            {success && <div className="success-text">Login bem-sucedido! Redirecionando…</div>}

            <button type="submit" disabled={!canSubmit || loading} className="login-btn">
              {loading ? <span className="spinner"></span> : "Entrar"}
            </button>
          </form>

          <p className="register-link">
            Não tem conta?{" "}
            <span onClick={() => navigate("/register")} style={{ cursor: "pointer", color: "blue" }}>
              Cadastre-se
            </span>
          </p>
        </div>
      </motion.div>
    </div>
  );
}

export default LoginPage;
