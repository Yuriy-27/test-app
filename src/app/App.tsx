import React, { Suspense, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';

import { updateUserDataFromLocalStorage } from '../features/userSlice';
import { useAppDispatch } from '../hooks/redux';
import AppRouter from '../router/appRouter';
import './App.scss';

function App() {
  const dispatch = useAppDispatch();
  const userData = JSON.parse(localStorage?.getItem('user') || 'null');

  useEffect(() => {
    if (userData) {
      dispatch(updateUserDataFromLocalStorage(userData));
    }
  }, [userData]);

  return (
    <div className='App'>
      <BrowserRouter>
        <Suspense fallback='Loading...'>
          <AppRouter />
        </Suspense>
      </BrowserRouter>
    </div>
  );
}

export default App;
