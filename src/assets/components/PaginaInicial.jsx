import React, { useState } from "react";
import "../style/PaginaInicial.css";

import ModalBase from "../modals/ModalBase";
import ModalCliente from "../modals/ModalCliente";
import ModalPet from "../modals/ModalPet";
import ModalAgendamento from "../modals/ModalAgendamento";
import ModalProdutos from "../modals/ModalProdutos";

export default function PaginaInicial() {
  const [modalAberto, setModalAberto] = useState(null); 

  const fecharModal = () => setModalAberto(null);

  return (
    <div className="pagina-inicial">
      <main className="conteudo">
        <h2>O que você quer fazer?</h2>
        <div className="opcoes">
          <button className="card" onClick={() => setModalAberto("agendamento")}>
            Agendar Consulta
          </button>
          <button className="card" onClick={() => setModalAberto("produtos")}>
            Produtos
          </button>
          <button className="card" onClick={() => setModalAberto("cliente")}>
            Clientes
          </button>
          <button className="card" onClick={() => setModalAberto("pet")}>
            Pets
          </button>
        </div>
      </main>

      {modalAberto && (
        <ModalBase onClose={fecharModal}>
          {modalAberto === "cliente" && <ModalCliente onClose={fecharModal} />}
          {modalAberto === "pet" && <ModalPet onClose={fecharModal} />}
          {modalAberto === "agendamento" && <ModalAgendamento onClose={fecharModal} />}
          {modalAberto === "produtos" && <ModalProdutos onClose={fecharModal} />}
        </ModalBase>
      )}
    </div>
  );
}
