import HomePage from '../pages/HomePage/HomePage.lazy';
import LoginPage from '../pages/LoginPage/LoginPage.lazy';
import RegisterPage from '../pages/RegisterPage/RegisterPage.lazy';

export const privateRoutes = [{ path: '/', element: <HomePage /> }];

export const publicRoutes = [
  { path: '/login', element: <LoginPage /> },
  { path: '/register', element: <RegisterPage /> }
];
