package com.spark.app.domain;

import java.util.Random;
import java.util.UUID;
import java.util.concurrent.atomic.AtomicLong;

public class SparkTestSamples {

    private static final Random random = new Random();
    private static final AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    public static Spark getSparkSample1() {
        return new Spark().id(1L).sparkId(1L).userId(1L).body("body1").url("url1");
    }

    public static Spark getSparkSample2() {
        return new Spark().id(2L).sparkId(2L).userId(2L).body("body2").url("url2");
    }

    public static Spark getSparkRandomSampleGenerator() {
        return new Spark()
            .id(longCount.incrementAndGet())
            .sparkId(longCount.incrementAndGet())
            .userId(longCount.incrementAndGet())
            .body(UUID.randomUUID().toString())
            .url(UUID.randomUUID().toString());
    }
}
