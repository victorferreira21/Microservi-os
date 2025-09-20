import React, { useState } from "react";

export default function ModalPet({ onClose }) {
  const [nome, setNome] = useState("");
  const [raca, setRaca] = useState("");
  const [especie, setEspecie] = useState("");
  const [idade, setIdade] = useState("");
  const [cor, setCor] = useState("");

  const salvar = () => {
    // Aqui você pode enviar para sua API
    console.log("Salvar pet:", {
      nome,
      raca,
      especie,
      idade,
      cor,
    });
    onClose();
  };

  return (
    <div className="modal-form">
      <h2>Cadastrar Pet</h2>

      <input
        type="text"
        placeholder="Nome do Pet"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
      />

      <input
        type="text"
        placeholder="Raça"
        value={raca}
        onChange={(e) => setRaca(e.target.value)}
      />

      <input
        type="text"
        placeholder="Espécie (ex: cão, gato)"
        value={especie}
        onChange={(e) => setEspecie(e.target.value)}
      />

      <input
        type="number"
        placeholder="Idade (anos)"
        value={idade}
        onChange={(e) => setIdade(e.target.value)}
        min="0"
      />

      <input
        type="text"
        placeholder="Cor do Animal"
        value={cor}
        onChange={(e) => setCor(e.target.value)}
      />

      <div className="modal-actions">
        <button onClick={salvar}>Salvar</button>
        <button onClick={onClose}>Cancelar</button>
      </div>
    </div>
  );
}
