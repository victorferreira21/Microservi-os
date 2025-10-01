import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import LoginPage from "./components/Login";
import PaginaInicial from "./components/PaginaInicial";
import RegisterPage from "./components/Register";
import api from "./service/api";

function LayoutComNavbar({ children }) {
  return <>{children}</>;
}

function PrivateRoute({ children }) {
  const [valid, setValid] = useState(null);

  useEffect(() => {
    const checkToken = async () => {
      const token =
        localStorage.getItem("vet_auth_token") ||
        sessionStorage.getItem("vet_auth_token");

      if (!token) {
        console.warn("⚠️ Nenhum token encontrado, redirecionando...");
        setValid(false);
        return;
      }

      console.log("🔐 Token salvo:", token);

      try {
        // forçando header explícito só pra debug
        const res = await api.get("/auth/validate-token/", {
          headers: { Authorization: token },
        });

        console.log("✅ Token válido:", res.data);
        setValid(true);
      } catch (err) {
        console.error(
          "❌ Erro ao validar token:",
          err.response?.data || err.message
        );
        setValid(false);
      }
    };

    checkToken();
  }, []);

  if (valid === null) return <div>Carregando...</div>;
  if (!valid) return <Navigate to="/" replace />;

  return children;
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route
          path="/home"
          element={
            <PrivateRoute>
              <LayoutComNavbar>
                <PaginaInicial />
              </LayoutComNavbar>
            </PrivateRoute>
          }
        />

        {/* fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;