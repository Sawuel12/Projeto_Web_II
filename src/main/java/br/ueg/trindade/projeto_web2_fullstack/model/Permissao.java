
package br.ueg.trindade.projeto_web2_fullstack.model;

import java.util.Set;
import java.util.HashSet;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;

@Entity
public class Permissao {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nome;
    private String descricao;

    // LADO INVERSO DO RELACIONAMENTO
    @ManyToMany(mappedBy = "permissoes")
    @JsonIgnore
    private Set<Usuarios> usuarios = new HashSet<>();

    // CONSTRUTORES
    public Permissao() {
    }

    public Permissao(Long id, String nome, String descricao) {
        this.id = id;
        this.nome = nome;
        this.descricao = descricao;
    }

    // GETTERS E SETTERS
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    // GETTERS E SETTERS DOS USUÁRIOS
    public Set<Usuarios> getUsuarios() {
        return usuarios;
    }

    public void setUsuarios(Set<Usuarios> usuarios) {
        this.usuarios = usuarios;
    }
}
