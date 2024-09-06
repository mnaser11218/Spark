import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import Likes from './likes';
import LikesDetail from './likes-detail';
import LikesUpdate from './likes-update';
import LikesDeleteDialog from './likes-delete-dialog';

const LikesRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<Likes />} />
    <Route path="new" element={<LikesUpdate />} />
    <Route path=":id">
      <Route index element={<LikesDetail />} />
      <Route path="edit" element={<LikesUpdate />} />
      <Route path="delete" element={<LikesDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default LikesRoutes;
