import React, { FC } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { selectUser } from '../features/userSlice';
import { useAppSelector } from '../hooks/redux';
import { privateRoutes, publicRoutes } from './routes';

const AppRouter: FC = () => {
  const user = useAppSelector(selectUser);

  if (user) {
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
      {publicRoutes.map((route: { path: string; element: React.ReactNode }) => (
        <Route path={route.path} element={route.element} key={route.path} />
      ))}
      <Route path='*' element={<Navigate to='/login' />} />
    </Routes>
  );
};

export default AppRouter;
