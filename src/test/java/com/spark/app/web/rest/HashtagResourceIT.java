package com.spark.app.web.rest;

import static com.spark.app.domain.HashtagAsserts.*;
import static com.spark.app.web.rest.TestUtil.createUpdateProxyForBean;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.spark.app.IntegrationTest;
import com.spark.app.domain.Hashtag;
import com.spark.app.repository.HashtagRepository;
import jakarta.persistence.EntityManager;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.Random;
import java.util.concurrent.atomic.AtomicLong;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

/**
 * Integration tests for the {@link HashtagResource} REST controller.
 */
@IntegrationTest
@ExtendWith(MockitoExtension.class)
@AutoConfigureMockMvc
@WithMockUser
class HashtagResourceIT {

    private static final Long DEFAULT_HASHTAG_ID = 1L;
    private static final Long UPDATED_HASHTAG_ID = 2L;

    private static final String DEFAULT_HASHTAG_NAME = "AAAAAAAAAA";
    private static final String UPDATED_HASHTAG_NAME = "BBBBBBBBBB";

    private static final LocalDate DEFAULT_DATA_CREATED = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATA_CREATED = LocalDate.now(ZoneId.systemDefault());

    private static final String ENTITY_API_URL = "/api/hashtags";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private ObjectMapper om;

    @Autowired
    private HashtagRepository hashtagRepository;

    @Mock
    private HashtagRepository hashtagRepositoryMock;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restHashtagMockMvc;

    private Hashtag hashtag;

    private Hashtag insertedHashtag;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Hashtag createEntity(EntityManager em) {
        Hashtag hashtag = new Hashtag().hashtagId(DEFAULT_HASHTAG_ID).hashtagName(DEFAULT_HASHTAG_NAME).dataCreated(DEFAULT_DATA_CREATED);
        return hashtag;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Hashtag createUpdatedEntity(EntityManager em) {
        Hashtag hashtag = new Hashtag().hashtagId(UPDATED_HASHTAG_ID).hashtagName(UPDATED_HASHTAG_NAME).dataCreated(UPDATED_DATA_CREATED);
        return hashtag;
    }

    @BeforeEach
    public void initTest() {
        hashtag = createEntity(em);
    }

    @AfterEach
    public void cleanup() {
        if (insertedHashtag != null) {
            hashtagRepository.delete(insertedHashtag);
            insertedHashtag = null;
        }
    }

    @Test
    @Transactional
    void createHashtag() throws Exception {
        long databaseSizeBeforeCreate = getRepositoryCount();
        // Create the Hashtag
        var returnedHashtag = om.readValue(
            restHashtagMockMvc
                .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(hashtag)))
                .andExpect(status().isCreated())
                .andReturn()
                .getResponse()
                .getContentAsString(),
            Hashtag.class
        );

        // Validate the Hashtag in the database
        assertIncrementedRepositoryCount(databaseSizeBeforeCreate);
        assertHashtagUpdatableFieldsEquals(returnedHashtag, getPersistedHashtag(returnedHashtag));

        insertedHashtag = returnedHashtag;
    }

    @Test
    @Transactional
    void createHashtagWithExistingId() throws Exception {
        // Create the Hashtag with an existing ID
        hashtag.setId(1L);

        long databaseSizeBeforeCreate = getRepositoryCount();

        // An entity with an existing ID cannot be created, so this API call must fail
        restHashtagMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(hashtag)))
            .andExpect(status().isBadRequest());

        // Validate the Hashtag in the database
        assertSameRepositoryCount(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllHashtags() throws Exception {
        // Initialize the database
        insertedHashtag = hashtagRepository.saveAndFlush(hashtag);

        // Get all the hashtagList
        restHashtagMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(hashtag.getId().intValue())))
            .andExpect(jsonPath("$.[*].hashtagId").value(hasItem(DEFAULT_HASHTAG_ID.intValue())))
            .andExpect(jsonPath("$.[*].hashtagName").value(hasItem(DEFAULT_HASHTAG_NAME)))
            .andExpect(jsonPath("$.[*].dataCreated").value(hasItem(DEFAULT_DATA_CREATED.toString())));
    }

    @SuppressWarnings({ "unchecked" })
    void getAllHashtagsWithEagerRelationshipsIsEnabled() throws Exception {
        when(hashtagRepositoryMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        restHashtagMockMvc.perform(get(ENTITY_API_URL + "?eagerload=true")).andExpect(status().isOk());

        verify(hashtagRepositoryMock, times(1)).findAllWithEagerRelationships(any());
    }

    @SuppressWarnings({ "unchecked" })
    void getAllHashtagsWithEagerRelationshipsIsNotEnabled() throws Exception {
        when(hashtagRepositoryMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        restHashtagMockMvc.perform(get(ENTITY_API_URL + "?eagerload=false")).andExpect(status().isOk());
        verify(hashtagRepositoryMock, times(1)).findAll(any(Pageable.class));
    }

    @Test
    @Transactional
    void getHashtag() throws Exception {
        // Initialize the database
        insertedHashtag = hashtagRepository.saveAndFlush(hashtag);

        // Get the hashtag
        restHashtagMockMvc
            .perform(get(ENTITY_API_URL_ID, hashtag.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(hashtag.getId().intValue()))
            .andExpect(jsonPath("$.hashtagId").value(DEFAULT_HASHTAG_ID.intValue()))
            .andExpect(jsonPath("$.hashtagName").value(DEFAULT_HASHTAG_NAME))
            .andExpect(jsonPath("$.dataCreated").value(DEFAULT_DATA_CREATED.toString()));
    }

    @Test
    @Transactional
    void getNonExistingHashtag() throws Exception {
        // Get the hashtag
        restHashtagMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingHashtag() throws Exception {
        // Initialize the database
        insertedHashtag = hashtagRepository.saveAndFlush(hashtag);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the hashtag
        Hashtag updatedHashtag = hashtagRepository.findById(hashtag.getId()).orElseThrow();
        // Disconnect from session so that the updates on updatedHashtag are not directly saved in db
        em.detach(updatedHashtag);
        updatedHashtag.hashtagId(UPDATED_HASHTAG_ID).hashtagName(UPDATED_HASHTAG_NAME).dataCreated(UPDATED_DATA_CREATED);

        restHashtagMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedHashtag.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(updatedHashtag))
            )
            .andExpect(status().isOk());

        // Validate the Hashtag in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertPersistedHashtagToMatchAllProperties(updatedHashtag);
    }

    @Test
    @Transactional
    void putNonExistingHashtag() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        hashtag.setId(longCount.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restHashtagMockMvc
            .perform(put(ENTITY_API_URL_ID, hashtag.getId()).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(hashtag)))
            .andExpect(status().isBadRequest());

        // Validate the Hashtag in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchHashtag() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        hashtag.setId(longCount.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restHashtagMockMvc
            .perform(
                put(ENTITY_API_URL_ID, longCount.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(hashtag))
            )
            .andExpect(status().isBadRequest());

        // Validate the Hashtag in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamHashtag() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        hashtag.setId(longCount.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restHashtagMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(hashtag)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Hashtag in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateHashtagWithPatch() throws Exception {
        // Initialize the database
        insertedHashtag = hashtagRepository.saveAndFlush(hashtag);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the hashtag using partial update
        Hashtag partialUpdatedHashtag = new Hashtag();
        partialUpdatedHashtag.setId(hashtag.getId());

        restHashtagMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedHashtag.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(partialUpdatedHashtag))
            )
            .andExpect(status().isOk());

        // Validate the Hashtag in the database

        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertHashtagUpdatableFieldsEquals(createUpdateProxyForBean(partialUpdatedHashtag, hashtag), getPersistedHashtag(hashtag));
    }

    @Test
    @Transactional
    void fullUpdateHashtagWithPatch() throws Exception {
        // Initialize the database
        insertedHashtag = hashtagRepository.saveAndFlush(hashtag);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the hashtag using partial update
        Hashtag partialUpdatedHashtag = new Hashtag();
        partialUpdatedHashtag.setId(hashtag.getId());

        partialUpdatedHashtag.hashtagId(UPDATED_HASHTAG_ID).hashtagName(UPDATED_HASHTAG_NAME).dataCreated(UPDATED_DATA_CREATED);

        restHashtagMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedHashtag.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(partialUpdatedHashtag))
            )
            .andExpect(status().isOk());

        // Validate the Hashtag in the database

        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertHashtagUpdatableFieldsEquals(partialUpdatedHashtag, getPersistedHashtag(partialUpdatedHashtag));
    }

    @Test
    @Transactional
    void patchNonExistingHashtag() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        hashtag.setId(longCount.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restHashtagMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, hashtag.getId()).contentType("application/merge-patch+json").content(om.writeValueAsBytes(hashtag))
            )
            .andExpect(status().isBadRequest());

        // Validate the Hashtag in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchHashtag() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        hashtag.setId(longCount.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restHashtagMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, longCount.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(hashtag))
            )
            .andExpect(status().isBadRequest());

        // Validate the Hashtag in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamHashtag() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        hashtag.setId(longCount.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restHashtagMockMvc
            .perform(patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(om.writeValueAsBytes(hashtag)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Hashtag in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteHashtag() throws Exception {
        // Initialize the database
        insertedHashtag = hashtagRepository.saveAndFlush(hashtag);

        long databaseSizeBeforeDelete = getRepositoryCount();

        // Delete the hashtag
        restHashtagMockMvc
            .perform(delete(ENTITY_API_URL_ID, hashtag.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        assertDecrementedRepositoryCount(databaseSizeBeforeDelete);
    }

    protected long getRepositoryCount() {
        return hashtagRepository.count();
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

    protected Hashtag getPersistedHashtag(Hashtag hashtag) {
        return hashtagRepository.findById(hashtag.getId()).orElseThrow();
    }

    protected void assertPersistedHashtagToMatchAllProperties(Hashtag expectedHashtag) {
        assertHashtagAllPropertiesEquals(expectedHashtag, getPersistedHashtag(expectedHashtag));
    }

    protected void assertPersistedHashtagToMatchUpdatableProperties(Hashtag expectedHashtag) {
        assertHashtagAllUpdatablePropertiesEquals(expectedHashtag, getPersistedHashtag(expectedHashtag));
    }
}
