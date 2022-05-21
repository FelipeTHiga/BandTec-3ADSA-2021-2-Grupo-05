package com.veganhouse.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;

@Entity
public class Image {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @JsonIgnore
    @Column(length = 20_000_000)
    private byte[] image_url1;

    @JsonIgnore
    @Column(length = 20_000_000)
    private byte[] image_url2;

    @JsonIgnore
    @Column(length = 20_000_000)
    private byte[] image_url3;

    private int fkProduct;

    public Image() {
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public byte[] getImage_url1() {
        return image_url1;
    }

    public void setImage_url1(byte[] image_url1) {
        this.image_url1 = image_url1;
    }

    public byte[] getImage_url2() {
        return image_url2;
    }

    public void setImage_url2(byte[] image_url2) {
        this.image_url2 = image_url2;
    }

    public byte[] getImage_url3() {
        return image_url3;
    }

    public void setImage_url3(byte[] image_url3) {
        this.image_url3 = image_url3;
    }

    public int getFkProduct() {
        return fkProduct;
    }

    public void setFkProduct(int fkProduct) {
        this.fkProduct = fkProduct;
    }
}
