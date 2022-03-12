package com.veganhouse.checkout.domain;

import com.veganhouse.domain.Product;

import javax.persistence.*;

@Entity
public class CartItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int idCartItem;
    @ManyToOne
    private Product product;
    private int quantity;
    private double subTotal;
    private int fkUser;
    private int fkOrder;

    public CartItem() {
    }

    public CartItem(int id, Product product, int quantity) {
        this.idCartItem = id;
        this.product = product;
        this.quantity = quantity;
        this.subTotal = product.getPrice() * quantity;
    }

    public Integer getFkSellerCartItem() {
        return product.getFkSeller();
    }

    public int getIdCartItem() {
        return idCartItem;
    }

    public void setIdCartItem(int idCartItem) {
        this.idCartItem = idCartItem;
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

    public int getFkOrder() {
        return fkOrder;
    }

    public void setFkOrder(int fkOrder) {
        this.fkOrder = fkOrder;
    }
}
