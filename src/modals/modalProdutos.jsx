import React, { useState } from "react";

export default function ModalProdutos({ onClose }) {
  const [busca, setBusca] = useState("");
  const [produtos, setProdutos] = useState([]);
  const [novoNome, setNovoNome] = useState("");
  const [lote, setLote] = useState("");
  const [validade, setValidade] = useState("");
  const [tipo, setTipo] = useState("Comprimido");
  const [editandoId, setEditandoId] = useState(null);

  const adicionarProduto = () => {
    if (!novoNome || !lote || !validade) return;

    if (editandoId) {
      setProdutos((prev) =>
        prev.map((p) =>
          p.id === editandoId
            ? { ...p, nome: novoNome, lote, validade, tipo }
            : p
        )
      );
      setEditandoId(null);
    } else {
      const novo = {
        id: Date.now(),
        nome: novoNome,
        lote,
        validade,
        tipo,
      };
      setProdutos((prev) => [...prev, novo]);
    }

    setNovoNome("");
    setLote("");
    setValidade("");
    setTipo("Comprimido");
  };

  const excluirProduto = (id) => {
    setProdutos((prev) => prev.filter((p) => p.id !== id));
  };

  const editarProduto = (produto) => {
    setNovoNome(produto.nome);
    setLote(produto.lote);
    setValidade(produto.validade);
    setTipo(produto.tipo);
    setEditandoId(produto.id);
  };

  const produtosFiltrados = produtos.filter((p) =>
    p.nome.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <div
      className="modal-form"
      style={{
        width: "600px",
        background: "#f7f7f7",
        padding: "1rem",
        borderRadius: "8px",
      }}
    >
      <h2>Cadastro de Vacinas e Medicamentos</h2>
      <input
        type="text"
        placeholder="Buscar pelo nome do produto"
        value={busca}
        onChange={(e) => setBusca(e.target.value)}
        style={{ width: "100%", marginBottom: "1rem" }}
      />
      <table
        style={{
          width: "100%",
          marginBottom: "1rem",
          borderCollapse: "collapse",
        }}
      >
        <thead>
          <tr style={{ background: "#cce0e0" }}>
            <th>Nome</th>
            <th>Lote</th>
            <th>Validade</th>
            <th>Tipo</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {produtosFiltrados.map((p) => (
            <tr key={p.id}>
              <td>{p.nome}</td>
              <td>{p.lote}</td>
              <td>{p.validade}</td>
              <td>{p.tipo}</td>
              <td style={{ display: "flex", gap: "0.5rem" }}>
                <button onClick={() => editarProduto(p)}>Editar</button>
                <button onClick={() => excluirProduto(p.id)}>Excluir</button>
              </td>
            </tr>
          ))}
          {produtosFiltrados.length === 0 && (
            <tr>
              <td colSpan={5} style={{ textAlign: "center" }}>
                Nenhum produto encontrado
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <h3>{editandoId ? "Editar Produto" : "Novo Produto"}</h3>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "0.5rem",
          marginBottom: "1rem",
        }}
      >
        <input
          type="text"
          placeholder="Nome do Produto"
          value={novoNome}
          onChange={(e) => setNovoNome(e.target.value)}
        />
        <input
          type="text"
          placeholder="Lote"
          value={lote}
          onChange={(e) => setLote(e.target.value)}
        />
        <input
          type="date"
          placeholder="Validade"
          value={validade}
          onChange={(e) => setValidade(e.target.value)}
        />
        <select value={tipo} onChange={(e) => setTipo(e.target.value)}>
          <option value="Comprimido">Comprimido</option>
          <option value="Injetável">Injetável</option>
        </select>
        <button onClick={adicionarProduto}>
          {editandoId ? "Salvar Alterações" : "Adicionar"}
        </button>
      </div>

      <div
        className="modal-actions"
        style={{ display: "flex", justifyContent: "flex-end", gap: "0.5rem" }}
      >
        <button onClick={onClose}>Fechar</button>
      </div>
    </div>
  );
}
