import React, { useState } from "react";

export default function ModalProntuario({ onClose }) {
  const [abaAtiva, setAbaAtiva] = useState("dados");

  const [nomeAnimal, setNomeAnimal] = useState("");
  const [nomeTutor, setNomeTutor] = useState("");
  const [contatoTutor, setContatoTutor] = useState("");
  const [especie, setEspecie] = useState("");
  const [raca, setRaca] = useState("");
  const [consultas, setConsultas] = useState("");
  const [diagnosticos, setDiagnosticos] = useState("");
  const [tratamentos, setTratamentos] = useState("");
  const [cirurgias, setCirurgias] = useState("");
  const [peso, setPeso] = useState("");
  const [imagens, setImagens] = useState([]);

  const salvar = () => {
    console.log("Salvar prontuário:", {
      nomeAnimal,
      nomeTutor,
      contatoTutor,
      especie,
      raca,
      consultas,
      diagnosticos,
      tratamentos,
      cirurgias,
      peso,
      imagens,
    });
    onClose();
  };

  const handleImagensChange = (e) => {
    const files = Array.from(e.target.files);
    setImagens(files.map((file) => file.name));
  };

  return (
    <div className="modal-content">
      <div className="modal-section">
        <h2>Prontuário</h2>

        {/* Navegação entre abas */}
        <div className="tabs">
          <button
            className={abaAtiva === "dados" ? "tab active" : "tab"}
            onClick={() => setAbaAtiva("dados")}
          >
            Dados do Animal
          </button>
          <button
            className={abaAtiva === "historico" ? "tab active" : "tab"}
            onClick={() => setAbaAtiva("historico")}
          >
            Histórico Médico
          </button>
        </div>

        {/* Conteúdo das abas */}
        {abaAtiva === "dados" && (
          <div className="modal-form">
            <input
              type="text"
              placeholder="Nome do animal"
              value={nomeAnimal}
              onChange={(e) => setNomeAnimal(e.target.value)}
            />

            <input
              type="text"
              placeholder="Nome do tutor"
              value={nomeTutor}
              onChange={(e) => setNomeTutor(e.target.value)}
            />

            <input
              type="text"
              placeholder="Contato do tutor"
              value={contatoTutor}
              onChange={(e) => setContatoTutor(e.target.value)}
            />

            <input
              type="text"
              placeholder="Espécie (ex: cão, gato)"
              value={especie}
              onChange={(e) => setEspecie(e.target.value)}
            />

            <input
              type="text"
              placeholder="Raça"
              value={raca}
              onChange={(e) => setRaca(e.target.value)}
            />

            <input
              type="number"
              placeholder="Peso do animal (kg)"
              value={peso}
              onChange={(e) => setPeso(e.target.value)}
            />

            <input type="file" multiple onChange={handleImagensChange} />
          </div>
        )}

        {abaAtiva === "historico" && (
          <div className="modal-form">
            <textarea
              placeholder="Consultas"
              value={consultas}
              onChange={(e) => setConsultas(e.target.value)}
            />

            <textarea
              placeholder="Diagnósticos"
              value={diagnosticos}
              onChange={(e) => setDiagnosticos(e.target.value)}
            />

            <textarea
              placeholder="Tratamentos"
              value={tratamentos}
              onChange={(e) => setTratamentos(e.target.value)}
            />

            <textarea
              placeholder="Cirurgias"
              value={cirurgias}
              onChange={(e) => setCirurgias(e.target.value)}
            />
          </div>
        )}

        <div className="modal-actions">
          <button onClick={salvar}>Salvar</button>
          <button onClick={onClose}>Cancelar</button>
        </div>
      </div>
    </div>
  );
}