package com.veganhouse.controllers;

import com.veganhouse.domain.SellerCertified;
import com.veganhouse.repository.ISellerCertified;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/certifieds")
public class ControllerSellerCertified {

    @Autowired
    private ISellerCertified sellerCertifiedRepository;

    @PostMapping
    public ResponseEntity submitSellerCertified(@RequestBody List<SellerCertified> sellerCertifiedList){

        for(SellerCertified c : sellerCertifiedList) {
            sellerCertifiedRepository.save(c);
        }
        return ResponseEntity.status(201).build();
    }

    @GetMapping("/{fkSeller}")
    public ResponseEntity getSellerCertified(@PathVariable Integer fkSeller){
        if (sellerCertifiedRepository.count() > 0){
            return ResponseEntity.status(200).body(sellerCertifiedRepository.certificationList(fkSeller));
        }
        return ResponseEntity.status(204).build();
    }

}
