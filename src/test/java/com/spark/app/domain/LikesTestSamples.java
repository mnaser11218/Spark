package com.spark.app.domain;

import java.util.Random;
import java.util.concurrent.atomic.AtomicLong;

public class LikesTestSamples {

    private static final Random random = new Random();
    private static final AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    public static Likes getLikesSample1() {
        return new Likes().id(1L).liked(1L).dislike(1L);
    }

    public static Likes getLikesSample2() {
        return new Likes().id(2L).liked(2L).dislike(2L);
    }

    public static Likes getLikesRandomSampleGenerator() {
        return new Likes().id(longCount.incrementAndGet()).liked(longCount.incrementAndGet()).dislike(longCount.incrementAndGet());
    }
}
