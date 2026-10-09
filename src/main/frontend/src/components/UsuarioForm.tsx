
import { type FormEvent, useState, useEffect } from "react";
import api from "../services/api";
import type { Usuario } from "../types/usuario";

interface UsuarioFormProps {
  onUsuarioSalvo: () => void;
  usuarioEditando?: Usuario | null;
}

function UsuarioForm({ onUsuarioSalvo, usuarioEditando }: UsuarioFormProps) {

  const [nome, setNome] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  // ATUALIZAR OS CAMPOS AO EDITAR UM USUÁRIO
  useEffect(() => {
    setNome(usuarioEditando?.nome ?? "");
    setUsername(usuarioEditando?.username ?? "");
    setEmail(usuarioEditando?.email ?? "");
    setSenha("");
  }, [usuarioEditando]);

  // CADASTRAR OU EDITAR USUÁRIO
  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    const dados = {
      nome,
      username,
      email,
      ...(senha ? { senha } : {})
    };

    try {
      if (usuarioEditando) {
        await api.put(`/usuarios/${usuarioEditando.id}`, dados);
      } else {
        await api.post("/usuarios", dados);
      }

      onUsuarioSalvo();

    } catch (error) {
      console.error("Erro ao salvar usuário:", error);
      alert("Erro ao salvar o usuário.");
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

      <input
        type="password"
        value={senha}
        onChange={(e) => setSenha(e.target.value)}
        placeholder={
          usuarioEditando
            ? "Nova senha (opcional)"
            : "Senha (mínimo 8 caracteres)"
        }
        required={!usuarioEditando}
        minLength={8}
        autoComplete="new-password"
      />

      <button type="submit">
        {usuarioEditando ? "Salvar alterações" : "Cadastrar"}
      </button>

    </form>
  );
}

export default UsuarioForm;
