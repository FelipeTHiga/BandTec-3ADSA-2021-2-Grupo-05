package com.veganhouse.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import javax.validation.constraints.*;
import java.util.Arrays;


@Entity
public class Product {

    //region Attributes
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    protected Integer id;

    @NotBlank(message = "O campo NOME deve ser preenchido")
    protected String name;

    @NotNull(message = "O campo PREÇO deve ser preenchido")
    //@Pattern(regexp = "/^[\\d,.?!]+$/g", message = "O campo PREÇO aceita apenas números")
    protected Double price;

    protected String category;
    protected String subCategory;

    @Size(min = 0, max = 1000, message = "A DESCRIÇÃO deve ter no máximo 1000 caracteres")
    @Lob
    @Basic(fetch = FetchType.LAZY)
    protected String description;

    @NotNull(message = "O campo QUANTIDADE deve ser preenchido")
    protected Integer inventory;

    protected Integer fkSeller;
    protected Boolean isAvaliable;


    @Column(length = 20_000_000)
    protected byte[] image_url1;


    @Column(length = 20_000_000)
    protected byte[] image_url2;


    @Column(length = 20_000_000)
    protected byte[] image_url3;
    //endregion

    public Product() {

    }

    public Product(String name, Double price, String category, String subCategory, String description, Integer inventory, Integer fkSeller, Boolean isAvaliable) {
        this.name = name;
        this.price = price;
        this.category = category;
        this.subCategory = subCategory;
        this.description = description;
        this.inventory = inventory;
        this.fkSeller = fkSeller;
        this.isAvaliable = isAvaliable;
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
    @Override
    public String toString() {
        return String.format("\n----------Produto----------\n" +
                        "Nome: %s\n" +
                        "Preço: R$%.2f\n" +
                        "Categoria: %s\n" +
                        "Subcategoria: %s\n" +
                        "Descrição: %s\n" +
                        "Estoque: %d",
                name, price, category, subCategory, description, inventory);
    }

    //region Getters and Setters
    public Integer getId() {
        return id;
    }

    public Boolean getAvaliable() {
        return isAvaliable;
    }

    public void setAvaliable(Boolean avaliable) {
        isAvaliable = avaliable;
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
