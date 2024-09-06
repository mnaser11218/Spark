package com.spark.app.web.rest;

import static com.spark.app.domain.LikesAsserts.*;
import static com.spark.app.web.rest.TestUtil.createUpdateProxyForBean;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.spark.app.IntegrationTest;
import com.spark.app.domain.Likes;
import com.spark.app.repository.LikesRepository;
import jakarta.persistence.EntityManager;
import java.util.Random;
import java.util.concurrent.atomic.AtomicLong;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

/**
 * Integration tests for the {@link LikesResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class LikesResourceIT {

    private static final Long DEFAULT_LIKED = 1L;
    private static final Long UPDATED_LIKED = 2L;

    private static final Long DEFAULT_DISLIKE = 1L;
    private static final Long UPDATED_DISLIKE = 2L;

    private static final String ENTITY_API_URL = "/api/likes";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private ObjectMapper om;

    @Autowired
    private LikesRepository likesRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restLikesMockMvc;

    private Likes likes;

    private Likes insertedLikes;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Likes createEntity(EntityManager em) {
        Likes likes = new Likes().liked(DEFAULT_LIKED).dislike(DEFAULT_DISLIKE);
        return likes;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Likes createUpdatedEntity(EntityManager em) {
        Likes likes = new Likes().liked(UPDATED_LIKED).dislike(UPDATED_DISLIKE);
        return likes;
    }

    @BeforeEach
    public void initTest() {
        likes = createEntity(em);
    }

    @AfterEach
    public void cleanup() {
        if (insertedLikes != null) {
            likesRepository.delete(insertedLikes);
            insertedLikes = null;
        }
    }

    @Test
    @Transactional
    void createLikes() throws Exception {
        long databaseSizeBeforeCreate = getRepositoryCount();
        // Create the Likes
        var returnedLikes = om.readValue(
            restLikesMockMvc
                .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(likes)))
                .andExpect(status().isCreated())
                .andReturn()
                .getResponse()
                .getContentAsString(),
            Likes.class
        );

        // Validate the Likes in the database
        assertIncrementedRepositoryCount(databaseSizeBeforeCreate);
        assertLikesUpdatableFieldsEquals(returnedLikes, getPersistedLikes(returnedLikes));

        insertedLikes = returnedLikes;
    }

    @Test
    @Transactional
    void createLikesWithExistingId() throws Exception {
        // Create the Likes with an existing ID
        likes.setId(1L);

        long databaseSizeBeforeCreate = getRepositoryCount();

        // An entity with an existing ID cannot be created, so this API call must fail
        restLikesMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(likes)))
            .andExpect(status().isBadRequest());

        // Validate the Likes in the database
        assertSameRepositoryCount(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllLikes() throws Exception {
        // Initialize the database
        insertedLikes = likesRepository.saveAndFlush(likes);

        // Get all the likesList
        restLikesMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(likes.getId().intValue())))
            .andExpect(jsonPath("$.[*].liked").value(hasItem(DEFAULT_LIKED.intValue())))
            .andExpect(jsonPath("$.[*].dislike").value(hasItem(DEFAULT_DISLIKE.intValue())));
    }

    @Test
    @Transactional
    void getLikes() throws Exception {
        // Initialize the database
        insertedLikes = likesRepository.saveAndFlush(likes);

        // Get the likes
        restLikesMockMvc
            .perform(get(ENTITY_API_URL_ID, likes.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(likes.getId().intValue()))
            .andExpect(jsonPath("$.liked").value(DEFAULT_LIKED.intValue()))
            .andExpect(jsonPath("$.dislike").value(DEFAULT_DISLIKE.intValue()));
    }

    @Test
    @Transactional
    void getNonExistingLikes() throws Exception {
        // Get the likes
        restLikesMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingLikes() throws Exception {
        // Initialize the database
        insertedLikes = likesRepository.saveAndFlush(likes);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the likes
        Likes updatedLikes = likesRepository.findById(likes.getId()).orElseThrow();
        // Disconnect from session so that the updates on updatedLikes are not directly saved in db
        em.detach(updatedLikes);
        updatedLikes.liked(UPDATED_LIKED).dislike(UPDATED_DISLIKE);

        restLikesMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedLikes.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(updatedLikes))
            )
            .andExpect(status().isOk());

        // Validate the Likes in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertPersistedLikesToMatchAllProperties(updatedLikes);
    }

    @Test
    @Transactional
    void putNonExistingLikes() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        likes.setId(longCount.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restLikesMockMvc
            .perform(put(ENTITY_API_URL_ID, likes.getId()).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(likes)))
            .andExpect(status().isBadRequest());

        // Validate the Likes in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchLikes() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        likes.setId(longCount.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restLikesMockMvc
            .perform(
                put(ENTITY_API_URL_ID, longCount.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(likes))
            )
            .andExpect(status().isBadRequest());

        // Validate the Likes in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamLikes() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        likes.setId(longCount.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restLikesMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(likes)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Likes in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateLikesWithPatch() throws Exception {
        // Initialize the database
        insertedLikes = likesRepository.saveAndFlush(likes);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the likes using partial update
        Likes partialUpdatedLikes = new Likes();
        partialUpdatedLikes.setId(likes.getId());

        restLikesMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedLikes.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(partialUpdatedLikes))
            )
            .andExpect(status().isOk());

        // Validate the Likes in the database

        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertLikesUpdatableFieldsEquals(createUpdateProxyForBean(partialUpdatedLikes, likes), getPersistedLikes(likes));
    }

    @Test
    @Transactional
    void fullUpdateLikesWithPatch() throws Exception {
        // Initialize the database
        insertedLikes = likesRepository.saveAndFlush(likes);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the likes using partial update
        Likes partialUpdatedLikes = new Likes();
        partialUpdatedLikes.setId(likes.getId());

        partialUpdatedLikes.liked(UPDATED_LIKED).dislike(UPDATED_DISLIKE);

        restLikesMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedLikes.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(partialUpdatedLikes))
            )
            .andExpect(status().isOk());

        // Validate the Likes in the database

        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertLikesUpdatableFieldsEquals(partialUpdatedLikes, getPersistedLikes(partialUpdatedLikes));
    }

    @Test
    @Transactional
    void patchNonExistingLikes() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        likes.setId(longCount.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restLikesMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, likes.getId()).contentType("application/merge-patch+json").content(om.writeValueAsBytes(likes))
            )
            .andExpect(status().isBadRequest());

        // Validate the Likes in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchLikes() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        likes.setId(longCount.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restLikesMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, longCount.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(likes))
            )
            .andExpect(status().isBadRequest());

        // Validate the Likes in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamLikes() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        likes.setId(longCount.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restLikesMockMvc
            .perform(patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(om.writeValueAsBytes(likes)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Likes in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteLikes() throws Exception {
        // Initialize the database
        insertedLikes = likesRepository.saveAndFlush(likes);

        long databaseSizeBeforeDelete = getRepositoryCount();

        // Delete the likes
        restLikesMockMvc
            .perform(delete(ENTITY_API_URL_ID, likes.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        assertDecrementedRepositoryCount(databaseSizeBeforeDelete);
    }

    protected long getRepositoryCount() {
        return likesRepository.count();
    }

    protected void assertIncrementedRepositoryCount(long countBefore) {
        assertThat(countBefore + 1).isEqualTo(getRepositoryCount());
    }

    protected void assertDecrementedRepositoryCount(long countBefore) {
        assertThat(countBefore - 1).isEqualTo(getRepositoryCount());
    }

    protected void assertSameRepositoryCount(long countBefore) {
        assertThat(countBefore).isEqualTo(getRepositoryCount());
    }

    protected Likes getPersistedLikes(Likes likes) {
        return likesRepository.findById(likes.getId()).orElseThrow();
    }

    protected void assertPersistedLikesToMatchAllProperties(Likes expectedLikes) {
        assertLikesAllPropertiesEquals(expectedLikes, getPersistedLikes(expectedLikes));
    }

    protected void assertPersistedLikesToMatchUpdatableProperties(Likes expectedLikes) {
        assertLikesAllUpdatablePropertiesEquals(expectedLikes, getPersistedLikes(expectedLikes));
    }
}
