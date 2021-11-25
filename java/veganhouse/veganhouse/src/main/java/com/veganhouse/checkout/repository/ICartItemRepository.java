package com.veganhouse.checkout.repository;


import com.veganhouse.checkout.domain.CartItem;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ICartItemRepository extends JpaRepository<CartItem,Integer> {
    // select * CartItems where fkUser = <id_user_logado>
    List<CartItem> findByFkUser(int userId);
}
