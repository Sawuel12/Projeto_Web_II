
package br.ueg.trindade.projeto_web2_fullstack.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import br.ueg.trindade.projeto_web2_fullstack.model.Usuarios;
import br.ueg.trindade.projeto_web2_fullstack.repository.UsuarioRepository;

@Service
public class UsuarioService {

    private final UsuarioRepository usuarioRepository;

    private final PasswordEncoder passwordEncoder =
        new BCryptPasswordEncoder();

    public UsuarioService(UsuarioRepository usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }

    // LISTAR TODOS OS USUÁRIOS
    public List<Usuarios> listarTodos() {
        return usuarioRepository.findAll();
    }

    // BUSCAR USUÁRIO POR ID
    public Usuarios buscarPorId(Long id) {
        return usuarioRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));
    }

    // CADASTRAR USUÁRIO
    public Usuarios cadastrar(Usuarios usuario) {

        validarSenha(usuario.getSenha());

        // Transformar a senha em hash antes de salvar
        String senhaCriptografada =
            passwordEncoder.encode(usuario.getSenha());

        usuario.setSenha(senhaCriptografada);

        return usuarioRepository.save(usuario);
    }

    // ATUALIZAR USUÁRIO
    public Usuarios atualizar(Long id, Usuarios usuarioAtualizado) {

        Usuarios usuario = buscarPorId(id);

        usuario.setNome(usuarioAtualizado.getNome());
        usuario.setUsername(usuarioAtualizado.getUsername());
        usuario.setEmail(usuarioAtualizado.getEmail());

        // Atualizar senha somente quando informada
        if (usuarioAtualizado.getSenha() != null &&
            !usuarioAtualizado.getSenha().isBlank()) {

            validarSenha(usuarioAtualizado.getSenha());

            String senhaCriptografada =
                passwordEncoder.encode(usuarioAtualizado.getSenha());

            usuario.setSenha(senhaCriptografada);
        }

        return usuarioRepository.save(usuario);
    }

    // EXCLUIR USUÁRIO
    public void excluir(Long id) {
        usuarioRepository.deleteById(id);
    }

    // VALIDAR SENHA
    private void validarSenha(String senha) {

        if (senha == null || senha.isBlank() || senha.length() < 8) {
            throw new ResponseStatusException(
                HttpStatus.BAD_REQUEST,
                "A senha deve ter pelo menos 8 caracteres."
            );
        }
    }
}
