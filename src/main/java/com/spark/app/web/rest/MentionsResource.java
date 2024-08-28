package com.spark.app.web.rest;

import com.spark.app.domain.Mentions;
import com.spark.app.repository.MentionsRepository;
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
 * REST controller for managing {@link com.spark.app.domain.Mentions}.
 */
@RestController
@RequestMapping("/api/mentions")
@Transactional
public class MentionsResource {

    private static final Logger log = LoggerFactory.getLogger(MentionsResource.class);

    private static final String ENTITY_NAME = "mentions";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final MentionsRepository mentionsRepository;

    public MentionsResource(MentionsRepository mentionsRepository) {
        this.mentionsRepository = mentionsRepository;
    }

    /**
     * {@code POST  /mentions} : Create a new mentions.
     *
     * @param mentions the mentions to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new mentions, or with status {@code 400 (Bad Request)} if the mentions has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("")
    public ResponseEntity<Mentions> createMentions(@RequestBody Mentions mentions) throws URISyntaxException {
        log.debug("REST request to save Mentions : {}", mentions);
        if (mentions.getId() != null) {
            throw new BadRequestAlertException("A new mentions cannot already have an ID", ENTITY_NAME, "idexists");
        }
        mentions = mentionsRepository.save(mentions);
        return ResponseEntity.created(new URI("/api/mentions/" + mentions.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, mentions.getId().toString()))
            .body(mentions);
    }

    /**
     * {@code PUT  /mentions/:id} : Updates an existing mentions.
     *
     * @param id the id of the mentions to save.
     * @param mentions the mentions to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated mentions,
     * or with status {@code 400 (Bad Request)} if the mentions is not valid,
     * or with status {@code 500 (Internal Server Error)} if the mentions couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/{id}")
    public ResponseEntity<Mentions> updateMentions(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody Mentions mentions
    ) throws URISyntaxException {
        log.debug("REST request to update Mentions : {}, {}", id, mentions);
        if (mentions.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, mentions.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!mentionsRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        mentions = mentionsRepository.save(mentions);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, mentions.getId().toString()))
            .body(mentions);
    }

    /**
     * {@code PATCH  /mentions/:id} : Partial updates given fields of an existing mentions, field will ignore if it is null
     *
     * @param id the id of the mentions to save.
     * @param mentions the mentions to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated mentions,
     * or with status {@code 400 (Bad Request)} if the mentions is not valid,
     * or with status {@code 404 (Not Found)} if the mentions is not found,
     * or with status {@code 500 (Internal Server Error)} if the mentions couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<Mentions> partialUpdateMentions(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody Mentions mentions
    ) throws URISyntaxException {
        log.debug("REST request to partial update Mentions partially : {}, {}", id, mentions);
        if (mentions.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, mentions.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!mentionsRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<Mentions> result = mentionsRepository
            .findById(mentions.getId())
            .map(existingMentions -> {
                if (mentions.getMentionId() != null) {
                    existingMentions.setMentionId(mentions.getMentionId());
                }
                if (mentions.getMentionUsername() != null) {
                    existingMentions.setMentionUsername(mentions.getMentionUsername());
                }
                if (mentions.getDate() != null) {
                    existingMentions.setDate(mentions.getDate());
                }

                return existingMentions;
            })
            .map(mentionsRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, mentions.getId().toString())
        );
    }

    /**
     * {@code GET  /mentions} : get all the mentions.
     *
     * @param eagerload flag to eager load entities from relationships (This is applicable for many-to-many).
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of mentions in body.
     */
    @GetMapping("")
    public List<Mentions> getAllMentions(@RequestParam(name = "eagerload", required = false, defaultValue = "true") boolean eagerload) {
        log.debug("REST request to get all Mentions");
        if (eagerload) {
            return mentionsRepository.findAllWithEagerRelationships();
        } else {
            return mentionsRepository.findAll();
        }
    }

    /**
     * {@code GET  /mentions/:id} : get the "id" mentions.
     *
     * @param id the id of the mentions to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the mentions, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/{id}")
    public ResponseEntity<Mentions> getMentions(@PathVariable("id") Long id) {
        log.debug("REST request to get Mentions : {}", id);
        Optional<Mentions> mentions = mentionsRepository.findOneWithEagerRelationships(id);
        return ResponseUtil.wrapOrNotFound(mentions);
    }

    /**
     * {@code DELETE  /mentions/:id} : delete the "id" mentions.
     *
     * @param id the id of the mentions to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMentions(@PathVariable("id") Long id) {
        log.debug("REST request to delete Mentions : {}", id);
        mentionsRepository.deleteById(id);
        return ResponseEntity.noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
