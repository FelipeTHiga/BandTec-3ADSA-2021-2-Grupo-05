package com.veganhouse.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;

@Entity
public class Product {
    
    //region Attributes
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    protected Integer id;
    protected String name;
    protected Double price;
    protected String category;
    protected String subCategory;

    @Lob @Basic(fetch = FetchType.LAZY)
    protected String description;
    protected Integer inventory;
    protected Integer fkSeller;


    @Column(length = 20_000_000)
    protected byte[] image_url1;


    @Column(length = 20_000_000)
    protected byte[]  image_url2;


    @Column(length = 20_000_000)
    protected byte[]  image_url3;
    //endregion

    public Product() {

    }

    public Product(String name, Double price, String category, String subCategory, String description, Integer inventory) {
        this.name = name;
        this.price = price;
        this.category = category;
        this.subCategory = subCategory;
        this.description = description;
        this.inventory = inventory;
    }

    public Product(Integer id, String name, Double price, String category, String subCategory, String description, Integer inventory, Integer fkSeller) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.category = category;
        this.subCategory = subCategory;
        this.description = description;
        this.inventory = inventory;
        this.fkSeller = fkSeller;
    }



//endregion

    //region Getters and Setters
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getSubCategory() {
        return subCategory;
    }

    public void setSubCategory(String subCategory) {
        this.subCategory = subCategory;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Integer getInventory() {
        return inventory;
    }

    public void setInventory(Integer inventory) {
        this.inventory = inventory;
    }

    public Integer getFkSeller() {
        return fkSeller;
    }

    public void setFkSeller(Integer fkSeller) {
        this.fkSeller = fkSeller;
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

    //endregion
}
