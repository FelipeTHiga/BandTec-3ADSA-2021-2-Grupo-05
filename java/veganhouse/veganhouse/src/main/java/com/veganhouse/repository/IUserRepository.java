package com.veganhouse.repository;

import com.veganhouse.domain.User;
import com.veganhouse.domain.Adress;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Collection;

public interface IUserRepository extends JpaRepository<User,Integer> {
}
