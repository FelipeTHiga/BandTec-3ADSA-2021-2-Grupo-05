package com.veganhouse.domain;

import javax.persistence.*;
import javax.validation.constraints.*;

import org.hibernate.validator.constraints.br.CPF;

@Entity
@Table(name = "Users")
public class User {

    //region Attributes
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    protected int id;

    @NotBlank(message = "Erro no cadastro preencha todos os campos obrigatorios (*)")
    protected String nameUser;

    @NotBlank(message = "Erro no cadastro preencha todos os campos obrigatorios (*)")
    protected String surName;

    @CPF(message = "Insira um CPF válido")
    protected String cpf;

    @NotBlank(message = "Erro no cadastro preencha todos os campos obrigatorios (*)")
    @Email(message = "Insira um email válido")
    protected String email;

    //@Min(value = 6, message = "Mínimo de 6 caracteres")
    //@Max(value = 10, message = "Maxímo de 10 caracteres")
    @NotBlank(message = "Erro no cadastro preencha todos os campos obrigatorios (*)")
    protected String passwordUser;

    protected Boolean isSeller;
    protected Boolean authenticated;
    @ManyToOne
    private Adress adress;


    //protected Order orders

    //endregion


    public User() {
    }

    public User(int id, String nameUser, String surName, String cpf, String email, String passwordUser) {
        this.id = id;
        this.nameUser = nameUser;
        this.surName = surName;
        this.cpf = cpf;
        this.email = email;
        this.passwordUser = passwordUser;
        this.authenticated = false;
    }

    public void sendEmail(Product product){

//        System.out.printf("\nEmail enviado para %s sobre a chegada de produtos %s\n", email, product.getName());
    }

    //region Getters and Setters
    public int getId() {
        return id;
    }

    public Adress getAdress() {
        return adress;
    }

    public void setAdress(Adress adress) {
        this.adress = adress;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getNameUser() {
        return nameUser;
    }

    public void setNameUser(String nameUser) {
        this.nameUser = nameUser;
    }

    public String getSurName() {
        return surName;
    }

    public void setSurName(String surName) {
        this.surName = surName;
    }

    public String getCpf() {
        return cpf;
    }

    public void setCpf(String cpf) {
        this.cpf = cpf;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPasswordUser() {
        return passwordUser;
    }

    public void setPasswordUser(String passwordUser) {
        this.passwordUser = passwordUser;
    }

    public Boolean getIsSeller() {
        return isSeller;
    }

    public void setIsSeller(Boolean seller) {
        isSeller = seller;
    }

    public Boolean getSeller() {
        return isSeller;
    }

    public void setSeller(Boolean seller) {
        isSeller = seller;
    }

    public Boolean getAuthenticated() {
        return authenticated;
    }

    public void setAuthenticated(Boolean authenticated) {
        this.authenticated = authenticated;
    }

    //endregion
}
