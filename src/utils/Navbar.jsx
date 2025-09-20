import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <header className="navbar">
      <div className="logo">
        <span className="paw">🐾</span>
        <span className="title">VetControl</span>
      </div>
      <nav>
        <ul>
          <li><Link to="/home">Início</Link></li>
          <li><Link to="/cadastro">Cliente</Link></li>
          <li><Link to="/pet">Pet</Link></li>
          <li><Link to="/produtos">Produtos</Link></li>
          <li><Link to="/relatorios">Relatórios</Link></li>
          <li><Link to="/">Sair</Link></li>
        </ul>
      </nav>
    </header>
  );
}

export default Navbar;
