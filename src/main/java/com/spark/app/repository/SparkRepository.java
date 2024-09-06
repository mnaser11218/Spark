package com.spark.app.repository;

import com.spark.app.domain.Spark;
import com.spark.app.domain.UserProfile;
import org.hibernate.annotations.LazyToOne;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data JPA repository for the Spark entity.
 */
@SuppressWarnings("unused")
@Repository
public interface SparkRepository extends JpaRepository<Spark, Long> {
    // @Query(value = " SELECT * FROM spark join user_profile  on user_profile.id = spark.user_profile_id where user_profile.user_name = ?1 ", nativeQuery = true)
    @Query(value = "SELECT spark.* FROM SPARK \n" +
        " JOIN user_profile on user_profile.user_id = spark.user_id \n" +
        " where user_profile.user_name = ?1 " , nativeQuery = true)
    List<Spark> getSparkByUserName(String string);

    @Query(value = "SELECT * FROM SPARK WHERE body LIKE CONCAT('%#', ?1, '%')", nativeQuery = true)
    List<Spark> getSparkByHashtag(String string);

    @Query(value = "SELECT * FROM SPARK WHERE body LIKE CONCAT('%@', ?1, '%')", nativeQuery = true)
    List<Spark> getSparkByMention(String string);


//@Query(value = "SELECT * FROM SPARK WHERE body like %#?1%",nativeQuery = true)
//    List<Spark> getSparkByHashtag(String string);

//    @Query(value = "SELECT BODY * FROM SPARK \n" +
//        " JOIN user_profile on user_profile.user_id = spark.user_id\n" +
//        " where user_profile.user_name = ?1 ", nativeQuery = true)
//    Spark getSparkByUserName(String string);

}

