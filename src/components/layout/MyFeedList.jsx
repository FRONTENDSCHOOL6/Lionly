import getMyFeedList from '@/api/getMyFeedList';
import useStorageData from '@/hooks/useStorageData';
import getDate from '@/utils/getDate';
import { getPbImageURL } from '@/utils/getPbImageURL';
import { shape, string } from 'prop-types';
import { useState, useEffect } from 'react';

function MyFeedList() {
  const { profile_image, email, nickname, id } = useStorageData();
  const [data, setData] = useState(null);

  useEffect(() => {
    async function myData() {
      const fetchData = await getMyFeedList(id);
      setData(fetchData);
    }
    myData();
  }, []);

  return (
    <>
      <ul className="m-auto w-72">
        {data?.map((item) => (
          <li key={item.id} className="mb-[22px]">
            <figure className="relative mb-[10px] flex h-10 w-full">
              <img
                src={getPbImageURL(item.expand.author, 'profile_image')}
                alt=""
                className="h-[40px] w-[40px] rounded-full"
              />
              <figcaption className="ml-3">
                <p className="font-bold text-lionly-black">
                  {item.expand.author.nickname}
                </p>
                <p className="text-lionly-sm text-lionly-gray-1">
                  {getDate(item.created)}
                </p>
              </figcaption>
              <button type="button" className="absolute right-0 h-9 w-9">
                {/* <KebabButtonSVG /> */}
              </button>
            </figure>
            <figure className="w-full ">
              <img
                src={getPbImageURL(item, 'feed_image')}
                alt=""
                className="h-40 w-full rounded-2xl"
              />
              <figcaption className="mt-[14px]">
                <p className="w-[260] text-lionly-sm text-lionly-gray-1">
                  {item.text}
                </p>
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </>
  );
}

MyFeedList.propTypes = {
  item: shape({
    id: string,
    image: string,
    nickname: string,
    date: string,
    feed_image: string,
    text: string,
  }).isRequired,
};

export default MyFeedList;
