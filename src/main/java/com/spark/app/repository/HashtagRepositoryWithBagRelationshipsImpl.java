package com.spark.app.repository;

import com.spark.app.domain.Hashtag;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Optional;
import java.util.stream.IntStream;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;

/**
 * Utility repository to load bag relationships based on https://vladmihalcea.com/hibernate-multiplebagfetchexception/
 */
public class HashtagRepositoryWithBagRelationshipsImpl implements HashtagRepositoryWithBagRelationships {

    private static final String ID_PARAMETER = "id";
    private static final String HASHTAGS_PARAMETER = "hashtags";

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public Optional<Hashtag> fetchBagRelationships(Optional<Hashtag> hashtag) {
        return hashtag.map(this::fetchSparks);
    }

    @Override
    public Page<Hashtag> fetchBagRelationships(Page<Hashtag> hashtags) {
        return new PageImpl<>(fetchBagRelationships(hashtags.getContent()), hashtags.getPageable(), hashtags.getTotalElements());
    }

    @Override
    public List<Hashtag> fetchBagRelationships(List<Hashtag> hashtags) {
        return Optional.of(hashtags).map(this::fetchSparks).orElse(Collections.emptyList());
    }

    Hashtag fetchSparks(Hashtag result) {
        return entityManager
            .createQuery("select hashtag from Hashtag hashtag left join fetch hashtag.sparks where hashtag.id = :id", Hashtag.class)
            .setParameter(ID_PARAMETER, result.getId())
            .getSingleResult();
    }

    List<Hashtag> fetchSparks(List<Hashtag> hashtags) {
        HashMap<Object, Integer> order = new HashMap<>();
        IntStream.range(0, hashtags.size()).forEach(index -> order.put(hashtags.get(index).getId(), index));
        List<Hashtag> result = entityManager
            .createQuery("select hashtag from Hashtag hashtag left join fetch hashtag.sparks where hashtag in :hashtags", Hashtag.class)
            .setParameter(HASHTAGS_PARAMETER, hashtags)
            .getResultList();
        Collections.sort(result, (o1, o2) -> Integer.compare(order.get(o1.getId()), order.get(o2.getId())));
        return result;
    }
}
