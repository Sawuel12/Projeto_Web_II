
import { useCallback, useEffect, useState } from "react";

import api from "../services/api";
import type { Usuario } from "../types/usuario";

import UsuarioForm from "../components/UsuarioForm";
import UsuarioList from "../components/UsuarioList";

// PROPRIEDADE PARA ABRIR AS PERMISSÕES DE UM USUÁRIO
interface UsuariosPageProps {
  onAbrirPermissoes: (id: number) => void;
}

function UsuariosPage({ onAbrirPermissoes }: UsuariosPageProps) {

  // ESTADOS DOS USUÁRIOS
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [editando, setEditando] = useState<Usuario | null>(null);

  // CONTROLE DE CARREGAMENTO
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  // CONTROLE PARA REINICIAR O FORMULÁRIO
  const [versaoForm, setVersaoForm] = useState(0);

  // ---------------- BUSCAR USUÁRIOS ----------------

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

  // CARREGAR USUÁRIOS AO ABRIR A PÁGINA
  useEffect(() => {
    void carregarUsuarios();
  }, [carregarUsuarios]);

  // ---------------- EXCLUIR USUÁRIO ----------------

  async function excluirUsuario(id: number) {
    try {
      await api.delete(`/usuarios/${id}`);

      // Se estava editando o usuário excluído,
      // limpa o formulário
      if (editando?.id === id) {
        setEditando(null);
        setVersaoForm((anterior) => anterior + 1);
      }

      // Atualizar a listagem
      await carregarUsuarios();

    } catch (error) {
      console.error("Erro ao excluir usuário:", error);
      alert("Erro ao excluir o usuário.");
    }
  }

  // ---------------- USUÁRIO SALVO ----------------

  function usuarioSalvo() {

    // Limpar o usuário em edição
    setEditando(null);

    // Reiniciar o formulário
    setVersaoForm((anterior) => anterior + 1);

    // Atualizar a listagem
    void carregarUsuarios();
  }

  // ---------------- EDITAR USUÁRIO ----------------

  function editarUsuario(usuario: Usuario) {
    setEditando(usuario);
  }

  // ---------------- ABRIR PERMISSÕES ----------------

  function abrirPermissoes(id: number) {

    // Enviar o ID do usuário selecionado para o App.tsx
    onAbrirPermissoes(id);
  }

  // ---------------- INTERFACE ----------------

  return (
    <section>

      <h1>Usuários cadastrados</h1>

      {/* FORMULÁRIO DE CADASTRO E EDIÇÃO */}

      <UsuarioForm
        key={`${editando?.id ?? "novo"}-${versaoForm}`}
        usuarioEditando={editando}
        onUsuarioSalvo={usuarioSalvo}
      />

      <hr />

      {/* LISTAGEM DOS USUÁRIOS */}

      {loading ? (

        <p>Carregando usuários...</p>

      ) : erro ? (

        <p style={{ color: "red" }}>
          {erro}
        </p>

      ) : (

        <UsuarioList
          usuarios={usuarios}
          onEditar={editarUsuario}
          onExcluir={excluirUsuario}
          onPermissoes={abrirPermissoes}
        />

      )}

    </section>
  );
}

export default UsuariosPage;
