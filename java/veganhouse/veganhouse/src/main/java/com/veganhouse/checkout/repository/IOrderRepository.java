package com.veganhouse.checkout.repository;

import com.veganhouse.checkout.domain.OrderVh;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import javax.persistence.criteria.CriteriaBuilder;
import javax.transaction.Transactional;
import java.util.List;

public interface IOrderRepository extends JpaRepository<OrderVh,Integer> {
    @Modifying
    @Transactional
    @Query(value = "delete from order_vh where order_status = ?1 and user_id = ?2", nativeQuery = true)
    void deleteByOrderStatusAndUserId(String status, Integer id);

}
