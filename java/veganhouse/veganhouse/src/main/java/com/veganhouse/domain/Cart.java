package com.veganhouse.domain;

import com.veganhouse.repository.IProductRepository;
import com.veganhouse.repository.IUserRepository;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.ArrayList;
import java.util.List;

public class Cart {
    //region Atributtes
    private List<Product> productsCart;
    private Integer idBuyer;
    @Autowired
    private IProductRepository productRepository;
    @Autowired
    private IUserRepository userRepository;
    //endregion

    public Cart() {
        this.productsCart = new ArrayList<>();
    }

    public void addProduct(Product product) {
        productsCart.add(product);
    }

    public void removeProduct(Product product) {
        productsCart.remove(product);
    }

    public Double getPriceAll() {
        Double priceAll = 0.0;
        if (productsCart.isEmpty()) {
            return priceAll;
        }

        for (Product p : productsCart) {
            priceAll += p.getPrice();
        }

        return priceAll;
    }

    //region Getters and Setters
    public List<Product> getProductsCart() {
        return productsCart;
    }

    public void setProductsCart(List<Product> productsCart) {
        this.productsCart = productsCart;
    }

    public Integer getIdBuyer() {
        return idBuyer;
    }

    public void setIdBuyer(Integer idBuyer) {
        this.idBuyer = idBuyer;
    }
    //endregion
}
