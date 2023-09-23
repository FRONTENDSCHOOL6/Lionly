import { useTitle } from '@/hooks';
import { Outlet } from 'react-router-dom';
import MainLogo from '../MainLogo';

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
        <span className={`text-lionly-2xl text-lionly-white ${hidden}`}>
          Lionly
        </span>
      </div>
      <div className="flex w-full flex-col justify-center">
        <Outlet />
      </div>
    </>
  );
}

export default BeforeLogin;
