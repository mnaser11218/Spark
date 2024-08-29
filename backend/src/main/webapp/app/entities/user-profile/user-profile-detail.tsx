import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './user-profile.reducer';

export const UserProfileDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const userProfileEntity = useAppSelector(state => state.userProfile.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="userProfileDetailsHeading">
          <Translate contentKey="sparkApp.userProfile.detail.title">UserProfile</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{userProfileEntity.id}</dd>
          <dt>
            <span id="userId">
              <Translate contentKey="sparkApp.userProfile.userId">User Id</Translate>
            </span>
          </dt>
          <dd>{userProfileEntity.userId}</dd>
          <dt>
            <span id="userName">
              <Translate contentKey="sparkApp.userProfile.userName">User Name</Translate>
            </span>
          </dt>
          <dd>{userProfileEntity.userName}</dd>
          <dt>
            <span id="firstName">
              <Translate contentKey="sparkApp.userProfile.firstName">First Name</Translate>
            </span>
          </dt>
          <dd>{userProfileEntity.firstName}</dd>
          <dt>
            <span id="lastName">
              <Translate contentKey="sparkApp.userProfile.lastName">Last Name</Translate>
            </span>
          </dt>
          <dd>{userProfileEntity.lastName}</dd>
          <dt>
            <span id="createdDate">
              <Translate contentKey="sparkApp.userProfile.createdDate">Created Date</Translate>
            </span>
          </dt>
          <dd>
            {userProfileEntity.createdDate ? (
              <TextFormat value={userProfileEntity.createdDate} type="date" format={APP_LOCAL_DATE_FORMAT} />
            ) : null}
          </dd>
        </dl>
        <Button tag={Link} to="/user-profile" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/user-profile/${userProfileEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default UserProfileDetail;
