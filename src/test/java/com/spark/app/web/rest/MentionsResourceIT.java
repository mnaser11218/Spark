package com.spark.app.web.rest;

import static com.spark.app.domain.MentionsAsserts.*;
import static com.spark.app.web.rest.TestUtil.createUpdateProxyForBean;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.spark.app.IntegrationTest;
import com.spark.app.domain.Mentions;
import com.spark.app.repository.MentionsRepository;
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
 * Integration tests for the {@link MentionsResource} REST controller.
 */
@IntegrationTest
@ExtendWith(MockitoExtension.class)
@AutoConfigureMockMvc
@WithMockUser
class MentionsResourceIT {

    private static final Long DEFAULT_MENTION_ID = 1L;
    private static final Long UPDATED_MENTION_ID = 2L;

    private static final String DEFAULT_MENTION_USERNAME = "AAAAAAAAAA";
    private static final String UPDATED_MENTION_USERNAME = "BBBBBBBBBB";

    private static final LocalDate DEFAULT_DATE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATE = LocalDate.now(ZoneId.systemDefault());

    private static final String ENTITY_API_URL = "/api/mentions";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private ObjectMapper om;

    @Autowired
    private MentionsRepository mentionsRepository;

    @Mock
    private MentionsRepository mentionsRepositoryMock;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restMentionsMockMvc;

    private Mentions mentions;

    private Mentions insertedMentions;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Mentions createEntity(EntityManager em) {
        Mentions mentions = new Mentions().mentionId(DEFAULT_MENTION_ID).mentionUsername(DEFAULT_MENTION_USERNAME).date(DEFAULT_DATE);
        return mentions;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Mentions createUpdatedEntity(EntityManager em) {
        Mentions mentions = new Mentions().mentionId(UPDATED_MENTION_ID).mentionUsername(UPDATED_MENTION_USERNAME).date(UPDATED_DATE);
        return mentions;
    }

    @BeforeEach
    public void initTest() {
        mentions = createEntity(em);
    }

    @AfterEach
    public void cleanup() {
        if (insertedMentions != null) {
            mentionsRepository.delete(insertedMentions);
            insertedMentions = null;
        }
    }

    @Test
    @Transactional
    void createMentions() throws Exception {
        long databaseSizeBeforeCreate = getRepositoryCount();
        // Create the Mentions
        var returnedMentions = om.readValue(
            restMentionsMockMvc
                .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(mentions)))
                .andExpect(status().isCreated())
                .andReturn()
                .getResponse()
                .getContentAsString(),
            Mentions.class
        );

        // Validate the Mentions in the database
        assertIncrementedRepositoryCount(databaseSizeBeforeCreate);
        assertMentionsUpdatableFieldsEquals(returnedMentions, getPersistedMentions(returnedMentions));

        insertedMentions = returnedMentions;
    }

    @Test
    @Transactional
    void createMentionsWithExistingId() throws Exception {
        // Create the Mentions with an existing ID
        mentions.setId(1L);

        long databaseSizeBeforeCreate = getRepositoryCount();

        // An entity with an existing ID cannot be created, so this API call must fail
        restMentionsMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(mentions)))
            .andExpect(status().isBadRequest());

        // Validate the Mentions in the database
        assertSameRepositoryCount(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllMentions() throws Exception {
        // Initialize the database
        insertedMentions = mentionsRepository.saveAndFlush(mentions);

        // Get all the mentionsList
        restMentionsMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(mentions.getId().intValue())))
            .andExpect(jsonPath("$.[*].mentionId").value(hasItem(DEFAULT_MENTION_ID.intValue())))
            .andExpect(jsonPath("$.[*].mentionUsername").value(hasItem(DEFAULT_MENTION_USERNAME)))
            .andExpect(jsonPath("$.[*].date").value(hasItem(DEFAULT_DATE.toString())));
    }

    @SuppressWarnings({ "unchecked" })
    void getAllMentionsWithEagerRelationshipsIsEnabled() throws Exception {
        when(mentionsRepositoryMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        restMentionsMockMvc.perform(get(ENTITY_API_URL + "?eagerload=true")).andExpect(status().isOk());

        verify(mentionsRepositoryMock, times(1)).findAllWithEagerRelationships(any());
    }

    @SuppressWarnings({ "unchecked" })
    void getAllMentionsWithEagerRelationshipsIsNotEnabled() throws Exception {
        when(mentionsRepositoryMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        restMentionsMockMvc.perform(get(ENTITY_API_URL + "?eagerload=false")).andExpect(status().isOk());
        verify(mentionsRepositoryMock, times(1)).findAll(any(Pageable.class));
    }

    @Test
    @Transactional
    void getMentions() throws Exception {
        // Initialize the database
        insertedMentions = mentionsRepository.saveAndFlush(mentions);

        // Get the mentions
        restMentionsMockMvc
            .perform(get(ENTITY_API_URL_ID, mentions.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(mentions.getId().intValue()))
            .andExpect(jsonPath("$.mentionId").value(DEFAULT_MENTION_ID.intValue()))
            .andExpect(jsonPath("$.mentionUsername").value(DEFAULT_MENTION_USERNAME))
            .andExpect(jsonPath("$.date").value(DEFAULT_DATE.toString()));
    }

    @Test
    @Transactional
    void getNonExistingMentions() throws Exception {
        // Get the mentions
        restMentionsMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingMentions() throws Exception {
        // Initialize the database
        insertedMentions = mentionsRepository.saveAndFlush(mentions);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the mentions
        Mentions updatedMentions = mentionsRepository.findById(mentions.getId()).orElseThrow();
        // Disconnect from session so that the updates on updatedMentions are not directly saved in db
        em.detach(updatedMentions);
        updatedMentions.mentionId(UPDATED_MENTION_ID).mentionUsername(UPDATED_MENTION_USERNAME).date(UPDATED_DATE);

        restMentionsMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedMentions.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(updatedMentions))
            )
            .andExpect(status().isOk());

        // Validate the Mentions in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertPersistedMentionsToMatchAllProperties(updatedMentions);
    }

    @Test
    @Transactional
    void putNonExistingMentions() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        mentions.setId(longCount.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restMentionsMockMvc
            .perform(
                put(ENTITY_API_URL_ID, mentions.getId()).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(mentions))
            )
            .andExpect(status().isBadRequest());

        // Validate the Mentions in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchMentions() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        mentions.setId(longCount.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restMentionsMockMvc
            .perform(
                put(ENTITY_API_URL_ID, longCount.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(mentions))
            )
            .andExpect(status().isBadRequest());

        // Validate the Mentions in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamMentions() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        mentions.setId(longCount.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restMentionsMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(mentions)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Mentions in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateMentionsWithPatch() throws Exception {
        // Initialize the database
        insertedMentions = mentionsRepository.saveAndFlush(mentions);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the mentions using partial update
        Mentions partialUpdatedMentions = new Mentions();
        partialUpdatedMentions.setId(mentions.getId());

        partialUpdatedMentions.mentionId(UPDATED_MENTION_ID);

        restMentionsMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedMentions.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(partialUpdatedMentions))
            )
            .andExpect(status().isOk());

        // Validate the Mentions in the database

        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertMentionsUpdatableFieldsEquals(createUpdateProxyForBean(partialUpdatedMentions, mentions), getPersistedMentions(mentions));
    }

    @Test
    @Transactional
    void fullUpdateMentionsWithPatch() throws Exception {
        // Initialize the database
        insertedMentions = mentionsRepository.saveAndFlush(mentions);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the mentions using partial update
        Mentions partialUpdatedMentions = new Mentions();
        partialUpdatedMentions.setId(mentions.getId());

        partialUpdatedMentions.mentionId(UPDATED_MENTION_ID).mentionUsername(UPDATED_MENTION_USERNAME).date(UPDATED_DATE);

        restMentionsMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedMentions.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(partialUpdatedMentions))
            )
            .andExpect(status().isOk());

        // Validate the Mentions in the database

        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertMentionsUpdatableFieldsEquals(partialUpdatedMentions, getPersistedMentions(partialUpdatedMentions));
    }

    @Test
    @Transactional
    void patchNonExistingMentions() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        mentions.setId(longCount.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restMentionsMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, mentions.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(mentions))
            )
            .andExpect(status().isBadRequest());

        // Validate the Mentions in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchMentions() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        mentions.setId(longCount.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restMentionsMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, longCount.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(mentions))
            )
            .andExpect(status().isBadRequest());

        // Validate the Mentions in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamMentions() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        mentions.setId(longCount.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restMentionsMockMvc
            .perform(patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(om.writeValueAsBytes(mentions)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Mentions in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteMentions() throws Exception {
        // Initialize the database
        insertedMentions = mentionsRepository.saveAndFlush(mentions);

        long databaseSizeBeforeDelete = getRepositoryCount();

        // Delete the mentions
        restMentionsMockMvc
            .perform(delete(ENTITY_API_URL_ID, mentions.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        assertDecrementedRepositoryCount(databaseSizeBeforeDelete);
    }

    protected long getRepositoryCount() {
        return mentionsRepository.count();
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

    protected Mentions getPersistedMentions(Mentions mentions) {
        return mentionsRepository.findById(mentions.getId()).orElseThrow();
    }

    protected void assertPersistedMentionsToMatchAllProperties(Mentions expectedMentions) {
        assertMentionsAllPropertiesEquals(expectedMentions, getPersistedMentions(expectedMentions));
    }

    protected void assertPersistedMentionsToMatchUpdatableProperties(Mentions expectedMentions) {
        assertMentionsAllUpdatablePropertiesEquals(expectedMentions, getPersistedMentions(expectedMentions));
    }
}
