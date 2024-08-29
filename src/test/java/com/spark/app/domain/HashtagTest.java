package com.spark.app.domain;

import static com.spark.app.domain.HashtagTestSamples.*;
import static com.spark.app.domain.SparkTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import com.spark.app.web.rest.TestUtil;
import java.util.HashSet;
import java.util.Set;
import org.junit.jupiter.api.Test;

class HashtagTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Hashtag.class);
        Hashtag hashtag1 = getHashtagSample1();
        Hashtag hashtag2 = new Hashtag();
        assertThat(hashtag1).isNotEqualTo(hashtag2);

        hashtag2.setId(hashtag1.getId());
        assertThat(hashtag1).isEqualTo(hashtag2);

        hashtag2 = getHashtagSample2();
        assertThat(hashtag1).isNotEqualTo(hashtag2);
    }

    @Test
    void sparkTest() {
        Hashtag hashtag = getHashtagRandomSampleGenerator();
        Spark sparkBack = getSparkRandomSampleGenerator();

        hashtag.addSpark(sparkBack);
        assertThat(hashtag.getSparks()).containsOnly(sparkBack);

        hashtag.removeSpark(sparkBack);
        assertThat(hashtag.getSparks()).doesNotContain(sparkBack);

        hashtag.sparks(new HashSet<>(Set.of(sparkBack)));
        assertThat(hashtag.getSparks()).containsOnly(sparkBack);

        hashtag.setSparks(new HashSet<>());
        assertThat(hashtag.getSparks()).doesNotContain(sparkBack);
    }
}
