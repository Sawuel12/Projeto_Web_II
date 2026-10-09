import type { Permissao } from "../types/permissoes";

interface PermissaoItemProps {
    permissao: Permissao;
}

function PermissaoItem({ permissao }: PermissaoItemProps) {
    return (
        <span>
            <strong>{permissao.nome}</strong> — {permissao.descricao}
        </span>
    );
}

export default PermissaoItem;