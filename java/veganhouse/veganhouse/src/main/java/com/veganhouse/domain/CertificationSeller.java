package com.veganhouse.domain;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class CertificationSeller {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idCertificationSeller;
    private Integer fkCertification;
    private Integer fkSeller;

    //region Getters and Setters
    public Integer getIdCertificationSeller() {
        return idCertificationSeller;
    }

    public void setIdCertificationSeller(Integer idCertificationSeller) {
        this.idCertificationSeller = idCertificationSeller;
    }

    public Integer getFkCertification() {
        return fkCertification;
    }

    public void setFkCertification(Integer fkCertification) {
        this.fkCertification = fkCertification;
    }

    public Integer getFkSeller() {
        return fkSeller;
    }

    public void setFkSeller(Integer fkSeller) {
        this.fkSeller = fkSeller;
    }
    //endregion
}
