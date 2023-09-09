import { string } from 'prop-types';
import { useNavigate } from 'react-router-dom';

function BigButton({ color = 'black', text = '시작하기' }) {
  const navigate = useNavigate();

  return (
    <button
      type="button"
      onClick={() => {
        navigate('/signin');
      }}
      className={`
    m-4 h-11 w-[250px] rounded border border-lionly-white text-lionly-md font-normal 
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
};

export default BigButton;
