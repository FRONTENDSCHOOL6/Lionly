import { Login } from '@/components/layout';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';

function SignIn() {
  return (
    <>
      <Helmet>
        <title>Lionly - Signin</title>
      </Helmet>
      <motion.div
        className="mx-[35px]"
        initial={{
          opacity: 0,
          y: -50,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 1,
        }}
      >
        <h2
          className="mt-[30px] pb-4 text-lionly-2xl text-lionly-white"
          tabIndex="0"
        >
          로그인
        </h2>
        <Login />
      </motion.div>
    </>
  );
}

export default SignIn;
