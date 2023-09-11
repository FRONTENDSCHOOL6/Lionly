import { RouterProvider } from 'react-router-dom';
import ChannelProvider from './contexts/Channel.jsx';
import ProfileImageProvider from './contexts/ProfileImage.jsx';
import router from './routes.jsx';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { HelmetProvider } from 'react-helmet-async';

const queryClient = new QueryClient();

function App() {
  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <ChannelProvider>
          <ProfileImageProvider>
            <RouterProvider router={router} />
          </ProfileImageProvider>
        </ChannelProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
}

export default App;
