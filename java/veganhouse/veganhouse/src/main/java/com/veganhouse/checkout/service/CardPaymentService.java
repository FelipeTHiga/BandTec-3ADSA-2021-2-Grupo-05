package com.veganhouse.checkout.service;

import com.mercadopago.MercadoPago;
import com.mercadopago.exceptions.MPException;
import com.mercadopago.resources.Payment;
import com.mercadopago.resources.datastructures.payment.Identification;
import com.mercadopago.resources.datastructures.payment.Payer;

import com.veganhouse.checkout.dto.CardPaymentDTO;
import com.veganhouse.checkout.dto.PaymentResponseDTO;
import com.veganhouse.checkout.exception.MercadoPagoException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class CardPaymentService {
    @Value("TEST-2307734018054635-110914-05f2f63474c89509d251a40d5e9abcdc-665755661")
    private String mercadoPagoAccessToken;

    public PaymentResponseDTO processPayment(CardPaymentDTO cardPaymentDTO) {
        try {
            MercadoPago.SDK.setAccessToken(mercadoPagoAccessToken);
            MercadoPago.SDK.configure(mercadoPagoAccessToken);

            Payment payment = new Payment();
            payment.setTransactionAmount(cardPaymentDTO.getTransactionAmount())
                    .setToken(cardPaymentDTO.getToken())
                    .setDescription(cardPaymentDTO.getProductDescription())
                    .setInstallments(cardPaymentDTO.getInstallments())
                    .setPaymentMethodId(cardPaymentDTO.getPaymentMethodId());

            Identification identification = new Identification();
            identification.setType(cardPaymentDTO.getPayer().getIdentification().getType())
                    .setNumber(cardPaymentDTO.getPayer().getIdentification().getNumber());

            Payer payer = new Payer();
            payer.setEmail(cardPaymentDTO.getPayer().getEmail());
            payer.setIdentification(identification);

            payment.setPayer(payer);

            Payment createdPayment = payment.save();

            PaymentResponseDTO paymentResponseDTO = new PaymentResponseDTO(
                    createdPayment.getId(),
                    String.valueOf(createdPayment.getStatus()),
                    createdPayment.getStatusDetail()
            );

            return paymentResponseDTO;
        } catch (MPException exception) {
            throw new MercadoPagoException(exception.getMessage());
        }
    }
}
