
import { type FormEvent, useState, useEffect } from "react";
import api from "../services/api";
import type { Permissao } from "../types/permissoes";

interface PermissaoFormProps {
  onPermissaoSalva: () => void;
  permissaoEditando?: Permissao | null;
}

function PermissaoForm({ onPermissaoSalva, permissaoEditando }: PermissaoFormProps) {

  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");

  // ATUALIZAR OS CAMPOS AO SELECIONAR UMA PERMISSÃO
  useEffect(() => {
    setNome(permissaoEditando?.nome ?? "");
    setDescricao(permissaoEditando?.descricao ?? "");
  }, [permissaoEditando]);

  // CADASTRAR OU EDITAR PERMISSÃO
  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    const dados = { nome, descricao };

    try {
      if (permissaoEditando) {
        await api.put(`/permissoes/${permissaoEditando.id}`, dados);
      } else {
        await api.post("/permissoes", dados);
      }

      onPermissaoSalva();

    } catch (error) {
      console.error("Erro ao salvar permissão:", error);
      alert("Erro ao salvar a permissão.");
    }
  }

  return (
    <form onSubmit={handleSubmit}>

      <input
        value={nome}
        onChange={(e) => setNome(e.target.value)}
        placeholder="Nome (ex: ADMIN)"
        required
      />

      <input
        value={descricao}
        onChange={(e) => setDescricao(e.target.value)}
        placeholder="Descrição da permissão"
        required
      />

      <button type="submit">
        {permissaoEditando ? "Salvar alterações" : "Cadastrar"}
      </button>

    </form>
  );
}

export default PermissaoForm;
