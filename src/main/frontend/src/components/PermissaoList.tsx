import { useEffect, useState } from "react";
import api from "../services/api";
import type { Permissao } from "../types/permissoes";
import PermissaoItem from "./PermissaoItem";
import PermissaoForm from "./PermissaoForm";

function PermissaoList() {
  const [permissoes, setPermissoes] = useState<Permissao[]>([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState<string | null>(null);
  
  const [editando, setEditando] = useState<Permissao | null>(null);

  function carregarPermissoes() {
    api.get<Permissao[]>("/permissoes")
      .then((resposta) => {
        setPermissoes(resposta.data);
        setErro(null);
      })
      .catch((erro) => {
        console.error("Erro ao buscar permissões:", erro);
        setErro("Não foi possível carregar as permissões. Verifique se o servidor está online.");
      })
      .finally(() => {
        setLoading(false);
      });
  }

  useEffect(() => {
    carregarPermissoes();
  }, []);

  async function excluir(id: number) {
    try {
      await api.delete(`/permissoes/${id}`);
      carregarPermissoes();
    } catch (error) {
      console.error("Erro ao excluir permissão:", error);
      alert("Erro ao excluir a permissão.");
    }
  }

  if (loading) {
    return <p>Carregando permissões...</p>;
  }

  if (erro) {
    return <p style={{ color: "red" }}>{erro}</p>;
  }

  return (
    <div>
      <PermissaoForm
        key={editando?.id ?? "novo"}
        permissaoEditando={editando}
        onPermissaoSalva={() => {
          carregarPermissoes();
          setEditando(null);
        }}
      />
      
      <hr />

      <ul>
        {permissoes.map((permissao) => (
          <li key={permissao.id} style={{ marginBottom: "10px" }}>
            <PermissaoItem permissao={permissao} />
            <button onClick={() => setEditando(permissao)}>Editar</button>
            <button onClick={() => excluir(permissao.id)}>Excluir</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PermissaoList;