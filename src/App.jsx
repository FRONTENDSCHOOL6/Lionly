import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AnimatePresence } from 'framer-motion';
import { Suspense } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { Toaster } from 'react-hot-toast';
import { RouterProvider } from 'react-router-dom';
import Spinner from './components/Spinner';
import { AuthProvider, ChannelProvider, ContentProvider } from './contexts';
import router from './routes.jsx';

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <HelmetProvider>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <ChannelProvider>
              <ContentProvider>
                <AnimatePresence>
                  <div className="App">
                    <Suspense
                      fallback={
                        <div className="h-screen">
                          <Spinner size={'50%'} />
                          <p
                            role="status"
                            className="text-center text-lionly-lg text-lionly-black"
                          >
                            페이지 이동 중입니다.
                          </p>
                        </div>
                      }
                    >
                      <RouterProvider router={router} />
                    </Suspense>
                  </div>
                </AnimatePresence>
              </ContentProvider>
            </ChannelProvider>
          </AuthProvider>
        </QueryClientProvider>
      </HelmetProvider>
      <Toaster />
    </>
  );
}

export default App;
