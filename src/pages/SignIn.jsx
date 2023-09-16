import Login from '@/components/layout/Login';
import { Helmet } from 'react-helmet-async';

function SignIn() {
  return (
    <>
      <Helmet>
        <title>Lionly - Signin</title>
      </Helmet>
      <div className="mx-[35px]">
        <h2 className="mt-[30px] pb-4 text-lionly-2xl text-lionly-white">
          로그인
        </h2>
        <Login />
      </div>
    </>
  );
}

export default SignIn;
