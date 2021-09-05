package section.controller;

import org.springframework.web.bind.annotation.*;
import section.model.Product;
import section.model.User;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("cart")
public class CartController {
    private List<Product> products;
    // private SectionController section;
    private User user;

    public CartController() {
        this.products = new ArrayList<>(List.of(
                new Product(11, "Chinelo wear", 10.99, "Seja na praia," +
                        " na piscina ou em casa, esteja estiloso com o chinelo wear", 55),
                new Product(89, "Bolsa ", 150.0, "A Bolsa Nike Gym Club possui um design minimalista " +
                        "e moderno, com a logo impressa na frente em verde, destacando-se no fundo escuro."
                        , 20)
        ));
    }

    public CartController(User u) {
        this.products = new ArrayList<Product>(List.of(
                new Product(11, "Chinelo wear", 10.99, "Seja na praia," +
                        " na piscina ou em casa, esteja estiloso com o chinelo wear", 55),
                new Product(89, "Bolsa ", 150.0, "A Bolsa Nike Gym Club possui um design minimalista " +
                        "e moderno, com a logo impressa na frente em verde, destacando-se no fundo escuro."
                , 20)
        ));
        user = u;
    }

    @PutMapping("add")
    public String addProduct(@RequestBody Product p){
        products.add(p);
        return String.format("%s foi adicionado com sucesso ao carrinho.", p.getName());
    }

    @DeleteMapping("remove")
    public String removeProduct(@PathVariable Integer id){
        for (Product p : products){
            if (id != null && id.equals(p.getId())){
                String nameProduct = p.getName();
                return String.format("O produto %s foi removido do carrinho.", nameProduct);
            }
        }
        return String.format("O produto de id %d foi removido do carrinho.", id);
    }

    @GetMapping("products")
    public List<Product> showProducts(){
        return products;
    }

    @GetMapping("amount")
    public Double getAmount(){
        Double amount = 0.0;
        for (Product p : products){
            amount+=p.getPrice();
        }
        return amount;
    }

    public List<Product> getProducts() {
        return products;
    }

    public void setProducts(List<Product> products) {
        this.products = products;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
