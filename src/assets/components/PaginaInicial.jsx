import React, { useState } from "react";
import "../style/PaginaInicial.css";
import { CalendarCheck, Syringe, User2, Dog, Package } from "lucide-react";
import Navbar from "./Navbar"; 

import ModalBase from "../modals/ModalBase";
import ModalCliente from "../modals/modalCliente";
import ModalPet from "../modals/ModalPet";
import ModalAgendamento from "../modals/modalAgendamento";
import ModalProdutos from "../modals/ModalProdutos";

export default function PaginaInicial() {
  const [modalAberto, setModalAberto] = useState(null);

  const fecharModal = () => setModalAberto(null);

  return (
    <div className="pagina-inicial">
      <Navbar />

      <main className="conteudo">
        <h2>Sistema de Controle de Vacinas</h2>
        <div className="opcoes">
          <button className="card" onClick={() => setModalAberto("agendamento")}>
            <CalendarCheck size={40} />
            <span>Agendar Consulta</span>
          </button>
          <button className="card" onClick={() => setModalAberto("vacinas")}>
            <Syringe size={40} />
            <span>Controle de Vacinas</span>
          </button>
          <button className="card" onClick={() => setModalAberto("cliente")}>
            <User2 size={40} />
            <span>Clientes</span>
          </button>
          <button className="card" onClick={() => setModalAberto("pet")}>
            <Dog size={40} />
            <span>Pets</span>
          </button>
          <button className="card" onClick={() => setModalAberto("produtos")}>
            <Package size={40} />
            <span>Estoque / Produtos</span>
          </button>
        </div>
      </main>

      {modalAberto && (
        <ModalBase onClose={fecharModal}>
          {modalAberto === "cliente" && <ModalCliente onClose={fecharModal} />}
          {modalAberto === "pet" && <ModalPet onClose={fecharModal} />}
          {modalAberto === "agendamento" && (
            <ModalAgendamento onClose={fecharModal} />
          )}
          {modalAberto === "produtos" && <ModalProdutos onClose={fecharModal} />}
          {modalAberto === "vacinas" && (
            <div style={{ padding: "20px" }}>
              <h2>Controle de Vacinas</h2>
              <p>Aqui você poderá registrar e acompanhar as vacinas aplicadas.</p>
            </div>
          )}
        </ModalBase>
      )}
    </div>
  );
}
