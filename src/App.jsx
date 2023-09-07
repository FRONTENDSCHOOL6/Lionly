import FormInput from '@/components/input/FormInput';
import NicknameInput from '@/components/input/NicknameInput';

function App() {
  return (
    <div>
      <FormInput
        type="text"
        name="userName"
        label="이름"
        placeholder="이름을 입력해주세요."
        errorMessage="한글 2~5자로 입력해주세요."
        minLength="2"
        maxLength="5"
      />
      <FormInput
        type="email"
        label="아이디"
        name="userId"
        placeholder="아이디를 입력해주세요."
        errorMessage="이메일 형식으로 입력해주세요."
      />
      <FormInput
        type="text"
        label="닉네임"
        name="userNickName"
        placeholder="닉네임을 입력해주세요."
        errorMessage="한글 3~8자로 입력해주세요."
        minLength="3"
        maxLength="8"
      />
      <FormInput
        type="password"
        label="비밀번호"
        name="userPassword"
        placeholder="비밀번호를 입력해주세요."
        errorMessage="영문, 숫자, 특수문자를 포함한 8~16자로 입력해주세요."
        minLength="8"
        maxLength="16"
      />
      <FormInput
        type="password"
        label="비밀번호 확인"
        name="userPasswordCheck"
        placeholder="비밀번호를 다시 입력해주세요."
        errorMessage="비밀번호가 일치하지 않습니다"
        minLength="8"
        maxLength="16"
      />
      <FormInput
        type="text"
        label="범쌤과 닮은 캐릭터의 이름은?"
        name="answer"
        placeholder="정답을 입력해주세요."
        errorMessage="정답이 일치하지 않습니다."
      />
      <NicknameInput
        type="text"
        label="닉네임"
        name="userNickName"
        placeholder="변경할 닉네임을 입력하세요."
        errorMessage="한글 3~8자로 입력해주세요."
        minLength="3"
        maxLength="8"
      />
    </div>
  );
}

export default App;
