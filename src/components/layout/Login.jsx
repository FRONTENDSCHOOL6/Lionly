import { useState, useId } from "react";
import { oneOf, string } from 'prop-types';
import { Navigate } from "react-router-dom";
import debounce from "@/utils/debounce";
import pb from "@/api/pocketbase";


function FormInput({ type = 'text', name = null, label, ...restProps }) {
  const id = useId();

  return (
    <div className={S.wrapper}>
      <label htmlFor={id} className={S.label}>
        {label}
      </label>
      <input
        type={type}
        name={name}
        id={id}
        className={S.input}
        {...restProps}
      />
    </div>
  );
}

function Login() {

  const [formState, setFormState] = useState({
    email: '',
    password: '',
  });

  const handleSignIn = async (e) => {
    e.preventDefault();

    const { email, password } = formState;

    try {
      const response = await pb
        .collection('users')
        .authWithPassword(email, password);

      console.log(response);

      if (!state) {
        Navigate('/');
      } else {
        // 사용자가 원하는 경로로 접속 요청
        // 로그인 유무 확인이 안되서 사용자를 로그인 페이지로 이동
        // 로그인 페이지에서 사용자가 로그인 시도 (성공)
        // 성공 (로그인 이력을 남기지 않도록 합니다.)
        // console.log(state.wishLocationPath);
        // 이슈 확인 결과: '/signin'이 나와서 이동 안한 것임!

        const { wishLocationPath } = state;
        navigate(wishLocationPath === '/signin' ? '/' : wishLocationPath);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleInput = debounce((e) => {
    const { name, value } = e.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  }, 400);

  return (
    <div>
      <form
          onSubmit={handleSignIn}
          className="flex flex-col gap-2 items-center"
        >
          <FormInput
            type="email"
            label="이메일"
            name="email"
            defaultValue={formState.email}
            onChange={handleInput}
          />
          <FormInput
            type="password"
            label="패스워드"
            name="password"
            defaultValue={formState.password}
            onChange={handleInput}
          />

          <button type="submit">
            버튼
          </button>
        </form>
    </div>
  )
}

export default Login

FormInput.propTypes = {
  type: oneOf(['text', 'password', 'number', 'email', 'search']),
  name: string.isRequired,
  label: string.isRequired,
};