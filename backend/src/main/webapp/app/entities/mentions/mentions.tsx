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

import { getEntities } from './mentions.reducer';

export const Mentions = () => {
  const dispatch = useAppDispatch();

  const pageLocation = useLocation();
  const navigate = useNavigate();

  const [sortState, setSortState] = useState(overrideSortStateWithQueryParams(getSortState(pageLocation, 'id'), pageLocation.search));

  const mentionsList = useAppSelector(state => state.mentions.entities);
  const loading = useAppSelector(state => state.mentions.loading);

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
      <h2 id="mentions-heading" data-cy="MentionsHeading">
        <Translate contentKey="sparkApp.mentions.home.title">Mentions</Translate>
        <div className="d-flex justify-content-end">
          <Button className="me-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} />{' '}
            <Translate contentKey="sparkApp.mentions.home.refreshListLabel">Refresh List</Translate>
          </Button>
          <Link to="/mentions/new" className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="sparkApp.mentions.home.createLabel">Create new Mentions</Translate>
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {mentionsList && mentionsList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th className="hand" onClick={sort('id')}>
                  <Translate contentKey="sparkApp.mentions.id">ID</Translate> <FontAwesomeIcon icon={getSortIconByFieldName('id')} />
                </th>
                <th className="hand" onClick={sort('mentionId')}>
                  <Translate contentKey="sparkApp.mentions.mentionId">Mention Id</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('mentionId')} />
                </th>
                <th className="hand" onClick={sort('mentionUsername')}>
                  <Translate contentKey="sparkApp.mentions.mentionUsername">Mention Username</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('mentionUsername')} />
                </th>
                <th className="hand" onClick={sort('date')}>
                  <Translate contentKey="sparkApp.mentions.date">Date</Translate> <FontAwesomeIcon icon={getSortIconByFieldName('date')} />
                </th>
                <th>
                  <Translate contentKey="sparkApp.mentions.spark">Spark</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {mentionsList.map((mentions, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`/mentions/${mentions.id}`} color="link" size="sm">
                      {mentions.id}
                    </Button>
                  </td>
                  <td>{mentions.mentionId}</td>
                  <td>{mentions.mentionUsername}</td>
                  <td>{mentions.date ? <TextFormat type="date" value={mentions.date} format={APP_LOCAL_DATE_FORMAT} /> : null}</td>
                  <td>
                    {mentions.sparks
                      ? mentions.sparks.map((val, j) => (
                          <span key={j}>
                            <Link to={`/spark/${val.id}`}>{val.id}</Link>
                            {j === mentions.sparks.length - 1 ? '' : ', '}
                          </span>
                        ))
                      : null}
                  </td>
                  <td className="text-end">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`/mentions/${mentions.id}`} color="info" size="sm" data-cy="entityDetailsButton">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`/mentions/${mentions.id}/edit`} color="primary" size="sm" data-cy="entityEditButton">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button
                        onClick={() => (window.location.href = `/mentions/${mentions.id}/delete`)}
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
              <Translate contentKey="sparkApp.mentions.home.notFound">No Mentions found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Mentions;
