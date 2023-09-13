import createUserInfo from '@/api/createUserInfo';
import LinkButton from '@/components/Button/LinkButton';
import FormInput from '@/components/input/FormInput';
import { nameReg, idReg, nickNameReg, passWordReg } from '@/utils/validation';
import { ClientResponseError } from 'pocketbase';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

function SignUp({ text }) {
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    username: '',
    userid: '',
    usernickname: '',
    userpassword: '',
    userpasswordcheck: '',
    answer: '',
  });

  const handleSignUp = async (e) => {
    e.preventDefault();

    try {
      const { name, userid, usernickname, userpassword, userpasswordcheck } =
        userData;

      const newUser = {
        email: userid,
        emailVisibility: true,
        name: name,
        nickname: usernickname,
        password: userpassword,
        passwordConfirm: userpasswordcheck,
      };

      if (!nameReg(name)) {
        toast.error('이름 형식이 잘못되었습니다.');
        return;
      }
      if (!idReg(userid)) {
        toast.error('이메일 형식이 잘못되었습니다.');
        return;
      }
      if (!nickNameReg(usernickname)) {
        toast.error('닉네임 형식이 잘못되었습니다.');
        return;
      }
      if (!passWordReg(userpassword)) {
        toast.error('비밀번호 형식이 잘못되었습니다.');
        return;
      }
      if (userpassword !== userpasswordcheck) {
        toast.error('비밀번호와 비밀번호 확인이 일치하지 않습니다.');
        return;
      }

      const record = await createUserInfo(newUser);
      // console.log(record);
      if (record?.id) {
        toast.success('회원가입이 완료됐습니다.');
        navigate('/SignIn');
      } else {
        toast.error('회원가입에 실패했습니다.');
      }
    } catch (error) {
      if (error.response.code === 400) {
        const { email, nickname } = error.response.data;

        if (email && email.message.includes('already')) {
          toast.error('이메일이 중복됩니다.');
        }

        if (nickname && nickname.message.includes('unique')) {
          toast.error('닉네임이 중복됩니다.');
        }
      } else {
        if (!(error instanceof ClientResponseError)) {
          console.error('회원가입 실패:', error);
          toast.error('회원가입에 실패했습니다.');
        }
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  return (
    <div className="flex flex-col gap-y-[26px] px-8">
      <h2 className="mt-[30px] text-lionly-2xl text-lionly-white">회원가입</h2>

      <form onSubmit={handleSignUp} className="flex flex-col gap-y-5">
        <FormInput
          type="text"
          name="name"
          label="이름"
          placeholder="이름을 입력해주세요."
          errorMessage="한글 2~5자로 입력해주세요."
          minLength="2"
          maxLength="5"
          value={userData.name}
          onChange={handleChange}
        />
        <FormInput
          type="email"
          label="아이디"
          name="userid"
          placeholder="이메일 형식으로 입력해주세요."
          errorMessage="올바른 이메일 형식이 아닙니다."
          value={userData.userid}
          onChange={handleChange}
        />
        <FormInput
          type="text"
          label="닉네임"
          name="usernickname"
          placeholder="닉네임을 입력해주세요."
          errorMessage="한글 3~8자로 입력해주세요."
          minLength="3"
          maxLength="8"
          value={userData.usernickname}
          onChange={handleChange}
        />
        <FormInput
          type="password"
          label="비밀번호"
          name="userpassword"
          placeholder="비밀번호를 입력해주세요."
          errorMessage="영문, 숫자, 특수문자를 포함한 8~16자로 입력해주세요."
          minLength="8"
          maxLength="16"
          value={userData.userpassword}
          onChange={handleChange}
        />
        <FormInput
          type="password"
          label="비밀번호 확인"
          name="userpasswordcheck"
          placeholder="비밀번호를 다시 입력해주세요."
          errorMessage="비밀번호가 일치하지 않습니다."
          minLength="8"
          maxLength="16"
          value={userData.userpasswordcheck}
          onChange={handleChange}
        />
        <FormInput
          type="text"
          label="범쌤과 닮은 캐릭터의 이름은?"
          name="answer"
          placeholder="정답을 입력해주세요."
          errorMessage="정답이 일치하지 않습니다."
          value={userData.answer}
          onChange={handleChange}
        />

        <LinkButton text="가입하기" type="submit" />
      </form>
    </div>
  );
}
export default SignUp;
