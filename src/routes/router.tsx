import { BasicLayout } from '@/layout';
import { ProductPage } from '@/pages/Product/pages';
import { createBrowserRouter } from 'react-router-dom';
import { ErrorPage } from '../pages/Error/ErrorPage';
import { HomePage } from '../pages/Home/pages';
import { LoginPage } from '../pages/Login/pages';
import PrivateRoute from './PrivateRoute';
export const router = createBrowserRouter([
  {
    path: '/',
    element: <BasicLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        element: <PrivateRoute />,
        errorElement: <ErrorPage />,
        children: [
          { index: true, element: <ProductPage /> },
          {
            path: 'product/',
            element: <HomePage />,
          },
        ],
      },
    ],
  },
  { path: 'login', element: <LoginPage /> },
]);
