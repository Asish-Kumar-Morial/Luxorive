package com.luxorive.backend.repository;

import com.luxorive.backend.model.Car;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CarRepository extends JpaRepository<Car, Long> {

    List<Car> findAllByUser_Id(Long userId);

    Long countByUserId(Long userId);

    Long countByUserIdAndSoldTrue(Long userId);
}
