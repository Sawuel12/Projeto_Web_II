import type { Categoria } from "../types/categoria";

interface CategoriaItemProps {
    categoria: Categoria;
}

function CategoriaItem({ categoria }: CategoriaItemProps) {
    return (
        <li>
            <strong>{categoria.nome}</strong> — {categoria.ativa ? "Ativa" : "Inativa"}
        </li>
    );
}

export default CategoriaItem;