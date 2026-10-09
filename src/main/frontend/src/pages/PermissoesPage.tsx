
import { useCallback, useEffect, useState } from "react";

import api from "../services/api";
import type { Permissao } from "../types/permissoes";

import PermissaoForm from "../components/PermissaoForm";
import PermissaoList from "../components/PermissaoList";

function PermissoesPage() {

  const [permissoes, setPermissoes] = useState<Permissao[]>([]);
  const [editando, setEditando] = useState<Permissao | null>(null);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState<string | null>(null);
  const [versaoForm, setVersaoForm] = useState(0);

  // BUSCAR PERMISSÕES
  const carregarPermissoes = useCallback(async () => {
    try {
      const resposta = await api.get<Permissao[]>("/permissoes");
      setPermissoes(resposta.data);
      setErro(null);
    } catch (error) {
      console.error("Erro ao buscar permissões:", error);
      setErro("Não foi possível carregar as permissões.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void carregarPermissoes();
  }, [carregarPermissoes]);

  // EXCLUIR PERMISSÃO
  async function excluirPermissao(id: number) {
    try {
      await api.delete(`/permissoes/${id}`);

      if (editando?.id === id) {
        setEditando(null);
      }

      await carregarPermissoes();

    } catch (error) {
      console.error("Erro ao excluir permissão:", error);
      alert("Erro ao excluir a permissão.");
    }
  }

  // ATUALIZAR APÓS SALVAR
  function permissaoSalva() {
    setEditando(null);
    setVersaoForm((anterior) => anterior + 1);
    void carregarPermissoes();
  }

  return (
    <section>
      <h1>Permissões do Sistema</h1>

      <PermissaoForm
        key={`${editando?.id ?? "novo"}-${versaoForm}`}
        permissaoEditando={editando}
        onPermissaoSalva={permissaoSalva}
      />

      <hr />

      {loading ? (
        <p>Carregando permissões...</p>
      ) : erro ? (
        <p style={{ color: "red" }}>{erro}</p>
      ) : (
        <PermissaoList
          permissoes={permissoes}
          onEditar={setEditando}
          onExcluir={excluirPermissao}
        />
      )}
    </section>
  );
}

export default PermissoesPage;
