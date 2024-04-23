import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import './index.css';

import React, { lazy, Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import Home from './routes/Home.tsx';
import About from './routes/About.tsx';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/index.ts';
import ErrorBoundary from './ErrorBoundary.tsx';
import { LinearProgress } from '@mui/material';

// eslint-disable-next-line react-refresh/only-export-components
const Movies = lazy(() => import('./routes/Movies.tsx'));
// eslint-disable-next-line react-refresh/only-export-components
const Extra = lazy(() => import('./features/Extra/Extra.tsx'));

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Provider store={store}>
        <ErrorBoundary>
          <App />
        </ErrorBoundary>
      </Provider>
    ),
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/movies',
        element: (
          <Suspense
            fallback={<LinearProgress color="warning" sx={{ mt: 1 }} />}>
            <Movies />
          </Suspense>
        ),
      },
      {
        path: 'extra',
        element: (
          <Suspense
            fallback={<LinearProgress color="warning" sx={{ mt: 1 }} />}>
            <Extra />
          </Suspense>
        ),
      },
      {
        path: '/about',
        element: <About />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
