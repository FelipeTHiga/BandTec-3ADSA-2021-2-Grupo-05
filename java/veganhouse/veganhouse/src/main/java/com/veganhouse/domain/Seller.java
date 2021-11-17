package com.veganhouse.domain;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.util.List;

@Entity
public class Seller {

    //region Attributes
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int idSeller;
    private String commercialName;
    private String cnpj;
    private String commercialEmail;
    private String whatsappNumber;
    private String instagramAccount;
    private String facebookAccount;
    //private List<Certification> listCertifications;
    //private String descriptionSeller;
    private Integer fkUser;
    //endregion

    //region Getters and Setters
    public int getIdSeller() {
        return idSeller;
    }

    public void setIdSeller(int idSeller) {
        this.idSeller = idSeller;
    }

    public String getCommercialName() {
        return commercialName;
    }

    public void setCommercialName(String commercialName) {
        this.commercialName = commercialName;
    }

    public String getCnpj() {
        return cnpj;
    }

    public void setCnpj(String cnpj) {
        this.cnpj = cnpj;
    }

    public String getCommercialEmail() {
        return commercialEmail;
    }

    public void setCommercialEmail(String commercialEmail) {
        this.commercialEmail = commercialEmail;
    }

    public String getWhatsappNumber() {
        return whatsappNumber;
    }

    public void setWhatsappNumber(String whatsappNumber) {
        this.whatsappNumber = whatsappNumber;
    }

    public String getInstagramAccount() {
        return instagramAccount;
    }

    public void setInstagramAccount(String instagramAccount) {
        this.instagramAccount = instagramAccount;
    }

    public String getFacebookAccount() {
        return facebookAccount;
    }

    public void setFacebookAccount(String facebookAccount) {
        this.facebookAccount = facebookAccount;
    }

    public Integer getFkUser() {
        return fkUser;
    }

    public void setFkUser(Integer fkUser) {
        this.fkUser = fkUser;
    }
    //endregion
}
