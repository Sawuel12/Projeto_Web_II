
package br.ueg.trindade.projeto_web2_fullstack.controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

// MODELS
import br.ueg.trindade.projeto_web2_fullstack.model.Usuarios;
import br.ueg.trindade.projeto_web2_fullstack.model.Permissao;
import br.ueg.trindade.projeto_web2_fullstack.model.Categoria;

// SERVICES
import br.ueg.trindade.projeto_web2_fullstack.service.UsuarioService;
import br.ueg.trindade.projeto_web2_fullstack.service.PermissaoService;
import br.ueg.trindade.projeto_web2_fullstack.service.CategoriaService;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:5173")
public class Api {

    private final UsuarioService usuarioService;
    private final PermissaoService permissaoService;
    private final CategoriaService categoriaService;

    // INJEÇÃO DOS SERVICES
    public Api(
        UsuarioService usuarioService,
        PermissaoService permissaoService,
        CategoriaService categoriaService
    ) {
        this.usuarioService = usuarioService;
        this.permissaoService = permissaoService;
        this.categoriaService = categoriaService;
    }

    // ---------------- USUÁRIOS ----------------

    @GetMapping("/usuarios")
    public List<Usuarios> getAllUsuarios() {
        return usuarioService.listarTodos();
    }

    @PostMapping("/usuarios")
    public Usuarios createUsuario(@RequestBody Usuarios usuario) {
        return usuarioService.cadastrar(usuario);
    }

    @GetMapping("/usuarios/{id}")
    public Usuarios getUsuarioById(@PathVariable Long id) {
        return usuarioService.buscarPorId(id);
    }

    @PutMapping("/usuarios/{id}")
    public Usuarios updateUsuario(
        @PathVariable Long id,
        @RequestBody Usuarios usuarioAtualizado
    ) {
        return usuarioService.atualizar(id, usuarioAtualizado);
    }

    @DeleteMapping("/usuarios/{id}")
    public void deleteUsuario(@PathVariable Long id) {
        usuarioService.excluir(id);
    }

    // ---------------- PERMISSÕES DOS USUÁRIOS ----------------

    // Consultar as permissões de um usuário
    @GetMapping("/usuarios/{id}/permissoes")
    public Usuarios getPermissoesUsuario(@PathVariable Long id) {
        return usuarioService.buscarPorId(id);
    }

    // Atribuir permissões a um usuário
    @PutMapping("/usuarios/{id}/permissoes")
    public Usuarios atualizarPermissoesUsuario(
        @PathVariable Long id,
        @RequestBody List<Long> idsPermissoes
    ) {
        return usuarioService.atribuirPermissoes(id, idsPermissoes);
    }

    // ---------------- PERMISSÕES ----------------

    @GetMapping("/permissoes")
    public List<Permissao> getAllPermissoes() {
        return permissaoService.listarTodas();
    }

    @PostMapping("/permissoes")
    public Permissao createPermissao(@RequestBody Permissao permissao) {
        return permissaoService.cadastrar(permissao);
    }

    @GetMapping("/permissoes/{id}")
    public Permissao getPermissaoById(@PathVariable Long id) {
        return permissaoService.buscarPorId(id);
    }

    @PutMapping("/permissoes/{id}")
    public Permissao updatePermissao(
        @PathVariable Long id,
        @RequestBody Permissao permissaoAtualizada
    ) {
        return permissaoService.atualizar(id, permissaoAtualizada);
    }

    @DeleteMapping("/permissoes/{id}")
    public void deletePermissao(@PathVariable Long id) {
        permissaoService.excluir(id);
    }

    // ---------------- CATEGORIAS ----------------

    @GetMapping("/categorias")
    public List<Categoria> getAllCategorias() {
        return categoriaService.listarTodas();
    }

    @PostMapping("/categorias")
    public Categoria createCategoria(@RequestBody Categoria categoria) {
        return categoriaService.cadastrar(categoria);
    }

    @GetMapping("/categorias/{id}")
    public Categoria getCategoriaById(@PathVariable Long id) {
        return categoriaService.buscarPorId(id);
    }

    @PutMapping("/categorias/{id}")
    public Categoria updateCategoria(
        @PathVariable Long id,
        @RequestBody Categoria categoriaAtualizada
    ) {
        return categoriaService.atualizar(id, categoriaAtualizada);
    }

    @DeleteMapping("/categorias/{id}")
    public void deleteCategoria(@PathVariable Long id) {
        categoriaService.excluir(id);
    }
}
