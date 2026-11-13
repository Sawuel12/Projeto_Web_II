
import { Link } from "react-router-dom";

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
        <li
          key={usuario.id}
          style={{ marginBottom: "10px" }}
        >

          {/* LINK PARA OS DETALHES DO USUÁRIO */}
          <Link
            to={`/usuarios/${usuario.id}`}
            style={{ marginRight: "8px" }}
          >
            <UsuarioItem usuario={usuario} />
          </Link>

          {/* EDITAR USUÁRIO */}
          <button onClick={() => onEditar(usuario)}>
            Editar
          </button>

          {/* EXCLUIR USUÁRIO */}
          <button onClick={() => onExcluir(usuario.id)}>
            Excluir
          </button>

          {/* ABRIR PERMISSÕES DO USUÁRIO */}
          <button onClick={() => onPermissoes(usuario.id)}>
            Permissões
          </button>

        </li>
      ))}
    </ul>
  );
}

export default UsuarioList;
