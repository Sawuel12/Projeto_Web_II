package br.ueg.trindade.projeto_web2_fullstack;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class Api {
    
    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private PermissaoRepository permissaoRepository;

    @Autowired
    private CategoriaRepository categoriaRepository;

    @GetMapping("/usuarios")
    public List<Usuarios> getAllUsuarios() {
        return usuarioRepository.findAll();
    }

    @PostMapping("/usuarios")
    public Usuarios createUsuario(@RequestBody Usuarios usuario) {
        return usuarioRepository.save(usuario);
    }

    @GetMapping("/usuarios/{id}")
    public Usuarios getUsuarioById(@PathVariable Long id) {
        return usuarioRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));
    }

    @DeleteMapping("/usuarios/{id}")
    public void deleteUsuario(@PathVariable Long id) {
        usuarioRepository.deleteById(id);
    }

    @GetMapping("/permissoes")
    List<Permissao> getAllPermissoes(){
        return permissaoRepository.findAll();
    }

    @PostMapping("/permissoes")
    public Permissao createPermissao(@RequestBody Permissao permissao) {
        return permissaoRepository.save(permissao);
    }

    @GetMapping("/permissoes/{id}")
    public Permissao getPermissaoById(@PathVariable Long id) {
        return permissaoRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Permissão não encontrada"));
    }

    @GetMapping("/categorias")
    List<Categoria> getAllCategorias(){
        return categoriaRepository.findAll();
    }

    @PostMapping("/categorias")
    public Categoria createCategoria(@RequestBody Categoria categoria) {
        return categoriaRepository.save(categoria);
    }

    @GetMapping("/categorias/{id}")
    public Categoria getCategoriaById(@PathVariable Long id) {
        return categoriaRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Categoria não encontrada"));
    }

}
