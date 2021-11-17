package com.veganhouse.repository;

import com.veganhouse.domain.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface IProductRepository extends JpaRepository<Product, Integer> {

    List<Product> findByCategory(String category);
    List<Product> findByName(String name);
    List<Product> findByFkUser(Integer fkUser);

    @Query(value = "select count(*) as qtd, category from product group by category\n" +
            "union select count(*) as qtd, 'Todos' as category from product", nativeQuery = true)
    List<Object> listCountCategory();


    //@Query("select c from Carro c where c.unidadesVendidas >= ?1 and c.dataLancamento > ?2") List<Carro>
    // (Integer unidades, LocalDate data);

    //@Query("select p from Product p where p.id = p.fk_user and p.id = ?1") Product productSeller(int id);
}