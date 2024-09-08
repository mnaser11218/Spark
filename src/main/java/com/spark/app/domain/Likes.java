package com.spark.app.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import java.io.Serializable;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Likes.
 */
@Entity
@Table(name = "likes")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class Likes implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "liked")
    private Long liked;

    @Column(name = "dislike")
    private Long dislike;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnoreProperties(value = { "likes", "userProfile", "mentions", "hashtags" }, allowSetters = true)
    private Spark spark;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnoreProperties(value = { "sparks", "likes" }, allowSetters = true)
    private UserProfile userProfile;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Likes id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getLiked() {
        return this.liked;
    }

    public Likes liked(Long liked) {
        this.setLiked(liked);
        return this;
    }

    public void setLiked(Long liked) {
        this.liked = liked;
    }

    public Long getDislike() {
        return this.dislike;
    }

    public Likes dislike(Long dislike) {
        this.setDislike(dislike);
        return this;
    }

    public void setDislike(Long dislike) {
        this.dislike = dislike;
    }

    public Spark getSpark() {
        return this.spark;
    }

    public void setSpark(Spark spark) {
        this.spark = spark;
    }

    public Likes spark(Spark spark) {
        this.setSpark(spark);
        return this;
    }

    public UserProfile getUserProfile() {
        return this.userProfile;
    }

    public void setUserProfile(UserProfile userProfile) {
        this.userProfile = userProfile;
    }

    public Likes userProfile(UserProfile userProfile) {
        this.setUserProfile(userProfile);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Likes)) {
            return false;
        }
        return getId() != null && getId().equals(((Likes) o).getId());
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Likes{" +
            "id=" + getId() +
            ", liked=" + getLiked() +
            ", dislike=" + getDislike() +
            "}";
    }
}
