import useTitle from '@/hooks/useTitle';
import MainLogo from '../MainLogo';
import { Outlet } from 'react-router-dom';

function BeforeLogin() {
  const { logoStyle, headingStyle } = useTitle();

  return (
    <>
      <div
        className={`flex flex-col items-center ${logoStyle.gap} ${logoStyle.pt} ${logoStyle.pr} ${logoStyle.position} transition-all`}
      >
        <MainLogo size={logoStyle.size} />
        <h1
          className={`text-lionly-2xl text-lionly-white ${headingStyle.visible}`}
        >
          Lionly
        </h1>
      </div>
      <div className="flex justify-center">
        <Outlet />
      </div>
    </>
  );
}

export default BeforeLogin;
