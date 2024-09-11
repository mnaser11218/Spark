package com.spark.app.repository;

import com.spark.app.domain.Likes;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/**
 * Spring Data JPA repository for the Likes entity.
 */
@SuppressWarnings("unused")
@Repository
public interface LikesRepository extends JpaRepository<Likes, Long> {

    @Query(value = "SELECT COUNT(*) FROM LIKES WHERE spark_id = ?1",nativeQuery = true)
    Optional<Long> getAmountOfLikesForASpark(Long sparkId);
}
