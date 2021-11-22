package com.veganhouse.domain;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

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
    protected String description;
    protected Integer inventory;
    protected Integer fkUser;
    protected String image_url1;
    protected String image_url2;
    protected String image_url3;
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

    public Product(Integer id, String name, Double price, String category, String subCategory, String description, Integer inventory, Integer fkUser) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.category = category;
        this.subCategory = subCategory;
        this.description = description;
        this.inventory = inventory;
        this.fkUser = fkUser;
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

    public Integer getFkUser() {
        return fkUser;
    }

    public void setFkUser(Integer fkUser) {
        this.fkUser = fkUser;
    }

    public String getImage_url1() {
        return image_url1;
    }

    public void setImage_url1(String image_url1) {
        this.image_url1 = image_url1;
    }

    public String getImage_url2() {
        return image_url2;
    }

    public void setImage_url2(String image_url2) {
        this.image_url2 = image_url2;
    }

    public String getImage_url3() {
        return image_url3;
    }

    public void setImage_url3(String image_url3) {
        this.image_url3 = image_url3;
    }

    //endregion
}
