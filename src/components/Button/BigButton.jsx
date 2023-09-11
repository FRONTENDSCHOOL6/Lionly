import { string, oneOf } from 'prop-types';
import { useNavigate } from 'react-router-dom';

function BigButton({
  type = 'button',
  color = 'black',
  text,
  destination,
  ...restProps
}) {
  const navigate = useNavigate();

  return (
    <button
      type={type}
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
      onClick={(e) => {
        if (destination) {
          e.stopPropagation();
          navigate(destination);
        }
        console.log(destination);
      }}
      {...restProps}
    >
      {text}
    </button>
  );
}

BigButton.propTypes = {
  type: oneOf(['button', 'submit', 'reset']),
  color: string,
  text: string,
  destination: string,
};

export default BigButton;
