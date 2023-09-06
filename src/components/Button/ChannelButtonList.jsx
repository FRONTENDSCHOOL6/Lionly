import useChannel from '@/hooks/useChannel';

// eslint-disable-next-line react-refresh/only-export-components
export const channelData = [
  { id: 1, channelName: '전체 게시글', checked: true },
  { id: 2, channelName: '일상방', checked: false },
  { id: 3, channelName: '힐링방', checked: false },
  { id: 4, channelName: '취업방', checked: false },
  { id: 5, channelName: '모임방', checked: false },
];

function ChannelButtonList() {
  const { select, handleChangeChannel } = useChannel();

  return (
    <>
      <h3 className="sr-only" id="channelList">
        채널 리스트
      </h3>
      <ul
        className="mx-[3px] my-2 flex w-fit gap-x-1.5"
        role="tablist"
        aria-labelledby="channelList"
        aria-orientation="horizontal"
      >
        {channelData.map((item, index) => {
          return (
            <li key={crypto.randomUUID()}>
              <button
                type="button"
                role="tab"
                aria-selected={select[index] === true ? true : false}
                aria-controls={item.channelName}
                className={`rounded-[4px] border border-lionly-secondary-color px-[9px] py-1 text-lionly-sm-bold outline-4 outline-lionly-black ${
                  select[index] === true
                    ? 'bg-lionly-secondary-color'
                    : 'bg-lionly-white'
                }`}
                onClick={handleChangeChannel}
              >
                {item.channelName}
              </button>
            </li>
          );
        })}
      </ul>
    </>
  );
}

export default ChannelButtonList;
