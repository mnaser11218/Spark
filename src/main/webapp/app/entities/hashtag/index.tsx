import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import Hashtag from './hashtag';
import HashtagDetail from './hashtag-detail';
import HashtagUpdate from './hashtag-update';
import HashtagDeleteDialog from './hashtag-delete-dialog';

const HashtagRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<Hashtag />} />
    <Route path="new" element={<HashtagUpdate />} />
    <Route path=":id">
      <Route index element={<HashtagDetail />} />
      <Route path="edit" element={<HashtagUpdate />} />
      <Route path="delete" element={<HashtagDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default HashtagRoutes;
