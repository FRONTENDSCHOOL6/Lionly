import { Outlet } from 'react-router-dom';

function RootLayout() {
  return (
    <div className="h-screen bg-lionly-primary-color">
      <div className="mx-auto max-w-screen-md px-[35px]">
        <Outlet />
      </div>
    </div>
  );
}

export default RootLayout;
