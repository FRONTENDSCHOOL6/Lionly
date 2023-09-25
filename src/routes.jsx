import { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';

const RootLayout = lazy(() => import('./components/layout/RootLayout.jsx'));
const ErrorPage = lazy(() => import('./pages/ErrorPage.jsx'));
const BeforeLogin = lazy(() => import('./components/layout/BeforeLogin.jsx'));

const Landing = lazy(() => import('./pages/Landing.jsx'));
const SignIn = lazy(() => import('./pages/SignIn.jsx'));
const SignUp = lazy(() => import('./pages/SignUp.jsx'));

const ProtectedRoute = lazy(() => import('./components/ProtectedRoute.jsx'));
const Writing = lazy(() => import('./pages/Writing.jsx'));
const Edit = lazy(() => import('./pages/Edit.jsx'));
const MyPage = lazy(() => import('./pages/MyPage.jsx'));
const Feed = lazy(() => import('./pages/Feed.jsx'));
const FeedList = lazy(() => import('./components/layout/feed/FeedList.jsx'));
const Contents = lazy(() => import('./pages/Contents.jsx'));

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <BeforeLogin />,
        children: [
          {
            path: '/',
            element: <Landing />,
          },
          {
            path: '/signin',
            element: <SignIn />,
          },
          {
            path: '/signup',
            element: <SignUp />,
          },
        ],
      },

      {
        path: '/writing',
        element: (
          <ProtectedRoute>
            <Writing />
          </ProtectedRoute>
        ),
      },
      {
        path: '/edit/:postId',
        element: (
          <ProtectedRoute>
            <Edit />
          </ProtectedRoute>
        ),
      },
      {
        path: '/mypage',
        element: (
          <ProtectedRoute>
            <MyPage />
          </ProtectedRoute>
        ),
      },
      {
        path: '/feed',
        element: (
          <ProtectedRoute>
            <Feed />
          </ProtectedRoute>
        ),
        children: [
          { path: '/feed', element: <FeedList /> },
          { path: '/feed/healing', element: <FeedList /> },
          { path: '/feed/job', element: <FeedList /> },
          { path: '/feed/food', element: <FeedList /> },
          { path: '/feed/daily', element: <FeedList /> },
        ],
      },
      {
        path: 'feed/contents/:contentId',
        element: <Contents />,
      },
    ],
  },
]);

export default router;
