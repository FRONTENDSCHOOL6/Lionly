import { useNavigate } from 'react-router-dom';
import debounce from '@/utils/debounce';
import pb from '@/api/pocketbase';
import { useEffect, useState } from 'react';
import { useRef } from 'react';
import FindAcountButton from '../button/FindAcountButton';
import LinkButton from '../button/LinkButton';
import { toast } from 'react-hot-toast';
import { useAnimation, motion } from 'framer-motion';
function Login() {
  const navigate = useNavigate();
  // useRef 사용해서 자동 완성 기능 동작하게 하기. 
  const emailRef = useRef();
  const passwordRef = useRef();
  const controls = useAnimation();
  const [formState, setFormState] = useState({
    email: '',
    password: '',
  });

  useEffect(() => {
    // 이미 로그인 된 상태에서 다시 로그인 페이지로 못넘아게 하기.
    const checkAuth = async () => {
      if (await pb.authStore.isValid) {
        navigate('/feed');
      }
    };
    checkAuth();
  }, [navigate]);

  const handleSignIn = async (e) => {
    e.preventDefault();

    // const { email, password } = formState; => 자동 완성 기능 사용 못함.
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    try {
      const response = await pb
        .collection('users')
        .authWithPassword(email, password);

      console.log(response);
      console.log(pb.authStore.isValid);

      if (pb.authStore.isValid) {
        navigate('/feed');
        toast.success(`안녕하세요! ${pb.authStore.model.name}님`,{
          icon : '👏'
        });
      } else {
        // 로그인 실패시 로직 필요 시 적기.
      }
    } catch (error) {
      console.error(error);
      toast.error('아이디나 비밀번호가 틀렸습니다.');
      controls.start({
        x: [-5, 5, -5, 5, 0],
        transition: { duration: 0.5 },
      });
    }
  };

  const handleInput = debounce((e) => { // input value 입력 후 0.4초 간 동작 없으면 페이지 랜더링
    const { name, value } = e.target;
    console.log(e.target.value);
    setFormState({
      ...formState,
      [name]: value,
    });
  }, 400);

  return (
    <div>
      
      <form
        onSubmit={handleSignIn}
        className="flex flex-col items-center gap-1"
      >
        <label htmlFor="login"></label>
        <motion.input animate={controls} className='h-11 w-full rounded border border-lionly-white bg-transparent px-5 py-3 text-lionly-sm outline-none placeholder:text-lionly-white' placeholder='아이디를 입력해주세요' ref={emailRef} type="email" id="login" name="email" onChange={handleInput} />

        <label htmlFor="password" className=' block text-lionly-sm-bold text-lionly-white'></label>
        <motion.input animate={controls}
          className='h-11 w-full rounded border border-lionly-white bg-transparent px-5 py-3 text-lionly-sm outline-none placeholder:text-lionly-white mb-1'
          ref={passwordRef}
          placeholder='비밀번호를 입력해주세요'
          type="password"
          id="password"
          name="password"
          onChange={handleInput}
        />
        <div className='w-full flex justify-end gap-2 text-lionly-sm-bold text-lionly-white mb-14'>
          <FindAcountButton text={'아이디 찾기'} destination={'/'}/>
          <span className="self-center  border-r border-lionly-white mb-[3px]" style={{height: '11px'}}></span>
          <FindAcountButton text={'비밀번호 찾기'} destination={'/'}/>
        </div>
        

      
        <div className='w-full flex flex-col gap-2'>
          <LinkButton type={'submit'} text={'로그인'} />
          <LinkButton color={'transparent'} text={'회원가입'} onClick={()=>{navigate('/signup')}} />
        </div>
      </form>
    </div>
  );
}

export default Login;
