import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './hashtag.reducer';

export const HashtagDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const hashtagEntity = useAppSelector(state => state.hashtag.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="hashtagDetailsHeading">
          <Translate contentKey="sparkApp.hashtag.detail.title">Hashtag</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{hashtagEntity.id}</dd>
          <dt>
            <span id="hashtagId">
              <Translate contentKey="sparkApp.hashtag.hashtagId">Hashtag Id</Translate>
            </span>
          </dt>
          <dd>{hashtagEntity.hashtagId}</dd>
          <dt>
            <span id="hashtagName">
              <Translate contentKey="sparkApp.hashtag.hashtagName">Hashtag Name</Translate>
            </span>
          </dt>
          <dd>{hashtagEntity.hashtagName}</dd>
          <dt>
            <span id="dataCreated">
              <Translate contentKey="sparkApp.hashtag.dataCreated">Data Created</Translate>
            </span>
          </dt>
          <dd>
            {hashtagEntity.dataCreated ? <TextFormat value={hashtagEntity.dataCreated} type="date" format={APP_LOCAL_DATE_FORMAT} /> : null}
          </dd>
          <dt>
            <Translate contentKey="sparkApp.hashtag.spark">Spark</Translate>
          </dt>
          <dd>
            {hashtagEntity.sparks
              ? hashtagEntity.sparks.map((val, i) => (
                  <span key={val.id}>
                    <a>{val.id}</a>
                    {hashtagEntity.sparks && i === hashtagEntity.sparks.length - 1 ? '' : ', '}
                  </span>
                ))
              : null}
          </dd>
        </dl>
        <Button tag={Link} to="/hashtag" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/hashtag/${hashtagEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default HashtagDetail;
