package com.spark.app.repository;

import com.spark.app.domain.Spark;
import com.spark.app.domain.UserProfile;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;

/**
 * Spring Data JPA repository for the UserProfile entity.
 */
@SuppressWarnings("unused")
@Repository
public interface UserProfileRepository extends JpaRepository<UserProfile, Long> {
    @Query(value = "SELECT * FROM user_profile where user_name =?1", nativeQuery = true)
    public UserProfile getUserProfileByUserName(String string);




    @Query(value="select user_profile.* from user_profile \n" +
        "join spark on spark.user_id = user_profile.user_id\n" +
        "where spark.id = ?1;", nativeQuery=true)
    public UserProfile getUserProfileBySparkId(Long sparkId);


    @Query(value="select DISTINCT user_profile.* from user_profile \n" +
        "join likes on likes.user_profile_id = user_profile.id\n" +
        "where spark_id = ?1;", nativeQuery=true)
    public List<UserProfile> getUserProfilesThatLikesASpark(Long id);
}
