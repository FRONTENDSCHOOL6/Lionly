import ProfileImageProvider from './contexts/ProfileImage.jsx';
import ChannelProvider from './contexts/Channel.jsx';
import {  RouterProvider } from 'react-router-dom';
import  router  from './routes.jsx';



function App() {
  return (
    <ChannelProvider>
      <ProfileImageProvider>
        <RouterProvider router={router} />
      </ProfileImageProvider>
    </ChannelProvider>
  );
}

export default App;
