package com.veganhouse.domain;

import javax.persistence.Entity;

@Entity
public class Seller extends User{
    //region Attributes
    private int idSeller;
    private String nameSeller;
    private String cnpj;
    private String descriptionSeller;
    private Integer fkUser;
    //endregion

    //region Getters and Setters

    public int getIdSeller() {
        return idSeller;
    }

    public void setIdSeller(int idSeller) {
        this.idSeller = idSeller;
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

    public Integer getFkUser() {
        return fkUser;
    }

    public void setFkUser(Integer fkUser) {
        this.fkUser = fkUser;
    }

    //endregion
}
