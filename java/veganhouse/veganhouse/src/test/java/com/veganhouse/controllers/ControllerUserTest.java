package com.veganhouse.controllers;


import com.veganhouse.domain.Adress;
import com.veganhouse.domain.Seller;
import com.veganhouse.domain.User;
import com.veganhouse.repository.IAdressRepository;
import com.veganhouse.repository.IProductRepository;
import com.veganhouse.repository.IUserRepository;
import org.junit.jupiter.api.DisplayName;
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

@SpringBootTest(classes = {ControllerUser.class, IUserRepository.class, IAdressRepository.class})
public class ControllerUserTest {

    @MockBean
    private IUserRepository userRepository;

    @MockBean
    private IAdressRepository adressRepository;

    @Autowired
    ControllerUser controller;

    @Test
    @DisplayName("createUser() deve retornar 'status 201' sem corpo")
    void createUserDeveRetornarStatus201SemCorpo(){

        User newUser = new User(10,
                "João Souza",
                "surName",
                "782649208711",
                "joao@gmail.com",
                "123");

       ResponseEntity resposta = controller.createUser(mock(User.class));

        assertEquals(201, resposta.getStatusCodeValue());

    }

    @Test
    @DisplayName("getUser() deve retornar 'status 200' sem corpo")
    void getUserDeveRetornarStatus200SemCorpo(){

        Integer idTeste = 10;
        when(userRepository.existsById(idTeste)).thenReturn(true);

        User user = mock(User.class);

        when(userRepository.findById(idTeste)).thenReturn(Optional.of(user));

        ResponseEntity resposta = controller.getUser(idTeste);

        assertEquals(200, resposta.getStatusCodeValue());

    }

    @Test
    @DisplayName("putUser() deve retornar 'status 200' sem corpo")
    void putUserDeveRetornarStatus200SemCorpo(){
        Integer idTeste = 10;
        when(userRepository.existsById(idTeste)).thenReturn(true);

        userRepository.save(mock(User.class));

        User newUser = new User(10,
                "João Souza",
                "surName",
                "782649208711",
                "joao@gmail.com",
                "123");

        ResponseEntity resposta = controller.putUser(newUser);

        assertEquals(200, resposta.getStatusCodeValue());

    }

//    @Test
//    void getUsersDeveRetornarStatus200EUmaListaDeUsuarios(){
//
//        List<User> listUser = List.of(mock(User.class), mock(User.class));
//
//        when(userRepository.findAll()).thenReturn(listUser);
//
//        when((userRepository.count() > 0)).thenReturn(true);
//
//
//        ResponseEntity resposta = controller.getUsers();
//
//        assertEquals(200, resposta.getStatusCodeValue());
//    }


    @Test
    void createSellerDeveRetornarStatus201SemCorpo(){

        Seller seller = new Seller();
        ResponseEntity resposta = controller.createSeller(seller);

        assertEquals(201, resposta.getStatusCodeValue());

    }


    @Test
    void getAdressDeveRetornarStatus200SemCorpo(){
        Integer idTeste = 10;


        when(adressRepository.existsAdressByFkUser(idTeste)).thenReturn(true);
        ResponseEntity resposta = controller.getAdress(idTeste);

        List<User> listUser = List.of(mock(User.class), mock(User.class));


        assertEquals(200, resposta.getStatusCodeValue());

    }


    @Test
    void putAdressDeveRetornarStatus200SemCorpo(){
        Integer idTeste = 10;
        when(adressRepository.existsById(idTeste)).thenReturn(true);

        Adress adress = new Adress();

        adress.setIdAdress(idTeste);

        adressRepository.save(adress);

        ResponseEntity resposta = controller.putAdress(idTeste, adress);

        assertEquals(200, resposta.getStatusCodeValue());
    }

    @Test
    void createAdressDeveRetortarStatus201SemCorpo(){
        adressRepository.save(mock((Adress.class)));

        ResponseEntity resposta = controller.createAdress(mock(Adress.class));

        assertEquals(201,resposta.getStatusCodeValue() );
    }

}
