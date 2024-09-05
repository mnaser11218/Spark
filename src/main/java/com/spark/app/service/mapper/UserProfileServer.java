package com.spark.app.service.mapper;

import com.spark.app.domain.UserProfile;
import com.spark.app.repository.UserProfileRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserProfileServer {
    UserProfileRepository userProfileRepository;
    public UserProfileServer(@Autowired UserProfileRepository userProfileRepository){
        this.userProfileRepository = userProfileRepository;
    }

    public UserProfile getUserProfileByUserName(String string){
       return userProfileRepository.getUserProfileByUserName(string);
    }
}
