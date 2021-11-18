package com.veganhouse.checkout.controller;

import com.veganhouse.checkout.domain.CartItem;
import com.veganhouse.checkout.service.CartManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Objects;

@RestController
@RequestMapping("cartItems")
public class ControllerCartItem {
    @Autowired
    CartManager cartManager;

    @GetMapping
    public ResponseEntity getUserCartItems(int userId){
        List<CartItem> cartItemList = cartManager.getUserCartItems(userId);

        if (Objects.isNull(cartItemList) ||cartItemList.isEmpty())
            return ResponseEntity.status(204).build();

        return ResponseEntity.status(201).body(cartItemList);
    }

    @PostMapping("{idUser}")
    public ResponseEntity addCartItem(@PathVariable int idUser, @RequestBody CartItem cartItem){
        cartManager.addItem(idUser,cartItem);
        return ResponseEntity.status(201).build();
    }

    @DeleteMapping("{idCartItem}")
    public ResponseEntity removeCartItem(@PathVariable int idCartItem){
        if(cartManager.removeItem(idCartItem))
            return ResponseEntity.status(200).build();

        return ResponseEntity.status(204).build();
    }

    @PatchMapping("/increment/{idCartItem}")
    public ResponseEntity incrementCartItemQuantity(@PathVariable int idCartItem){
        if (cartManager.incrementItemQuantity(idCartItem))
            return ResponseEntity.status(200).build();

        return ResponseEntity.status(204).build();
    }

    @PatchMapping("/decrement/{idCartItem}")
    public ResponseEntity decrementCartItemQuantity(@PathVariable int idCartItem){
        if (cartManager.decrementItemQuantity(idCartItem))
            return ResponseEntity.status(200).build();

        return ResponseEntity.status(404).build();
    }
}
