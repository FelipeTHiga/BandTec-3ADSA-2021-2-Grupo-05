package com.veganhouse.services;

import com.veganhouse.domain.Product;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ProductService {
    public ProductService() {
    }

    public List<Product> getIsAvailable(List<Product> list) {
        List<Product> listAvailable = new ArrayList<>();
        for (Product p : list) {
            if (p.getAvaliable() != null && p.getAvaliable().equals(true)) {
                listAvailable.add(p);
            }
        }
        return listAvailable;
    }
}
