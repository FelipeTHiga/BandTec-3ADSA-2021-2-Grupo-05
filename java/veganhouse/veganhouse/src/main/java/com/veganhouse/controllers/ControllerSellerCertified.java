package com.veganhouse.controllers;

import com.veganhouse.repository.ISellerCertified;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/certifieds")
public class ControllerSellerCertified {

    @Autowired
    private ISellerCertified sellerCertifiedRepository;

    @GetMapping("/{fkSeller}")
    ResponseEntity getSellerCertified(@PathVariable Integer fkSeller){
        if (sellerCertifiedRepository.count() > 0){
            return ResponseEntity.status(200).body(sellerCertifiedRepository.certificationList(fkSeller));
        }
        return ResponseEntity.status(204).build();
    }

}
