package com.veganhouse.observer;

import com.veganhouse.controllers.ControllerSession;
import com.veganhouse.domain.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.*;

import javax.persistence.Entity;
import java.util.List;

@RestController
@RequestMapping("/restock-subscribe")
public class EventManagerRestockController {
    @Autowired
    EventManagerRestock eventManagerRestock;

    @Autowired
    IRestockNotificationRepository repository;

    @PostMapping()
    public ResponseEntity createSubscription(@RequestBody RestockNotification restockNotification){
        //User userLogged = ControllerSession.session.getUser();
        //restockNotification.setFkUser(userLogged.getId());
        //restockNotification.setFkProduct(fkProduct);
        // O FK do produto tem que ser passado pelo JSON
        eventManagerRestock.subscribe(restockNotification);
        return ResponseEntity.status(201).body(restockNotification);
    }

    @GetMapping
    public List<RestockNotification> getAllSubscriptions(){
        return repository.findAll();
    }
}
