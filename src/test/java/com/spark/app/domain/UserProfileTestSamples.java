package com.spark.app.domain;

import java.util.Random;
import java.util.UUID;
import java.util.concurrent.atomic.AtomicLong;

public class UserProfileTestSamples {

    private static final Random random = new Random();
    private static final AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    public static UserProfile getUserProfileSample1() {
        return new UserProfile()
            .id(1L)
            .userId(1L)
            .userName("userName1")
            .password("password1")
            .firstName("firstName1")
            .lastName("lastName1")
            .profileUrl("profileUrl1");
    }

    public static UserProfile getUserProfileSample2() {
        return new UserProfile()
            .id(2L)
            .userId(2L)
            .userName("userName2")
            .password("password2")
            .firstName("firstName2")
            .lastName("lastName2")
            .profileUrl("profileUrl2");
    }

    public static UserProfile getUserProfileRandomSampleGenerator() {
        return new UserProfile()
            .id(longCount.incrementAndGet())
            .userId(longCount.incrementAndGet())
            .userName(UUID.randomUUID().toString())
            .password(UUID.randomUUID().toString())
            .firstName(UUID.randomUUID().toString())
            .lastName(UUID.randomUUID().toString())
            .profileUrl(UUID.randomUUID().toString());
    }
}
