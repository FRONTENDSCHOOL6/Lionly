import { node } from 'prop-types';

function ChannelButtonContainer({ children }) {
  return <ul className="mx-[3px] my-2 flex w-fit gap-x-1.5">{children}</ul>;
}

ChannelButtonContainer.propTypes = {
  children: node,
};

export default ChannelButtonContainer;
