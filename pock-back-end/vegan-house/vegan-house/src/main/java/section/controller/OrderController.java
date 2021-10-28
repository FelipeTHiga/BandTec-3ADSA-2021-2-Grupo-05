package section.controller;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import section.model.User;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("order")
public class OrderController {
    private String status;
    private LocalDateTime dateRequest;
    private List<CartController> cart;

    public OrderController(String status) {
        this.status = status;
        this.dateRequest = LocalDateTime.now();
        cart = new ArrayList<CartController>(List.of(new CartController
                (new User("Ana", "50700745-X", "400.900.110-30", "(11)93883-9787",
                          "ana321@gmail.com", "ana321", "senha12")
                )));
    }

    public OrderController() {
    }

    @PutMapping("changeStatus")
    public String changeStatus(@PathVariable String status){
        this.status = status;
        return "O status do pedido foi alterado para " + status;
    }


    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public LocalDateTime getDateRequest() {
        return dateRequest;
    }

    public void setDateRequest(LocalDateTime dateRequest) {
        this.dateRequest = dateRequest;
    }

    public List<CartController> getCart() {
        return cart;
    }

    public void setCart(List<CartController> cart) {
        this.cart = cart;
    }
}
