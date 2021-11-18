package com.veganhouse.checkout.repository;

import com.veganhouse.checkout.domain.Order;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IOrderRepository extends JpaRepository<Order,Integer> {
}
