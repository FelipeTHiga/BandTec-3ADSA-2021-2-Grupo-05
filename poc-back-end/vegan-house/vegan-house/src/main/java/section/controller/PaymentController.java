package section.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;

public abstract class PaymentController {
    protected Boolean paid;
    protected LocalDateTime datePayament;
    protected OrderController order;

    public PaymentController() {
        this.paid = false;
        this.datePayament = null;
        this.order = new OrderController("Pendente");
    }

    public abstract Double getAmount();
}
