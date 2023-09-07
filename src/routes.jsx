import { createBrowserRouter } from 'react-router-dom';
import ErrorPage from './pages/Error-page.jsx'
import Landing from './pages/Landing.jsx'
import SignIn from './pages/SignIn.jsx'
import SignUp from './pages/SignUp.jsx'
import Writing from './pages/Writing.jsx'
import Feed from './pages/Feed.jsx'
import MyPage from './pages/MyPage.jsx'
import Content from './pages/Content.jsx'


const router = createBrowserRouter([
  {
    path: '/',
    element: <Landing/>,
    errorElement : <ErrorPage/>
  },
  {
    path: 'signin',
    element: <SignIn/>
    
  },
  {
    path: '/signup',
    element: <SignUp/>
    
  },
  {
    path: '/writing',
    element: <Writing/>
    
  },
  {
    path: '/mypage',
    element: <MyPage/>
  },
  {
    path: '/feed',
    element: <Feed/>,
    children : [
      { path : 'feed/healings',/* element :*/},
      { path : 'feed/jobs',/* element :*/},
      { path : 'feed/foods',/* element :*/},
      { path : 'feed/dailys',/* element :*/},
    ]
  },
  {
    path: '/content/:contentId',
    element: <Content/>
  },

]);


export default router ;