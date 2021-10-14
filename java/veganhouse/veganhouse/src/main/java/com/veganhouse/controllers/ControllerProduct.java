package com.veganhouse.controllers;

import com.veganhouse.domain.Product;
import com.veganhouse.observer.EventManagerRestock;
import com.veganhouse.observer.IRestockNotificationRepository;
import com.veganhouse.repository.IProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/product")
public class ControllerProduct {
    @Autowired
    private IProductRepository productRepository;

    @Autowired
    private IRestockNotificationRepository restockNotificationRepository;

    EventManagerRestock eventManagerRestock = new EventManagerRestock();

    public ControllerProduct() {
    }

    @PostMapping()
    public ResponseEntity postProduct(@RequestBody Product newProduct){
        productRepository.save(newProduct);
        return ResponseEntity.status(201).build();
    }

    @PutMapping("{id}")
    public ResponseEntity putProduct(@PathVariable Integer id, @RequestBody Product product){
        if (productRepository.existsById(id)){
            if(restockNotificationRepository.existsById(id) && product.getInventory()>0)
                eventManagerRestock.notify(id);

            product.setId(id);
            productRepository.save(product);
            return ResponseEntity.status(200).build();
        }
        return ResponseEntity.status(204).build();
    }

    @GetMapping("{id}")
    public ResponseEntity getProductById(@PathVariable Integer id){
        if (productRepository.existsById(id)){
            return ResponseEntity.status(200).body(productRepository.findById(id).get());
        }
        return ResponseEntity.status(204).build();
    }

    @GetMapping("all")
    public ResponseEntity getAllProducts(){
        if (productRepository.count() > 0){
            return ResponseEntity.status(200).body(productRepository.findAll());
        }
        return ResponseEntity.status(204).build();
    }

    @DeleteMapping("{id}")
    public ResponseEntity deleteProduct(@PathVariable Integer id){
        if (productRepository.existsById(id)){
            return ResponseEntity.status(200).body(productRepository.findById(id).get());
        }
        return ResponseEntity.status(204).build();
    }

    @GetMapping("{category}")
    public ResponseEntity getProductsByCategory(@PathVariable String category){
        if (productRepository.count() > 0){
            return ResponseEntity.status(200).body(productRepository.findByCategory(category));
        }
        return ResponseEntity.status(204).build();
    }

}
