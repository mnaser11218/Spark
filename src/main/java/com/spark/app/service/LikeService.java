package com.spark.app.service;

import com.spark.app.domain.Likes;
import com.spark.app.domain.Spark;
import com.spark.app.domain.UserProfile;
import com.spark.app.repository.LikesRepository;
import com.spark.app.repository.SparkRepository;
import com.spark.app.repository.UserProfileRepository;
import com.spark.app.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PostMapping;

@Service
public class LikeService {

    private LikesRepository likesRepository;


    private UserProfileRepository userProfileRepository;

    private SparkRepository sparkRepository;

    public LikeService(@Autowired LikesRepository likesRepository,
                       @Autowired UserProfileRepository userProfileRepository,
                        @Autowired SparkRepository sparkrepository){
        this.likesRepository = likesRepository;
        this.userProfileRepository = userProfileRepository;
        this.sparkRepository = sparkrepository;
    }

    public Likes postALikeByUserNameaAndSpark(String userName, Likes likes, Long sparkId){
        UserProfile userProfile = new UserProfile();
        userProfile = userProfileRepository.getUserProfileByUserName(userName);
       Spark spark = sparkRepository.findById(sparkId).orElseThrow(() -> new EntityNotFoundException("Spark not found"));;
       likes.setUserProfile(userProfile);
       likes.setSpark(spark);


        return likesRepository.save(likes);
    }


}
