package section.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("paymentPix")
public class PixController extends PaymentController{
    private String pixCode;

    public PixController(String pixCode) {
        this.pixCode = pixCode;
    }

    public PixController() {
    }

    @Override
    @GetMapping("amount")
    public Double getAmount() {
        Double amount = 0.0;
        for (CartController c : order.getCart()){
            amount+=c.getAmount();
        }
        return amount + (amount * 0.005);
    }
}
