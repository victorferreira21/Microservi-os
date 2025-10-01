import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import LoginPage from "./components/Login";
import PaginaInicial from "./components/PaginaInicial";

function LayoutComNavbar({ children }) {
  return <>{children}</>;
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route
          path="/home"
          element={
            <LayoutComNavbar>
              <PaginaInicial />
            </LayoutComNavbar>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
