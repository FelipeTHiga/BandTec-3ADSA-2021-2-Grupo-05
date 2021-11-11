package com.veganhouse.repository;

import com.veganhouse.domain.Adress;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IAdressRepository extends JpaRepository<Adress,Integer> {
    Boolean existsAdressByFkUser(Integer fkUser);
    Adress findByFkUser(Integer fkUser);
}
