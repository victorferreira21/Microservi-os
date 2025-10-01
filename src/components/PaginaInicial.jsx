import React, { useState } from "react";
import "../style/Paginainicial.css";

import { CalendarCheck, Dog, Package } from "lucide-react";

import ModalBase from "../modals/ModalBase";
import ModalProntuario from "../modals/modalProntuario";
import ModalAgendamento from "../modals/modalAgendamento";
import ModalProdutos from "../modals/modalProdutos";

export default function PaginaInicial() {
  const [modalAberto, setModalAberto] = useState(null);

  const fecharModal = () => setModalAberto(null);

  return (
    <div className="pagina-inicial">
      <main className="conteudo">
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
          {modalAberto === "prontuario" && (
            <ModalProntuario onClose={fecharModal} />
          )}
          {modalAberto === "agendamento" && (
            <ModalAgendamento onClose={fecharModal} />
          )}
          {modalAberto === "produtos" && <ModalProdutos onClose={fecharModal} />}
        </ModalBase>
      )}
    </div>
  );
}
