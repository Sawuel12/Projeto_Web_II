import type { Categoria } from "../types/categoria";

interface CategoriaItemProps {
    categoria: Categoria;
}

function CategoriaItem({ categoria }: CategoriaItemProps) {
    return (
        <span>
            <strong>{categoria.nome}</strong> — {categoria.ativa ? "Ativa" : "Inativa"}
        </span>
    );
}

export default CategoriaItem;