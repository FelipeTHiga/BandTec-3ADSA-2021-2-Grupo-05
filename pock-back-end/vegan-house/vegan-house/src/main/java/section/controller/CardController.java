package section.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import section.model.Product;

import java.util.List;

@RestController
@RequestMapping("paymentCard")
public class CardController extends PaymentController{
    private String cardNumber;

    public CardController(String cardNumber) {
        this.cardNumber = cardNumber;
    }

    public CardController() {
    }

    @Override
    @GetMapping("amount")
    public Double getAmount() {
        Double amount = 0.0;
        for (CartController c : order.getCart()){
            amount+=c.getAmount();
        }

        return amount + (amount * 0.01);
    }
}
