
import type { Usuario } from "../types/usuario";
import UsuarioItem from "./UsuarioItem";

interface UsuarioListProps {
  usuarios: Usuario[];
  onEditar: (usuario: Usuario) => void;
  onExcluir: (id: number) => void;
  onPermissoes: (id: number) => void;
}

function UsuarioList({
  usuarios,
  onEditar,
  onExcluir,
  onPermissoes
}: UsuarioListProps) {

  if (usuarios.length === 0) {
    return <p>Nenhum usuário cadastrado.</p>;
  }

  return (
    <ul>
      {usuarios.map((usuario) => (
        <li key={usuario.id} style={{ marginBottom: "10px" }}>

          <UsuarioItem usuario={usuario} />

          <button onClick={() => onEditar(usuario)}>
            Editar
          </button>

          <button onClick={() => onExcluir(usuario.id)}>
            Excluir
          </button>

          <button onClick={() => onPermissoes(usuario.id)}>
            Permissões
          </button>

        </li>
      ))}
    </ul>
  );
}

export default UsuarioList;
