package com.spark.app.repository;

import com.spark.app.domain.Spark;
import com.spark.app.domain.UserProfile;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.PathVariable;

/**
 * Spring Data JPA repository for the UserProfile entity.
 */
@SuppressWarnings("unused")
@Repository
public interface UserProfileRepository extends JpaRepository<UserProfile, Long> {
    @Query(value = "SELECT * FROM user_profile where user_name =?1", nativeQuery = true)
    public UserProfile getUserProfileByUserName(String string);
}
