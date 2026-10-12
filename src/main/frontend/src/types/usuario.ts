import type { Permissao } from "./permissoes";

export interface Usuario {
    id: number;
    nome: string;
    username: string;
    email: string;
    permissoes?: Permissao[];
}
