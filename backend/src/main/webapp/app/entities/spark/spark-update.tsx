import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, Translate, translate, ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IUserProfile } from 'app/shared/model/user-profile.model';
import { getEntities as getUserProfiles } from 'app/entities/user-profile/user-profile.reducer';
import { IMentions } from 'app/shared/model/mentions.model';
import { getEntities as getMentions } from 'app/entities/mentions/mentions.reducer';
import { IHashtag } from 'app/shared/model/hashtag.model';
import { getEntities as getHashtags } from 'app/entities/hashtag/hashtag.reducer';
import { ISpark } from 'app/shared/model/spark.model';
import { getEntity, updateEntity, createEntity, reset } from './spark.reducer';

export const SparkUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const userProfiles = useAppSelector(state => state.userProfile.entities);
  const mentions = useAppSelector(state => state.mentions.entities);
  const hashtags = useAppSelector(state => state.hashtag.entities);
  const sparkEntity = useAppSelector(state => state.spark.entity);
  const loading = useAppSelector(state => state.spark.loading);
  const updating = useAppSelector(state => state.spark.updating);
  const updateSuccess = useAppSelector(state => state.spark.updateSuccess);

  const handleClose = () => {
    navigate('/spark');
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(id));
    }

    dispatch(getUserProfiles({}));
    dispatch(getMentions({}));
    dispatch(getHashtags({}));
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  // eslint-disable-next-line complexity
  const saveEntity = values => {
    if (values.id !== undefined && typeof values.id !== 'number') {
      values.id = Number(values.id);
    }
    if (values.sparkId !== undefined && typeof values.sparkId !== 'number') {
      values.sparkId = Number(values.sparkId);
    }
    if (values.userId !== undefined && typeof values.userId !== 'number') {
      values.userId = Number(values.userId);
    }

    const entity = {
      ...sparkEntity,
      ...values,
      userProfile: userProfiles.find(it => it.id.toString() === values.userProfile?.toString()),
      mentions: mapIdList(values.mentions),
      hashtags: mapIdList(values.hashtags),
    };

    if (isNew) {
      dispatch(createEntity(entity));
    } else {
      dispatch(updateEntity(entity));
    }
  };

  const defaultValues = () =>
    isNew
      ? {}
      : {
          ...sparkEntity,
          userProfile: sparkEntity?.userProfile?.id,
          mentions: sparkEntity?.mentions?.map(e => e.id.toString()),
          hashtags: sparkEntity?.hashtags?.map(e => e.id.toString()),
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="sparkApp.spark.home.createOrEditLabel" data-cy="SparkCreateUpdateHeading">
            <Translate contentKey="sparkApp.spark.home.createOrEditLabel">Create or edit a Spark</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <ValidatedForm defaultValues={defaultValues()} onSubmit={saveEntity}>
              {!isNew ? (
                <ValidatedField
                  name="id"
                  required
                  readOnly
                  id="spark-id"
                  label={translate('global.field.id')}
                  validate={{ required: true }}
                />
              ) : null}
              <ValidatedField label={translate('sparkApp.spark.sparkId')} id="spark-sparkId" name="sparkId" data-cy="sparkId" type="text" />
              <ValidatedField label={translate('sparkApp.spark.userId')} id="spark-userId" name="userId" data-cy="userId" type="text" />
              <ValidatedField label={translate('sparkApp.spark.date')} id="spark-date" name="date" data-cy="date" type="date" />
              <ValidatedField label={translate('sparkApp.spark.body')} id="spark-body" name="body" data-cy="body" type="text" />
              <ValidatedField label={translate('sparkApp.spark.url')} id="spark-url" name="url" data-cy="url" type="text" />
              <ValidatedField
                id="spark-userProfile"
                name="userProfile"
                data-cy="userProfile"
                label={translate('sparkApp.spark.userProfile')}
                type="select"
              >
                <option value="" key="0" />
                {userProfiles
                  ? userProfiles.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.id}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <ValidatedField
                label={translate('sparkApp.spark.mention')}
                id="spark-mention"
                data-cy="mention"
                type="select"
                multiple
                name="mentions"
              >
                <option value="" key="0" />
                {mentions
                  ? mentions.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.id}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <ValidatedField
                label={translate('sparkApp.spark.hashtag')}
                id="spark-hashtag"
                data-cy="hashtag"
                type="select"
                multiple
                name="hashtags"
              >
                <option value="" key="0" />
                {hashtags
                  ? hashtags.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.id}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/spark" replace color="info">
                <FontAwesomeIcon icon="arrow-left" />
                &nbsp;
                <span className="d-none d-md-inline">
                  <Translate contentKey="entity.action.back">Back</Translate>
                </span>
              </Button>
              &nbsp;
              <Button color="primary" id="save-entity" data-cy="entityCreateSaveButton" type="submit" disabled={updating}>
                <FontAwesomeIcon icon="save" />
                &nbsp;
                <Translate contentKey="entity.action.save">Save</Translate>
              </Button>
            </ValidatedForm>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default SparkUpdate;
