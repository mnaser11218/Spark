package com.spark.app.domain;

import java.util.Random;
import java.util.UUID;
import java.util.concurrent.atomic.AtomicLong;

public class HashtagTestSamples {

    private static final Random random = new Random();
    private static final AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    public static Hashtag getHashtagSample1() {
        return new Hashtag().id(1L).hashtagId(1L).hashtagName("hashtagName1");
    }

    public static Hashtag getHashtagSample2() {
        return new Hashtag().id(2L).hashtagId(2L).hashtagName("hashtagName2");
    }

    public static Hashtag getHashtagRandomSampleGenerator() {
        return new Hashtag()
            .id(longCount.incrementAndGet())
            .hashtagId(longCount.incrementAndGet())
            .hashtagName(UUID.randomUUID().toString());
    }
}
