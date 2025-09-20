import React, { useState } from "react";
import Navbar from "./Navbar";
import "./CadastroCliente.css";

const CadastroCliente = () => {
  const [formData, setFormData] = useState({
    nome: "",
    cpf: "",
    email: "",
    endereco: "",
    telefone: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Dados do cliente:", formData);
    alert("Cliente cadastrado com sucesso!");
    setFormData({ nome: "", cpf: "", email: "", endereco: "", telefone: "" });
  };

  const handleCancel = () => {
    setFormData({ nome: "", cpf: "", email: "", endereco: "", telefone: "" });
  };

  return (
    <div className="cadastro-container">
      <Navbar />
      <main className="cadastro-content">
        <h1>Cadastro Cliente</h1>
        <form onSubmit={handleSubmit} className="form-cliente">
          <h3>Preencha os dados do cliente</h3>
          <input type="text" name="nome" placeholder="Nome" value={formData.nome} onChange={handleChange} required />
          <input type="text" name="cpf" placeholder="CPF" value={formData.cpf} onChange={handleChange} required />
          <input type="email" name="email" placeholder="E-mail" value={formData.email} onChange={handleChange} required />
          <input type="text" name="endereco" placeholder="Endereço" value={formData.endereco} onChange={handleChange} required />
          <input type="tel" name="telefone" placeholder="Telefone" value={formData.telefone} onChange={handleChange} required />

          <div className="form-buttons">
            <button type="button" className="cancelar" onClick={handleCancel}>Cancelar</button>
            <button type="submit" className="cadastrar">Cadastrar</button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default CadastroCliente;
