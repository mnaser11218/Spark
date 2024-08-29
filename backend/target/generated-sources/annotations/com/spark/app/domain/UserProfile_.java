package com.spark.app.domain;

import jakarta.annotation.Generated;
import jakarta.persistence.metamodel.EntityType;
import jakarta.persistence.metamodel.SetAttribute;
import jakarta.persistence.metamodel.SingularAttribute;
import jakarta.persistence.metamodel.StaticMetamodel;
import java.time.LocalDate;

@StaticMetamodel(UserProfile.class)
@Generated("org.hibernate.processor.HibernateProcessor")
public abstract class UserProfile_ {

	public static final String FIRST_NAME = "firstName";
	public static final String LAST_NAME = "lastName";
	public static final String CREATED_DATE = "createdDate";
	public static final String SPARKS = "sparks";
	public static final String ID = "id";
	public static final String USER_NAME = "userName";
	public static final String USER_ID = "userId";

	
	/**
	 * @see com.spark.app.domain.UserProfile#firstName
	 **/
	public static volatile SingularAttribute<UserProfile, String> firstName;
	
	/**
	 * @see com.spark.app.domain.UserProfile#lastName
	 **/
	public static volatile SingularAttribute<UserProfile, String> lastName;
	
	/**
	 * @see com.spark.app.domain.UserProfile#createdDate
	 **/
	public static volatile SingularAttribute<UserProfile, LocalDate> createdDate;
	
	/**
	 * @see com.spark.app.domain.UserProfile#sparks
	 **/
	public static volatile SetAttribute<UserProfile, Spark> sparks;
	
	/**
	 * @see com.spark.app.domain.UserProfile#id
	 **/
	public static volatile SingularAttribute<UserProfile, Long> id;
	
	/**
	 * @see com.spark.app.domain.UserProfile#userName
	 **/
	public static volatile SingularAttribute<UserProfile, String> userName;
	
	/**
	 * @see com.spark.app.domain.UserProfile
	 **/
	public static volatile EntityType<UserProfile> class_;
	
	/**
	 * @see com.spark.app.domain.UserProfile#userId
	 **/
	public static volatile SingularAttribute<UserProfile, Long> userId;

}

