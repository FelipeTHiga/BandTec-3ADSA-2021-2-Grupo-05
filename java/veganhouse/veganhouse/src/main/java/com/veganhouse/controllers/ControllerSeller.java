package com.veganhouse.controllers;

import com.veganhouse.domain.Seller;
import com.veganhouse.domain.User;
import com.veganhouse.repository.ISellerRepository;
import com.veganhouse.repository.IUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

// Classe responsável pelos endpoints de criação e edição de sellers
@RestController
@RequestMapping("/sellers")
public class ControllerSeller {

    @Autowired
    private ISellerRepository sellerRepository;
    @Autowired
    private IUserRepository userRepository;

    @PostMapping("/{idUser}")
    public ResponseEntity createSeller(@RequestBody Seller newSeller, @PathVariable Integer idUser) {

        try {
            // Pegando o usário
            User userLogged = userRepository.findById(idUser).get();

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

    @GetMapping("/{idUser}")
    public ResponseEntity getSeller(@PathVariable int idUser){
        // Adicionar validação
            return ResponseEntity.status(200).body(sellerRepository.findByFkUser(idUser));

    }

    @PutMapping("/{idSeller}")
    public ResponseEntity updateSeller(@PathVariable int idSeller, @RequestBody Seller sellerUpdate){
        if(sellerRepository.existsById(idSeller)) {
            sellerUpdate.setIdSeller(idSeller);
            sellerRepository.save(sellerUpdate);
            return ResponseEntity.status(200).build();
        }
        return ResponseEntity.status(204).build();
    }

}

