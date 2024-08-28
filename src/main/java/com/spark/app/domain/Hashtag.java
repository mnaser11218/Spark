package com.spark.app.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import java.io.Serializable;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Hashtag.
 */
@Entity
@Table(name = "hashtag")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class Hashtag implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "hashtag_id")
    private Long hashtagId;

    @Column(name = "hashtag_name")
    private String hashtagName;

    @Column(name = "data_created")
    private LocalDate dataCreated;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
        name = "rel_hashtag__spark",
        joinColumns = @JoinColumn(name = "hashtag_id"),
        inverseJoinColumns = @JoinColumn(name = "spark_id")
    )
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "userProfile", "mentions", "hashtags" }, allowSetters = true)
    private Set<Spark> sparks = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Hashtag id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getHashtagId() {
        return this.hashtagId;
    }

    public Hashtag hashtagId(Long hashtagId) {
        this.setHashtagId(hashtagId);
        return this;
    }

    public void setHashtagId(Long hashtagId) {
        this.hashtagId = hashtagId;
    }

    public String getHashtagName() {
        return this.hashtagName;
    }

    public Hashtag hashtagName(String hashtagName) {
        this.setHashtagName(hashtagName);
        return this;
    }

    public void setHashtagName(String hashtagName) {
        this.hashtagName = hashtagName;
    }

    public LocalDate getDataCreated() {
        return this.dataCreated;
    }

    public Hashtag dataCreated(LocalDate dataCreated) {
        this.setDataCreated(dataCreated);
        return this;
    }

    public void setDataCreated(LocalDate dataCreated) {
        this.dataCreated = dataCreated;
    }

    public Set<Spark> getSparks() {
        return this.sparks;
    }

    public void setSparks(Set<Spark> sparks) {
        this.sparks = sparks;
    }

    public Hashtag sparks(Set<Spark> sparks) {
        this.setSparks(sparks);
        return this;
    }

    public Hashtag addSpark(Spark spark) {
        this.sparks.add(spark);
        return this;
    }

    public Hashtag removeSpark(Spark spark) {
        this.sparks.remove(spark);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Hashtag)) {
            return false;
        }
        return getId() != null && getId().equals(((Hashtag) o).getId());
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Hashtag{" +
            "id=" + getId() +
            ", hashtagId=" + getHashtagId() +
            ", hashtagName='" + getHashtagName() + "'" +
            ", dataCreated='" + getDataCreated() + "'" +
            "}";
    }
}
