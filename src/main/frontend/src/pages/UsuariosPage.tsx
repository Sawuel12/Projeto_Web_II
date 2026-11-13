
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../services/api";
import type { Usuario } from "../types/usuario";

import UsuarioForm from "../components/UsuarioForm";
import UsuarioList from "../components/UsuarioList";

function UsuariosPage() {
  const navigate = useNavigate();

  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [editando, setEditando] = useState<Usuario | null>(null);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState<string | null>(null);
  const [versaoForm, setVersaoForm] = useState(0);

  // CARREGAR USUÁRIOS
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

  useEffect(() => {
    void carregarUsuarios();
  }, [carregarUsuarios]);

  // EXCLUIR USUÁRIO
  async function excluirUsuario(id: number) {
    try {
      await api.delete(`/usuarios/${id}`);

      if (editando?.id === id) {
        setEditando(null);
        setVersaoForm((anterior) => anterior + 1);
      }

      await carregarUsuarios();
    } catch (error) {
      console.error("Erro ao excluir usuário:", error);
      alert("Erro ao excluir o usuário.");
    }
  }

  // RECARREGAR DEPOIS DE CADASTRAR OU EDITAR
  function usuarioSalvo() {
    setEditando(null);
    setVersaoForm((anterior) => anterior + 1);
    void carregarUsuarios();
  }

  // ABRIR A PÁGINA DE PERMISSÕES
  function abrirPermissoes(id: number) {
    navigate(`/atribuir-permissoes?usuarioId=${id}`);
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
          onPermissoes={abrirPermissoes}
        />
      )}
    </section>
  );
}

export default UsuariosPage;
