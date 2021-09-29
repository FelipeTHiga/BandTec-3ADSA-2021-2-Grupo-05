package com.veganhouse.domain;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Seller extends User{
    //region Attributes
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idSeller;
    private String nameSeller;
    private String cnpj;
    private String descriptionSeller;
    private Integer fkUser;
    //endregion

    //region Getters and Setters
    public Integer getIdSeller() {
        return idSeller;
    }

    public void setIdSeller(Integer idSeller) {
        this.idSeller = idSeller;
    }

    public Integer getFkUser() {
        return fkUser;
    }

    public void setFkUser(Integer fkUser) {
        this.fkUser = fkUser;
    }

    public String getNameSeller() {
        return nameSeller;
    }

    public void setNameSeller(String nameSeller) {
        this.nameSeller = nameSeller;
    }

    public String getCnpj() {
        return cnpj;
    }

    public void setCnpj(String cnpj) {
        this.cnpj = cnpj;
    }

    public String getDescriptionSeller() {
        return descriptionSeller;
    }

    public void setDescriptionSeller(String descriptionSeller) {
        this.descriptionSeller = descriptionSeller;
    }
    //endregion
}
