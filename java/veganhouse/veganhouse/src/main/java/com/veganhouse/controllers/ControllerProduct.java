package com.veganhouse.controllers;

import com.veganhouse.domain.Product;
import com.veganhouse.exports.ControllerCsv;
import com.veganhouse.exports.ListaObj;
import com.veganhouse.repository.IProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.persistence.criteria.CriteriaBuilder;
import java.util.List;

@RestController
@RequestMapping("/product")
public class ControllerProduct {
    @Autowired
    private IProductRepository productRepository;

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

    @GetMapping("all/{id}")
    public ResponseEntity getAllProductsSeller(@PathVariable Integer fkUser){
        if (productRepository.count() > 0){
            return ResponseEntity.status(200).body(productRepository.findByFkUser(fkUser));
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
            productRepository.deleteById(id);
            return ResponseEntity.status(200).body(productRepository.findById(id).get());
        }
        return ResponseEntity.status(204).build();
    }


    @GetMapping("/tag/{category}")
    public ResponseEntity getProductsByCategory(@PathVariable String category){
        if (productRepository.count() > 0){
            return ResponseEntity.status(200).body(productRepository.findByCategory(category));
        }
        return ResponseEntity.status(204).build();
    }

    @GetMapping("{name}")
    public ResponseEntity getProductsByName(@PathVariable String name){
        if (productRepository.count() > 0){
            return ResponseEntity.status(200).body(productRepository.findByName(name));
        }
        return ResponseEntity.status(204).build();
    }

    @PostMapping("export/{nameArq}/{fkUser}")
    public ResponseEntity exportCsv(@PathVariable String nameArq, @PathVariable Integer fkUser){
        if (productRepository.count() > 0){

            List<Product> list = productRepository.findByFkUser(fkUser);
            ListaObj listaObj = new ListaObj(((int) productRepository.count()));

            for (int i = 0; i < list.size(); i++){
                listaObj.adiciona(list.get(i));
            }

            ControllerCsv.gravaArquivoCsv(listaObj, nameArq);
            return ResponseEntity.status(200).build();
        }
        return ResponseEntity.status(204).build();
    }

    @PostMapping("export/{nameArq}/{limit}/{fkUser}")
    public ResponseEntity exportCsvLimit(@PathVariable String nameArq, @PathVariable Integer limit, @PathVariable Integer fkUser){
        if (productRepository.count() > 0){

            List<Product> list = productRepository.findByFkUser(fkUser);
            ListaObj listaObj = new ListaObj(limit);

            for (int i = 0; i < list.size(); i++){
                if (!listaObj.adiciona(list.get(i))){
                    break;
                }
            }

            ControllerCsv.gravaArquivoCsv(listaObj, nameArq);
            return ResponseEntity.status(200).build();
        }
        return ResponseEntity.status(204).build();
    }

}
