package com.veganhouse.controllers;

import com.veganhouse.domain.Cart;
import com.veganhouse.domain.Product;
import com.veganhouse.repository.IProductRepository;
import com.veganhouse.repository.IUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/carts")
public class ControllerCart {
    @Autowired
    private IProductRepository productRepository;

    @Autowired
    private IUserRepository userRepository;

    private Cart cart;

    @PostMapping("/add-products")
    public ResponseEntity addProductCart(@RequestBody Product product){
        if (productRepository.existsById(product.getId())){
            cart.addProduct(productRepository.getById(product.getId()));
            return ResponseEntity.status(200).build();
        }
        return ResponseEntity.status(404).build();
    }

    @DeleteMapping("/remove-products")
    public ResponseEntity removeProductCart(@RequestBody Product product){
        if (productRepository.existsById(product.getId())){
            cart.removeProduct(productRepository.getById(product.getId()));
            return ResponseEntity.status(200).build();
        }
        return ResponseEntity.status(404).build();
    }

    @PostMapping("/add-products/{qtd}")
    public ResponseEntity addMultiProductCart(@RequestBody Product product, Integer qtd){
        if (productRepository.existsById(product.getId())){
            for (int i = 0; i < qtd; i++){
                cart.addProduct(productRepository.getById(product.getId()));
            }
            return ResponseEntity.status(200).build();
        }
        return ResponseEntity.status(404).build();
    }

    @DeleteMapping("/remove-products/{qtd}")
    public ResponseEntity removeMultiProductCart(@RequestBody Product product, Integer qtd){
        if (productRepository.existsById(product.getId())){
            for (int i = 0; i < qtd; i++){
                cart.removeProduct(productRepository.getById(product.getId()));
            }
            return ResponseEntity.status(200).build();
        }
        return ResponseEntity.status(404).build();
    }
}