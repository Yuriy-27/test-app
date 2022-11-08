import React, { FC } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { privateRoutes, publicRoutes } from './routes';

const AppRouter: FC = () => {
  const userToken = null;

  if (userToken) {
    return (
      <Routes>
        {privateRoutes.map(
          (route: { path: string; element: React.ReactElement }) => (
            <Route path={route.path} element={route.element} key={route.path} />
          )
        )}
        <Route path='*' element={<Navigate to='/' />} />
      </Routes>
    );
  }

  return (
    <Routes>
      {publicRoutes.map(
        (route: { path: string; element: React.ReactElement }) => (
          <Route path={route.path} element={route.element} key={route.path} />
        )
      )}
      <Route path='*' element={<Navigate to='/login' />} />
    </Routes>
  );
};

export default AppRouter;
