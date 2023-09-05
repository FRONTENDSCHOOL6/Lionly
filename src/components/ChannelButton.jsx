import { bool, func, string } from 'prop-types';
import { useId } from 'react';

function ChannelButton({ channelName, defaultChecked, onClick }) {
  const id = useId();
  return (
    <li key={crypto.randomUUID()}>
      <input
        type="radio"
        name="channelButton"
        id={id}
        className="peer hidden"
        defaultChecked={defaultChecked}
        onClick={onClick}
      />
      <label
        htmlFor={id}
        className={`cursor-pointer rounded-[4px] border border-lionly-primary-color px-[9px] py-1 text-lionly-sm-bold peer-checked:bg-lionly-primary-color peer-checked:text-lionly-white`}
      >
        {channelName}
      </label>
    </li>
  );
}

ChannelButton.propTypes = {
  channelName: string,
  defaultChecked: bool,
  onClick: func,
};

export default ChannelButton;
