package com.veganhouse.controllers;

import com.veganhouse.domain.Certification;
import com.veganhouse.domain.SellerCertified;
import com.veganhouse.repository.ICertificationRepository;
import com.veganhouse.repository.ISellerCertified;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/certifieds")
public class ControllerSellerCertified {

    @Autowired
    private ISellerCertified sellerCertifiedRepository;
    @Autowired
    private ICertificationRepository certificationRepository;

    @PatchMapping
    public ResponseEntity updateSellerCertified(@RequestBody List<SellerCertified> sellerCertifiedList) {
        for (SellerCertified c : sellerCertifiedList) {
            sellerCertifiedRepository.updateCertified(c.getHasCertification(), c.getFkCertification(), c.getFkSeller());
        }
        return ResponseEntity.status(201).build();
    }

    @GetMapping("/{fkSeller}")
    public ResponseEntity getSellerCertified(@PathVariable Integer fkSeller) {
        if (sellerCertifiedRepository.count() > 0) {
            return ResponseEntity.status(200).body(sellerCertifiedRepository.certificationList(fkSeller));
        }
        return ResponseEntity.status(204).build();
    }

    @GetMapping("/mobile/{fkSeller}")
    public ResponseEntity getSellerCertifiedById(@PathVariable Integer fkSeller) {
        List<Certification> certificationList = new ArrayList<>();

        List<SellerCertified> sellerCertifiedList = sellerCertifiedRepository.findAllByFkSellerAndHasCertificationIsTrue(fkSeller);

        for (SellerCertified s : sellerCertifiedList) {
            Certification c = certificationRepository.findById(s.getFkCertification()).get();
            certificationList.add(c);
        }

        return ResponseEntity.status(200).body(certificationList);
    }

}
