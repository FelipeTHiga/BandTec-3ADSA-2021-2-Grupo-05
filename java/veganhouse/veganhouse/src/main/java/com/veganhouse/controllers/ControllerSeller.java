package com.veganhouse.controllers;

import com.veganhouse.domain.Seller;
import com.veganhouse.domain.User;
import com.veganhouse.repository.ISellerRepository;
import com.veganhouse.repository.IUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

// Classe responsável pelos endpoints de criação e edição de sellers
@RestController
@RequestMapping("/sellers")
public class ControllerSeller {

    @Autowired
    private ISellerRepository sellerRepository;
    @Autowired
    private IUserRepository userRepository;

    @PostMapping
    public ResponseEntity createSeller(@RequestBody @Valid Seller newSeller) {

        try {
            // Pegando o usário logado
            User userLogged = ControllerSession.session.getUser();

            if (userLogged.getIsSeller()) {
                return ResponseEntity.status(409).build();
            } else {
                // Setando o id do usuário logado como fk do seller cadastrado
                Integer userId = userLogged.getId();
                newSeller.setFkUser(userId);
                userLogged.setIsSeller(true);

                userRepository.save(userLogged); // Update do user
                sellerRepository.save(newSeller); // Add novo seller

                return ResponseEntity.status(201).body(userLogged);
            }
        } catch (NullPointerException erro) {
            return ResponseEntity.status(404).build();
        }
    }

    @GetMapping("/{idSeller}")
    public ResponseEntity getSeller(@PathVariable int idSeller){
        if(sellerRepository.existsById(idSeller)) {
            return ResponseEntity.of(sellerRepository.findById(idSeller));
        }
        return ResponseEntity.status(404).build();
    }

}

