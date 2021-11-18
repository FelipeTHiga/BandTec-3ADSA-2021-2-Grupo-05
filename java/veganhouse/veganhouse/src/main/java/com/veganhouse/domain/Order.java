package com.veganhouse.domain;

import javax.persistence.*;
import java.util.List;

@Entity
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne
    private User user;
    private Adress adress;
    @OneToMany
    private List<OrderItem> orderItems;
    private double total;

    public Order(int id, User user, List<OrderItem> orderItems) {
        this.id = id;
        this.user = user;
        this.orderItems = orderItems;
        this.total = total;
        this.adress = user.getAdress();
    }

}
