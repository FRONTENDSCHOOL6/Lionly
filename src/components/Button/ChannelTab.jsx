import useChannel from '@/hooks/useChannel';
import handleKeyboardArrowControl from '@/utils/handleTabArrowControl';
import { NavLink } from 'react-router-dom';

function ChannelTab() {
  const { select, channels, handleChangeChannel } = useChannel();

  return (
    <>
      <h3 className="sr-only" id="channelList">
        채널 리스트
      </h3>
      <div className="flex min-w-[320px]">
        <ul
          className="mx-[3px] my-2 flex gap-x-1.5 pl-4"
          role="tablist"
          aria-labelledby="channelList"
          aria-orientation="horizontal"
        >
          {channels?.map((item, index) => {
            return (
              <li key={item}>
                <NavLink
                  to={
                    item === '힐링방'
                      ? '/feed/healings'
                      : item === '일상방'
                      ? '/feed/dailys'
                      : item === '맛집방'
                      ? '/feed/foods'
                      : item === '취업방'
                      ? '/feed/jobs'
                      : '/feed'
                  }
                  tabIndex={select[index] === true ? -1 : 0}
                  role="tab"
                  aria-selected={select[index] === true ? true : false}
                  aria-controls={item.channelName}
                  className={`rounded-[4px] border border-lionly-secondary-color px-[9px] py-1 text-lionly-sm-bold outline-4 outline-lionly-black ${
                    select[index] === true
                      ? 'bg-lionly-secondary-color'
                      : 'bg-lionly-white'
                  }`}
                  onClick={handleChangeChannel}
                  onKeyDown={handleKeyboardArrowControl}
                >
                  {item}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}

export default ChannelTab;
