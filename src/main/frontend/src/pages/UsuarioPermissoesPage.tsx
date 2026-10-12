
import { useEffect, useState } from "react";

import api from "../services/api";

import type { Usuario } from "../types/usuario";
import type { Permissao } from "../types/permissoes";

// PROPRIEDADES RECEBIDAS DO APP.TSX
interface UsuarioPermissoesPageProps {
  usuarioId: number | null;
  onSelecionarUsuario: (id: number | null) => void;
}

function UsuarioPermissoesPage({
  usuarioId,
  onSelecionarUsuario
}: UsuarioPermissoesPageProps) {

  // ---------------- ESTADOS ----------------

  // DADOS DO BANCO
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [permissoes, setPermissoes] = useState<Permissao[]>([]);

  // PERMISSÕES SELECIONADAS
  const [idsSelecionados, setIdsSelecionados] = useState<number[]>([]);

  // CONTROLE DE CARREGAMENTO
  const [carregando, setCarregando] = useState(true);
  const [carregandoSelecao, setCarregandoSelecao] = useState(false);
  const [salvando, setSalvando] = useState(false);

  // INDICA SE AS PERMISSÕES DO USUÁRIO FORAM CARREGADAS
  const [selecaoValida, setSelecaoValida] = useState(false);

  // MENSAGENS
  const [erroInicial, setErroInicial] = useState("");
  const [erroSelecao, setErroSelecao] = useState("");
  const [erroSalvar, setErroSalvar] = useState("");
  const [mensagem, setMensagem] = useState("");

  // ---------------- CARREGAR DADOS INICIAIS ----------------

  useEffect(() => {

    let ativo = true;

    async function carregarDados() {

      try {
        const [respostaUsuarios, respostaPermissoes] =
          await Promise.all([
            api.get<Usuario[]>("/usuarios"),
            api.get<Permissao[]>("/permissoes")
          ]);

        if (!ativo) return;

        setUsuarios(respostaUsuarios.data);
        setPermissoes(respostaPermissoes.data);
        setErroInicial("");

      } catch (error) {

        console.error("Erro ao carregar dados:", error);

        if (ativo) {
          setErroInicial(
            "Não foi possível carregar usuários e permissões."
          );
        }

      } finally {

        if (ativo) {
          setCarregando(false);
        }
      }
    }

    void carregarDados();

    return () => {
      ativo = false;
    };

  }, []);

  // ---------------- BUSCAR PERMISSÕES DO USUÁRIO ----------------

  useEffect(() => {

    let ativo = true;

    // Limpar a seleção anterior
    setIdsSelecionados([]);
    setSelecaoValida(false);
    setErroSelecao("");
    setErroSalvar("");
    setMensagem("");

    // Nenhum usuário selecionado
    if (usuarioId === null) {
      setCarregandoSelecao(false);
      return;
    }

    async function carregarPermissoesUsuario() {

      setCarregandoSelecao(true);

      try {

        const resposta = await api.get<Usuario>(
          `/usuarios/${usuarioId}/permissoes`
        );

        if (!ativo) return;

        // Obter os IDs das permissões do usuário
        const ids = resposta.data.permissoes?.map(
          (permissao) => permissao.id
        ) ?? [];

        setIdsSelecionados(ids);
        setSelecaoValida(true);

      } catch (error) {

        console.error(
          "Erro ao buscar permissões do usuário:",
          error
        );

        if (ativo) {
          setErroSelecao(
            "Não foi possível carregar as permissões do usuário."
          );
        }

      } finally {

        if (ativo) {
          setCarregandoSelecao(false);
        }
      }
    }

    void carregarPermissoesUsuario();

    return () => {
      ativo = false;
    };

  }, [usuarioId]);

  // ---------------- SELECIONAR USUÁRIO ----------------

  function selecionarUsuario(valor: string) {

    const novoId = valor === ""
      ? null
      : Number(valor);

    // Atualizar o usuário selecionado no App.tsx
    onSelecionarUsuario(novoId);

    // Limpar mensagens anteriores
    setErroSalvar("");
    setMensagem("");
  }

  // ---------------- MARCAR OU DESMARCAR PERMISSÃO ----------------

  function alternarPermissao(id: number) {

    setIdsSelecionados((anteriores) =>

      anteriores.includes(id)
        ? anteriores.filter(
            (permissaoId) => permissaoId !== id
          )
        : [...anteriores, id]

    );

    setMensagem("");
    setErroSalvar("");
  }

  // ---------------- SALVAR PERMISSÕES ----------------

  async function salvarPermissoes() {

    // Impedir salvamento sem usuário válido
    if (
      usuarioId === null ||
      carregando ||
      carregandoSelecao ||
      !selecaoValida ||
      salvando ||
      Boolean(erroInicial)
    ) {
      return;
    }

    setSalvando(true);
    setErroSalvar("");
    setMensagem("");

    try {

      // Enviar os IDs das permissões para o backend
      await api.put(
        `/usuarios/${usuarioId}/permissoes`,
        idsSelecionados
      );

      setMensagem("Permissões salvas com sucesso!");

    } catch (error) {

      console.error("Erro ao salvar permissões:", error);

      setErroSalvar(
        "Não foi possível salvar as permissões."
      );

    } finally {
      setSalvando(false);
    }
  }

  // ---------------- INTERFACE ----------------

  return (
    <section>

      <h1>Atribuir Permissões</h1>

      <p>
        Selecione um usuário e defina suas permissões.
      </p>

      {/* SELECIONAR USUÁRIO */}

      <div style={{ marginTop: "20px" }}>

        <label htmlFor="usuarioPermissoes">
          Usuário:{" "}
        </label>

        <select
          id="usuarioPermissoes"
          value={usuarioId ?? ""}
          onChange={(e) => selecionarUsuario(e.target.value)}
          disabled={carregando || salvando || Boolean(erroInicial)}
        >

          <option value="">
            Selecione um usuário...
          </option>

          {usuarios.map((usuario) => (

            <option
              key={usuario.id}
              value={usuario.id}
            >
              {usuario.nome} ({usuario.username})
            </option>

          ))}

        </select>

      </div>

      {/* LISTAGEM DAS PERMISSÕES */}

      <fieldset
        style={{ marginTop: "20px" }}
        disabled={
          usuarioId === null ||
          carregando ||
          carregandoSelecao ||
          !selecaoValida ||
          salvando ||
          Boolean(erroInicial)
        }
      >

        <legend>Permissões disponíveis</legend>

        {permissoes.length === 0 && (
          <p>Nenhuma permissão cadastrada.</p>
        )}

        {permissoes.map((permissao) => (

          <label
            key={permissao.id}
            style={{
              display: "block",
              marginBottom: "10px"
            }}
          >

            <input
              type="checkbox"
              checked={idsSelecionados.includes(permissao.id)}
              onChange={() => alternarPermissao(permissao.id)}
            />

            {" "}
            {permissao.nome} — {permissao.descricao}

          </label>

        ))}

      </fieldset>

      {/* CARREGAMENTO */}

      {carregandoSelecao && (
        <p>Carregando permissões do usuário...</p>
      )}

      {/* BOTÃO SALVAR */}

      <button
        style={{ marginTop: "15px" }}
        onClick={salvarPermissoes}
        disabled={
          usuarioId === null ||
          carregando ||
          carregandoSelecao ||
          !selecaoValida ||
          salvando ||
          Boolean(erroInicial)
        }
      >
        {salvando ? "Salvando..." : "Salvar permissões"}
      </button>

      {/* MENSAGEM DE SUCESSO */}

      {mensagem && (
        <p style={{ color: "green", marginTop: "10px" }}>
          {mensagem}
        </p>
      )}

      {/* MENSAGENS DE ERRO */}

      {(erroInicial || erroSelecao || erroSalvar) && (

        <p style={{ color: "red", marginTop: "10px" }}>
          {erroInicial || erroSelecao || erroSalvar}
        </p>

      )}

    </section>
  );
}

export default UsuarioPermissoesPage;
