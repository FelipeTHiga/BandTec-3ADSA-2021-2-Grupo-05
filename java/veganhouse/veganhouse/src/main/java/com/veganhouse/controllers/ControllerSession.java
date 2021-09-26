package com.veganhouse.controllers;

import com.veganhouse.domain.User;
import com.veganhouse.repository.IUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
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

    private ControllerSession() {
        this.user = null;
    }

    private ControllerSession(User u) {
        this.user = u;
    }

    public static ControllerSession getSession(User u){
        if (session.getUser() == null){
            session = new ControllerSession(u);
            return session;
        }
        else {
            return session;
        }
    }

    @PostMapping("login")
    public String login(@RequestBody User user){
        List<User> users = userRepository.findAll();
        for (User u : users){
            if (user.getEmail().equals(u.getEmail()) && user.getPasswordUser().equals(u.getPasswordUser())){
                session.getSession(u);
                return "Login efetuado com sucesso";
            }
        }
        return "O usuário informado não foi encontrado";
    }

    @DeleteMapping("logout")
    public String logout(@RequestBody User user){
        if (session.getUser().equals(user)){
            session = null;
        }

        return "O usuário não está logado";
    }

    @GetMapping
    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
