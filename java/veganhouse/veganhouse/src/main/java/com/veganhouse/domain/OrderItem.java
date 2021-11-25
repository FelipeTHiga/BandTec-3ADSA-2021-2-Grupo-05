package com.veganhouse.domain;

import javax.persistence.*;

public class OrderItem {

    private int id;
    private Product product;
    private int quantity;
    private double subTotal;
    @ManyToOne
    private Order order;

    public OrderItem(int id, Product product, int quantity) {
        this.id = id;
        this.product = product;
        this.quantity = quantity;
        this.subTotal = product.price * quantity;
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
        return product.price * quantity;
    }

    public void setSubTotal(double subTotal) {
        this.subTotal = subTotal;
    }

    public Order getOrder() {
        return order;
    }

    public void setOrder(Order order) {
        this.order = order;
    }
}
