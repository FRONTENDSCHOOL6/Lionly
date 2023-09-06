import PropTypes from 'prop-types';

function StartButton({ color = 'black' , text= '시작하기'}) {
  return (
    <button
      className={`
    m-4 w-[250px] h-11 text-lionly-md font-normal rounded border border-lionly-white 
    ${
      color == 'black'
        ? 'bg-lionly-white text-lionly-black'
        : color == 'transparent'? 'bg-transparent text-lionly-white' : ''
    }
    `}
    >
      {text}
    </button>
  );
}

StartButton.propTypes = {
  color : PropTypes.string,
  text : PropTypes.string
};


export default StartButton;
