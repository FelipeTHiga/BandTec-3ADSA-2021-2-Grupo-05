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
    @Min(value = 1, message = "Preço mínimo de 1,00 real")
    //@Pattern(regexp = "/^[\\d,.?!]+$/g", message = "O campo PREÇO aceita apenas números")
    protected Double price;

    @NotBlank(message = "O campo CATEGORIA deve ser preenchido")
    protected String category;

    @Lob
    @Basic(fetch = FetchType.LAZY)
    @Size(min = 10, max = 1500, message = "A DESCRIÇÃO deve conter de 10 a 1500 caracteres")
    protected String description;

    @NotNull(message = "O campo QUANTIDADE deve ser preenchido")
    protected Integer inventory;

    protected Integer fkSeller;
    protected Boolean isAvailable;
    @JsonIgnore
    @Column(length = 20_000_000)
    private byte[] image_url1;

    @JsonIgnore
    @Column(length = 20_000_000)
    private byte[] image_url2;

    @JsonIgnore
    @Column(length = 20_000_000)
    private byte[] image_url3;
    //endregion

    public Product() {

    }

    public Product(String name, Double price, String category, String description, Integer inventory, Integer fkSeller, Boolean isAvailable) {
        this.name = name;
        this.price = price;
        this.category = category;
        this.description = description;
        this.inventory = inventory;
        this.fkSeller = fkSeller;
        this.isAvailable = isAvailable;
    }

    public Product(Integer id, String name, Double price, String category, String description, Integer inventory, Integer fkSeller) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.category = category;
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
                        "Descrição: %s\n" +
                        "Estoque: %d",
                name, price, category, description, inventory);
    }

    //region Getters and Setters
    public Integer getId() {
        return id;
    }

    public Boolean getAvailable() {
        return isAvailable;
    }

    public void setAvailable(Boolean available) {
        isAvailable = available;
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

    public void setImage_url1(byte[] image_url1) {
        this.image_url1 = image_url1;
    }

    public void setImage_url2(byte[] image_url2) {
        this.image_url2 = image_url2;
    }

    public void setImage_url3(byte[] image_url3) {
        this.image_url3 = image_url3;
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
//endregion
}
