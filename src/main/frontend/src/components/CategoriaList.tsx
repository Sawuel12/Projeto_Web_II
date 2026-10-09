
import type { Categoria } from "../types/categoria";
import CategoriaItem from "./CategoriaItem";

interface CategoriaListProps {
  categorias: Categoria[];
  onEditar: (categoria: Categoria) => void;
  onExcluir: (id: number) => void;
}

function CategoriaList({
  categorias,
  onEditar,
  onExcluir
}: CategoriaListProps) {

  if (categorias.length === 0) {
    return <p>Nenhuma categoria cadastrada.</p>;
  }

  return (
    <ul>
      {categorias.map((categoria) => (
        <li key={categoria.id} style={{ marginBottom: "10px" }}>
          <CategoriaItem categoria={categoria} />

          <button onClick={() => onEditar(categoria)}>
            Editar
          </button>

          <button onClick={() => onExcluir(categoria.id)}>
            Excluir
          </button>
        </li>
      ))}
    </ul>
  );
}

export default CategoriaList;
