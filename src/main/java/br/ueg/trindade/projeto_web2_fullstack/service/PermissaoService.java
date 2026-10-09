
package br.ueg.trindade.projeto_web2_fullstack.service;

import java.util.List;

import org.springframework.stereotype.Service;

import br.ueg.trindade.projeto_web2_fullstack.model.Permissao;
import br.ueg.trindade.projeto_web2_fullstack.repository.PermissaoRepository;

@Service
public class PermissaoService {

    private final PermissaoRepository permissaoRepository;

    public PermissaoService(PermissaoRepository permissaoRepository) {
        this.permissaoRepository = permissaoRepository;
    }

    // LISTAR TODAS AS PERMISSÕES
    public List<Permissao> listarTodas() {
        return permissaoRepository.findAll();
    }

    // BUSCAR PERMISSÃO POR ID
    public Permissao buscarPorId(Long id) {
        return permissaoRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Permissão não encontrada"));
    }

    // CADASTRAR PERMISSÃO
    public Permissao cadastrar(Permissao permissao) {
        return permissaoRepository.save(permissao);
    }

    // ATUALIZAR PERMISSÃO
    public Permissao atualizar(Long id, Permissao permissaoAtualizada) {

        Permissao permissao = buscarPorId(id);

        permissao.setNome(permissaoAtualizada.getNome());
        permissao.setDescricao(permissaoAtualizada.getDescricao());

        return permissaoRepository.save(permissao);
    }

    // EXCLUIR PERMISSÃO
    public void excluir(Long id) {
        permissaoRepository.deleteById(id);
    }
}
