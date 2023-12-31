import { createBrowserRouter } from 'react-router-dom';
import { HomePage } from '../pages/Home/pages';
import { LoginPage } from '../pages/Login/pages';
import { ErrorPage } from '../pages/Error/ErrorPage';
import PrivateRoute from './PrivateRoute';
import { Root } from '@/components';
export const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        element: <PrivateRoute />,
        errorElement: <ErrorPage />,
        children: [
          { index: true, element: <HomePage /> },

          /* 
          {
            path: 'contacts/:contactId',
            element: <Contact />,
          },
          */
        ],
      },
    ],
  },
  { path: 'login', element: <LoginPage /> },
]);
