package com.veganhouse.domain;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

@Entity
public class Adress {

    //region Attributes
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int idAdress;

    @NotBlank(message = "O campo RUA deve ser preenchido")
    private String street;


    @NotNull(message = "O campo NÚMERO deve ser preenchido")
    private Integer number;

    @NotBlank(message = "O campo ESTADO deve ser preenchido")
    private String state;

    @NotBlank(message = "O campo CIDADE deve ser preenchido")
    private String city;

    private String complement;

    @NotBlank(message = "O campo CEP deve ser preenchido")
    @Size(min = 8, max = 8, message = "Digite um CEP válido")
    private String cep;

    @NotBlank(message = "O campo BAIRRO deve ser preenchido")
    private String district;

    private Integer fkUser;
    //endregion

    public String getStringAdress(){
        return String.format("%s, nº%d - %s, %s - %s", street, number, district, city, cep);
    }

    //region Getters and Setters

    public int getIdAdress() {
        return idAdress;
    }

    public void setIdAdress(int idAdress) {
        this.idAdress = idAdress;
    }

    public String getStreet() {
        return street;
    }

    public void setStreet(String street) {
        this.street = street;
    }

    public Integer getNumber() {
        return number;
    }

    public void setNumber(Integer number) {
        this.number = number;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getComplement() {
        return complement;
    }

    public void setComplement(String complement) {
        this.complement = complement;
    }

    public String getCep() {
        return cep;
    }

    public void setCep(String cep) {
        this.cep = cep;
    }

    public String getDistrict() {
        return district;
    }

    public void setDistrict(String district) {
        this.district = district;
    }

    public Integer getFkUser() {
        return fkUser;
    }

    public void setFkUser(Integer fkUser) {
        this.fkUser = fkUser;
    }
    //endregion
}
