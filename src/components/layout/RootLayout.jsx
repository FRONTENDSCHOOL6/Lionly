import { Outlet } from 'react-router-dom';

function RootLayout() {
  return (
    <div className="relative mx-auto max-w-screen-md">
      <h1 className="sr-only">Lionly</h1>
      <Outlet />
    </div>
  );
}

export default RootLayout;
