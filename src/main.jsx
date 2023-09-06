import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import ProfileImageProvider from './contexts/ProfileImage.jsx';
import ChannelProvider from './contexts/Channel.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ChannelProvider>
      <ProfileImageProvider>
        <App />
      </ProfileImageProvider>
    </ChannelProvider>
  </React.StrictMode>
);
