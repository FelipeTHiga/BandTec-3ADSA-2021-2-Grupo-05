package com.veganhouse.controllers;

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


@SpringBootTest(classes = {ControllerSeller.class, ISellerRepository.class, IUserRepository.class})
public class ControllerSessionTest {





}
