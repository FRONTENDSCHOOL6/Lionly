import { createBrowserRouter } from 'react-router-dom';
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
import AllFeed from './components/layout/AllFeed.jsx';
import HealingsFeed from './components/layout/HealingsFeed.jsx';

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
        element: <Writing />,
      },
      {
        path: '/mypage',
        element: <MyPage />,
      },
      {
        path: '/feed',
        element: <Feed />,
        children: [
          {
            path: '/feed',
            element: <AllFeed />,
          },
          { path: '/feed/healings', element: <HealingsFeed /> },
          { path: '/feed/jobs', element: <AllFeed /> },
          { path: '/feed/foods', element: <AllFeed /> },
          { path: '/feed/dailys', element: <AllFeed /> },
        ],
      },
      {
        path: '/content/:contentId',
        element: <Content />,
      },
    ],
  },
]);

export default router;
