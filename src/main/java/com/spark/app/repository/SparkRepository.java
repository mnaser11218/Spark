package com.spark.app.repository;

import com.spark.app.domain.Spark;
import org.hibernate.annotations.LazyToOne;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the Spark entity.
 */
@SuppressWarnings("unused")
@Repository
public interface SparkRepository extends JpaRepository<Spark, Long> {
//    @Query(value = "SELECT * FROM spark where id =?1", nativeQuery = true)
//    public Spark getSparkByUserId(Long id);
}
