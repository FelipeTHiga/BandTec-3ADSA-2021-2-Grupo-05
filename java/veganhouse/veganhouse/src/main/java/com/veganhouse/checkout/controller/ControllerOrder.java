package com.veganhouse.checkout.controller;

import com.veganhouse.checkout.domain.CartItem;
import com.veganhouse.checkout.dto.OrderDTO;
import com.veganhouse.checkout.service.OrderService;
import com.veganhouse.domain.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("orders")
public class ControllerOrder {
    @Autowired
    private OrderService orderService;

    @PostMapping
    public ResponseEntity postOrder(@RequestBody User user){
        orderService.createOrder(user);
        return ResponseEntity.status(201).build();
    }

    @GetMapping("user/{idUser}")
    public ResponseEntity getUserOrder(@PathVariable int idUser){
        return ResponseEntity.status(200).body(orderService.getUserOrders(idUser));
    }

    @GetMapping("checkout/lastOrder/{idUser}")
    public ResponseEntity getLastUserOrder(@PathVariable int idUser){
        OrderDTO lastOrder = orderService.getUserOrders(idUser).get(orderService.getUserOrders(idUser).size()-1);
        return ResponseEntity.status(200).body(lastOrder);
    }

    @GetMapping("checkout/pendingOrders/{idUser}")
    public ResponseEntity getPendingUserOrders(@PathVariable int idUser){
        return ResponseEntity.status(200).body(orderService.getOrdersPending(idUser));
    }

    @GetMapping("checkout/orderItens/{idUser}")
    public ResponseEntity getOrderItensByUser(@PathVariable int idUser){
        return ResponseEntity.status(200).body(orderService.getOrderItensByUser(idUser));
    }

    @GetMapping("seller/{idUser}")
    public ResponseEntity getSellerOrder(@PathVariable int idUser){
        return ResponseEntity.status(200).body(orderService.getSellerOrders(idUser));
    }

    @PatchMapping("update-status/{status}/{idOrder}")
    public ResponseEntity updateOrderStatus(@PathVariable String status, @PathVariable int idOrder){
        orderService.updateStatus(status,idOrder);
        return ResponseEntity.status(200).build();
    }

    @PutMapping("checkout/orderItens/{idUser}")
    public ResponseEntity updateOrderItens(@PathVariable Integer idUser) {
        orderService.updateOrderItensByUser(idUser);
        return ResponseEntity.ok().build();
    }

    @PutMapping("checkout/list-order-itens/{idUser}")
    public ResponseEntity updateOrderItens(@PathVariable Integer idUser,@RequestBody List<CartItem> cartItems) {
        orderService.updateOrderItensByUser(cartItems);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("{idUser}")
    public ResponseEntity deleteOrder(@PathVariable Integer idUser){
        orderService.deleteOrderByUser(idUser);
        return ResponseEntity.ok().build();
    }
}
