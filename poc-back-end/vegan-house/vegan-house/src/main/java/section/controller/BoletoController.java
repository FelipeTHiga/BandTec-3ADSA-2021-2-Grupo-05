package section.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("paymentBoleto")
public class BoletoController extends PaymentController{
    private Integer boletoCode;

    public BoletoController(Integer boletoCode) {
        this.boletoCode = boletoCode;
    }

    public BoletoController() {
    }

    @Override
    @GetMapping("amount")
    public Double getAmount() {
        Double amount = 0.0;
        for (CartController c : order.getCart()){
            amount+=c.getAmount();
        }
        return amount + (amount * 0.02);
    }
}
