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
import { IHashtag } from 'app/shared/model/hashtag.model';
import { getEntity, updateEntity, createEntity, reset } from './hashtag.reducer';

export const HashtagUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const sparks = useAppSelector(state => state.spark.entities);
  const hashtagEntity = useAppSelector(state => state.hashtag.entity);
  const loading = useAppSelector(state => state.hashtag.loading);
  const updating = useAppSelector(state => state.hashtag.updating);
  const updateSuccess = useAppSelector(state => state.hashtag.updateSuccess);

  const handleClose = () => {
    navigate('/hashtag');
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(id));
    }

    dispatch(getSparks({}));
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
    if (values.hashtagId !== undefined && typeof values.hashtagId !== 'number') {
      values.hashtagId = Number(values.hashtagId);
    }

    const entity = {
      ...hashtagEntity,
      ...values,
      sparks: mapIdList(values.sparks),
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
          ...hashtagEntity,
          sparks: hashtagEntity?.sparks?.map(e => e.id.toString()),
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="sparkApp.hashtag.home.createOrEditLabel" data-cy="HashtagCreateUpdateHeading">
            <Translate contentKey="sparkApp.hashtag.home.createOrEditLabel">Create or edit a Hashtag</Translate>
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
                  id="hashtag-id"
                  label={translate('global.field.id')}
                  validate={{ required: true }}
                />
              ) : null}
              <ValidatedField
                label={translate('sparkApp.hashtag.hashtagId')}
                id="hashtag-hashtagId"
                name="hashtagId"
                data-cy="hashtagId"
                type="text"
              />
              <ValidatedField
                label={translate('sparkApp.hashtag.hashtagName')}
                id="hashtag-hashtagName"
                name="hashtagName"
                data-cy="hashtagName"
                type="text"
              />
              <ValidatedField
                label={translate('sparkApp.hashtag.dataCreated')}
                id="hashtag-dataCreated"
                name="dataCreated"
                data-cy="dataCreated"
                type="date"
              />
              <ValidatedField
                label={translate('sparkApp.hashtag.spark')}
                id="hashtag-spark"
                data-cy="spark"
                type="select"
                multiple
                name="sparks"
              >
                <option value="" key="0" />
                {sparks
                  ? sparks.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.id}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/hashtag" replace color="info">
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

export default HashtagUpdate;
