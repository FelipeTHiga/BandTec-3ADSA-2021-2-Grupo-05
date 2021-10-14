package com.veganhouse.observer;

import com.veganhouse.controllers.ControllerSession;
import com.veganhouse.domain.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.persistence.Entity;
import java.util.List;

@Entity
@RequestMapping("/restock-subscribe")
public class EventManagerRestockController {
    EventManagerRestock eventManagerRestock = new EventManagerRestock();

    @Autowired IRestockNotificationRepository repository;

    @PostMapping
    public ResponseEntity createSubscription(@RequestBody RestockNotification restockNotification){
        User userLogged = ControllerSession.session.getUser();
        restockNotification.setFkUsuer(userLogged.getId());
        // O FK do produto tem que ser passado pelo JSON
        eventManagerRestock.subscribe(restockNotification);
        return ResponseEntity.status(201).body(restockNotification);
    }

    @GetMapping
    public List<RestockNotification> getAllSubscriptions(){
        return repository.findAll();
    }


}
