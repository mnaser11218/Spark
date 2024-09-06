package com.spark.app.web.rest;

import static com.spark.app.domain.SparkAsserts.*;
import static com.spark.app.web.rest.TestUtil.createUpdateProxyForBean;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.spark.app.IntegrationTest;
import com.spark.app.domain.Spark;
import com.spark.app.repository.SparkRepository;
import jakarta.persistence.EntityManager;
import java.time.LocalDate;
import java.time.ZoneId;
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
 * Integration tests for the {@link SparkResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class SparkResourceIT {

    private static final Long DEFAULT_SPARK_ID = 1L;
    private static final Long UPDATED_SPARK_ID = 2L;

    private static final Long DEFAULT_USER_ID = 1L;
    private static final Long UPDATED_USER_ID = 2L;

    private static final LocalDate DEFAULT_DATE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATE = LocalDate.now(ZoneId.systemDefault());

    private static final String DEFAULT_BODY = "AAAAAAAAAA";
    private static final String UPDATED_BODY = "BBBBBBBBBB";

    private static final String DEFAULT_URL = "AAAAAAAAAA";
    private static final String UPDATED_URL = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/sparks";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private ObjectMapper om;

    @Autowired
    private SparkRepository sparkRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restSparkMockMvc;

    private Spark spark;

    private Spark insertedSpark;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Spark createEntity(EntityManager em) {
        Spark spark = new Spark().sparkId(DEFAULT_SPARK_ID).userId(DEFAULT_USER_ID).date(DEFAULT_DATE).body(DEFAULT_BODY).url(DEFAULT_URL);
        return spark;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Spark createUpdatedEntity(EntityManager em) {
        Spark spark = new Spark().sparkId(UPDATED_SPARK_ID).userId(UPDATED_USER_ID).date(UPDATED_DATE).body(UPDATED_BODY).url(UPDATED_URL);
        return spark;
    }

    @BeforeEach
    public void initTest() {
        spark = createEntity(em);
    }

    @AfterEach
    public void cleanup() {
        if (insertedSpark != null) {
            sparkRepository.delete(insertedSpark);
            insertedSpark = null;
        }
    }

    @Test
    @Transactional
    void createSpark() throws Exception {
        long databaseSizeBeforeCreate = getRepositoryCount();
        // Create the Spark
        var returnedSpark = om.readValue(
            restSparkMockMvc
                .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(spark)))
                .andExpect(status().isCreated())
                .andReturn()
                .getResponse()
                .getContentAsString(),
            Spark.class
        );

        // Validate the Spark in the database
        assertIncrementedRepositoryCount(databaseSizeBeforeCreate);
        assertSparkUpdatableFieldsEquals(returnedSpark, getPersistedSpark(returnedSpark));

        insertedSpark = returnedSpark;
    }

    @Test
    @Transactional
    void createSparkWithExistingId() throws Exception {
        // Create the Spark with an existing ID
        spark.setId(1L);

        long databaseSizeBeforeCreate = getRepositoryCount();

        // An entity with an existing ID cannot be created, so this API call must fail
        restSparkMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(spark)))
            .andExpect(status().isBadRequest());

        // Validate the Spark in the database
        assertSameRepositoryCount(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllSparks() throws Exception {
        // Initialize the database
        insertedSpark = sparkRepository.saveAndFlush(spark);

        // Get all the sparkList
        restSparkMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(spark.getId().intValue())))
            .andExpect(jsonPath("$.[*].sparkId").value(hasItem(DEFAULT_SPARK_ID.intValue())))
            .andExpect(jsonPath("$.[*].userId").value(hasItem(DEFAULT_USER_ID.intValue())))
            .andExpect(jsonPath("$.[*].date").value(hasItem(DEFAULT_DATE.toString())))
            .andExpect(jsonPath("$.[*].body").value(hasItem(DEFAULT_BODY)))
            .andExpect(jsonPath("$.[*].url").value(hasItem(DEFAULT_URL)));
    }

    @Test
    @Transactional
    void getSpark() throws Exception {
        // Initialize the database
        insertedSpark = sparkRepository.saveAndFlush(spark);

        // Get the spark
        restSparkMockMvc
            .perform(get(ENTITY_API_URL_ID, spark.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(spark.getId().intValue()))
            .andExpect(jsonPath("$.sparkId").value(DEFAULT_SPARK_ID.intValue()))
            .andExpect(jsonPath("$.userId").value(DEFAULT_USER_ID.intValue()))
            .andExpect(jsonPath("$.date").value(DEFAULT_DATE.toString()))
            .andExpect(jsonPath("$.body").value(DEFAULT_BODY))
            .andExpect(jsonPath("$.url").value(DEFAULT_URL));
    }

    @Test
    @Transactional
    void getNonExistingSpark() throws Exception {
        // Get the spark
        restSparkMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingSpark() throws Exception {
        // Initialize the database
        insertedSpark = sparkRepository.saveAndFlush(spark);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the spark
        Spark updatedSpark = sparkRepository.findById(spark.getId()).orElseThrow();
        // Disconnect from session so that the updates on updatedSpark are not directly saved in db
        em.detach(updatedSpark);
        updatedSpark.sparkId(UPDATED_SPARK_ID).userId(UPDATED_USER_ID).date(UPDATED_DATE).body(UPDATED_BODY).url(UPDATED_URL);

        restSparkMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedSpark.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(updatedSpark))
            )
            .andExpect(status().isOk());

        // Validate the Spark in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertPersistedSparkToMatchAllProperties(updatedSpark);
    }

    @Test
    @Transactional
    void putNonExistingSpark() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        spark.setId(longCount.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restSparkMockMvc
            .perform(put(ENTITY_API_URL_ID, spark.getId()).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(spark)))
            .andExpect(status().isBadRequest());

        // Validate the Spark in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchSpark() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        spark.setId(longCount.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restSparkMockMvc
            .perform(
                put(ENTITY_API_URL_ID, longCount.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(spark))
            )
            .andExpect(status().isBadRequest());

        // Validate the Spark in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamSpark() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        spark.setId(longCount.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restSparkMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(spark)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Spark in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateSparkWithPatch() throws Exception {
        // Initialize the database
        insertedSpark = sparkRepository.saveAndFlush(spark);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the spark using partial update
        Spark partialUpdatedSpark = new Spark();
        partialUpdatedSpark.setId(spark.getId());

        partialUpdatedSpark.sparkId(UPDATED_SPARK_ID).date(UPDATED_DATE).body(UPDATED_BODY);

        restSparkMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedSpark.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(partialUpdatedSpark))
            )
            .andExpect(status().isOk());

        // Validate the Spark in the database

        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertSparkUpdatableFieldsEquals(createUpdateProxyForBean(partialUpdatedSpark, spark), getPersistedSpark(spark));
    }

    @Test
    @Transactional
    void fullUpdateSparkWithPatch() throws Exception {
        // Initialize the database
        insertedSpark = sparkRepository.saveAndFlush(spark);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the spark using partial update
        Spark partialUpdatedSpark = new Spark();
        partialUpdatedSpark.setId(spark.getId());

        partialUpdatedSpark.sparkId(UPDATED_SPARK_ID).userId(UPDATED_USER_ID).date(UPDATED_DATE).body(UPDATED_BODY).url(UPDATED_URL);

        restSparkMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedSpark.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(partialUpdatedSpark))
            )
            .andExpect(status().isOk());

        // Validate the Spark in the database

        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertSparkUpdatableFieldsEquals(partialUpdatedSpark, getPersistedSpark(partialUpdatedSpark));
    }

    @Test
    @Transactional
    void patchNonExistingSpark() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        spark.setId(longCount.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restSparkMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, spark.getId()).contentType("application/merge-patch+json").content(om.writeValueAsBytes(spark))
            )
            .andExpect(status().isBadRequest());

        // Validate the Spark in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchSpark() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        spark.setId(longCount.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restSparkMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, longCount.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(spark))
            )
            .andExpect(status().isBadRequest());

        // Validate the Spark in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamSpark() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        spark.setId(longCount.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restSparkMockMvc
            .perform(patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(om.writeValueAsBytes(spark)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Spark in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteSpark() throws Exception {
        // Initialize the database
        insertedSpark = sparkRepository.saveAndFlush(spark);

        long databaseSizeBeforeDelete = getRepositoryCount();

        // Delete the spark
        restSparkMockMvc
            .perform(delete(ENTITY_API_URL_ID, spark.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        assertDecrementedRepositoryCount(databaseSizeBeforeDelete);
    }

    protected long getRepositoryCount() {
        return sparkRepository.count();
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

    protected Spark getPersistedSpark(Spark spark) {
        return sparkRepository.findById(spark.getId()).orElseThrow();
    }

    protected void assertPersistedSparkToMatchAllProperties(Spark expectedSpark) {
        assertSparkAllPropertiesEquals(expectedSpark, getPersistedSpark(expectedSpark));
    }

    protected void assertPersistedSparkToMatchUpdatableProperties(Spark expectedSpark) {
        assertSparkAllUpdatablePropertiesEquals(expectedSpark, getPersistedSpark(expectedSpark));
    }
}
