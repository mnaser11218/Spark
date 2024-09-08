import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, Translate, translate, ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { ISpark } from 'app/shared/model/spark.model';
import { getEntities as getSparks } from 'app/entities/spark/spark.reducer';
import { IUserProfile } from 'app/shared/model/user-profile.model';
import { getEntities as getUserProfiles } from 'app/entities/user-profile/user-profile.reducer';
import { ILikes } from 'app/shared/model/likes.model';
import { getEntity, updateEntity, createEntity, reset } from './likes.reducer';

export const LikesUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const sparks = useAppSelector(state => state.spark.entities);
  const userProfiles = useAppSelector(state => state.userProfile.entities);
  const likesEntity = useAppSelector(state => state.likes.entity);
  const loading = useAppSelector(state => state.likes.loading);
  const updating = useAppSelector(state => state.likes.updating);
  const updateSuccess = useAppSelector(state => state.likes.updateSuccess);

  const handleClose = () => {
    navigate('/likes');
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(id));
    }

    dispatch(getSparks({}));
    dispatch(getUserProfiles({}));
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
    if (values.liked !== undefined && typeof values.liked !== 'number') {
      values.liked = Number(values.liked);
    }
    if (values.dislike !== undefined && typeof values.dislike !== 'number') {
      values.dislike = Number(values.dislike);
    }

    const entity = {
      ...likesEntity,
      ...values,
      spark: sparks.find(it => it.id.toString() === values.spark?.toString()),
      userProfile: userProfiles.find(it => it.id.toString() === values.userProfile?.toString()),
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
          ...likesEntity,
          spark: likesEntity?.spark?.id,
          userProfile: likesEntity?.userProfile?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="sparkApp.likes.home.createOrEditLabel" data-cy="LikesCreateUpdateHeading">
            <Translate contentKey="sparkApp.likes.home.createOrEditLabel">Create or edit a Likes</Translate>
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
                  id="likes-id"
                  label={translate('global.field.id')}
                  validate={{ required: true }}
                />
              ) : null}
              <ValidatedField label={translate('sparkApp.likes.liked')} id="likes-liked" name="liked" data-cy="liked" type="text" />
              <ValidatedField label={translate('sparkApp.likes.dislike')} id="likes-dislike" name="dislike" data-cy="dislike" type="text" />
              <ValidatedField id="likes-spark" name="spark" data-cy="spark" label={translate('sparkApp.likes.spark')} type="select">
                <option value="" key="0" />
                {sparks
                  ? sparks.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.id}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <ValidatedField
                id="likes-userProfile"
                name="userProfile"
                data-cy="userProfile"
                label={translate('sparkApp.likes.userProfile')}
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
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/likes" replace color="info">
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

export default LikesUpdate;
