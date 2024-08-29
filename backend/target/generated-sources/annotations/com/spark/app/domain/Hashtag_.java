package com.spark.app.domain;

import jakarta.annotation.Generated;
import jakarta.persistence.metamodel.EntityType;
import jakarta.persistence.metamodel.SetAttribute;
import jakarta.persistence.metamodel.SingularAttribute;
import jakarta.persistence.metamodel.StaticMetamodel;
import java.time.LocalDate;

@StaticMetamodel(Hashtag.class)
@Generated("org.hibernate.processor.HibernateProcessor")
public abstract class Hashtag_ {

	public static final String HASHTAG_ID = "hashtagId";
	public static final String SPARKS = "sparks";
	public static final String HASHTAG_NAME = "hashtagName";
	public static final String ID = "id";
	public static final String DATA_CREATED = "dataCreated";

	
	/**
	 * @see com.spark.app.domain.Hashtag#hashtagId
	 **/
	public static volatile SingularAttribute<Hashtag, Long> hashtagId;
	
	/**
	 * @see com.spark.app.domain.Hashtag#sparks
	 **/
	public static volatile SetAttribute<Hashtag, Spark> sparks;
	
	/**
	 * @see com.spark.app.domain.Hashtag#hashtagName
	 **/
	public static volatile SingularAttribute<Hashtag, String> hashtagName;
	
	/**
	 * @see com.spark.app.domain.Hashtag#id
	 **/
	public static volatile SingularAttribute<Hashtag, Long> id;
	
	/**
	 * @see com.spark.app.domain.Hashtag#dataCreated
	 **/
	public static volatile SingularAttribute<Hashtag, LocalDate> dataCreated;
	
	/**
	 * @see com.spark.app.domain.Hashtag
	 **/
	public static volatile EntityType<Hashtag> class_;

}

