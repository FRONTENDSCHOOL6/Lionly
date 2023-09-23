import { useChannel } from '@/contexts/Channel';
import { handleKeyboardArrowControl } from '@/utils';
import { NavLink } from 'react-router-dom';

function ChannelTab() {
  const { channelList, handleChangeChannel } = useChannel();
  const channels = Object.keys(channelList);

  return (
    <nav>
      <h3 className="sr-only" id="channelList">
        채널 리스트
      </h3>
      <div className="flex h-[60px] min-w-[320px] overflow-hidden bg-[#f5f5f5]">
        <ul
          className="mx-[3px] my-[14px] flex gap-x-1.5 px-2"
          role="tablist"
          aria-labelledby="channelList"
          aria-orientation="horizontal"
        >
          {channels?.map((item, index) => {
            return (
              <li
                key={item}
                className="shrink py-1 transition-all hover:scale-110"
              >
                <NavLink
                  to={
                    item === '힐링방'
                      ? '/feed/healing'
                      : item === '일상방'
                      ? '/feed/daily'
                      : item === '맛집방'
                      ? '/feed/food'
                      : item === '취업방'
                      ? '/feed/job'
                      : '/feed'
                  }
                  id={`tab-${index + 1}`}
                  tabIndex="0"
                  role="tab"
                  aria-selected={channelList[item] === true ? true : false}
                  aria-controls={`tabpanel-${index + 1}`}
                  onKeyDown={(e) => handleKeyboardArrowControl(e, 'parentNode')}
                  onClick={handleChangeChannel}
                  className={`rounded-[4px] border border-lionly-secondary-color px-1 py-2 text-lionly-md outline-4 outline-lionly-black ${
                    channelList[item] === true
                      ? 'bg-lionly-secondary-color'
                      : 'bg-lionly-white'
                  }`}
                >
                  {item}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}

export default ChannelTab;
