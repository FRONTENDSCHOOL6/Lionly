import { createBrowserRouter } from 'react-router-dom';
import FeedList from './components/layout/FeedList.jsx';
import BeforeLogin from './components/layout/BeforeLogin.jsx';
import RootLayout from './components/layout/RootLayout.jsx';
import {
  Content,
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
            path: 'signin',
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
        path: '/edit',
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
          { path: '/feed/healings', element: <FeedList /> },
          { path: '/feed/jobs', element: <FeedList /> },
          { path: '/feed/foods', element: <FeedList /> },
          { path: '/feed/dailys', element: <FeedList /> },
        ],
      },
      {
        path: 'feed/content/:feedId',
        element: <Content />,
      },
    ],
  },
]);

export default router;
