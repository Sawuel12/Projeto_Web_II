import { useEffect, useState } from "react";
import api from "../services/api";
import type { Categoria } from "../types/categoria";
import CategoriaItem from "./CategoriaItem";

function CategoriaList() {
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    api.get<Categoria[]>("/categorias").then((resposta) => {
      setCategorias(resposta.data);
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
    return <p>Carregando categorias...</p>;
  }

  if (erro) {
    return <p style={{ color: "red" }}>{erro}</p>;
  }

  return (
    <ul>
      {categorias.map((categoria) => (
        <CategoriaItem key={categoria.id} categoria={categoria} />
      ))}
    </ul>
  );
}   

export default CategoriaList;