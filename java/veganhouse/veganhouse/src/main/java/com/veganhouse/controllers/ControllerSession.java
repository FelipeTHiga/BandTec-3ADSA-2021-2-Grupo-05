package com.veganhouse.controllers;

import com.veganhouse.domain.User;
import com.veganhouse.repository.IUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

// Classe responsável pelo login do usuário e manutenção da sessão ativa
@RestController
@RequestMapping("session")
public class ControllerSession {

    private User user;
    private static ControllerSession session;
    @Autowired
    private IUserRepository userRepository;

    public ControllerSession() {
        this.user = null;
    }

    private ControllerSession(User u) {
        this.user = u;
    }

    public static ControllerSession getSession(User u){
        if (session == null){
            session = new ControllerSession(u);
            return session;
        }
        else {
            return session;
        }
    }

    @PostMapping("login")
    public ResponseEntity login(@RequestBody User user){
        User userBD;
        userBD = userRepository.findByEmail(user.getEmail());

        if (userBD != null && userBD.getPasswordUser().equals(user.getPasswordUser())){
            ControllerSession.getSession(userBD);
            return ResponseEntity.status(200).build();
        }

        return ResponseEntity.status(204).build();
    }

    @DeleteMapping("logout")
    public ResponseEntity logout(@RequestBody User user){
        if (session.getUser().equals(user)){
            session = null;
            return ResponseEntity.status(200).build();
        }

        return ResponseEntity.status(204).build();
    }

    @GetMapping
    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
