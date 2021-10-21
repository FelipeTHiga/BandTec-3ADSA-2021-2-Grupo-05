package com.veganhouse.controllers;

import com.veganhouse.domain.Adress;
import com.veganhouse.domain.Seller;
import com.veganhouse.domain.User;
import com.veganhouse.repository.IAdressRepository;
import com.veganhouse.repository.ISellerRepository;
import com.veganhouse.repository.IUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

// Classe responsável pelos endpoints de criação e edição de usuários
@RestController
@RequestMapping("/users")
public class ControllerUser {

    @Autowired
    private IUserRepository userRepository;

    @Autowired
    private IAdressRepository adressRepository;


    @PostMapping
    public ResponseEntity createUser(@RequestBody User newUser){
        newUser.setIsSeller(false);
        userRepository.save(newUser);
        return ResponseEntity.status(201).body(newUser);
    }

    @GetMapping("/{idUser}")
    public ResponseEntity getUser(@PathVariable Integer idUser){
        return ResponseEntity.of(userRepository.findById(idUser));
    }

    @PutMapping("/{idUser}")
    public ResponseEntity putUser(@PathVariable Integer idUser,
                                  @RequestBody User newUpdate){
        if (userRepository.existsById(idUser)) {
            newUpdate.setId(idUser);
            userRepository.save(newUpdate);
            return ResponseEntity.status(200).build();
        } else {
            return ResponseEntity.status(204).build();
        }
    }

    @GetMapping("/all")
    public ResponseEntity getUsers(){
        if (userRepository.count() > 0){
            return ResponseEntity.status(200).body(userRepository.findAll());
        }
        return ResponseEntity.status(204).build();
    }

    @PostMapping("seller")
    public ResponseEntity createSeller(@RequestBody Seller newSeller){
        //sellerRepository.save(newSeller);
        return ResponseEntity.status(201).build();
    }

    @GetMapping("/adress/{idAdress}")
    public ResponseEntity getAdress(@PathVariable Integer idAdress){
        return ResponseEntity.of(adressRepository.findById(idAdress));
    }

    @PutMapping("/adress/{idAdress}")
    public ResponseEntity putAdress(@PathVariable Integer idAdress,
                                    @RequestBody Adress adressUpdate){
        if (adressRepository.existsById(idAdress)) {
            adressUpdate.setIdAdress(idAdress);
            adressRepository.save(adressUpdate);
            return ResponseEntity.status(200).build();
        } else {
            return ResponseEntity.status(204).build();
        }
    }

    @PostMapping("/adress")
    public ResponseEntity createAdress(@RequestBody Adress newAdress){
        adressRepository.save(newAdress);
        return ResponseEntity.status(201).build();
    }
}
