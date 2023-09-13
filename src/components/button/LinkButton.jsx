import { string } from 'prop-types';

function LinkButton({ type = 'button', color = 'black', text, ...restprops }) {
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
      {...restprops}
    >
      {text}
    </button>
  );
}

LinkButton.propTypes = {
  type: string,
  color: string,
  text: string,
};

export default LinkButton;
