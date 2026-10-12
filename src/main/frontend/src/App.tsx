
import { useState } from "react";

import UsuariosPage from "./pages/UsuariosPage";
import PermissoesPage from "./pages/PermissoesPage";
import CategoriasPage from "./pages/CategoriasPage";
import UsuarioPermissoesPage from "./pages/UsuarioPermissoesPage";

function App() {

  // USUÁRIO SELECIONADO PARA ATRIBUIÇÃO
  const [usuarioSelecionado, setUsuarioSelecionado] =
    useState<number | null>(null);

  // ABRIR A SEÇÃO DE PERMISSÕES
  function abrirPermissoes(id: number) {

    // Selecionar o usuário
    setUsuarioSelecionado(id);

    // Rolar até a seção de atribuição
    document
      .getElementById("atribuicao-permissoes")
      ?.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
  }

  return (
    <div>

      <UsuariosPage
        onAbrirPermissoes={abrirPermissoes}
      />

      <PermissoesPage />

      <CategoriasPage />

      <hr />

      <div id="atribuicao-permissoes">

        <UsuarioPermissoesPage
          usuarioId={usuarioSelecionado}
          onSelecionarUsuario={setUsuarioSelecionado}
        />

      </div>

    </div>
  );
}

export default App;
