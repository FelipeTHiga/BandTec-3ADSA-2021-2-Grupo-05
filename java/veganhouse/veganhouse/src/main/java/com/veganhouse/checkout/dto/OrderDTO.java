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
    private Adress adress;
    private double total;
    private List<CartItem> orderItems;
    private LocalDate orderDate;
    private String orderStatus;

    public OrderDTO() {
    }

    public List<CartItem> getProductsBySeller(int sellerId){
        return this.orderItems.stream()
                .filter(cartItem -> cartItem.getProduct().getFkUser().equals(sellerId))
                .collect(Collectors.toList());
    }

    public List<Integer> getSellers(){
        List<Integer> sellersList = new ArrayList();

        for(CartItem c : orderItems){
            if(!sellersList.contains(c.getFkUser()))
                sellersList.add(c.getFkUser());
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

    public Adress getAdress() {
        return adress;
    }

    public void setAdress(Adress adress) {
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
