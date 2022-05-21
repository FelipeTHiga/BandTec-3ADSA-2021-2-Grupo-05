package com.veganhouse.repository;

import com.veganhouse.domain.Image;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface IImageRepository extends JpaRepository<Image, Integer> {
    @Query("select f.image_url1 from Image f where f.fkProduct = ?1")
    byte[] findImage1(Integer id);

    @Query("select f.image_url2 from Image f where f.fkProduct = ?1")
    byte[] findImage2(Integer id);

    @Query("select f.image_url3 from Image f where f.fkProduct = ?1")
    byte[] findImage3(Integer id);
}
