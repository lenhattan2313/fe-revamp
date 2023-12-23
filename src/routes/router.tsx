import { createBrowserRouter } from 'react-router-dom';
import { HomePage } from '../pages/Home/pages';
import { LoginPage } from '../pages/Login/pages';
import { ErrorPage } from '../pages/Error/ErrorPage';
import Root from '../components/Root/Root';
export const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        errorElement: <ErrorPage />,
        children: [
          { index: true, element: <HomePage /> },
          { path: 'login', element: <LoginPage /> },
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
]);
