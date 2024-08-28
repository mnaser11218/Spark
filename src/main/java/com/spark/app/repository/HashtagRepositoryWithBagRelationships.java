package com.spark.app.repository;

import com.spark.app.domain.Hashtag;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;

public interface HashtagRepositoryWithBagRelationships {
    Optional<Hashtag> fetchBagRelationships(Optional<Hashtag> hashtag);

    List<Hashtag> fetchBagRelationships(List<Hashtag> hashtags);

    Page<Hashtag> fetchBagRelationships(Page<Hashtag> hashtags);
}
