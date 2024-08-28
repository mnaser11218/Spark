package com.spark.app.repository;

import com.spark.app.domain.Spark;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the Spark entity.
 */
@SuppressWarnings("unused")
@Repository
public interface SparkRepository extends JpaRepository<Spark, Long> {}
