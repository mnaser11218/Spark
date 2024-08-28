package com.spark.app.domain;

import static com.spark.app.domain.HashtagTestSamples.*;
import static com.spark.app.domain.MentionsTestSamples.*;
import static com.spark.app.domain.SparkTestSamples.*;
import static com.spark.app.domain.UserProfileTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import com.spark.app.web.rest.TestUtil;
import java.util.HashSet;
import java.util.Set;
import org.junit.jupiter.api.Test;

class SparkTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Spark.class);
        Spark spark1 = getSparkSample1();
        Spark spark2 = new Spark();
        assertThat(spark1).isNotEqualTo(spark2);

        spark2.setId(spark1.getId());
        assertThat(spark1).isEqualTo(spark2);

        spark2 = getSparkSample2();
        assertThat(spark1).isNotEqualTo(spark2);
    }

    @Test
    void userProfileTest() {
        Spark spark = getSparkRandomSampleGenerator();
        UserProfile userProfileBack = getUserProfileRandomSampleGenerator();

        spark.setUserProfile(userProfileBack);
        assertThat(spark.getUserProfile()).isEqualTo(userProfileBack);

        spark.userProfile(null);
        assertThat(spark.getUserProfile()).isNull();
    }

    @Test
    void mentionTest() {
        Spark spark = getSparkRandomSampleGenerator();
        Mentions mentionsBack = getMentionsRandomSampleGenerator();

        spark.addMention(mentionsBack);
        assertThat(spark.getMentions()).containsOnly(mentionsBack);
        assertThat(mentionsBack.getSparks()).containsOnly(spark);

        spark.removeMention(mentionsBack);
        assertThat(spark.getMentions()).doesNotContain(mentionsBack);
        assertThat(mentionsBack.getSparks()).doesNotContain(spark);

        spark.mentions(new HashSet<>(Set.of(mentionsBack)));
        assertThat(spark.getMentions()).containsOnly(mentionsBack);
        assertThat(mentionsBack.getSparks()).containsOnly(spark);

        spark.setMentions(new HashSet<>());
        assertThat(spark.getMentions()).doesNotContain(mentionsBack);
        assertThat(mentionsBack.getSparks()).doesNotContain(spark);
    }

    @Test
    void hashtagTest() {
        Spark spark = getSparkRandomSampleGenerator();
        Hashtag hashtagBack = getHashtagRandomSampleGenerator();

        spark.addHashtag(hashtagBack);
        assertThat(spark.getHashtags()).containsOnly(hashtagBack);
        assertThat(hashtagBack.getSparks()).containsOnly(spark);

        spark.removeHashtag(hashtagBack);
        assertThat(spark.getHashtags()).doesNotContain(hashtagBack);
        assertThat(hashtagBack.getSparks()).doesNotContain(spark);

        spark.hashtags(new HashSet<>(Set.of(hashtagBack)));
        assertThat(spark.getHashtags()).containsOnly(hashtagBack);
        assertThat(hashtagBack.getSparks()).containsOnly(spark);

        spark.setHashtags(new HashSet<>());
        assertThat(spark.getHashtags()).doesNotContain(hashtagBack);
        assertThat(hashtagBack.getSparks()).doesNotContain(spark);
    }
}
