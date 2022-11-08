import React, { Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';

import AppRouter from '../router/appRouter';
import './App.scss';

function App() {
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
