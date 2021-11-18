package com.veganhouse.repository;

import com.veganhouse.domain.Certification;
import com.veganhouse.domain.SellerCertified;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.util.List;

public interface ISellerCertified extends JpaRepository<SellerCertified, Integer> {

    @Query(value = "select name, url from certification\n" +
                    "inner join seller_certified\n" +
                    "on fk_certification = id_certification\n" +
                    "where fk_seller = ?1", nativeQuery = true)
    List<Object> certificationList(Integer fkSeller);

}
