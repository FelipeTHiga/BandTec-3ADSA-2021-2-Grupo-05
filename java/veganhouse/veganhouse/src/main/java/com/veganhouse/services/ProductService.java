package com.veganhouse.services;

import com.veganhouse.checkout.repository.IOrderRepository;
import com.veganhouse.domain.Product;
import com.veganhouse.observer.EventManagerRestock;
import com.veganhouse.observer.IRestockNotificationRepository;
import com.veganhouse.repository.IProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ProductService {
    @Autowired
    IProductRepository productRepository;
    @Autowired
    private IRestockNotificationRepository restockNotificationRepository;
    @Autowired
    EventManagerRestock eventManagerRestock;

    public List<Product> getIsAvailable(List<Product> list) {
        List<Product> listAvailable = new ArrayList<>();
        for (Product p : list) {
            if (p.getAvaliable() != null && p.getAvaliable().equals(true)) {
                listAvailable.add(p);
            }
        }
        return listAvailable;
    }

    // Atualiza o estoque do produto
    public Boolean updateProduct(Product productUpdate, Integer quantity) {
        int newInventory = productUpdate.getInventory() - quantity;
        productUpdate.setInventory(newInventory);
        int id = productUpdate.getId();

        if (productRepository.existsById(id)) {
            if (restockNotificationRepository.existsByFkProduct(id)
                    && productUpdate.getInventory() > 0
                    && productRepository.getById(id).getInventory() == 0)
                eventManagerRestock.notify(id);

            productUpdate.setId(id);
            productRepository.save(productUpdate);
            return true;
        }
        return false;
    }

    public Boolean updateProduct(Integer id, Product productUpdate) {
        if (productRepository.existsById(id)) {
            if (restockNotificationRepository.existsByFkProduct(id)
                    && productUpdate.getInventory() > 0
                    && productRepository.getById(id).getInventory() == 0)
                eventManagerRestock.notify(id);

            productUpdate.setId(id);
            productRepository.save(productUpdate);
            return true;
        }
        return false;
    }
}
