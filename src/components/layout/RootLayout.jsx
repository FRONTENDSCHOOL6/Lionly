import { Outlet } from 'react-router-dom';

function RootLayout() {
  return (
    <div className="h-screen bg-lionly-primary-color">
      <div className="mx-auto h-screen max-w-screen-md">
        <Outlet />
      </div>
    </div>
  );
}

export default RootLayout;
