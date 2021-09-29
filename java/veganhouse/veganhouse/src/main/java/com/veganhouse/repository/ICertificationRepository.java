package com.veganhouse.repository;

import com.veganhouse.domain.Certification;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ICertificationRepository extends JpaRepository<Certification,Integer> {
}
