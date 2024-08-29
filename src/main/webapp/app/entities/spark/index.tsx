import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import Spark from './spark';
import SparkDetail from './spark-detail';
import SparkUpdate from './spark-update';
import SparkDeleteDialog from './spark-delete-dialog';

const SparkRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<Spark />} />
    <Route path="new" element={<SparkUpdate />} />
    <Route path=":id">
      <Route index element={<SparkDetail />} />
      <Route path="edit" element={<SparkUpdate />} />
      <Route path="delete" element={<SparkDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default SparkRoutes;
