import { hydrateRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { routes } from './routes';
import App from './App';
import './index.css';

const router = createBrowserRouter(routes);

hydrateRoot(
  document.getElementById('root')!,
  <RouterProvider router={router}>
    <App />
  </RouterProvider>
);
