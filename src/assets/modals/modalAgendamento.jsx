import React, { useState, useEffect } from "react";
import api from "../services/api";
import "../style/Modal.css";

export default function ModalAgendamento({ onClose }) {
  const [cliente, setCliente] = useState("");
  const [pet, setPet] = useState("");
  const [veterinario, setVeterinario] = useState("");
  const [dataHora, setDataHora] = useState("");

  const [consultas, setConsultas] = useState([]);

  const formatarDataHora = (valor) => {
    return valor && valor.length === 16 ? valor + ":00" : valor;
  };

  const formatarParaInput = (valor) => {
    if (!valor) return "";
    return valor.substring(0, 16);
  };

  // 🔹 Buscar consultas
  useEffect(() => {
    api
      .get("/consultas") // já está com baseURL http://localhost:8080/api/v1
      .then((res) => setConsultas(res.data))
      .catch((err) => console.error("Erro ao buscar consultas:", err));
  }, []);

  // 🔹 Salvar nova consulta
  const salvar = () => {
    if (!cliente || !pet || !veterinario || !dataHora) {
      alert("Preencha todos os campos!");
      return;
    }

    const nova = {
      cliente,
      pet,
      veterinario,
      dataHora: formatarDataHora(dataHora),
    };

    api
      .post("/consultas", nova)
      .then(() => {
        return api.get("/consultas");
      })
      .then((res) => {
        setConsultas(res.data);
        setCliente("");
        setPet("");
        setVeterinario("");
        setDataHora("");
      })
      .catch((err) => console.error("Erro ao salvar consulta:", err));
  };

  const cancelarConsulta = (id) => {
    api
      .put(`/consultas/${id}/cancelar`)
      .then(() => {
        setConsultas((prev) => prev.filter((c) => c.id !== id));
      })
      .catch((err) => console.error("Erro ao cancelar consulta:", err));
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content modal-form">
        <button className="modal-close" onClick={onClose}>
          ×
        </button>
        <h2>Agendar Consulta</h2>

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

        {consultas.length > 0 && (
          <>
            <h3>Consultas Marcadas</h3>
            <table>
              <thead>
                <tr>
                  <th>Cliente</th>
                  <th>Pet</th>
                  <th>Veterinário</th>
                  <th>Data/Hora</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {consultas.map((c) => (
                  <tr key={c.id}>
                    <td>{c.cliente}</td>
                    <td>{c.pet}</td>
                    <td>{c.veterinario}</td>
                    <td>{formatarParaInput(c.dataHora)}</td>
                    <td>
                      <button
                        className="btn-cancelar"
                        onClick={() => cancelarConsulta(c.id)}
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
    </div>
  );
}