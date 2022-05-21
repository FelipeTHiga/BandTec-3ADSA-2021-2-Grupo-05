package com.veganhouse.controllers;


import com.veganhouse.domain.Seller;
import com.veganhouse.domain.User;
import com.veganhouse.repository.ISellerRepository;
import com.veganhouse.repository.IUserRepository;
import org.springframework.boot.test.context.SpringBootTest;

import com.veganhouse.repository.ISellerCertified;



import com.veganhouse.repository.IAdressRepository;
import com.veganhouse.repository.ISellerRepository;
import com.veganhouse.repository.IUserRepository;
import org.springframework.boot.test.context.SpringBootTest;
//port org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;


import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;
import static org.junit.jupiter.api.Assertions.*;


@SpringBootTest(classes = {ControllerSeller.class, ISellerRepository.class, IUserRepository.class})
public class ControllerSellerTest {

//    @org.springframework.beans.factory.annotation.Autowired(required=true)
//    private ISellerRepository sellerRepository;
//
//    @MockBean
//    private IUserRepository userRepository;
//
//    @Autowired
//    private ControllerSeller controller;
//
//    @Test
//    void getSellerDeveRetornarStatus200SemCorpo(){
//        Integer idTeste = 10;
//        Integer idFkTeste = 20;
//
//
//        User user = mock(User.class);
//
//        when(sellerRepository.findByFkUser(idFkTeste)).thenReturn(mock(Seller.class));
//
//
//        ResponseEntity resposta = controller.getSeller(idTeste);
//
//
//        assertEquals(200, resposta.getStatusCodeValue());
//    }
//
//
//    @Test
//    void updateSellerDeveRetornarStatus200SemCorpo(){
//
//        Integer idTeste = 10;
//        when(sellerRepository.existsById(idTeste)).thenReturn(true);
//
//        Seller seller = new Seller();
//        seller.setIdSeller(idTeste);
//        sellerRepository.save(seller);
//
//       ResponseEntity resposta = controller.updateSeller(idTeste, seller);
//
//       assertEquals(200, resposta.getStatusCodeValue());
//
//    }


}
