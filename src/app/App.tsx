import React, { Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import HomePage from '../pages/HomePage/HomePage.lazy';
import LoginPage from '../pages/LoginPage/LoginPage.lazy';
import RegisterPage from '../pages/RegisterPage/RegisterPage.lazy';
import './App.scss';

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Suspense fallback='Loading...'>
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/register' element={<RegisterPage />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </div>
  );
}

export default App;
