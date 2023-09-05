import ChannelButton from './components/ChannelButton';
import ChannelButtonContainer from './components/ChannelButtonContainer';
import ChannelProvider, { useChannel } from './contexts/Channel';

function App() {
  const { select, handleChangeChannel } = useChannel();
  return (
    <ChannelButtonContainer>
      <ChannelButton
        channelName={'전체 게시글'}
        defaultChecked={false}
        onClick={handleChangeChannel}
      />
      <ChannelButton
        channelName={'일상방'}
        defaultChecked={false}
        onClick={handleChangeChannel}
      />
      <ChannelButton
        channelName={'힐링방'}
        defaultChecked={false}
        onClick={handleChangeChannel}
      />
      <ChannelButton
        channelName={'취업방'}
        defaultChecked={false}
        onClick={handleChangeChannel}
      />
    </ChannelButtonContainer>
  );
}

export default App;
