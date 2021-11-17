package com.veganhouse.observer;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class RestockNotification {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int idRestockNotification;
    private int fkUser;
    private int fkProduct;

    public int getIdRestockNotification() {
        return idRestockNotification;
    }

    public void setIdRestockNotification(int idRestockNotification) {
        this.idRestockNotification = idRestockNotification;
    }

    public int getFkUser() {
        return fkUser;
    }

    public void setFkUser(int fkUser) {
        this.fkUser = fkUser;
    }

    public int getFkProduct() {
        return fkProduct;
    }

    public void setFkProduct(int fkProduct) {
        this.fkProduct = fkProduct;
    }
}
