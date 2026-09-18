import { useEffect, useState } from "react";
import api from "../services/api";
import type { Usuario } from "../types/usuario";
import UsuarioItem from "./UsuarioItem";
import UsuarioForm from "./UsuarioForm";

function UsuarioList() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState<string | null>(null);
  const [editando, setEditando] = useState<Usuario | null>(null);

  function carregarUsuarios() {
    api.get<Usuario[]>("/usuarios")
      .then((resposta) => {
        setUsuarios(resposta.data);
        setErro(null);
      })
      .catch((erro) => {
        console.error("Erro ao buscar usuários:", erro);
        setErro("Não foi possível carregar os usuários. Verifique se o servidor está online.");
      })
      .finally(() => {
        setLoading(false);
      });
  }

  useEffect(() => {
    carregarUsuarios();
  }, []);

  async function excluir(id: number) {
    try {
      await api.delete(`/usuarios/${id}`);
      carregarUsuarios(); // Recarrega a lista após a exclusão
    } catch (error) {
      console.error("Erro ao excluir usuário:", error);
      alert("Erro ao excluir o usuário.");
    }
  }

  if (loading) {
    return <p>Carregando usuários...</p>;
  }

  if (erro) {
    return <p style={{ color: "red" }}>{erro}</p>;
  }

  return (
    <div>
      {/* Formulário de criação/edição */}
      <UsuarioForm
        key={editando?.id ?? "novo"}
        usuarioEditando={editando}
        onUsuarioSalvo={() => {
          carregarUsuarios();
          setEditando(null);
        }}
      />
      
      <hr />

      {/* Lista de usuários */}
      <ul>
        {usuarios.map((usuario) => (
          <li key={usuario.id} style={{ marginBottom: "10px" }}>
            <UsuarioItem usuario={usuario} />
            <button onClick={() => setEditando(usuario)}>Editar</button>
            <button onClick={() => excluir(usuario.id)}>Excluir</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UsuarioList;
