import { ThemeProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';
import { Suspense } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { RouterProvider } from 'react-router-dom';
import { AlertProvider, Spinner } from './components';
import { router } from './routes/router';
import theme from './utils/theme';
const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: false, refetchOnWindowFocus: false } },
});
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
