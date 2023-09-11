import { Outlet } from 'react-router-dom';

function RootLayout() {
  return (
    <div className="h-screen overflow-x-hidden bg-lionly-primary-color">
      <div className="relative mx-auto max-w-screen-md">
        <Outlet />
      </div>
    </div>
  );
}

export default RootLayout;
