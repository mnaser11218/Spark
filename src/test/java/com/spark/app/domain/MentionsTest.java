package com.spark.app.domain;

import static com.spark.app.domain.MentionsTestSamples.*;
import static com.spark.app.domain.SparkTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import com.spark.app.web.rest.TestUtil;
import java.util.HashSet;
import java.util.Set;
import org.junit.jupiter.api.Test;

class MentionsTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Mentions.class);
        Mentions mentions1 = getMentionsSample1();
        Mentions mentions2 = new Mentions();
        assertThat(mentions1).isNotEqualTo(mentions2);

        mentions2.setId(mentions1.getId());
        assertThat(mentions1).isEqualTo(mentions2);

        mentions2 = getMentionsSample2();
        assertThat(mentions1).isNotEqualTo(mentions2);
    }

    @Test
    void sparkTest() {
        Mentions mentions = getMentionsRandomSampleGenerator();
        Spark sparkBack = getSparkRandomSampleGenerator();

        mentions.addSpark(sparkBack);
        assertThat(mentions.getSparks()).containsOnly(sparkBack);

        mentions.removeSpark(sparkBack);
        assertThat(mentions.getSparks()).doesNotContain(sparkBack);

        mentions.sparks(new HashSet<>(Set.of(sparkBack)));
        assertThat(mentions.getSparks()).containsOnly(sparkBack);

        mentions.setSparks(new HashSet<>());
        assertThat(mentions.getSparks()).doesNotContain(sparkBack);
    }
}
