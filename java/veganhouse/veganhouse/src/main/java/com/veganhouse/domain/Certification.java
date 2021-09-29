package com.veganhouse.domain;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Certification {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idCertification;
    private String name;

    public Certification(String name) {
        this.name = name;
    }

    //region Getters and Setters
    public Integer getIdCertification() {
        return idCertification;
    }

    public void setIdCertification(Integer idCertification) {
        this.idCertification = idCertification;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
    //endregion
}
