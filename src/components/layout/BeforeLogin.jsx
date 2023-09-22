import useTitle from '@/hooks/useTitle';
import MainLogo from '../MainLogo';
import { Outlet } from 'react-router-dom';

function BeforeLogin() {
  const { logoStyle, headingStyle } = useTitle();
  const { gap, pt, pr, absolute, size } = logoStyle;
  const { hidden } = headingStyle;

  return (
    <>
      <div
        className={`flex flex-col items-center transition-all ${gap} ${pt} ${pr} ${absolute}`}
      >
        <MainLogo size={size} />
        <h1 className={`text-lionly-2xl text-lionly-white ${hidden}`}>
          Lionly
        </h1>
      </div>
      <div className="flex w-full flex-col justify-center">
        <Outlet />
      </div>
    </>
  );
}

export default BeforeLogin;
