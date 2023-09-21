import { createBrowserRouter } from 'react-router-dom';
import BeforeLogin from './components/layout/BeforeLogin.jsx';
import RootLayout from './components/layout/RootLayout.jsx';
import {
  Contents,
  ErrorPage,
  Feed,
  Landing,
  MyPage,
  SignIn,
  SignUp,
  Writing,
} from './pages';
import ProtectedRoute from './components/ProtecteRoute.jsx';
import Edit from './pages/Edit.jsx';
import FeedList from './components/layout/feed/FeedList.jsx';

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
