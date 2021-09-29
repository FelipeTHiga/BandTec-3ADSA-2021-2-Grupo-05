package com.veganhouse.repository;

import com.veganhouse.domain.Seller;
import com.veganhouse.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ISellerRepository extends JpaRepository<Seller,Integer> {
}
