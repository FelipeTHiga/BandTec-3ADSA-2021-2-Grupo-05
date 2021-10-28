package com.veganhouse.repository;

import com.veganhouse.domain.Product;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface IProductRepository extends JpaRepository<Product, Integer> {

    List<Product> findByCategory(String category);
    List<Product> findByName(String name);
    List<Product> findByFkUser(Integer fkUser);
}