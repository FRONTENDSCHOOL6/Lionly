import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { HelmetProvider } from 'react-helmet-async';
import { RouterProvider } from 'react-router-dom';
import ChannelProvider from './contexts/Channel.jsx';
import ProfileImageProvider from './contexts/ProfileImage.jsx';
import router from './routes.jsx';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { AuthProvider } from './contexts/AuthProvider.jsx';

const queryClient = new QueryClient();

function App() {
  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <ChannelProvider>
            <ProfileImageProvider>
              <RouterProvider router={router} />
            </ProfileImageProvider>
          </ChannelProvider>
        </AuthProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
}

export default App;
