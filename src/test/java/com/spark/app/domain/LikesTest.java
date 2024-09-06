package com.spark.app.domain;

import static com.spark.app.domain.LikesTestSamples.*;
import static com.spark.app.domain.SparkTestSamples.*;
import static com.spark.app.domain.UserProfileTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import com.spark.app.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class LikesTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Likes.class);
        Likes likes1 = getLikesSample1();
        Likes likes2 = new Likes();
        assertThat(likes1).isNotEqualTo(likes2);

        likes2.setId(likes1.getId());
        assertThat(likes1).isEqualTo(likes2);

        likes2 = getLikesSample2();
        assertThat(likes1).isNotEqualTo(likes2);
    }

    @Test
    void sparkTest() {
        Likes likes = getLikesRandomSampleGenerator();
        Spark sparkBack = getSparkRandomSampleGenerator();

        likes.setSpark(sparkBack);
        assertThat(likes.getSpark()).isEqualTo(sparkBack);

        likes.spark(null);
        assertThat(likes.getSpark()).isNull();
    }

    @Test
    void userProfileTest() {
        Likes likes = getLikesRandomSampleGenerator();
        UserProfile userProfileBack = getUserProfileRandomSampleGenerator();

        likes.setUserProfile(userProfileBack);
        assertThat(likes.getUserProfile()).isEqualTo(userProfileBack);

        likes.userProfile(null);
        assertThat(likes.getUserProfile()).isNull();
    }
}
