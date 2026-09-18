import { type FormEvent, useState } from "react";
import api from "../services/api";
import type { Categoria } from "../types/categoria";

interface CategoriaFormProps {
  onCategoriaSalva: () => void;
  categoriaEditando?: Categoria | null;
}

function CategoriaForm({ onCategoriaSalva, categoriaEditando }: CategoriaFormProps) {
  const [nome, setNome] = useState(categoriaEditando?.nome ?? "");
  const [ativa, setAtiva] = useState(categoriaEditando?.ativa ?? true);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    const dados = { nome, ativa };

    try {
      if (categoriaEditando) {
        await api.put(`/categorias/${categoriaEditando.id}`, dados);
      } else {
        await api.post("/categorias", dados);
      }
      onCategoriaSalva();
    } catch (error) {
      console.error("Erro ao salvar categoria:", error);
      alert("Erro ao salvar a categoria.");
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={nome}
        onChange={(e) => setNome(e.target.value)}
        placeholder="Nome da Categoria"
        required
      />
      
      <label style={{ marginLeft: "10px", marginRight: "10px" }}>
        <input
          type="checkbox"
          checked={ativa}
          onChange={(e) => setAtiva(e.target.checked)}
        />
        Ativa
      </label>

      <button type="submit">
        {categoriaEditando ? "Salvar alterações" : "Cadastrar"}
      </button>
    </form>
  );
}

export default CategoriaForm;