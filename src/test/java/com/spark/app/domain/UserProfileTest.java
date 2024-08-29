package com.spark.app.domain;

import static com.spark.app.domain.SparkTestSamples.*;
import static com.spark.app.domain.UserProfileTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import com.spark.app.web.rest.TestUtil;
import java.util.HashSet;
import java.util.Set;
import org.junit.jupiter.api.Test;

class UserProfileTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(UserProfile.class);
        UserProfile userProfile1 = getUserProfileSample1();
        UserProfile userProfile2 = new UserProfile();
        assertThat(userProfile1).isNotEqualTo(userProfile2);

        userProfile2.setId(userProfile1.getId());
        assertThat(userProfile1).isEqualTo(userProfile2);

        userProfile2 = getUserProfileSample2();
        assertThat(userProfile1).isNotEqualTo(userProfile2);
    }

    @Test
    void sparkTest() {
        UserProfile userProfile = getUserProfileRandomSampleGenerator();
        Spark sparkBack = getSparkRandomSampleGenerator();

        userProfile.addSpark(sparkBack);
        assertThat(userProfile.getSparks()).containsOnly(sparkBack);
        assertThat(sparkBack.getUserProfile()).isEqualTo(userProfile);

        userProfile.removeSpark(sparkBack);
        assertThat(userProfile.getSparks()).doesNotContain(sparkBack);
        assertThat(sparkBack.getUserProfile()).isNull();

        userProfile.sparks(new HashSet<>(Set.of(sparkBack)));
        assertThat(userProfile.getSparks()).containsOnly(sparkBack);
        assertThat(sparkBack.getUserProfile()).isEqualTo(userProfile);

        userProfile.setSparks(new HashSet<>());
        assertThat(userProfile.getSparks()).doesNotContain(sparkBack);
        assertThat(sparkBack.getUserProfile()).isNull();
    }
}
