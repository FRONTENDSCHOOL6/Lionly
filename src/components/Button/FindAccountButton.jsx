import { useNavigate } from 'react-router-dom';
import { string } from 'prop-types';

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
