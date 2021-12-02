package com.veganhouse.utils;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.FileSystemResource;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import java.io.File;

@Service
public class EmailSenderService {

    @Autowired
    private JavaMailSender javaMailSender;

    public void sendMailWithAttachment(String toEmail,
                                       String body,
                                       String subject
                                       ) {

        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("felipetsibana.h@gmail.com");
        message.setTo(toEmail);
        message.setText(body);
        message.setSubject(subject);


        javaMailSender.send(message);
        System.out.println("Mail with attachment sent successfully..");


    }
}