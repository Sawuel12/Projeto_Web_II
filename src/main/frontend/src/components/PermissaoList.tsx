
import type { Permissao } from "../types/permissoes";
import PermissaoItem from "./PermissaoItem";

interface PermissaoListProps {
  permissoes: Permissao[];
  onEditar: (permissao: Permissao) => void;
  onExcluir: (id: number) => void;
}

function PermissaoList({
  permissoes,
  onEditar,
  onExcluir
}: PermissaoListProps) {

  if (permissoes.length === 0) {
    return <p>Nenhuma permissão cadastrada.</p>;
  }

  return (
    <ul>
      {permissoes.map((permissao) => (
        <li key={permissao.id} style={{ marginBottom: "10px" }}>
          <PermissaoItem permissao={permissao} />

          <button onClick={() => onEditar(permissao)}>
            Editar
          </button>

          <button onClick={() => onExcluir(permissao.id)}>
            Excluir
          </button>
        </li>
      ))}
    </ul>
  );
}

export default PermissaoList;
