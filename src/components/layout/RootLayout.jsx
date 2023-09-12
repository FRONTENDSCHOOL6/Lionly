import { Outlet } from 'react-router-dom';

function RootLayout() {
  return (
    <div className="relative mx-auto max-w-screen-md">
      <Outlet />
    </div>
  );
}

export default RootLayout;
