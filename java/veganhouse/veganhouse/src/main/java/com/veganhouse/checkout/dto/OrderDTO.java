package com.veganhouse.checkout.dto;


import com.veganhouse.checkout.domain.CartItem;
import com.veganhouse.domain.Adress;
import com.veganhouse.domain.User;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

public class OrderDTO {

    private int idOrder;

    private User user;
    private String adress;
    private double total;
    private List<CartItem> orderItems;
    private LocalDate orderDate;
    private String orderStatus;

    public OrderDTO() {
    }

    public List<CartItem> getProductsBySeller(int sellerId){
        return this.orderItems.stream()
                .filter(cartItem -> cartItem.getProduct().getFkSeller().equals(sellerId))
                .collect(Collectors.toList());
    }

    public List<Integer> getSellers(){
        List<Integer> sellersList = new ArrayList();

            for(CartItem c : orderItems){
            if(!sellersList.contains(c.getProduct().getFkSeller()))
                sellersList.add(c.getProduct().getFkSeller());
        }

        return sellersList;
    }

    public int getIdOrder() {
        return idOrder;
    }

    public void setIdOrder(int idOrder) {
        this.idOrder = idOrder;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public String getAdress() {
        return adress;
    }

    public void setAdress(String adress) {
        this.adress = adress;
    }

    public double getTotal() {
        return total;
    }

    public void setTotal(double total) {
        this.total = total;
    }

    public List<CartItem> getOrderItems() {
        return orderItems;
    }

    public void setOrderItems(List<CartItem> orderItems) {
        this.orderItems = orderItems;
    }

    public LocalDate getOrderDate() {
        return orderDate;
    }

    public void setOrderDate(LocalDate orderDate) {
        this.orderDate = orderDate;
    }

    public String getOrderStatus() {
        return orderStatus;
    }

    public void setOrderStatus(String orderStatus) {
        this.orderStatus = orderStatus;
    }
}
