package com.veganhouse.repository;

import com.veganhouse.domain.Product;
import com.veganhouse.domain.Seller;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface IProductRepository extends JpaRepository<Product, Integer> {

    List<Product> findByCategory(String category);
    //List<Product> findByCategory(String category, Integer fkUser);
    List<Product> findByName(String name);
    //List<Product> findByName(String name, Integer fkUser);
    List<Product> findByFkSeller(Integer fkSeller);

    @Query(value = "select count(*) as qtd, category from product where is_avaliable = 1 group by category\n" +
            "union select count(*) as qtd, 'Todos' as category from product where is_avaliable = 1", nativeQuery = true)
    List<Object> listCountCategory();

}