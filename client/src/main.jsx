import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App.jsx';
import Call from './components/Call.jsx';
import JoinCall from './components/JoinCall.jsx';
import ErrorBoundary from './components/ErrorBoundary.jsx';
import './index.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    ),
  },
  {
    path: '/join',
    element: (
      <ErrorBoundary>
        <JoinCall />
      </ErrorBoundary>
    ),
  },
  {
    path: '/call',
    element: (
      <ErrorBoundary>
        <Call />
      </ErrorBoundary>
    ),
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
