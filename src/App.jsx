import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { HelmetProvider } from 'react-helmet-async';
import { Toaster } from 'react-hot-toast';
import { RouterProvider } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthProvider.jsx';
import ChannelProvider from './contexts/Channel.jsx';
import router from './routes.jsx';

const queryClient = new QueryClient();

function App() {
  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <ChannelProvider>
            {/* <ProfileImageProvider> */}
            <RouterProvider router={router} />
            {/* </ProfileImageProvider> */}
          </ChannelProvider>
        </AuthProvider>
      </QueryClientProvider>
      <Toaster />
    </HelmetProvider>
  );
}

export default App;
