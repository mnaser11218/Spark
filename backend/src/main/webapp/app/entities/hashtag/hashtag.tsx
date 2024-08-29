import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button, Table } from 'reactstrap';
import { Translate, TextFormat, getSortState } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSort, faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ASC, DESC, SORT } from 'app/shared/util/pagination.constants';
import { overrideSortStateWithQueryParams } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntities } from './hashtag.reducer';

export const Hashtag = () => {
  const dispatch = useAppDispatch();

  const pageLocation = useLocation();
  const navigate = useNavigate();

  const [sortState, setSortState] = useState(overrideSortStateWithQueryParams(getSortState(pageLocation, 'id'), pageLocation.search));

  const hashtagList = useAppSelector(state => state.hashtag.entities);
  const loading = useAppSelector(state => state.hashtag.loading);

  const getAllEntities = () => {
    dispatch(
      getEntities({
        sort: `${sortState.sort},${sortState.order}`,
      }),
    );
  };

  const sortEntities = () => {
    getAllEntities();
    const endURL = `?sort=${sortState.sort},${sortState.order}`;
    if (pageLocation.search !== endURL) {
      navigate(`${pageLocation.pathname}${endURL}`);
    }
  };

  useEffect(() => {
    sortEntities();
  }, [sortState.order, sortState.sort]);

  const sort = p => () => {
    setSortState({
      ...sortState,
      order: sortState.order === ASC ? DESC : ASC,
      sort: p,
    });
  };

  const handleSyncList = () => {
    sortEntities();
  };

  const getSortIconByFieldName = (fieldName: string) => {
    const sortFieldName = sortState.sort;
    const order = sortState.order;
    if (sortFieldName !== fieldName) {
      return faSort;
    } else {
      return order === ASC ? faSortUp : faSortDown;
    }
  };

  return (
    <div>
      <h2 id="hashtag-heading" data-cy="HashtagHeading">
        <Translate contentKey="sparkApp.hashtag.home.title">Hashtags</Translate>
        <div className="d-flex justify-content-end">
          <Button className="me-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} />{' '}
            <Translate contentKey="sparkApp.hashtag.home.refreshListLabel">Refresh List</Translate>
          </Button>
          <Link to="/hashtag/new" className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="sparkApp.hashtag.home.createLabel">Create new Hashtag</Translate>
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {hashtagList && hashtagList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th className="hand" onClick={sort('id')}>
                  <Translate contentKey="sparkApp.hashtag.id">ID</Translate> <FontAwesomeIcon icon={getSortIconByFieldName('id')} />
                </th>
                <th className="hand" onClick={sort('hashtagId')}>
                  <Translate contentKey="sparkApp.hashtag.hashtagId">Hashtag Id</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('hashtagId')} />
                </th>
                <th className="hand" onClick={sort('hashtagName')}>
                  <Translate contentKey="sparkApp.hashtag.hashtagName">Hashtag Name</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('hashtagName')} />
                </th>
                <th className="hand" onClick={sort('dataCreated')}>
                  <Translate contentKey="sparkApp.hashtag.dataCreated">Data Created</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('dataCreated')} />
                </th>
                <th>
                  <Translate contentKey="sparkApp.hashtag.spark">Spark</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {hashtagList.map((hashtag, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`/hashtag/${hashtag.id}`} color="link" size="sm">
                      {hashtag.id}
                    </Button>
                  </td>
                  <td>{hashtag.hashtagId}</td>
                  <td>{hashtag.hashtagName}</td>
                  <td>
                    {hashtag.dataCreated ? <TextFormat type="date" value={hashtag.dataCreated} format={APP_LOCAL_DATE_FORMAT} /> : null}
                  </td>
                  <td>
                    {hashtag.sparks
                      ? hashtag.sparks.map((val, j) => (
                          <span key={j}>
                            <Link to={`/spark/${val.id}`}>{val.id}</Link>
                            {j === hashtag.sparks.length - 1 ? '' : ', '}
                          </span>
                        ))
                      : null}
                  </td>
                  <td className="text-end">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`/hashtag/${hashtag.id}`} color="info" size="sm" data-cy="entityDetailsButton">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`/hashtag/${hashtag.id}/edit`} color="primary" size="sm" data-cy="entityEditButton">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button
                        onClick={() => (window.location.href = `/hashtag/${hashtag.id}/delete`)}
                        color="danger"
                        size="sm"
                        data-cy="entityDeleteButton"
                      >
                        <FontAwesomeIcon icon="trash" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.delete">Delete</Translate>
                        </span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && (
            <div className="alert alert-warning">
              <Translate contentKey="sparkApp.hashtag.home.notFound">No Hashtags found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Hashtag;
