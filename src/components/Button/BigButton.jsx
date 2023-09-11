import { string } from 'prop-types';
import { useNavigate } from 'react-router-dom';

function BigButton({ color = 'black', text, destination }) {
  const navigate = useNavigate();

  return (
    <button
      type="button"
      onClick={() => {
        navigate(destination);
      }}
      className={`
    h-11 w-full rounded border border-lionly-white text-lionly-md font-normal
    ${
      color == 'black'
        ? 'bg-lionly-white text-lionly-black'
        : color == 'transparent'
        ? 'bg-transparent text-lionly-white'
        : ''
    }
    `}
    >
      {text}
    </button>
  );
}

BigButton.propTypes = {
  color: string,
  text: string,
  destination: string,
};

export default BigButton;
