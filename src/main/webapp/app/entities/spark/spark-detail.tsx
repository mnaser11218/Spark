import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './spark.reducer';

export const SparkDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const sparkEntity = useAppSelector(state => state.spark.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="sparkDetailsHeading">
          <Translate contentKey="sparkApp.spark.detail.title">Spark</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{sparkEntity.id}</dd>
          <dt>
            <span id="sparkId">
              <Translate contentKey="sparkApp.spark.sparkId">Spark Id</Translate>
            </span>
          </dt>
          <dd>{sparkEntity.sparkId}</dd>
          <dt>
            <span id="userId">
              <Translate contentKey="sparkApp.spark.userId">User Id</Translate>
            </span>
          </dt>
          <dd>{sparkEntity.userId}</dd>
          <dt>
            <span id="date">
              <Translate contentKey="sparkApp.spark.date">Date</Translate>
            </span>
          </dt>
          <dd>{sparkEntity.date ? <TextFormat value={sparkEntity.date} type="date" format={APP_LOCAL_DATE_FORMAT} /> : null}</dd>
          <dt>
            <span id="body">
              <Translate contentKey="sparkApp.spark.body">Body</Translate>
            </span>
          </dt>
          <dd>{sparkEntity.body}</dd>
          <dt>
            <span id="url">
              <Translate contentKey="sparkApp.spark.url">Url</Translate>
            </span>
          </dt>
          <dd>{sparkEntity.url}</dd>
          <dt>
            <Translate contentKey="sparkApp.spark.userProfile">User Profile</Translate>
          </dt>
          <dd>{sparkEntity.userProfile ? sparkEntity.userProfile.id : ''}</dd>
          <dt>
            <Translate contentKey="sparkApp.spark.mention">Mention</Translate>
          </dt>
          <dd>
            {sparkEntity.mentions
              ? sparkEntity.mentions.map((val, i) => (
                  <span key={val.id}>
                    <a>{val.id}</a>
                    {sparkEntity.mentions && i === sparkEntity.mentions.length - 1 ? '' : ', '}
                  </span>
                ))
              : null}
          </dd>
          <dt>
            <Translate contentKey="sparkApp.spark.hashtag">Hashtag</Translate>
          </dt>
          <dd>
            {sparkEntity.hashtags
              ? sparkEntity.hashtags.map((val, i) => (
                  <span key={val.id}>
                    <a>{val.id}</a>
                    {sparkEntity.hashtags && i === sparkEntity.hashtags.length - 1 ? '' : ', '}
                  </span>
                ))
              : null}
          </dd>
        </dl>
        <Button tag={Link} to="/spark" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/spark/${sparkEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default SparkDetail;
