import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import './index.css';

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import Home from './routes/Home.tsx';
import About from './routes/About.tsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store.ts';
import ErrorBoundary from './ErrorBoundary.tsx';

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
        lazy: () => import('./routes/Movies.tsx'),
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
