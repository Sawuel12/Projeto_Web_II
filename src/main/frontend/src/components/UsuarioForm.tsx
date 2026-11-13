
import { type FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import type { Usuario } from "../types/usuario";

interface UsuarioFormProps {
  onUsuarioSalvo: () => void;
  usuarioEditando?: Usuario | null;
}

function UsuarioForm({
  onUsuarioSalvo,
  usuarioEditando,
}: UsuarioFormProps) {
  const navigate = useNavigate();

  const [nome, setNome] = useState(usuarioEditando?.nome ?? "");
  const [username, setUsername] = useState(usuarioEditando?.username ?? "");
  const [email, setEmail] = useState(usuarioEditando?.email ?? "");
  const [senha, setSenha] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const dados = { nome, username, email };

    try {
      if (usuarioEditando) {
        await api.put(`/usuarios/${usuarioEditando.id}`, dados);
      } else {
        await api.post("/usuarios", { ...dados, senha });
      }

      onUsuarioSalvo();
      navigate("/usuarios");
    } catch (error) {
      console.error("Erro ao salvar usuário:", error);
      alert("Erro ao salvar o usuário. Verifique os dados informados.");
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={nome}
        onChange={(e) => setNome(e.target.value)}
        placeholder="Nome"
        required
      />

      <input
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
        required
      />

      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="E-mail"
        required
      />

      {!usuarioEditando && (
        <input
          type="password"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          placeholder="Senha (mínimo 8 caracteres)"
          minLength={8}
          required
          autoComplete="new-password"
        />
      )}

      <button type="submit">
        {usuarioEditando ? "Salvar alterações" : "Cadastrar"}
      </button>
    </form>
  );
}

export default UsuarioForm;
