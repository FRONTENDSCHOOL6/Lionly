import PropTypes from 'prop-types';

function StartButton({ color = 'black', text = '시작하기' }) {
  return (
    <button
      className={`
    my-4 h-11 w-full rounded border border-lionly-white text-lionly-md font-normal 
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

StartButton.propTypes = {
  color: PropTypes.string,
  text: PropTypes.string,
};

export default StartButton;
