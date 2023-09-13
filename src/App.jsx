import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { HelmetProvider } from 'react-helmet-async';
import { RouterProvider } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthProvider.jsx';
import ChannelProvider from './contexts/Channel.jsx';
import router from './routes.jsx';
import { Toaster } from 'react-hot-toast';

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <HelmetProvider>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <ChannelProvider>
              <RouterProvider router={router} />
            </ChannelProvider>
          </AuthProvider>
        </QueryClientProvider>
      </HelmetProvider>
      <Toaster />
    </>
  );
}

export default App;
