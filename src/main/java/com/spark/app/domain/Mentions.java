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
 * A Mentions.
 */
@Entity
@Table(name = "mentions")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class Mentions implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "mention_id")
    private Long mentionId;

    @Column(name = "mention_username")
    private String mentionUsername;

    @Column(name = "date")
    private LocalDate date;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
        name = "rel_mentions__spark",
        joinColumns = @JoinColumn(name = "mentions_id"),
        inverseJoinColumns = @JoinColumn(name = "spark_id")
    )
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "likes", "userProfile", "mentions", "hashtags" }, allowSetters = true)
    private Set<Spark> sparks = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Mentions id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getMentionId() {
        return this.mentionId;
    }

    public Mentions mentionId(Long mentionId) {
        this.setMentionId(mentionId);
        return this;
    }

    public void setMentionId(Long mentionId) {
        this.mentionId = mentionId;
    }

    public String getMentionUsername() {
        return this.mentionUsername;
    }

    public Mentions mentionUsername(String mentionUsername) {
        this.setMentionUsername(mentionUsername);
        return this;
    }

    public void setMentionUsername(String mentionUsername) {
        this.mentionUsername = mentionUsername;
    }

    public LocalDate getDate() {
        return this.date;
    }

    public Mentions date(LocalDate date) {
        this.setDate(date);
        return this;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public Set<Spark> getSparks() {
        return this.sparks;
    }

    public void setSparks(Set<Spark> sparks) {
        this.sparks = sparks;
    }

    public Mentions sparks(Set<Spark> sparks) {
        this.setSparks(sparks);
        return this;
    }

    public Mentions addSpark(Spark spark) {
        this.sparks.add(spark);
        return this;
    }

    public Mentions removeSpark(Spark spark) {
        this.sparks.remove(spark);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Mentions)) {
            return false;
        }
        return getId() != null && getId().equals(((Mentions) o).getId());
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Mentions{" +
            "id=" + getId() +
            ", mentionId=" + getMentionId() +
            ", mentionUsername='" + getMentionUsername() + "'" +
            ", date='" + getDate() + "'" +
            "}";
    }
}
