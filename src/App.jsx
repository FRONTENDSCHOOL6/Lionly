import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AnimatePresence } from 'framer-motion';
import { HelmetProvider } from 'react-helmet-async';
import { Toaster } from 'react-hot-toast';
import { RouterProvider } from 'react-router-dom';
import { AuthProvider, ChannelProvider, ReplyProvider } from './contexts';
import router from './routes.jsx';

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <HelmetProvider>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <ChannelProvider>
              <ReplyProvider>
                <AnimatePresence>
                  <RouterProvider router={router} />
                </AnimatePresence>
              </ReplyProvider>
            </ChannelProvider>
          </AuthProvider>
        </QueryClientProvider>
      </HelmetProvider>
      <Toaster />
    </>
  );
}

export default App;
