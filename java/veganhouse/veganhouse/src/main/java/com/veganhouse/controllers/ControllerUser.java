package com.veganhouse.controllers;

import com.veganhouse.domain.Seller;
import com.veganhouse.domain.User;
import com.veganhouse.repository.ISellerRepository;
import com.veganhouse.repository.IUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

// Classe responsável pelos endpoints de criação e edição de usuários
@RestController
@RequestMapping("/user")
public class ControllerUser {

    @Autowired
    private IUserRepository userRepository;

    @PostMapping
    public ResponseEntity createUser(@RequestBody User newUser){
        newUser.setIsSeller(false);
        userRepository.save(newUser);
        return ResponseEntity.status(201).build();
    }

}
