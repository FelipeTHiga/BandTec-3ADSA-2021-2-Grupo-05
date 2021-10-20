package com.veganhouse.repository;

import com.veganhouse.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IUserRepository extends JpaRepository<User,Integer> {

    User findByEmail(String email);
    Boolean existsByEmail(String email);
}
