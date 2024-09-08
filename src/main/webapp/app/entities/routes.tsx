import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import UserProfile from './user-profile';
import Spark from './spark';
import Hashtag from './hashtag';
import Mentions from './mentions';
import Likes from './likes';
/* jhipster-needle-add-route-import - JHipster will add routes here */

export default () => {
  return (
    <div>
      <ErrorBoundaryRoutes>
        {/* prettier-ignore */}
        <Route path="user-profile/*" element={<UserProfile />} />
        <Route path="spark/*" element={<Spark />} />
        <Route path="hashtag/*" element={<Hashtag />} />
        <Route path="mentions/*" element={<Mentions />} />
        <Route path="likes/*" element={<Likes />} />
        {/* jhipster-needle-add-route-path - JHipster will add routes here */}
      </ErrorBoundaryRoutes>
    </div>
  );
};
