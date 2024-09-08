package com.spark.app.web.rest;

import com.spark.app.domain.Spark;
import com.spark.app.domain.UserProfile;
import com.spark.app.repository.SparkRepository;
import com.spark.app.web.rest.errors.BadRequestAlertException;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link com.spark.app.domain.Spark}.
 */

@RestController
@RequestMapping("/api/sparks")
@Transactional
public class SparkResource {

    private static final Logger log = LoggerFactory.getLogger(SparkResource.class);

    private static final String ENTITY_NAME = "spark";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final SparkRepository sparkRepository;

    public SparkResource(SparkRepository sparkRepository) {
        this.sparkRepository = sparkRepository;

    }

    /**
     * {@code POST  /sparks} : Create a new spark.
     *
     * @param spark the spark to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new spark, or with status {@code 400 (Bad Request)} if the spark has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("")
    public ResponseEntity<Spark> createSpark(@RequestBody Spark spark) throws URISyntaxException {
        log.debug("REST request to save Spark : {}", spark);
        if (spark.getId() != null) {
            throw new BadRequestAlertException("A new spark cannot already have an ID", ENTITY_NAME, "idexists");
        }
        spark = sparkRepository.save(spark);
        return ResponseEntity.created(new URI("/api/sparks/" + spark.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, spark.getId().toString()))
            .body(spark);
    }

    /**
     * {@code PUT  /sparks/:id} : Updates an existing spark.
     *
     * @param id the id of the spark to save.
     * @param spark the spark to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated spark,
     * or with status {@code 400 (Bad Request)} if the spark is not valid,
     * or with status {@code 500 (Internal Server Error)} if the spark couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/{id}")
    public ResponseEntity<Spark> updateSpark(@PathVariable(value = "id", required = false) final Long id, @RequestBody Spark spark)
        throws URISyntaxException {
        log.debug("REST request to update Spark : {}, {}", id, spark);
        if (spark.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, spark.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!sparkRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        spark = sparkRepository.save(spark);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, spark.getId().toString()))
            .body(spark);
    }

    /**
     * {@code PATCH  /sparks/:id} : Partial updates given fields of an existing spark, field will ignore if it is null
     *
     * @param id the id of the spark to save.
     * @param spark the spark to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated spark,
     * or with status {@code 400 (Bad Request)} if the spark is not valid,
     * or with status {@code 404 (Not Found)} if the spark is not found,
     * or with status {@code 500 (Internal Server Error)} if the spark couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<Spark> partialUpdateSpark(@PathVariable(value = "id", required = false) final Long id, @RequestBody Spark spark)
        throws URISyntaxException {
        log.debug("REST request to partial update Spark partially : {}, {}", id, spark);
        if (spark.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, spark.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!sparkRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<Spark> result = sparkRepository
            .findById(spark.getId())
            .map(existingSpark -> {
                if (spark.getSparkId() != null) {
                    existingSpark.setSparkId(spark.getSparkId());
                }
                if (spark.getUserId() != null) {
                    existingSpark.setUserId(spark.getUserId());
                }
                if (spark.getDate() != null) {
                    existingSpark.setDate(spark.getDate());
                }
                if (spark.getBody() != null) {
                    existingSpark.setBody(spark.getBody());
                }
                if (spark.getUrl() != null) {
                    existingSpark.setUrl(spark.getUrl());
                }

                return existingSpark;
            })
            .map(sparkRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, spark.getId().toString())
        );
    }

    /**
     * {@code GET  /sparks} : get all the sparks.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of sparks in body.
     */
    @GetMapping("")
    public List<Spark> getAllSparks() {
        log.debug("REST request to get all Sparks");
        return sparkRepository.findAll();
    }


    @GetMapping("/notcomments")
    public List<Spark> getAllSparksNotComments() {
        log.debug("REST request to get all Sparks that are not comments");
        return sparkRepository.getSparksNotComments();
    }

    /**
     * {@code GET  /sparks/:id} : get the "id" spark.
     *
     * @param id the id of the spark to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the spark, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/{id}")
    public ResponseEntity<Spark> getSpark(@PathVariable("id") Long id) {
        log.debug("REST request to get Spark : {}", id);
        Optional<Spark> spark = sparkRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(spark);
    }



    /**
     * {@code DELETE  /sparks/:id} : delete the "id" spark.
     *
     * @param id the id of the spark to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSpark(@PathVariable("id") Long id) {
        log.debug("REST request to delete Spark : {}", id);
        sparkRepository.deleteById(id);
        return ResponseEntity.noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
    @GetMapping("/username/{string}")
    public ResponseEntity<List<Spark>> getSparksByUserName(@PathVariable("string") String string) {
        log.debug("REST request to get Sparks From specified User : {}", string);
        Optional<List<Spark>> ownerOfSpark = Optional.ofNullable(sparkRepository.getSparkByUserName(string));
        return ResponseUtil.wrapOrNotFound(ownerOfSpark);
    }

    @GetMapping("/comments/{id}")
    public ResponseEntity<List<Spark>> getCommentsBySparkId(@PathVariable("id") Long id) {
        log.debug("REST request to get Sparks From specified User : {}", id);
        Optional<List<Spark>> ownerOfSpark = Optional.ofNullable(sparkRepository.getSparkbySparkId(id));
        return ResponseUtil.wrapOrNotFound(ownerOfSpark);
    }

    @GetMapping("/username/hashtag/{string}")
    public ResponseEntity<List<Spark>> getSparksByHashtag(@PathVariable() String string) {
        log.debug("REST request to get Sparks by searched Hashtag : {}", string);
        Optional<List<Spark>> ownerOfSpark = Optional.ofNullable(sparkRepository.getSparkByHashtag(string));
        return ResponseUtil.wrapOrNotFound(ownerOfSpark);
    }

    @GetMapping("/username/mention/{string}")
    public ResponseEntity<List<Spark>> getSparksByMention(@PathVariable() String string) {
        log.debug("REST request to get Sparks by searched mention : {}", string);
        Optional<List<Spark>> ownerOfSpark = Optional.ofNullable(sparkRepository.getSparkByMention(string));
        return ResponseUtil.wrapOrNotFound(ownerOfSpark);
    }
}

