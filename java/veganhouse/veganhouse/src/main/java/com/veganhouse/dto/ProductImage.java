package com.veganhouse.dto;


public class ProductImage {

    public int id;

    public byte[] image_url1;

    public byte[] image_url2;

    protected Boolean isAvailable;

    public byte[] image_url3;

    public ProductImage() {
    }

    public ProductImage(int id, byte[] image_url1, byte[] image_url2, byte[] image_url3) {
        this.id = id;
        this.image_url1 = image_url1;
        this.image_url2 = image_url2;
        this.image_url3 = image_url3;
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

    public byte[] getImage_url2() {
        return image_url2;
    }

    public byte[] getImage_url3() {
        return image_url3;
    }

    public Boolean getAvailable() {
        return isAvailable;
    }

    public void setAvailable(Boolean available) {
        isAvailable = available;
    }
}
