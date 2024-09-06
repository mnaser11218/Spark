package com.spark.app.domain;

import static org.assertj.core.api.Assertions.assertThat;

public class LikesAsserts {

    /**
     * Asserts that the entity has all properties (fields/relationships) set.
     *
     * @param expected the expected entity
     * @param actual the actual entity
     */
    public static void assertLikesAllPropertiesEquals(Likes expected, Likes actual) {
        assertLikesAutoGeneratedPropertiesEquals(expected, actual);
        assertLikesAllUpdatablePropertiesEquals(expected, actual);
    }

    /**
     * Asserts that the entity has all updatable properties (fields/relationships) set.
     *
     * @param expected the expected entity
     * @param actual the actual entity
     */
    public static void assertLikesAllUpdatablePropertiesEquals(Likes expected, Likes actual) {
        assertLikesUpdatableFieldsEquals(expected, actual);
        assertLikesUpdatableRelationshipsEquals(expected, actual);
    }

    /**
     * Asserts that the entity has all the auto generated properties (fields/relationships) set.
     *
     * @param expected the expected entity
     * @param actual the actual entity
     */
    public static void assertLikesAutoGeneratedPropertiesEquals(Likes expected, Likes actual) {
        assertThat(expected)
            .as("Verify Likes auto generated properties")
            .satisfies(e -> assertThat(e.getId()).as("check id").isEqualTo(actual.getId()));
    }

    /**
     * Asserts that the entity has all the updatable fields set.
     *
     * @param expected the expected entity
     * @param actual the actual entity
     */
    public static void assertLikesUpdatableFieldsEquals(Likes expected, Likes actual) {
        assertThat(expected)
            .as("Verify Likes relevant properties")
            .satisfies(e -> assertThat(e.getLiked()).as("check liked").isEqualTo(actual.getLiked()))
            .satisfies(e -> assertThat(e.getDislike()).as("check dislike").isEqualTo(actual.getDislike()));
    }

    /**
     * Asserts that the entity has all the updatable relationships set.
     *
     * @param expected the expected entity
     * @param actual the actual entity
     */
    public static void assertLikesUpdatableRelationshipsEquals(Likes expected, Likes actual) {
        assertThat(expected)
            .as("Verify Likes relationships")
            .satisfies(e -> assertThat(e.getSpark()).as("check spark").isEqualTo(actual.getSpark()))
            .satisfies(e -> assertThat(e.getUserProfile()).as("check userProfile").isEqualTo(actual.getUserProfile()));
    }
}
