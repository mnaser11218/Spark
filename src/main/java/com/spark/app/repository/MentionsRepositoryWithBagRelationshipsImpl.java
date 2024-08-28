package com.spark.app.repository;

import com.spark.app.domain.Mentions;
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
public class MentionsRepositoryWithBagRelationshipsImpl implements MentionsRepositoryWithBagRelationships {

    private static final String ID_PARAMETER = "id";
    private static final String MENTIONS_PARAMETER = "mentions";

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public Optional<Mentions> fetchBagRelationships(Optional<Mentions> mentions) {
        return mentions.map(this::fetchSparks);
    }

    @Override
    public Page<Mentions> fetchBagRelationships(Page<Mentions> mentions) {
        return new PageImpl<>(fetchBagRelationships(mentions.getContent()), mentions.getPageable(), mentions.getTotalElements());
    }

    @Override
    public List<Mentions> fetchBagRelationships(List<Mentions> mentions) {
        return Optional.of(mentions).map(this::fetchSparks).orElse(Collections.emptyList());
    }

    Mentions fetchSparks(Mentions result) {
        return entityManager
            .createQuery("select mentions from Mentions mentions left join fetch mentions.sparks where mentions.id = :id", Mentions.class)
            .setParameter(ID_PARAMETER, result.getId())
            .getSingleResult();
    }

    List<Mentions> fetchSparks(List<Mentions> mentions) {
        HashMap<Object, Integer> order = new HashMap<>();
        IntStream.range(0, mentions.size()).forEach(index -> order.put(mentions.get(index).getId(), index));
        List<Mentions> result = entityManager
            .createQuery(
                "select mentions from Mentions mentions left join fetch mentions.sparks where mentions in :mentions",
                Mentions.class
            )
            .setParameter(MENTIONS_PARAMETER, mentions)
            .getResultList();
        Collections.sort(result, (o1, o2) -> Integer.compare(order.get(o1.getId()), order.get(o2.getId())));
        return result;
    }
}
