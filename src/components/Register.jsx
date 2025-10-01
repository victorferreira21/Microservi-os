import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { User, Mail, Eye, EyeOff, Phone } from "lucide-react";
import "../style/Login.css"; 
import api from "../service/api";

function RegisterPage() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Regex senha forte
  const isPasswordValid = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,255}$/.test(password);

  const canSubmit = 
    name.length >= 3 &&
    username.length >= 3 &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) &&
    /^[0-9]{10,11}$/.test(phoneNumber) &&
    isPasswordValid &&
    confirmPassword === password;

  async function registerApi({ name, username, email, phone_number, password, confirm_password }) {
    try {
      const response = await api.post("/auth/register/", {
        name,
        username,
        email,
        phone_number,
        password,
        confirm_password
      });
      return { ok: true, data: response.data };
    } catch (error) {
      console.error("Erro no registro:", error.response?.data);
      return {
        ok: false,
        message:
          error.response?.data?.detail ||
          JSON.stringify(error.response?.data) ||
          "Erro ao cadastrar usuário",
      };
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    setLoading(true);
    try {
      const res = await registerApi({ 
        name, 
        username, 
        email, 
        phone_number: phoneNumber, 
        password,
        confirm_password: confirmPassword
      });
      if (res.ok) {
        setSuccess("Usuário cadastrado com sucesso! Redirecionando para login...");
        setTimeout(() => navigate("/"), 2000);
      } else {
        setError(res.message || "Erro no cadastro");
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
          <User className="logo-icon-big" />
          <h2 className="logo-text">Criar Conta</h2>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.45 }}
        className="login-right"
      >
        <div className="login-box">
          <h1 className="welcome-text">Registrar</h1>

          <form onSubmit={handleSubmit} className="login-form" noValidate>
            {/* Nome */}
            <div>
              <label htmlFor="name" className="login-label">Nome *</label>
              <input id="name" value={name} onChange={(e) => setName(e.target.value)} className="input-field" />
            </div>

            {/* Username */}
            <div>
              <label htmlFor="username" className="login-label">Username *</label>
              <input id="username" value={username} onChange={(e) => setUsername(e.target.value)} className="input-field" />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="login-label">E-mail *</label>
              <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="input-field" />
            </div>

            {/* Telefone */}
            <div>
              <label htmlFor="phone_number" className="login-label">Telefone *</label>
              <input id="phone_number" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ""))} className="input-field" />
            </div>

            {/* Senha */}
            <div>
              <label htmlFor="password" className="login-label">Senha *</label>
              <input id="password" type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} className="input-field" />
              <button type="button" onClick={() => setShowPassword((s) => !s)}>{showPassword ? "Ocultar" : "Mostrar"}</button>
            </div>

            {/* Confirmar Senha */}
            <div>
              <label htmlFor="confirm_password" className="login-label">Confirmar Senha *</label>
              <input id="confirm_password" type={showConfirmPassword ? "text" : "password"} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="input-field" />
              <button type="button" onClick={() => setShowConfirmPassword((s) => !s)}>{showConfirmPassword ? "Ocultar" : "Mostrar"}</button>
            </div>

            {/* Feedback */}
            {error && <div className="error-text">{error}</div>}
            {success && <div className="success-text">{success}</div>}

            <button type="submit" disabled={!canSubmit || loading} className="login-btn">
              {loading ? <span className="spinner"></span> : "Cadastrar"}
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}

export default RegisterPage;
