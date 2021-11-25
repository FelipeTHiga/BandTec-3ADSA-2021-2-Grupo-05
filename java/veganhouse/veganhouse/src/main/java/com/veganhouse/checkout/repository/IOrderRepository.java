package com.veganhouse.checkout.repository;

import com.veganhouse.checkout.domain.OrderVh;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IOrderRepository extends JpaRepository<OrderVh,Integer> {
}
