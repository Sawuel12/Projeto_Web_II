import type { Usuario } from "../types/usuario";
interface UsuarioItemProps {
    usuario: Usuario;
}

function UsuarioItem({ usuario }: UsuarioItemProps) {
    return (
        <span>
        <strong>{usuario.nome}</strong> ({usuario.username}) — {usuario.email}
        </span>
    );
}

export default UsuarioItem;