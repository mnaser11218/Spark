import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './likes.reducer';

export const LikesDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const likesEntity = useAppSelector(state => state.likes.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="likesDetailsHeading">
          <Translate contentKey="sparkApp.likes.detail.title">Likes</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{likesEntity.id}</dd>
          <dt>
            <span id="liked">
              <Translate contentKey="sparkApp.likes.liked">Liked</Translate>
            </span>
          </dt>
          <dd>{likesEntity.liked}</dd>
          <dt>
            <span id="dislike">
              <Translate contentKey="sparkApp.likes.dislike">Dislike</Translate>
            </span>
          </dt>
          <dd>{likesEntity.dislike}</dd>
          <dt>
            <Translate contentKey="sparkApp.likes.spark">Spark</Translate>
          </dt>
          <dd>{likesEntity.spark ? likesEntity.spark.id : ''}</dd>
          <dt>
            <Translate contentKey="sparkApp.likes.userProfile">User Profile</Translate>
          </dt>
          <dd>{likesEntity.userProfile ? likesEntity.userProfile.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/likes" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/likes/${likesEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default LikesDetail;
