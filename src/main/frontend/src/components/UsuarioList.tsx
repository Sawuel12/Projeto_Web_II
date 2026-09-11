import { useEffect, useState } from "react";
import api from "../services/api";
import type { Usuario } from "../types/usuario";
import UsuarioItem from "./UsuarioItem";

function UsuarioList() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    api.get<Usuario[]>("/usuarios").then((resposta) => {
      setUsuarios(resposta.data);
      setErro(null);
    })
    .catch((erro) => {
        console.error("Erro ao buscar categorias:", erro);
        setErro("Não foi possível carregar as categorias. Verifique se o servidor está online.");
    })
    .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Carregando usuários...</p>;
  }

  if (erro) {
    return <p style={{ color: "red" }}>{erro}</p>;
  }

  return (
    <ul>
      {usuarios.map((usuario) => (
        <UsuarioItem key={usuario.id} usuario={usuario} />
      ))}
    </ul>
  );
}

export default UsuarioList;
