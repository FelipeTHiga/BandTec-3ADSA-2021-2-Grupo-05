package com.veganhouse.repository;

import com.veganhouse.domain.Certification;
import com.veganhouse.domain.SellerCertified;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import javax.transaction.Transactional;
import java.util.List;

public interface ISellerCertified extends JpaRepository<SellerCertified, Integer> {

    @Query(value = "select name, url, id_certification from certification\n" +
                    "inner join seller_certified\n" +
                    "on fk_certification = id_certification\n" +
                    "where fk_seller = ?1 and has_certification = 1", nativeQuery = true)
    List<Object> certificationList(Integer fkSeller);

    @Modifying
    @Transactional
    @Query(value = "update seller_certified set has_certification = ?1 where fk_certification = ?2 and fk_seller = ?3",
            nativeQuery = true)
    void updateCertified(Boolean hasCertification, int fkCertification, int fkSeller);

    List<SellerCertified> findAllByFkSellerAndHasCertificationIsTrue(Integer fkSeller);

}
