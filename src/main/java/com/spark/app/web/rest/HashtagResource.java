package com.spark.app.web.rest;

import com.spark.app.domain.Hashtag;
import com.spark.app.repository.HashtagRepository;
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
 * REST controller for managing {@link com.spark.app.domain.Hashtag}.
 */
@RestController
@RequestMapping("/api/hashtags")
@Transactional
public class HashtagResource {

    private static final Logger log = LoggerFactory.getLogger(HashtagResource.class);

    private static final String ENTITY_NAME = "hashtag";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final HashtagRepository hashtagRepository;

    public HashtagResource(HashtagRepository hashtagRepository) {
        this.hashtagRepository = hashtagRepository;
    }

    /**
     * {@code POST  /hashtags} : Create a new hashtag.
     *
     * @param hashtag the hashtag to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new hashtag, or with status {@code 400 (Bad Request)} if the hashtag has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("")
    public ResponseEntity<Hashtag> createHashtag(@RequestBody Hashtag hashtag) throws URISyntaxException {
        log.debug("REST request to save Hashtag : {}", hashtag);
        if (hashtag.getId() != null) {
            throw new BadRequestAlertException("A new hashtag cannot already have an ID", ENTITY_NAME, "idexists");
        }
        hashtag = hashtagRepository.save(hashtag);
        return ResponseEntity.created(new URI("/api/hashtags/" + hashtag.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, hashtag.getId().toString()))
            .body(hashtag);
    }

    /**
     * {@code PUT  /hashtags/:id} : Updates an existing hashtag.
     *
     * @param id the id of the hashtag to save.
     * @param hashtag the hashtag to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated hashtag,
     * or with status {@code 400 (Bad Request)} if the hashtag is not valid,
     * or with status {@code 500 (Internal Server Error)} if the hashtag couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/{id}")
    public ResponseEntity<Hashtag> updateHashtag(@PathVariable(value = "id", required = false) final Long id, @RequestBody Hashtag hashtag)
        throws URISyntaxException {
        log.debug("REST request to update Hashtag : {}, {}", id, hashtag);
        if (hashtag.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, hashtag.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!hashtagRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        hashtag = hashtagRepository.save(hashtag);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, hashtag.getId().toString()))
            .body(hashtag);
    }

    /**
     * {@code PATCH  /hashtags/:id} : Partial updates given fields of an existing hashtag, field will ignore if it is null
     *
     * @param id the id of the hashtag to save.
     * @param hashtag the hashtag to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated hashtag,
     * or with status {@code 400 (Bad Request)} if the hashtag is not valid,
     * or with status {@code 404 (Not Found)} if the hashtag is not found,
     * or with status {@code 500 (Internal Server Error)} if the hashtag couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<Hashtag> partialUpdateHashtag(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody Hashtag hashtag
    ) throws URISyntaxException {
        log.debug("REST request to partial update Hashtag partially : {}, {}", id, hashtag);
        if (hashtag.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, hashtag.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!hashtagRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<Hashtag> result = hashtagRepository
            .findById(hashtag.getId())
            .map(existingHashtag -> {
                if (hashtag.getHashtagId() != null) {
                    existingHashtag.setHashtagId(hashtag.getHashtagId());
                }
                if (hashtag.getHashtagName() != null) {
                    existingHashtag.setHashtagName(hashtag.getHashtagName());
                }
                if (hashtag.getDataCreated() != null) {
                    existingHashtag.setDataCreated(hashtag.getDataCreated());
                }

                return existingHashtag;
            })
            .map(hashtagRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, hashtag.getId().toString())
        );
    }

    /**
     * {@code GET  /hashtags} : get all the hashtags.
     *
     * @param eagerload flag to eager load entities from relationships (This is applicable for many-to-many).
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of hashtags in body.
     */
    @GetMapping("")
    public List<Hashtag> getAllHashtags(@RequestParam(name = "eagerload", required = false, defaultValue = "true") boolean eagerload) {
        log.debug("REST request to get all Hashtags");
        if (eagerload) {
            return hashtagRepository.findAllWithEagerRelationships();
        } else {
            return hashtagRepository.findAll();
        }
    }

    /**
     * {@code GET  /hashtags/:id} : get the "id" hashtag.
     *
     * @param id the id of the hashtag to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the hashtag, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/{id}")
    public ResponseEntity<Hashtag> getHashtag(@PathVariable("id") Long id) {
        log.debug("REST request to get Hashtag : {}", id);
        Optional<Hashtag> hashtag = hashtagRepository.findOneWithEagerRelationships(id);
        return ResponseUtil.wrapOrNotFound(hashtag);
    }

    /**
     * {@code DELETE  /hashtags/:id} : delete the "id" hashtag.
     *
     * @param id the id of the hashtag to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteHashtag(@PathVariable("id") Long id) {
        log.debug("REST request to delete Hashtag : {}", id);
        hashtagRepository.deleteById(id);
        return ResponseEntity.noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
