import React, { useState } from "react";
import Navbar from "./Navbar";
import "./CadastroPet.css";

const CadastroPet = () => {
  const [formData, setFormData] = useState({
    nome: "",
    especie: "",
    raca: "",
    idade: "",
    dono: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Dados do pet:", formData);
    alert("Pet cadastrado com sucesso!");
    setFormData({ nome: "", especie: "", raca: "", idade: "", dono: "" });
  };

  const handleCancel = () => {
    setFormData({ nome: "", especie: "", raca: "", idade: "", dono: "" });
  };

  return (
    <div className="pet-container">
      <Navbar />
      <main className="pet-content">
        <h1>Cadastro Pet</h1>
        <form onSubmit={handleSubmit} className="form-pet">
          <h3>Preencha os dados do pet</h3>
          <input type="text" name="nome" placeholder="Nome" value={formData.nome} onChange={handleChange} required />
          <input type="text" name="especie" placeholder="Espécie" value={formData.especie} onChange={handleChange} required />
          <input type="text" name="raca" placeholder="Raça" value={formData.raca} onChange={handleChange} required />
          <input type="number" name="idade" placeholder="Idade" value={formData.idade} onChange={handleChange} required />
          <input type="text" name="dono" placeholder="Nome do Dono" value={formData.dono} onChange={handleChange} required />

          <div className="form-buttons">
            <button type="button" className="cancelar" onClick={handleCancel}>Cancelar</button>
            <button type="submit" className="cadastrar">Cadastrar</button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default CadastroPet;
