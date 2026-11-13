
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import api from "../services/api";
import type { Usuario } from "../types/usuario";
import type { Permissao } from "../types/permissoes";

function UsuarioPermissoesPage() {

  // RECEBER O ID DO USUÁRIO PELA URL
  const [searchParams, setSearchParams] = useSearchParams();
  const idNaUrl = searchParams.get("usuarioId");
  const usuarioId = idNaUrl && /^\d+$/.test(idNaUrl)
    ? Number(idNaUrl)
    : null;

  // DADOS DO BANCO
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [permissoes, setPermissoes] = useState<Permissao[]>([]);
  const [idsSelecionados, setIdsSelecionados] = useState<number[]>([]);

  // CONTROLE DE CARREGAMENTO
  const [carregando, setCarregando] = useState(true);
  const [carregandoSelecao, setCarregandoSelecao] = useState(false);
  const [salvando, setSalvando] = useState(false);
  const [selecaoValida, setSelecaoValida] = useState(false);

  // MENSAGENS
  const [erroInicial, setErroInicial] = useState("");
  const [erroSelecao, setErroSelecao] = useState("");
  const [erroSalvar, setErroSalvar] = useState("");
  const [mensagem, setMensagem] = useState("");

  // CARREGAR USUÁRIOS E PERMISSÕES DISPONÍVEIS
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
        if (ativo) setCarregando(false);
      }
    }

    void carregarDados();

    return () => {
      ativo = false;
    };
  }, []);

  // CARREGAR PERMISSÕES DO USUÁRIO SELECIONADO
  useEffect(() => {
    let ativo = true;

    setIdsSelecionados([]);
    setSelecaoValida(false);
    setErroSelecao("");
    setErroSalvar("");
    setMensagem("");

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
        if (ativo) setCarregandoSelecao(false);
      }
    }

    void carregarPermissoesUsuario();

    return () => {
      ativo = false;
    };
  }, [usuarioId]);

  // SELECIONAR USUÁRIO E ATUALIZAR A URL
  function selecionarUsuario(valor: string) {
    setSearchParams(
      valor === "" ? {} : { usuarioId: valor }
    );

    setIdsSelecionados([]);
    setSelecaoValida(false);
    setErroSalvar("");
    setMensagem("");
  }

  // MARCAR OU DESMARCAR PERMISSÃO
  function alternarPermissao(id: number) {
    setIdsSelecionados((anteriores) =>
      anteriores.includes(id)
        ? anteriores.filter((permissaoId) => permissaoId !== id)
        : [...anteriores, id]
    );

    setErroSalvar("");
    setMensagem("");
  }

  // SALVAR PERMISSÕES
  async function salvarPermissoes() {
    if (
      usuarioId === null ||
      carregando ||
      carregandoSelecao ||
      !selecaoValida ||
      salvando ||
      erroInicial
    ) {
      return;
    }

    setSalvando(true);
    setErroSalvar("");
    setMensagem("");

    try {
      await api.put(
        `/usuarios/${usuarioId}/permissoes`,
        idsSelecionados
      );

      setMensagem("Permissões salvas com sucesso!");

    } catch (error) {
      console.error("Erro ao salvar permissões:", error);
      setErroSalvar("Não foi possível salvar as permissões.");
    } finally {
      setSalvando(false);
    }
  }

  // CONTROLE DOS BOTÕES
  const bloqueado =
    usuarioId === null ||
    carregando ||
    carregandoSelecao ||
    !selecaoValida ||
    salvando ||
    Boolean(erroInicial);

  return (
    <section>
      <h1>Atribuir Permissões</h1>

      <p>Selecione um usuário e defina suas permissões.</p>

      {/* SELECIONAR USUÁRIO */}
      <div style={{ marginTop: "20px" }}>
        <label htmlFor="usuarioPermissoes">
          Usuário:{" "}
        </label>

        <select
          id="usuarioPermissoes"
          value={usuarioId ?? ""}
          onChange={(e) => selecionarUsuario(e.target.value)}
          disabled={
            carregando ||
            salvando ||
            Boolean(erroInicial)
          }
        >
          <option value="">Selecione um usuário...</option>

          {usuarios.map((usuario) => (
            <option key={usuario.id} value={usuario.id}>
              {usuario.nome} ({usuario.username})
            </option>
          ))}
        </select>
      </div>

      {/* PERMISSÕES DISPONÍVEIS */}
      <fieldset
        style={{ marginTop: "20px" }}
        disabled={bloqueado}
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
            />{" "}

            {permissao.nome} — {permissao.descricao}
          </label>
        ))}
      </fieldset>

      {/* CARREGAMENTO */}
      {carregandoSelecao && (
        <p>Carregando permissões do usuário...</p>
      )}

      {/* SALVAR */}
      <button
        style={{ marginTop: "15px" }}
        onClick={salvarPermissoes}
        disabled={bloqueado}
      >
        {salvando ? "Salvando..." : "Salvar permissões"}
      </button>

      {/* MENSAGENS */}
      {mensagem && (
        <p style={{ color: "green", marginTop: "10px" }}>
          {mensagem}
        </p>
      )}

      {(erroInicial || erroSelecao || erroSalvar) && (
        <p style={{ color: "red", marginTop: "10px" }}>
          {erroInicial || erroSelecao || erroSalvar}
        </p>
      )}
    </section>
  );
}

export default UsuarioPermissoesPage;
