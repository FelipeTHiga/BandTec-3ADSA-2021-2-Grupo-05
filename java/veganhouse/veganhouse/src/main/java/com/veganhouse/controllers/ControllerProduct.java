package com.veganhouse.controllers;

import com.veganhouse.domain.Product;
import com.veganhouse.exports.ControllerCsv;
import com.veganhouse.exports.ControllerTxt;
import com.veganhouse.exports.ListaObj;
import com.veganhouse.observer.EventManagerRestock;
import com.veganhouse.observer.IRestockNotificationRepository;

import com.veganhouse.productsCommander.ProductCommander;
import com.veganhouse.repository.IProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.persistence.criteria.CriteriaBuilder;
import javax.validation.Valid;
import java.io.IOException;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/products")
public class ControllerProduct {
    @Autowired
    private IProductRepository productRepository;

    @Autowired
    private IRestockNotificationRepository restockNotificationRepository;

    @Autowired
    EventManagerRestock eventManagerRestock;

    @Autowired
    ProductCommander productCommander;

    public ControllerProduct() {
    }

    @PostMapping()
    public ResponseEntity postProduct(@RequestBody @Valid Product newProduct) {
        productRepository.save(newProduct);
        return ResponseEntity.status(201).build();
    }

    @PutMapping("{id}")
    public ResponseEntity putProduct(@PathVariable Integer id, @RequestBody @Valid Product product) {

        if (productRepository.existsById(id)) {
            if (restockNotificationRepository.existsByFkProduct(id)
                    && product.getInventory() > 0
                    && productRepository.getById(id).getInventory() == 0)
                eventManagerRestock.notify(id);

            product.setId(id);
            productRepository.save(product);
            return ResponseEntity.status(200).build();
        }
        return ResponseEntity.status(404).build();
    }

    @PatchMapping("{id}")
    public ResponseEntity patchProduct(@PathVariable Integer id, @RequestBody Product product) {

        if (productRepository.existsById(id)){
            if(restockNotificationRepository.existsByFkProduct(id)
                    && product.getInventory()>0
                    && productRepository.getById(id).getInventory()==0)
                eventManagerRestock.notify(id);

            product.setId(id);
            productRepository.save(product);
            return ResponseEntity.status(200).build();
        }
        return ResponseEntity.status(404).build();
    }


    @PatchMapping("/image/{id}")
    public ResponseEntity patchImageProduct(@PathVariable Integer id,
                                            @RequestParam MultipartFile foto1,
                                            @RequestParam MultipartFile foto2,
                                            @RequestParam MultipartFile foto3) throws IOException  {

       Product product = productRepository.findById(id).get();

        byte[] novaFoto1 = foto1.getBytes();
        byte[] novaFoto2 = foto2.getBytes();
        byte[] novaFoto3 = foto3.getBytes();

        product.setImage_url1(novaFoto1);
        product.setImage_url2(novaFoto2);
        product.setImage_url3(novaFoto3);

        productRepository.save(product);
        return ResponseEntity.status(200).build();
    }


    @GetMapping("/image/{id}/{idImage}")
    public ResponseEntity getFoto(@PathVariable int id, @PathVariable int idImage) {
        Product product = productRepository.findById(id).get();

        byte[] foto;
        if (idImage == 1){
             foto = product.getImage_url1();
        } else if (idImage == 2) {
            foto = product.getImage_url2();
        } else {
            foto = product.getImage_url3();
        }

        return ResponseEntity
                .status(200)
                .header("content-type", "image/jpeg")
                .body(foto);
    }



    @GetMapping("{id}")
    public ResponseEntity getProductById(@PathVariable int id) {
        if (productRepository.existsById(id)) {
            return ResponseEntity.status(200).body(productRepository.findById(id).get());
        }
        return ResponseEntity.status(404).build();
    }

    @GetMapping("/tag/{category}")
    public ResponseEntity getProductByCategory(@PathVariable String category) {
        if (productRepository.count() > 0) {
            if ("Todos".equals(category)) {
                return ResponseEntity.status(200).body(productRepository.findAll());
            }
            return ResponseEntity.status(200).body(productRepository.findByCategory(category));
        }
        return ResponseEntity.status(204).build();
    }

    @GetMapping("/filter/{filter}/{category}")
    public ResponseEntity getProductByFilter(@PathVariable String filter, @PathVariable String category) {

        if (!(productRepository.count() > 0)) {
            return ResponseEntity.status(404).build();
        }

        List<Product> products;

        if ("Todos".equals(category)) {
            products = productRepository.findAll();
        } else {
            products = productRepository.findByCategory(category);
        }

        if ("name".equals(filter)) {
            return ResponseEntity.status(200).body(products.stream()
                    .sorted(Comparator.comparing(Product::getName))
                    .collect(Collectors.toList()));
        } else if ("lowest-price".equals(filter)) {
            return ResponseEntity.status(200).body(products.stream()
                    .sorted(Comparator.comparing(Product::getPrice))
                    .collect(Collectors.toList()));
        } else if ("highest-price".equals(filter)) {
            return ResponseEntity.status(200).body(products.stream()
                    .sorted(Comparator.comparing(Product::getPrice)
                            .reversed())
                    .collect(Collectors.toList()));
        }
        return ResponseEntity.status(404).build();
    }

    @GetMapping("countCategory")
    public ResponseEntity getCountCategory(){
        if (!(productRepository.count() > 0)) {
            return ResponseEntity.status(404).build();
        }
        return ResponseEntity.status(200).body(productRepository.listCountCategory());
    }

//    @GetMapping("{id}/productSeller")
//    public ResponseEntity getProductByIdAndSeller(@PathVariable int id) {
//        if (productRepository.existsById(id)) {
//            return ResponseEntity.status(200).body(productRepository.productSeller(id));
//        }
//        return ResponseEntity.status(204).build();
//    }

    @GetMapping("all/{id}")
    public ResponseEntity getAllProductsSeller(@PathVariable Integer fkSeller) {
        if (productRepository.count() > 0) {
            return ResponseEntity.status(200).body(productRepository.findByFkSeller(fkSeller));
        }
        return ResponseEntity.status(404).build();
    }

    @GetMapping("all")
    public ResponseEntity getAllProducts() {
        if (productRepository.count() > 0) {
            return ResponseEntity.status(200).body(productRepository.findAll());
        }
        return ResponseEntity.status(404).build();
    }

    @DeleteMapping("{id}")
    public ResponseEntity deleteProduct(@PathVariable Integer id) {
        if (productRepository.existsById(id)) {
            productRepository.deleteById(id);
            productCommander.pushCommand("delete", productRepository.getById(id));
            return ResponseEntity.status(200).build();
        }
        return ResponseEntity.status(404).build();
    }

    @GetMapping("/name/{name}")
    public ResponseEntity getProductsByName(@PathVariable String name) {
        if (productRepository.count() > 0) {
            return ResponseEntity.status(200).body(productRepository.findByName(name));
        }
        return ResponseEntity.status(404).build();
    }

    @GetMapping("/name/{name}/{id}")
    public ResponseEntity getProductsByName(@PathVariable String name, @PathVariable Integer id){
        if (productRepository.count() > 0){
            return ResponseEntity.status(200).body(productRepository.findByName(name));
        }
        return ResponseEntity.status(404).build();
    }

    @PostMapping("exportCsv/{nameArq}/{fkSeller}")
    public ResponseEntity exportCsv(@PathVariable String nameArq, @PathVariable Integer fkSeller) {
        if (productRepository.count() > 0) {

            List<Product> list = productRepository.findByFkSeller(fkSeller);
            ListaObj listaObj = new ListaObj(((int) productRepository.count()));

            for (int i = 0; i < list.size(); i++) {
                listaObj.adiciona(list.get(i));
            }

            ControllerCsv.gravaArquivoCsv(listaObj, nameArq);
            return ResponseEntity.status(200).build();
        }
        return ResponseEntity.status(204).build();
    }

    @PostMapping("exportCsv/{nameArq}/{limit}/{fkSeller}")
    public ResponseEntity exportCsvLimit(@PathVariable String nameArq, @PathVariable Integer limit, @PathVariable Integer fkSeller) {
        if (productRepository.count() > 0) {

            List<Product> list = productRepository.findByFkSeller(fkSeller);
            ListaObj listaObj = new ListaObj(limit);

            for (int i = 0; i < list.size(); i++) {
                if (!listaObj.adiciona(list.get(i))) {
                    break;
                }
            }

            ControllerCsv.gravaArquivoCsv(listaObj, nameArq);
            return ResponseEntity.status(200).build();
        }
        return ResponseEntity.status(204).build();
    }

    @PostMapping("exportTxt/{fileName}/{fkSeller}")
    public ResponseEntity exportTxt(@PathVariable String fileName, @PathVariable Integer fkSeller) {
        if (productRepository.count() > 0) {

            List<Product> list = productRepository.findByFkSeller(fkSeller);
            ListaObj listaObj = new ListaObj(((int) productRepository.count()));

            for (int i = 0; i < list.size(); i++) {
                listaObj.adiciona(list.get(i));
            }

            ControllerTxt.recordFileTxt(listaObj, fileName);
            return ResponseEntity.status(200).build();
        }
        return ResponseEntity.status(204).build();
    }

//    @PostMapping("importTxt/{fileName}/{}")
//    public ResponseEntity importTxt(@PathVariable String fileName){
//        if (productRepository.count() > 0) {
//
//        }

    @PostMapping("/undo")
    public ResponseEntity undoCommand(){
        productCommander.undo();
        return ResponseEntity.status(200).build();
    }

    @PostMapping("/redo")
    public ResponseEntity redoCommand(){
        productCommander.redo();
        return ResponseEntity.status(200).build();
    }

}
