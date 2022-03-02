package com.veganhouse.controllers;


import com.veganhouse.domain.Cart;
import com.veganhouse.domain.Product;
import com.veganhouse.repository.IProductRepository;
import com.veganhouse.repository.IUserRepository;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.ResponseEntity;

import static org.junit.jupiter.api.Assertions.*;

import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

@SpringBootTest(classes = {ControllerCart.class, IProductRepository.class})
public class ControllerCartTest {

    @Autowired
    ControllerCart controller;


    @MockBean
    private IProductRepository productRepository;

    @MockBean
    private IUserRepository userRepository;




    private Cart cart = new Cart();


    @Test
    @DisplayName("postProduct() deve retornar 'status 404'")
    void addProductCartDeveRetornarStatus404SemCorpo(){

        Integer idTeste = 10;

        Product product = new Product(20,
                "Camisa de Algodão",
                20.2,
                "Vestimenta",
                "Camisa confortável ideal para dias quentes",
                20,
                1);

        when(productRepository.existsById(idTeste)).thenReturn(false);

        ResponseEntity  resposta = controller.addProductCart(mock(Product.class));

        assertEquals(404, resposta.getStatusCodeValue());

    }

    @Test
    @DisplayName("removeProductCart() deve retornar sem corpo 'status 404'")
    void removeProductCartDeveRetornarStatus200SemCorpo(){
        Integer idTeste = 10;

        Product product = new Product(20,
                "Camisa de Algodão",
                20.2,
                "Vestimenta",
                "Camisa confortável ideal para dias quentes",
                20,
                1);

       when(productRepository.existsById(idTeste)).thenReturn(true);

       when(productRepository.getById(idTeste)).thenReturn(product);

        ResponseEntity responsta = controller.removeProductCart(product);

        assertEquals(404, responsta.getStatusCodeValue());

    }


    @Test
    @DisplayName("addMultiProductCart() deve retornar status 404 sem corpo")
    void addMultiProductCartDeveRetornarStatus404SemCorpo(){
        Integer idTeste = 10;

        Product product = new Product(20,
                "Camisa de Algodão",
                20.2,
                "Vestimenta",
                "Camisa confortável ideal para dias quentes",
                20,
                1);

        when(productRepository.existsById(idTeste)).thenReturn(true);

        ResponseEntity  resposta = controller.addMultiProductCart(product, 20);

        assertEquals(404, resposta.getStatusCodeValue());

    }


    @Test
    void removeMultiProductCartDeveRetornarStatus200SemCorpo(){

        Integer idTeste = 10;

        Product product = new Product(20,
                "Camisa de Algodão",
                20.2,
                "Vestimenta",
                "Camisa confortável ideal para dias quentes",
                20,
                1);

        when(productRepository.existsById(idTeste)).thenReturn(true);

        cart.removeProduct(productRepository.getById(idTeste));

        ResponseEntity resposta = controller.removeMultiProductCart(product, 20);

        assertEquals(404, resposta.getStatusCodeValue());
    }






}
