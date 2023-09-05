import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import ChannelProvider from './contexts/Channel.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ChannelProvider>
      <App />
    </ChannelProvider>
  </React.StrictMode>
);
