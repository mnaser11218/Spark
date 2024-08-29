package com.spark.app.domain;

import jakarta.annotation.Generated;
import jakarta.persistence.metamodel.EntityType;
import jakarta.persistence.metamodel.SetAttribute;
import jakarta.persistence.metamodel.SingularAttribute;
import jakarta.persistence.metamodel.StaticMetamodel;
import java.time.LocalDate;

@StaticMetamodel(Spark.class)
@Generated("org.hibernate.processor.HibernateProcessor")
public abstract class Spark_ {

	public static final String DATE = "date";
	public static final String HASHTAGS = "hashtags";
	public static final String MENTIONS = "mentions";
	public static final String ID = "id";
	public static final String BODY = "body";
	public static final String USER_ID = "userId";
	public static final String URL = "url";
	public static final String USER_PROFILE = "userProfile";
	public static final String SPARK_ID = "sparkId";

	
	/**
	 * @see com.spark.app.domain.Spark#date
	 **/
	public static volatile SingularAttribute<Spark, LocalDate> date;
	
	/**
	 * @see com.spark.app.domain.Spark#hashtags
	 **/
	public static volatile SetAttribute<Spark, Hashtag> hashtags;
	
	/**
	 * @see com.spark.app.domain.Spark#mentions
	 **/
	public static volatile SetAttribute<Spark, Mentions> mentions;
	
	/**
	 * @see com.spark.app.domain.Spark#id
	 **/
	public static volatile SingularAttribute<Spark, Long> id;
	
	/**
	 * @see com.spark.app.domain.Spark#body
	 **/
	public static volatile SingularAttribute<Spark, String> body;
	
	/**
	 * @see com.spark.app.domain.Spark
	 **/
	public static volatile EntityType<Spark> class_;
	
	/**
	 * @see com.spark.app.domain.Spark#userId
	 **/
	public static volatile SingularAttribute<Spark, Long> userId;
	
	/**
	 * @see com.spark.app.domain.Spark#url
	 **/
	public static volatile SingularAttribute<Spark, String> url;
	
	/**
	 * @see com.spark.app.domain.Spark#userProfile
	 **/
	public static volatile SingularAttribute<Spark, UserProfile> userProfile;
	
	/**
	 * @see com.spark.app.domain.Spark#sparkId
	 **/
	public static volatile SingularAttribute<Spark, Long> sparkId;

}

