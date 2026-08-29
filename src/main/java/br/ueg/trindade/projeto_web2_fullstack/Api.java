package br.ueg.trindade.projeto_web2_fullstack;

import java.util.ArrayList;
import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class Api {
    
    @GetMapping("/usuarios")
    public List<Usuarios> getAllUsuariosWithClass(){
        List<Usuarios> users = new ArrayList<>();
        users.add(new Usuarios("Joao" , "joao123", "senha123", "joao@example.com")); 
        users.add(new Usuarios("Maria", "maria456", "senha456", "maria@example.com"));
        return users;
    }

    @GetMapping("/permissoes")
    public List<Permissao> getAllPermissoes(){
        List<Permissao> permissoes = new ArrayList<>();
        permissoes.add(new Permissao(1L, "ADMIN", "Acesso total ao sistema")); 
        permissoes.add(new Permissao(2L, "USER", "Acesso padrão do usuário"));
        return permissoes;
    }

    @GetMapping("/categorias")
    public List<Categoria> getAllCategorias(){
        List<Categoria> categorias = new ArrayList<>();
        categorias.add(new Categoria(1L, "Jaquetas", true)); 
        categorias.add(new Categoria(2L, "Acessorios", true));
        categorias.add(new Categoria(3L, "Loja", false)); 
        return categorias;
    }
}
