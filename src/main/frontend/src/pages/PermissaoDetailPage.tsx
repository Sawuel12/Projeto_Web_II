
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";
import type { Permissao } from "../types/permissoes";

function PermissaoDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [permissao, setPermissao] = useState<Permissao | null>(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    async function carregarPermissao() {
      try {
        const resposta = await api.get<Permissao>(`/permissoes/${id}`);
        setPermissao(resposta.data);
      } catch (error) {
        console.error("Erro ao buscar permissão:", error);
        setErro("Não foi possível carregar os dados da permissão.");
      } finally {
        setCarregando(false);
      }
    }

    if (id) {
      carregarPermissao();
    } else {
      setErro("Identificador da permissão não informado.");
      setCarregando(false);
    }
  }, [id]);

  if (carregando) {
    return <p>Carregando permissão...</p>;
  }

  if (erro || !permissao) {
    return (
      <div>
        <h1>Detalhes da permissão</h1>
        <p>{erro ?? "Permissão não encontrada."}</p>
        <button onClick={() => navigate("/permissoes")}>
          Voltar
        </button>
      </div>
    );
  }

  return (
    <div>
      <h1>{permissao.nome}</h1>

      <p>
        <strong>ID:</strong> {permissao.id}
      </p>

      <p>
        <strong>Nome:</strong> {permissao.nome}
      </p>

      <p>
        <strong>Descrição:</strong>{" "}
        {permissao.descricao || "Sem descrição"}
      </p>

      <button onClick={() => navigate("/permissoes")}>
        Voltar para permissões
      </button>
    </div>
  );
}

export default PermissaoDetailPage;
