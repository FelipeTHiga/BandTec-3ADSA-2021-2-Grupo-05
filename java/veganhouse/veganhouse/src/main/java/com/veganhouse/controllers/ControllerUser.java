package com.veganhouse.controllers;

import com.veganhouse.domain.Seller;
import com.veganhouse.domain.User;
import com.veganhouse.repository.ISellerRepository;
import com.veganhouse.repository.IUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

// Classe responsável pelos endpoints de criação e edição de usuários
@RestController
@RequestMapping("/user")
public class ControllerUser {
    @Autowired
    private IUserRepository userRepository;
    @Autowired
    private ISellerRepository sellerRepository;
    private ControllerSession session;

    @PostMapping
    public String createUser(@RequestBody User newUser){
        userRepository.save(newUser);
        return "Usuário cadastrado com sucesso";
    }

    @PostMapping("seller")
    public String createSeller(@RequestBody User newSeller){
        userRepository.save(newSeller);
        return "Usuário cadastrado com sucesso";
    }
}
