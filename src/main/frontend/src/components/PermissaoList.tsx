import { useEffect, useState } from "react";
import api from "../services/api";
import type { Permissao } from "../types/permissoes";
import PermissaoItem from "./PermissaoItem";

function PermissaoList() {
  const [permissoes, setPermissoes] = useState<Permissao[]>([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    api.get<Permissao[]>("/permissoes").then((resposta) => {
      setPermissoes(resposta.data);
      setErro(null);
    })
    .catch((erro) => {
        console.error("Erro ao buscar categorias:", erro);
        setErro("Não foi possível carregar as categorias. Verifique se o servidor está online.");
    })
    .finally(() => {
      setLoading(false);
    });
  }, []);

    if (loading) {
    return <p>Carregando permissoes...</p>;
  }

  if (erro) {
    return <p style={{ color: "red" }}>{erro}</p>;
  }
  
  return (
    <ul>
      {permissoes.map((permissao) => (
        <PermissaoItem key={permissao.id} permissao={permissao} />
      ))}
    </ul>
  );
}

export default PermissaoList;