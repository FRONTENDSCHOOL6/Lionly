import { useNavigate } from 'react-router-dom';
import { string } from 'prop-types';

// 계정 찾기 기능은 구현하지 않으므로 사용되지 않는 파일입니다.
function FindAccountButton({ text, destination }) {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => {
        navigate(destination);
      }}
      type="button"
    >
      {text}
    </button>
  );
}

FindAccountButton.propTypes = {
  text: string,
  destination: string,
};
export default FindAccountButton;
