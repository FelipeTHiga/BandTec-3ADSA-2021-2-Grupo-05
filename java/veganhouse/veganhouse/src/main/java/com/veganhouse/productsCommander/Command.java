package com.veganhouse.productsCommander;

import com.veganhouse.domain.Product;

public class Command {
    private String action;
    private Product changedProduct;

    public Command(String action, Product changedProduct) {
        this.action = action;
        this.changedProduct = changedProduct;
    }



    public String getAction() {
        return action;
    }

    public void setAction(String action) {
        this.action = action;
    }

    public Product getChangedProduct() {
        return changedProduct;
    }

    public void setChangedProduct(Product changedProduct) {
        this.changedProduct = changedProduct;
    }
}
