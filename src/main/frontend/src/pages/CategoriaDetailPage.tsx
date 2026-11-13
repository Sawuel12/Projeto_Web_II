
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";
import type { Categoria } from "../types/categoria";

function CategoriaDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [categoria, setCategoria] = useState<Categoria | null>(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    async function carregarCategoria() {
      try {
        const resposta = await api.get<Categoria>(`/categorias/${id}`);
        setCategoria(resposta.data);
      } catch (error) {
        console.error("Erro ao buscar categoria:", error);
        setErro("Não foi possível carregar os dados da categoria.");
      } finally {
        setCarregando(false);
      }
    }

    if (id) {
      void carregarCategoria();
    } else {
      setErro("Identificador da categoria não informado.");
      setCarregando(false);
    }
  }, [id]);

  if (carregando) {
    return <p>Carregando categoria...</p>;
  }

  if (erro || !categoria) {
    return (
      <div>
        <h1>Detalhes da categoria</h1>
        <p>{erro ?? "Categoria não encontrada."}</p>
        <button onClick={() => navigate("/categorias")}>
          Voltar
        </button>
      </div>
    );
  }

  return (
    <div>
      <h1>{categoria.nome}</h1>

      <p>
        <strong>ID:</strong> {categoria.id}
      </p>

      <p>
        <strong>Nome:</strong> {categoria.nome}
      </p>

      <p>
        <strong>Situação:</strong>{" "}
        {categoria.ativa ? "Ativa" : "Inativa"}
      </p>

      <button onClick={() => navigate("/categorias")}>
        Voltar para categorias
      </button>
    </div>
  );
}

export default CategoriaDetailPage;
