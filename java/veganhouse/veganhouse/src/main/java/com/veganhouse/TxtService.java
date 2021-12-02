package com.veganhouse;

import com.veganhouse.checkout.domain.CartItem;
import com.veganhouse.domain.Product;
import com.veganhouse.domain.User;
import com.veganhouse.repository.IProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TxtService {

    @Autowired
    private IProductRepository productRepository;

    public TxtService() {
    }

    public void createProduct(Product product) {
        productRepository.save(product);
    }
}


