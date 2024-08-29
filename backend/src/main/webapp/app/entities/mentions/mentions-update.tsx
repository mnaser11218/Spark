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
import { IMentions } from 'app/shared/model/mentions.model';
import { getEntity, updateEntity, createEntity, reset } from './mentions.reducer';

export const MentionsUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const sparks = useAppSelector(state => state.spark.entities);
  const mentionsEntity = useAppSelector(state => state.mentions.entity);
  const loading = useAppSelector(state => state.mentions.loading);
  const updating = useAppSelector(state => state.mentions.updating);
  const updateSuccess = useAppSelector(state => state.mentions.updateSuccess);

  const handleClose = () => {
    navigate('/mentions');
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
    if (values.mentionId !== undefined && typeof values.mentionId !== 'number') {
      values.mentionId = Number(values.mentionId);
    }

    const entity = {
      ...mentionsEntity,
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
          ...mentionsEntity,
          sparks: mentionsEntity?.sparks?.map(e => e.id.toString()),
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="sparkApp.mentions.home.createOrEditLabel" data-cy="MentionsCreateUpdateHeading">
            <Translate contentKey="sparkApp.mentions.home.createOrEditLabel">Create or edit a Mentions</Translate>
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
                  id="mentions-id"
                  label={translate('global.field.id')}
                  validate={{ required: true }}
                />
              ) : null}
              <ValidatedField
                label={translate('sparkApp.mentions.mentionId')}
                id="mentions-mentionId"
                name="mentionId"
                data-cy="mentionId"
                type="text"
              />
              <ValidatedField
                label={translate('sparkApp.mentions.mentionUsername')}
                id="mentions-mentionUsername"
                name="mentionUsername"
                data-cy="mentionUsername"
                type="text"
              />
              <ValidatedField label={translate('sparkApp.mentions.date')} id="mentions-date" name="date" data-cy="date" type="date" />
              <ValidatedField
                label={translate('sparkApp.mentions.spark')}
                id="mentions-spark"
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
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/mentions" replace color="info">
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

export default MentionsUpdate;
