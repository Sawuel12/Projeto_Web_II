import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";
import type { Usuario } from "../types/usuario";
function UsuarioDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  useEffect(() => {
    api.get<Usuario>(`/usuarios/${id}`).then((resposta) => {
      setUsuario(resposta.data);
    });
  }, [id]);
  if (!usuario) {
    return <p>Carregando...</p>;
  }
  return (
    <div>
      <h1>{usuario.nome}</h1>
      <p>
        <strong>Username:</strong> {usuario.username}
      </p>
      <p>
        <strong>E-mail:</strong> {usuario.email}
      </p>
      <button onClick={() => navigate("/usuarios")}>Voltar</button>
    </div>
  );
}
export default UsuarioDetailPage;
