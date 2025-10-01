import React, { useState, useEffect } from "react";
import api from "../service/api";
import "../style/Modal.css";

export default function ModalAgendamento({ onClose }) {
  const [pet, setPet] = useState("");
  const [veterinario, setVeterinario] = useState("");
  const [dataHora, setDataHora] = useState("");
  const [tipo, setTipo] = useState("rotina");

  const [consultas, setConsultas] = useState([]);

  const formatarDataHora = (valor) => {
    return valor && valor.length === 16 ? valor + ":00" : valor;
  };

  const formatarParaInput = (valor) => {
    if (!valor) return "";
    return valor.substring(0, 16);
  };

  useEffect(() => {
    api
      .get("/consultas")
      .then((res) => setConsultas(res.data))
      .catch((err) => console.error("Erro ao buscar consultas:", err));
  }, []);

  const salvar = () => {
    if (!pet || !veterinario || !dataHora || !tipo) {
      alert("Preencha todos os campos!");
      return;
    }

    const nova = {
      pet,
      veterinario,
      dataHora: formatarDataHora(dataHora),
      status: "agendada", // 🔹 sempre inicia como "agendada"
      tipo,
    };

    api
      .post("/consultas", nova)
      .then(() => api.get("/consultas"))
      .then((res) => {
        setConsultas(res.data);
        setPet("");
        setVeterinario("");
        setDataHora("");
        setTipo("rotina");
      })
      .catch((err) => console.error("Erro ao salvar consulta:", err));
  };

  const atualizarStatus = (id, novoStatus) => {
    api
      .put(`/consultas/${id}/status`, { status: novoStatus })
      .then(() => {
        setConsultas((prev) =>
          prev.map((c) =>
            c.id === id ? { ...c, status: novoStatus } : c
          )
        );
      })
      .catch((err) => console.error("Erro ao atualizar status:", err));
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content modal-form" style={{ display: "flex", gap: "20px" }}>
        {/* Formulário */}
        <div style={{ flex: 1 }}>
          <button className="modal-close" onClick={onClose}>
            ×
          </button>
          <h2>Agendar Consulta</h2>

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

          <select value={tipo} onChange={(e) => setTipo(e.target.value)}>
            <option value="rotina">Rotina</option>
            <option value="emergencia">Emergência</option>
          </select>

          <div className="modal-actions">
            <button onClick={salvar}>Agendar</button>
            <button onClick={onClose}>Fechar</button>
          </div>
        </div>

        {/* Histórico de Agendamentos */}
        <div style={{ flex: 2 }}>
          <h3>Histórico de Agendamentos</h3>
          {consultas.length > 0 ? (
            <table>
              <thead>
                <tr>
                  <th>Pet</th>
                  <th>Veterinário</th>
                  <th>Data/Hora</th>
                  <th>Status</th>
                  <th>Tipo</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {consultas.map((c) => (
                  <tr key={c.id}>
                    <td>{c.pet}</td>
                    <td>{c.veterinario}</td>
                    <td>{formatarParaInput(c.dataHora)}</td>
                    <td>{c.status}</td>
                    <td>{c.tipo}</td>
                    <td>
                      {c.status === "agendada" && (
                        <>
                          <button
                            className="btn-realizar"
                            onClick={() => atualizarStatus(c.id, "realizada")}
                          >
                            Realizar
                          </button>
                          <button
                            className="btn-cancelar"
                            onClick={() => atualizarStatus(c.id, "cancelada")}
                          >
                            Cancelar
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>Nenhum agendamento encontrado.</p>
          )}
        </div>
      </div>
    </div>
  );
}