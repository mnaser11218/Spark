import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './mentions.reducer';

export const MentionsDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const mentionsEntity = useAppSelector(state => state.mentions.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="mentionsDetailsHeading">
          <Translate contentKey="sparkApp.mentions.detail.title">Mentions</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{mentionsEntity.id}</dd>
          <dt>
            <span id="mentionId">
              <Translate contentKey="sparkApp.mentions.mentionId">Mention Id</Translate>
            </span>
          </dt>
          <dd>{mentionsEntity.mentionId}</dd>
          <dt>
            <span id="mentionUsername">
              <Translate contentKey="sparkApp.mentions.mentionUsername">Mention Username</Translate>
            </span>
          </dt>
          <dd>{mentionsEntity.mentionUsername}</dd>
          <dt>
            <span id="date">
              <Translate contentKey="sparkApp.mentions.date">Date</Translate>
            </span>
          </dt>
          <dd>{mentionsEntity.date ? <TextFormat value={mentionsEntity.date} type="date" format={APP_LOCAL_DATE_FORMAT} /> : null}</dd>
          <dt>
            <Translate contentKey="sparkApp.mentions.spark">Spark</Translate>
          </dt>
          <dd>
            {mentionsEntity.sparks
              ? mentionsEntity.sparks.map((val, i) => (
                  <span key={val.id}>
                    <a>{val.id}</a>
                    {mentionsEntity.sparks && i === mentionsEntity.sparks.length - 1 ? '' : ', '}
                  </span>
                ))
              : null}
          </dd>
        </dl>
        <Button tag={Link} to="/mentions" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/mentions/${mentionsEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default MentionsDetail;
