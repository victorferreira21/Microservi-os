import React, { useState } from "react";

export default function ModalAgendamento({ onClose }) {
  const [cliente, setCliente] = useState("");
  const [pet, setPet] = useState("");
  const [veterinario, setVeterinario] = useState("");
  const [dataHora, setDataHora] = useState("");

  // Lista de agendamentos
  const [agendamentos, setAgendamentos] = useState([]);

  // Cadastrar nova consulta
  const salvar = () => {
    if (!cliente || !pet || !veterinario || !dataHora) return;
    const novo = {
      id: Date.now(),
      cliente,
      pet,
      veterinario,
      dataHora,
    };
    setAgendamentos((prev) => [...prev, novo]);

    // Limpa os campos
    setCliente("");
    setPet("");
    setVeterinario("");
    setDataHora("");
  };

  // Alterar data/hora
  const alterarData = (id, novaData) => {
    setAgendamentos((prev) =>
      prev.map((a) => (a.id === id ? { ...a, dataHora: novaData } : a))
    );
  };

  // Cancelar consulta
  const cancelarConsulta = (id) => {
    setAgendamentos((prev) => prev.filter((a) => a.id !== id));
  };

  return (
    <div className="modal-form" style={{ maxWidth: "600px" }}>
      <h2>Agendar Consulta</h2>

      {/* Formulário de agendamento */}
      <input
        type="text"
        placeholder="Nome do Cliente"
        value={cliente}
        onChange={(e) => setCliente(e.target.value)}
      />

      <input
        type="text"
        placeholder="Nome do Pet"
        value={pet}
        onChange={(e) => setPet(e.target.value)}
      />

      <input
        type="text"
        placeholder="Veterinário Responsável"
        value={veterinario}
        onChange={(e) => setVeterinario(e.target.value)}
      />

      <input
        type="datetime-local"
        value={dataHora}
        onChange={(e) => setDataHora(e.target.value)}
      />

      <div className="modal-actions">
        <button onClick={salvar}>Agendar</button>
        <button onClick={onClose}>Fechar</button>
      </div>

      {/* Lista de agendamentos */}
      {agendamentos.length > 0 && (
        <>
          <h3 style={{ marginTop: "1rem" }}>Consultas Marcadas</h3>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "#e3e3e3" }}>
                <th>Cliente</th>
                <th>Pet</th>
                <th>Veterinário</th>
                <th>Data/Hora</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {agendamentos.map((a) => (
                <tr key={a.id}>
                  <td>{a.cliente}</td>
                  <td>{a.pet}</td>
                  <td>{a.veterinario}</td>
                  <td>
                    <input
                      type="datetime-local"
                      value={a.dataHora}
                      onChange={(e) => alterarData(a.id, e.target.value)}
                      style={{ width: "180px" }}
                    />
                  </td>
                  <td>
                    <button
                      style={{ color: "#fff", background: "#e63946", border: "none", padding: "0.3rem 0.6rem" }}
                      onClick={() => cancelarConsulta(a.id)}
                    >
                      Cancelar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}
