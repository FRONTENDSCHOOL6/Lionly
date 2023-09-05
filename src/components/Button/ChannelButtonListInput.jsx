import { useEffect } from 'react';

function ChannelButtonList() {
  const channelData = [
    { id: 1, channelName: '전체 게시글', checked: true },
    { id: 2, channelName: '일상방', checked: false },
    { id: 3, channelName: '힐링방', checked: false },
    { id: 4, channelName: '취업방', checked: false },
    { id: 5, channelName: '모임방', checked: false },
  ];

  useEffect(() => {
    console.log(document.querySelector('input:checked').id);
  }, []);

  return (
    <ul className="mx-[3px] my-2 flex w-fit gap-x-1.5">
      {channelData.map((item) => {
        return (
          <li key={crypto.randomUUID()}>
            <input
              type="radio"
              name="channelButton"
              id={item.channelName}
              className="peer hidden"
              defaultChecked={item.checked}
              onClick={(e) => {
                console.log(e.target.id);
              }}
            />
            <label
              htmlFor={item.channelName}
              className={`cursor-pointer rounded-[4px] border border-lionly-primary-color px-[9px] py-1 text-lionly-sm-bold peer-checked:bg-lionly-primary-color peer-checked:text-lionly-white`}
            >
              {item.channelName}
            </label>
          </li>
        );
      })}
    </ul>
  );
}

export default ChannelButtonList;
