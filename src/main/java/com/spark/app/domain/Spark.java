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
 * A Spark.
 */
@Entity
@Table(name = "spark")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class Spark implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "spark_id")
    private Long sparkId;

    @Column(name = "user_id")
    private Long userId;

    @Column(name = "date")
    private LocalDate date;

    @Column(name = "body")
    private String body;

    @Column(name = "url")
    private String url;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "spark")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "spark", "userProfile" }, allowSetters = true)
    private Set<Likes> likes = new HashSet<>();

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnoreProperties(value = { "sparks", "likes" }, allowSetters = true)
    private UserProfile userProfile;

    @ManyToMany(fetch = FetchType.LAZY, mappedBy = "sparks")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "sparks" }, allowSetters = true)
    private Set<Mentions> mentions = new HashSet<>();

    @ManyToMany(fetch = FetchType.LAZY, mappedBy = "sparks")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "sparks" }, allowSetters = true)
    private Set<Hashtag> hashtags = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Spark id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getSparkId() {
        return this.sparkId;
    }

    public Spark sparkId(Long sparkId) {
        this.setSparkId(sparkId);
        return this;
    }

    public void setSparkId(Long sparkId) {
        this.sparkId = sparkId;
    }

    public Long getUserId() {
        return this.userId;
    }

    public Spark userId(Long userId) {
        this.setUserId(userId);
        return this;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public LocalDate getDate() {
        return this.date;
    }

    public Spark date(LocalDate date) {
        this.setDate(date);
        return this;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public String getBody() {
        return this.body;
    }

    public Spark body(String body) {
        this.setBody(body);
        return this;
    }

    public void setBody(String body) {
        this.body = body;
    }

    public String getUrl() {
        return this.url;
    }

    public Spark url(String url) {
        this.setUrl(url);
        return this;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public Set<Likes> getLikes() {
        return this.likes;
    }

    public void setLikes(Set<Likes> likes) {
        if (this.likes != null) {
            this.likes.forEach(i -> i.setSpark(null));
        }
        if (likes != null) {
            likes.forEach(i -> i.setSpark(this));
        }
        this.likes = likes;
    }

    public Spark likes(Set<Likes> likes) {
        this.setLikes(likes);
        return this;
    }

    public Spark addLikes(Likes likes) {
        this.likes.add(likes);
        likes.setSpark(this);
        return this;
    }

    public Spark removeLikes(Likes likes) {
        this.likes.remove(likes);
        likes.setSpark(null);
        return this;
    }

    public UserProfile getUserProfile() {
        return this.userProfile;
    }

    public void setUserProfile(UserProfile userProfile) {
        this.userProfile = userProfile;
    }

    public Spark userProfile(UserProfile userProfile) {
        this.setUserProfile(userProfile);
        return this;
    }

    public Set<Mentions> getMentions() {
        return this.mentions;
    }

    public void setMentions(Set<Mentions> mentions) {
        if (this.mentions != null) {
            this.mentions.forEach(i -> i.removeSpark(this));
        }
        if (mentions != null) {
            mentions.forEach(i -> i.addSpark(this));
        }
        this.mentions = mentions;
    }

    public Spark mentions(Set<Mentions> mentions) {
        this.setMentions(mentions);
        return this;
    }

    public Spark addMention(Mentions mentions) {
        this.mentions.add(mentions);
        mentions.getSparks().add(this);
        return this;
    }

    public Spark removeMention(Mentions mentions) {
        this.mentions.remove(mentions);
        mentions.getSparks().remove(this);
        return this;
    }

    public Set<Hashtag> getHashtags() {
        return this.hashtags;
    }

    public void setHashtags(Set<Hashtag> hashtags) {
        if (this.hashtags != null) {
            this.hashtags.forEach(i -> i.removeSpark(this));
        }
        if (hashtags != null) {
            hashtags.forEach(i -> i.addSpark(this));
        }
        this.hashtags = hashtags;
    }

    public Spark hashtags(Set<Hashtag> hashtags) {
        this.setHashtags(hashtags);
        return this;
    }

    public Spark addHashtag(Hashtag hashtag) {
        this.hashtags.add(hashtag);
        hashtag.getSparks().add(this);
        return this;
    }

    public Spark removeHashtag(Hashtag hashtag) {
        this.hashtags.remove(hashtag);
        hashtag.getSparks().remove(this);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Spark)) {
            return false;
        }
        return getId() != null && getId().equals(((Spark) o).getId());
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Spark{" +
            "id=" + getId() +
            ", sparkId=" + getSparkId() +
            ", userId=" + getUserId() +
            ", date='" + getDate() + "'" +
            ", body='" + getBody() + "'" +
            ", url='" + getUrl() + "'" +
            "}";
    }
}
