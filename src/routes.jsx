import { createBrowserRouter } from 'react-router-dom';
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
import BeforeLogin from './components/layout/BeforeLogin.jsx';

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
          { path: '/feed/healings' /* element :*/ },
          { path: '/feed/jobs' /* element :*/ },
          { path: '/feed/foods' /* element :*/ },
          { path: '/feed/dailys' /* element :*/ },
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
