import { useEffect, useState } from "react";
import api from "../services/api";
import type { Categoria } from "../types/categoria";
import CategoriaItem from "./CategoriaItem";
import CategoriaForm from "./CategoriaForm";

function CategoriaList() {
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState<string | null>(null);
  const [editando, setEditando] = useState<Categoria | null>(null);

  function carregarCategorias() {
    api.get<Categoria[]>("/categorias")
      .then((resposta) => {
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
  }

  useEffect(() => {
    carregarCategorias();
  }, []);

  async function excluir(id: number) {
    try {
      await api.delete(`/categorias/${id}`);
      carregarCategorias();
    } catch (error) {
      console.error("Erro ao excluir categoria:", error);
      alert("Erro ao excluir a categoria.");
    }
  }

  if (loading) {
    return <p>Carregando categorias...</p>;
  }

  if (erro) {
    return <p style={{ color: "red" }}>{erro}</p>;
  }

  return (
    <div>
      <CategoriaForm
        key={editando?.id ?? "novo"}
        categoriaEditando={editando}
        onCategoriaSalva={() => {
          carregarCategorias();
          setEditando(null);
        }}
      />
      
      <hr />

      <ul>
        {categorias.map((categoria) => (
          <li key={categoria.id} style={{ marginBottom: "10px" }}>
            <CategoriaItem categoria={categoria} />
            <button onClick={() => setEditando(categoria)}>Editar</button>
            <button onClick={() => excluir(categoria.id)}>Excluir</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CategoriaList;
