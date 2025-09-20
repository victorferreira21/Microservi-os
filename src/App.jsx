import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./assets/modals/Navbar";
import LoginPage from "./assets/components/Login";
import PaginaInicial from "./assets/components/PaginaInicial";

function LayoutComNavbar({ children }) {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
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
