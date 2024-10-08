package com.spark.app.domain;

import static org.assertj.core.api.Assertions.assertThat;

public class SparkAsserts {

    /**
     * Asserts that the entity has all properties (fields/relationships) set.
     *
     * @param expected the expected entity
     * @param actual the actual entity
     */
    public static void assertSparkAllPropertiesEquals(Spark expected, Spark actual) {
        assertSparkAutoGeneratedPropertiesEquals(expected, actual);
        assertSparkAllUpdatablePropertiesEquals(expected, actual);
    }

    /**
     * Asserts that the entity has all updatable properties (fields/relationships) set.
     *
     * @param expected the expected entity
     * @param actual the actual entity
     */
    public static void assertSparkAllUpdatablePropertiesEquals(Spark expected, Spark actual) {
        assertSparkUpdatableFieldsEquals(expected, actual);
        assertSparkUpdatableRelationshipsEquals(expected, actual);
    }

    /**
     * Asserts that the entity has all the auto generated properties (fields/relationships) set.
     *
     * @param expected the expected entity
     * @param actual the actual entity
     */
    public static void assertSparkAutoGeneratedPropertiesEquals(Spark expected, Spark actual) {
        assertThat(expected)
            .as("Verify Spark auto generated properties")
            .satisfies(e -> assertThat(e.getId()).as("check id").isEqualTo(actual.getId()));
    }

    /**
     * Asserts that the entity has all the updatable fields set.
     *
     * @param expected the expected entity
     * @param actual the actual entity
     */
    public static void assertSparkUpdatableFieldsEquals(Spark expected, Spark actual) {
        assertThat(expected)
            .as("Verify Spark relevant properties")
            .satisfies(e -> assertThat(e.getSparkId()).as("check sparkId").isEqualTo(actual.getSparkId()))
            .satisfies(e -> assertThat(e.getUserId()).as("check userId").isEqualTo(actual.getUserId()))
            .satisfies(e -> assertThat(e.getDate()).as("check date").isEqualTo(actual.getDate()))
            .satisfies(e -> assertThat(e.getBody()).as("check body").isEqualTo(actual.getBody()))
            .satisfies(e -> assertThat(e.getUrl()).as("check url").isEqualTo(actual.getUrl()));
    }

    /**
     * Asserts that the entity has all the updatable relationships set.
     *
     * @param expected the expected entity
     * @param actual the actual entity
     */
    public static void assertSparkUpdatableRelationshipsEquals(Spark expected, Spark actual) {
        assertThat(expected)
            .as("Verify Spark relationships")
            .satisfies(e -> assertThat(e.getUserProfile()).as("check userProfile").isEqualTo(actual.getUserProfile()))
            .satisfies(e -> assertThat(e.getMentions()).as("check mentions").isEqualTo(actual.getMentions()))
            .satisfies(e -> assertThat(e.getHashtags()).as("check hashtags").isEqualTo(actual.getHashtags()));
    }
}
