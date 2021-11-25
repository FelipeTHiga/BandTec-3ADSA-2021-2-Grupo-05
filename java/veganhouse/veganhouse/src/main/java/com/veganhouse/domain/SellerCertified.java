package com.veganhouse.domain;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class SellerCertified {

    //region Attributes
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int idSellerCertified;
    private int fkCertification;
    private int fkSeller;
    //private int hasCertification;
    //endregion

    //region Getters and Setters
    public int getFkCertification() {
        return fkCertification;
    }

    public void setFkCertification(int fkCertification) {
        this.fkCertification = fkCertification;
    }

    public int getFkSeller() {
        return fkSeller;
    }

    public void setFkSeller(int fkSeller) {
        this.fkSeller = fkSeller;
    }

    public int getIdSellerCertified() {
        return idSellerCertified;
    }

    public void setIdSellerCertified(int idSellerCertified) {
        this.idSellerCertified = idSellerCertified;
    }

//    public int getHasCertification() {
//        return hasCertification;
//    }
//
//    public void setHasCertification(int hasCertification) {
//        this.hasCertification = hasCertification;
//    }

    //endregion
}
