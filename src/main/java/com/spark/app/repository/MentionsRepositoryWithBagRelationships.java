package com.spark.app.repository;

import com.spark.app.domain.Mentions;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;

public interface MentionsRepositoryWithBagRelationships {
    Optional<Mentions> fetchBagRelationships(Optional<Mentions> mentions);

    List<Mentions> fetchBagRelationships(List<Mentions> mentions);

    Page<Mentions> fetchBagRelationships(Page<Mentions> mentions);
}
