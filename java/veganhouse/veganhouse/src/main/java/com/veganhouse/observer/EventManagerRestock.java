package com.veganhouse.observer;

import com.veganhouse.domain.Product;
import com.veganhouse.domain.User;
import com.veganhouse.repository.IProductRepository;
import com.veganhouse.repository.IUserRepository;
import com.veganhouse.utils.EmailSenderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Configurable;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@Service
public class EventManagerRestock {

    @Autowired
    private IRestockNotificationRepository restockNotificationRepository;

    @Autowired
    private IUserRepository userRepository;

    @Autowired
    private IProductRepository productRepository;

    @Autowired
    EmailSenderService emailSenderService;

    public void subscribe(RestockNotification restockNotification){
        restockNotificationRepository.save(restockNotification);
    }

    public void unsubscribe(RestockNotification restockNotification){
        restockNotificationRepository.deleteById(restockNotification.getIdRestockNotification());
    }

    public void notify(int productId){
        List<RestockNotification> restockNotificationList = restockNotificationRepository.findAll();
        List<User> usersNotified = new ArrayList();
        Product productUpdated = productRepository.findById(productId).get();

        for(RestockNotification r: restockNotificationList){
            if(r.getFkProduct() == productId)
                usersNotified.add(userRepository.findById(r.getFkUser()).get()); // Talvez o getById de erro e tenha que usar findById
        }

        for (User u : usersNotified){
//            u.sendEmail(productUpdated);
            String body = String.format("Olá, %s, o produto %s está disponível novamente!", u.getNameUser(), productUpdated.getName());
            emailSenderService.sendMailWithAttachment(u.getEmail(),body,"Novos produtos em estoque!");
        }
    }

}
