package com.veganhouse.controllers;

import com.veganhouse.domain.Image;
import com.veganhouse.domain.Product;
import com.veganhouse.domain.Seller;
import com.veganhouse.exports.ControllerCsv;
import com.veganhouse.exports.ControllerTxt;
import com.veganhouse.exports.ListaObj;
import com.veganhouse.observer.EventManagerRestock;
import com.veganhouse.observer.IRestockNotificationRepository;

import com.veganhouse.productsCommander.ProductCommander;
import com.veganhouse.repository.IImageRepository;
import com.veganhouse.repository.IProductRepository;
import com.veganhouse.repository.ISellerRepository;
import com.veganhouse.services.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import java.io.File;
import java.io.IOException;
import java.net.URISyntaxException;
import java.nio.file.Files;
import java.nio.file.Path;
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
    private IImageRepository imageRepository;

    @Autowired
    private IRestockNotificationRepository restockNotificationRepository;

    @Autowired
    EventManagerRestock eventManagerRestock;

    @Autowired
    ProductCommander productCommander;

    @Autowired
    private ProductService productService;

    @Autowired
    ISellerRepository sellerRepository;

    @Autowired
    ISellerRepository userRepository;

    @Autowired
    ControllerTxt controllerTxt;

    public ControllerProduct() {
    }

    @PostMapping()
    public ResponseEntity postProduct(@RequestBody @Valid Product newProduct) {
        newProduct.setAvailable(true);
        productRepository.save(newProduct);
        return ResponseEntity.status(201).body(newProduct);
    }

    @PutMapping("{id}")
    public ResponseEntity putProduct(@PathVariable Integer id, @RequestBody @Valid Product product) {
        return productService.updateProduct(id, product) ? ResponseEntity.ok().body(product) : ResponseEntity.status(400).build();
    }

    @PatchMapping("{id}")
    public ResponseEntity patchProduct(@PathVariable Integer id, @RequestBody Product product) {

        if (productRepository.existsById(id)) {
            if (restockNotificationRepository.existsByFkProduct(id)
                    && product.getInventory() > 0
                    && productRepository.findById(id).get().getInventory() == 0)
                eventManagerRestock.notify(id);

            product.setId(id);
            product.setAvailable(true);
            productRepository.save(product);
            return ResponseEntity.status(200).build();
        }
        return ResponseEntity.status(404).build();
    }

    @PostMapping("/image/{id}")
    public ResponseEntity postImageProduct(@PathVariable Integer id,
                                            @RequestParam MultipartFile foto1,
                                            @RequestParam MultipartFile foto2,
                                            @RequestParam MultipartFile foto3) throws IOException {

        Image images = new Image();

        byte[] novaFoto1 = foto1.getBytes();
        byte[] novaFoto2 = foto2.getBytes();
        byte[] novaFoto3 = foto3.getBytes();

        images.setImage_url1(novaFoto1);
        images.setImage_url2(novaFoto2);
        images.setImage_url3(novaFoto3);
        images.setFkProduct(id);

        imageRepository.save(images);
        return ResponseEntity.status(200).build();
    }

    @GetMapping("/image/{id}/{idImage}")
    public ResponseEntity getFoto(@PathVariable int id, @PathVariable int idImage) throws IOException, URISyntaxException {
        Product product = productRepository.findById(id).get();

        byte[] foto;

        if (idImage == 1) {
            foto = product.getImage_url1();
        } else if (idImage == 2) {
            foto = product.getImage_url2();
        } else {
            foto = product.getImage_url3();
        }

        if (foto == null) {
            byte[] withoutImage = Files.readAllBytes(Path.of(getClass().getResource("/product-without-image.jpg").toURI()));
            return ResponseEntity
                    .status(200)
                    .header("content-type", "image/jpeg")
                    .body(withoutImage);
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

        if ("Todos".equals(category)) {
            List<Product> listAll = productService.getIsAvailable(productRepository.findAll());
            if(!listAll.isEmpty()) {
                return ResponseEntity.status(200).body(listAll);
            } else {
                return ResponseEntity.status(204).build();
            }
        } else {
            List<Product> listByCategory = productService.getIsAvailable(productRepository.findByCategory(category));
            if(!listByCategory.isEmpty()) {
                return ResponseEntity.status(200).body(listByCategory);
            } else {
                return ResponseEntity.status(204).build();
            }
        }

    }

    @GetMapping("/tag/{category}/{idSeller}")
    public ResponseEntity getProductByCategoryIdSeller(@PathVariable String category, @PathVariable Integer idSeller) {

        List<Product> listSearch = new ArrayList<>();
        if (!productRepository.findAll().isEmpty()) {
            List<Product> list = productRepository.findByCategory(category);
            for (Product p : list) {
                if (p.getFkSeller() != null && p.getFkSeller().equals(idSeller)) {
                    listSearch.add(p);
                }
            }
            if (!listSearch.isEmpty()) {
                return ResponseEntity.status(200).body(productService.getIsAvailable(listSearch));
            } else {
                return ResponseEntity.status(204).build();
            }
        }
        return ResponseEntity.status(204).build();
    }

    @GetMapping("/filter/{filter}/{category}")
    public ResponseEntity getProductByFilter(@PathVariable String filter, @PathVariable String category) {

        List<Product> products;

        if ("Todos".equals(category)) {
            products = productService.getIsAvailable(productRepository.findAll());
        } else {
            products = productService.getIsAvailable((productRepository.findByCategory(category)));
        }

        if(products.isEmpty()) {
            return ResponseEntity.status(204).body(products);
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
    public ResponseEntity getCountCategory() {
        if (!(productRepository.count() > 0)) {
            return ResponseEntity.status(404).build();
        }
        return ResponseEntity.status(200).body(productRepository.listCountCategory());
    }

    @GetMapping("all/{idSeller}")
    public ResponseEntity getAllProductsSeller(@PathVariable Integer idSeller) {
        List<Product> list = productService.getIsAvailable(productRepository.findByFkSeller(idSeller));
        if (list.isEmpty()) {
            return ResponseEntity.status(204).body(list);
        }
        return ResponseEntity.status(200).body(list);
    }

    @GetMapping("all")
    public ResponseEntity getAllProducts() {
        List<Product> list = productRepository.findAllByIsAvailableTrue();
        return ResponseEntity.status(200).body(list);
    }

    @GetMapping("last-new-products")
    public ResponseEntity getLastThreeNewProducts() {
        if (productRepository.count() > 0) {
            return ResponseEntity.status(200).body((productRepository.listLastNewProducts()));
        }
        return ResponseEntity.status(404).build();
    }

    @GetMapping("featured-product")
    public ResponseEntity getFeaturedProduct() {
        if (productRepository.count() > 0) {
            return ResponseEntity.status(200).body(productRepository.featuredProduct());
        }
        return ResponseEntity.status(404).build();

    }

    @DeleteMapping("{id}")
    public ResponseEntity deleteProduct(@PathVariable Integer id) {
        if (productRepository.existsById(id)) {
            Product product = productRepository.findById(id).get();
            product.setAvailable(false);
            productRepository.save(product);
            productCommander.pushCommand("delete", product);
            return ResponseEntity.status(200).build();
        }
        return ResponseEntity.status(404).build();
    }

    @GetMapping("/name/{name}")
    public ResponseEntity getProductsByName(@PathVariable String name) {

        List<Product> productSearched = productService.getIsAvailable(productRepository.findByName(name));

        if (productSearched.isEmpty()) {
            return ResponseEntity.status(204).body(productSearched);
        }
        return ResponseEntity.status(200).body(productSearched);
    }

    @GetMapping("/name/{name}/{idSeller}")
    public ResponseEntity getProductsByName(@PathVariable String name, @PathVariable Integer idSeller) {

        List<Product> listSearched = new ArrayList<>();
        List<Product> productSearched = productService.getIsAvailable(productRepository.findByName(name));

        for (Product p : productSearched) {
            if (p.getFkSeller() != null && p.getFkSeller().equals(idSeller)) {
                listSearched.add(p);
            }
        }

        if (listSearched.isEmpty()) {
            return ResponseEntity.status(204).body(listSearched);
        }
        return ResponseEntity.status(200).body(listSearched);

    }

    @PostMapping("exportCsv/{nameArq}/{fkSeller}")
    public ResponseEntity exportCsv(@PathVariable String nameArq, @PathVariable Integer fkSeller) {

        List<Product> list = productService.getIsAvailable(productRepository.findByFkSeller(fkSeller));
        ListaObj listaObj = new ListaObj(((int) productRepository.count()));

        if (!list.isEmpty()) {

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

        List<Product> list = productService.getIsAvailable(productRepository.findByFkSeller(fkSeller));
        ListaObj listaObj = new ListaObj(limit);

        if (!list.isEmpty()) {

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
    public ResponseEntity exportTxt(@PathVariable String fileName, @PathVariable Integer fkSeller) throws IOException {

        List<Product> list = productService.getIsAvailable(productRepository.findByFkSeller(fkSeller));
        ListaObj listaObj = new ListaObj(((int) productRepository.count()));

        if (!list.isEmpty()) {

            for (int i = 0; i < list.size(); i++) {
                listaObj.adiciona(list.get(i));
            }
            controllerTxt.recordFileTxt(listaObj, fileName);
            return ResponseEntity.status(200).build();
        }
        return ResponseEntity.status(204).build();
    }

    @PatchMapping("importTxt/{idUser}")
    public ResponseEntity importTxt(@PathVariable int idUser, @RequestParam MultipartFile txt) throws IOException {

        if (!txt.isEmpty()) {
            Seller seller = sellerRepository.findByFkUser(idUser);
            return ResponseEntity.status(200).body(controllerTxt.readDisplayFileTxt(seller, txt.getInputStream()));
        }

        return ResponseEntity.status(204).build();

    }

    @PostMapping("/undo")
    public ResponseEntity undoCommand() {
        productCommander.undo();
        return ResponseEntity.status(200).build();
    }

    @PostMapping("/redo")
    public ResponseEntity redoCommand() {
        productCommander.redo();
        return ResponseEntity.status(200).build();
    }

    @GetMapping("/images/{id}/{idImage}")
    public ResponseEntity getPhoto(@PathVariable int id, @PathVariable int idImage) throws IOException, URISyntaxException {

        if (idImage == 1) {
            byte[] foto = imageRepository.findImage1(id);
            if (foto == null) {
                foto = Files.readAllBytes(Path.of(getClass().getResource("/product-without-image.jpg").toURI()));
            }
            return ResponseEntity
                    .status(200)
                    .header("content-type", "image/jpeg")
                    .body(foto);
        }

        if (idImage == 2) {
            byte[] foto = imageRepository.findImage2(id);
            if (foto == null) {
                foto = Files.readAllBytes(Path.of(getClass().getResource("/product-without-image.jpg").toURI()));
            }
            return ResponseEntity
                    .status(200)
                    .header("content-type", "image/jpeg")
                    .body(foto);
        }

        if (idImage == 3) {
            byte[] foto = imageRepository.findImage3(id);
            if (foto == null) {
                foto = Files.readAllBytes(Path.of(getClass().getResource("/product-without-image.jpg").toURI()));
            }
            return ResponseEntity
                    .status(200)
                    .header("content-type", "image/jpeg")
                    .body(foto);
        }

        File imgPath = new File("src/main/resources/product-without-image.jpg");
        byte[] withoutImage = Files.readAllBytes(imgPath.toPath());
        return ResponseEntity
                .status(200)
                .header("content-type", "image/jpeg")
                .body(withoutImage);
    }
}
