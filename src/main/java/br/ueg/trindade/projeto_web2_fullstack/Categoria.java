package br.ueg.trindade.projeto_web2_fullstack;

public class Categoria {
    private Long id;
    private String nome;
    private Boolean ativa; 

    public Categoria(Long id, String nome, Boolean ativa) {
        this.id = id;
        this.nome = nome;
        this.ativa = ativa;
    }

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

    public Boolean getAtiva() {
        return ativa;
    }

    public void setAtiva(Boolean ativa) {
        this.ativa = ativa;
    }
}