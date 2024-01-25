import { RouterProvider } from 'react-router-dom';
import { router } from './routes/router';
import { Suspense } from 'react';
import { ThemeProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';
import theme from './utils/theme';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { AlertProvider, Spinner } from './components';

const queryClient = new QueryClient();
function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Suspense fallback={<Spinner />}>
        <QueryClientProvider client={queryClient}>
          <AlertProvider>
            <RouterProvider router={router} />
          </AlertProvider>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </Suspense>
    </ThemeProvider>
  );
}

export default App;
