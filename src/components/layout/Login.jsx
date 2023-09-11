import { useNavigate } from 'react-router-dom';
import debounce from '@/utils/debounce';
import pb from '@/api/pocketbase';
import { useEffect, useState } from 'react';
import { useRef } from 'react';

function Login() {
  const navigate = useNavigate();
  // useRef 사용해서 자동 완성 기능 동작하게 하기. 
  const emailRef = useRef();
  const passwordRef = useRef();

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
      } else {
        // 로그인 실패시 로직 필요 시 적기.
      }
    } catch (error) {
      console.error(error);
      alert('계정 정보가 옳지 않습니다.');
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
        className="flex flex-col items-center gap-2"
      >
        <label htmlFor="login">로그인</label>
        <input ref={emailRef} type="email" id="login" name="email" onChange={handleInput} />

        <label htmlFor="password">비밀번호</label>
        <input
          ref={passwordRef}
          type="password"
          id="password"
          name="password"
          onChange={handleInput}
        />

        <button type="submit">로그인 하시오</button>
      </form>
    </div>
  );
}

export default Login;
