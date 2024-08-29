package com.spark.app.domain;

import jakarta.annotation.Generated;
import jakarta.persistence.metamodel.EntityType;
import jakarta.persistence.metamodel.SetAttribute;
import jakarta.persistence.metamodel.SingularAttribute;
import jakarta.persistence.metamodel.StaticMetamodel;
import java.time.LocalDate;

@StaticMetamodel(Mentions.class)
@Generated("org.hibernate.processor.HibernateProcessor")
public abstract class Mentions_ {

	public static final String MENTION_ID = "mentionId";
	public static final String DATE = "date";
	public static final String SPARKS = "sparks";
	public static final String MENTION_USERNAME = "mentionUsername";
	public static final String ID = "id";

	
	/**
	 * @see com.spark.app.domain.Mentions#mentionId
	 **/
	public static volatile SingularAttribute<Mentions, Long> mentionId;
	
	/**
	 * @see com.spark.app.domain.Mentions#date
	 **/
	public static volatile SingularAttribute<Mentions, LocalDate> date;
	
	/**
	 * @see com.spark.app.domain.Mentions#sparks
	 **/
	public static volatile SetAttribute<Mentions, Spark> sparks;
	
	/**
	 * @see com.spark.app.domain.Mentions#mentionUsername
	 **/
	public static volatile SingularAttribute<Mentions, String> mentionUsername;
	
	/**
	 * @see com.spark.app.domain.Mentions#id
	 **/
	public static volatile SingularAttribute<Mentions, Long> id;
	
	/**
	 * @see com.spark.app.domain.Mentions
	 **/
	public static volatile EntityType<Mentions> class_;

}

