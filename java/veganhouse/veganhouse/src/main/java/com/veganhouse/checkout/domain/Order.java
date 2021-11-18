package com.veganhouse.checkout.domain;

import com.veganhouse.domain.Adress;
import com.veganhouse.domain.User;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Entity
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @ManyToOne
    private User user;
    private Adress adress;
    private double total;
    private List<CartItem> orderItems;
    private LocalDate date;
    private String status;

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

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
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

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
