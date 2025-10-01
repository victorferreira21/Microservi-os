import React, { useState, useEffect } from "react";
import "../style/Paginainicial.css";
import { CalendarCheck, Dog, Package } from "lucide-react";
import api from "../service/api";

import ModalBase from "../modals/ModalBase";
import ModalProntuario from "../modals/modalProntuario";
import ModalAgendamento from "../modals/modalAgendamento";
import ModalProdutos from "../modals/modalProdutos";

export default function PaginaInicial() {
  const [modalAberto, setModalAberto] = useState(null);
  const [user, setUser] = useState(null);

  const fecharModal = () => setModalAberto(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get("/profile/me/");
        setUser(res.data);
        console.log("👤 Usuário carregado:", res.data);
      } catch (err) {
        console.error("Erro ao buscar usuário:", err.response?.data || err.message);
      }
    };
    fetchUser();
  }, []);

  return (
    <div className="pagina-inicial">
      <main className="conteudo">
        {user ? (
          <h2>Bem-vindo, {user.name} 👋</h2>
        ) : (
          <h2>Carregando informações do usuário...</h2>
        )}

        <div className="opcoes">
          <button className="card" onClick={() => setModalAberto("agendamento")}>
            <CalendarCheck size={40} />
            <span>Agendar Consulta</span>
          </button>
          <button className="card" onClick={() => setModalAberto("prontuario")}>
            <Dog size={40} />
            <span>Prontuário</span>
          </button>
          <button className="card" onClick={() => setModalAberto("produtos")}>
            <Package size={40} />
            <span>Estoque / Produtos</span>
          </button>
        </div>
      </main>

      {modalAberto && (
        <ModalBase onClose={fecharModal}>
          {modalAberto === "prontuario" && <ModalProntuario onClose={fecharModal} />}
          {modalAberto === "agendamento" && <ModalAgendamento onClose={fecharModal} />}
          {modalAberto === "produtos" && <ModalProdutos onClose={fecharModal} />}
        </ModalBase>
      )}
    </div>
  );
}