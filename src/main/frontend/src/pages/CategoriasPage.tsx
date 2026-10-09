
import { useCallback, useEffect, useState } from "react";

import api from "../services/api";
import type { Categoria } from "../types/categoria";

import CategoriaForm from "../components/CategoriaForm";
import CategoriaList from "../components/CategoriaList";

function CategoriasPage() {

  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [editando, setEditando] = useState<Categoria | null>(null);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState<string | null>(null);
  const [versaoForm, setVersaoForm] = useState(0);

  // BUSCAR CATEGORIAS
  const carregarCategorias = useCallback(async () => {
    try {
      const resposta = await api.get<Categoria[]>("/categorias");
      setCategorias(resposta.data);
      setErro(null);
    } catch (error) {
      console.error("Erro ao buscar categorias:", error);
      setErro("Não foi possível carregar as categorias.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void carregarCategorias();
  }, [carregarCategorias]);

  // EXCLUIR CATEGORIA
  async function excluirCategoria(id: number) {
    try {
      await api.delete(`/categorias/${id}`);

      if (editando?.id === id) {
        setEditando(null);
      }

      await carregarCategorias();

    } catch (error) {
      console.error("Erro ao excluir categoria:", error);
      alert("Erro ao excluir a categoria.");
    }
  }

  // ATUALIZAR APÓS SALVAR
  function categoriaSalva() {
    setEditando(null);
    setVersaoForm((anterior) => anterior + 1);
    void carregarCategorias();
  }

  return (
    <section>
      <h1>Categorias</h1>

      <CategoriaForm
        key={`${editando?.id ?? "novo"}-${versaoForm}`}
        categoriaEditando={editando}
        onCategoriaSalva={categoriaSalva}
      />

      <hr />

      {loading ? (
        <p>Carregando categorias...</p>
      ) : erro ? (
        <p style={{ color: "red" }}>{erro}</p>
      ) : (
        <CategoriaList
          categorias={categorias}
          onEditar={setEditando}
          onExcluir={excluirCategoria}
        />
      )}
    </section>
  );
}

export default CategoriasPage;
