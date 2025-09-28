import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../style/Navbar.css";

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/"); 
  };

  return (
    <header className="navbar">
      <div className="logo">
        <span className="paw">🐾</span>
        <span className="title">VetControl</span>
      </div>
      <nav>
        <ul>
          <li>
            <button className="logout-btn" onClick={handleLogout}>
              Encerrar Sessão
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Navbar;
