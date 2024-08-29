package com.spark.app.domain;

import java.util.Random;
import java.util.UUID;
import java.util.concurrent.atomic.AtomicLong;

public class MentionsTestSamples {

    private static final Random random = new Random();
    private static final AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    public static Mentions getMentionsSample1() {
        return new Mentions().id(1L).mentionId(1L).mentionUsername("mentionUsername1");
    }

    public static Mentions getMentionsSample2() {
        return new Mentions().id(2L).mentionId(2L).mentionUsername("mentionUsername2");
    }

    public static Mentions getMentionsRandomSampleGenerator() {
        return new Mentions()
            .id(longCount.incrementAndGet())
            .mentionId(longCount.incrementAndGet())
            .mentionUsername(UUID.randomUUID().toString());
    }
}
