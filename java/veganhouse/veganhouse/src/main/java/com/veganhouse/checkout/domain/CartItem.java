package com.veganhouse.checkout.domain;

import com.veganhouse.domain.Product;

import javax.persistence.ManyToOne;

public class CartItem {

    private int id;
    @ManyToOne
    private Product product;
    private int quantity;
    private double subTotal;
    private int fkUser;

    public CartItem(int id, Product product, int quantity) {
        this.id = id;
        this.product = product;
        this.quantity = quantity;
        this.subTotal = product.getPrice() * quantity;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public Product getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public double getSubTotal() {
        return product.getPrice() * quantity;
    }

    public void setSubTotal(double subTotal) {
        this.subTotal = subTotal;
    }

    public int getFkUser() {
        return fkUser;
    }

    public void setFkUser(int fkUser) {
        this.fkUser = fkUser;
    }
}
