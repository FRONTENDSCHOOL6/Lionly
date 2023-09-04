import FormInput from './components/inputs/FormInput';
import NicknameInput from './components/inputs/NicknameInput';

function App() {
  return (
    <div>
      <FormInput
        type="text"
        name="username"
        label="이름"
        placeholder="이름을 입력해주세요."
      />
      <FormInput
        type="email"
        label="아이디"
        name="userid"
        placeholder="아이디를 입력해주세요."
      />
      <FormInput
        type="text"
        label="닉네임"
        name="usernickname"
        placeholder="닉네임을 입력해주세요."
      />
      <FormInput
        type="password"
        label="비밀번호"
        name="userpassword"
        placeholder="비밀번호를 입력해주세요."
      />
      <FormInput
        type="password"
        label="비밀번호 확인"
        name="userpassword"
        placeholder="비밀번호를 다시 입력해주세요."
      />
      <FormInput
        type="text"
        label="범쌤과 닮은 캐릭터의 이름은?"
        name="answer"
        placeholder="정답을 입력해주세요."
      />
      <NicknameInput
        type="text"
        label="닉네임"
        name="usernickname"
        placeholder="변경할 닉네임을 입력하세요."
      />
    </div>
  );
}

export default App;
