package com.veganhouse.controllers;


import com.veganhouse.domain.Certification;
import com.veganhouse.domain.SellerCertified;
import com.veganhouse.repository.*;
import org.springframework.boot.test.context.SpringBootTest;


//port org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.ResponseEntity;

import java.util.List;
import static org.junit.jupiter.api.Assertions.*;


import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

@SpringBootTest(classes = {ControllerSellerCertified.class, ISellerCertified.class})
public class ControllerSellerCertifiedTest {

    @MockBean
    private ISellerCertified sellerCertifiedRepository;

    @Autowired
    private ControllerSellerCertified controller;

    @Test
    void submitSellerCertifiedDeveRetornarStatus201SemCorpo(){

        Integer idTeste =10;
        Integer fkTeste = 20;
        Boolean hasCertification = true;
        List<SellerCertified> listCertificcation = List.of(mock(SellerCertified.class), mock(SellerCertified.class));

        SellerCertified certification = new SellerCertified(idTeste, fkTeste, hasCertification);

        sellerCertifiedRepository.save(certification);

       ResponseEntity resposta = controller.updateSellerCertified(listCertificcation);

       assertEquals(201, resposta.getStatusCodeValue());

    }

//    @Test
//    void getSellerCertifiedDeveRetornarStatus200SemCorpo(){
//
//        Integer idTeste = 10;
//
//        when(sellerCertifiedRepository.findAll().isEmpty()).thenReturn(true);
//
//        ResponseEntity resposta = controller.getSellerCertified(idTeste);
//
//        assertEquals(200, resposta.getStatusCodeValue());
//
//    }


}
