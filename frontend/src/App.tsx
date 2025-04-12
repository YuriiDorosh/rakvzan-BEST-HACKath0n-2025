// src/App.jsx

import React from 'react';
import { Box } from '@mui/material';
import { 
  createBrowserRouter, 
  createRoutesFromElements, 
  RouterProvider, 
  Route 
} from 'react-router-dom';
import { routes } from './routes/routes';
import { type RouterType } from './types/routersTypes';
import Layout from './features/layouts/Layout';

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      routes.map((route: RouterType) => (
        <Route key={route.path} {...route} />
      ))
    )
  );

  return (
    <Box className="app">
      <Layout> 
        <RouterProvider router={router} />
      </Layout>
    </Box>
  );
}

export default App;
