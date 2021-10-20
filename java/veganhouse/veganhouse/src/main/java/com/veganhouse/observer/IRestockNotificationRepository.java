package com.veganhouse.observer;


import org.springframework.data.jpa.repository.JpaRepository;

public interface IRestockNotificationRepository  extends JpaRepository<RestockNotification,Integer> {
    Boolean existsByFkProduct(Integer fkProduct);
}
