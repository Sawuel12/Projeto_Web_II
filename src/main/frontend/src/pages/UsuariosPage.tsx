
import { useCallback, useEffect, useState } from "react";

import api from "../services/api";
import type { Usuario } from "../types/usuario";

import UsuarioForm from "../components/UsuarioForm";
import UsuarioList from "../components/UsuarioList";

function UsuariosPage() {

  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [editando, setEditando] = useState<Usuario | null>(null);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState<string | null>(null);
  const [versaoForm, setVersaoForm] = useState(0);

  // BUSCAR USUÁRIOS NO BACKEND
  const carregarUsuarios = useCallback(async () => {
    try {
      const resposta = await api.get<Usuario[]>("/usuarios");
      setUsuarios(resposta.data);
      setErro(null);
    } catch (error) {
      console.error("Erro ao buscar usuários:", error);
      setErro("Não foi possível carregar os usuários.");
    } finally {
      setLoading(false);
    }
  }, []);

  // CARREGAR QUANDO A PÁGINA ABRIR
  useEffect(() => {
    void carregarUsuarios();
  }, [carregarUsuarios]);

  // EXCLUIR USUÁRIO
  async function excluirUsuario(id: number) {
    try {
      await api.delete(`/usuarios/${id}`);

      if (editando?.id === id) {
        setEditando(null);
      }

      await carregarUsuarios();

    } catch (error) {
      console.error("Erro ao excluir usuário:", error);
      alert("Erro ao excluir o usuário.");
    }
  }

  // ATUALIZAR APÓS CADASTRO OU EDIÇÃO
  function usuarioSalvo() {
    setEditando(null);
    setVersaoForm((anterior) => anterior + 1);
    void carregarUsuarios();
  }

  return (
    <section>
      <h1>Usuários cadastrados</h1>

      <UsuarioForm
        key={`${editando?.id ?? "novo"}-${versaoForm}`}
        usuarioEditando={editando}
        onUsuarioSalvo={usuarioSalvo}
      />

      <hr />

      {loading ? (
        <p>Carregando usuários...</p>
      ) : erro ? (
        <p style={{ color: "red" }}>{erro}</p>
      ) : (
        <UsuarioList
          usuarios={usuarios}
          onEditar={setEditando}
          onExcluir={excluirUsuario}
        />
      )}
    </section>
  );
}

export default UsuariosPage;
