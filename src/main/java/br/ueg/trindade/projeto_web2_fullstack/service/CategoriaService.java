
package br.ueg.trindade.projeto_web2_fullstack.service;

import java.util.List;

import org.springframework.stereotype.Service;

import br.ueg.trindade.projeto_web2_fullstack.model.Categoria;
import br.ueg.trindade.projeto_web2_fullstack.repository.CategoriaRepository;

@Service
public class CategoriaService {

    private final CategoriaRepository categoriaRepository;

    public CategoriaService(CategoriaRepository categoriaRepository) {
        this.categoriaRepository = categoriaRepository;
    }

    // LISTAR TODAS AS CATEGORIAS
    public List<Categoria> listarTodas() {
        return categoriaRepository.findAll();
    }

    // BUSCAR CATEGORIA POR ID
    public Categoria buscarPorId(Long id) {
        return categoriaRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Categoria não encontrada"));
    }

    // CADASTRAR CATEGORIA
    public Categoria cadastrar(Categoria categoria) {
        return categoriaRepository.save(categoria);
    }

    // ATUALIZAR CATEGORIA
    public Categoria atualizar(Long id, Categoria categoriaAtualizada) {

        Categoria categoria = buscarPorId(id);

        categoria.setNome(categoriaAtualizada.getNome());
        categoria.setAtiva(categoriaAtualizada.getAtiva());

        return categoriaRepository.save(categoria);
    }

    // EXCLUIR CATEGORIA
    public void excluir(Long id) {
        categoriaRepository.deleteById(id);
    }
}
