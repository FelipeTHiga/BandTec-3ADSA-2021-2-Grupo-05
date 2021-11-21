package com.veganhouse.checkout.controller;

import com.veganhouse.checkout.service.OrderService;
import com.veganhouse.domain.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("orders")
public class ControllerOrder {
    @Autowired
    private OrderService orderService;

    @PostMapping
    public void postOrder(@RequestBody User user){
        orderService.createOrder(user);
    }

    @GetMapping("user/{idUser}")
    public ResponseEntity getUserOrder(@PathVariable int idUser){
        return ResponseEntity.status(200).body(orderService.getUserOrders(idUser));
    }

    @GetMapping("seller/{idUser}")
    public ResponseEntity getSellerOrder(@PathVariable int idUser){
        return ResponseEntity.status(200).body(orderService.getSellerOrders(idUser));
    }
}
