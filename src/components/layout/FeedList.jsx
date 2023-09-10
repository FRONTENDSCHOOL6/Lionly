import { getPbImageURL } from '@/utils/getPbImageURL';
import { ReactComponent as KebabButtonSVG } from '@/assets/KebabMenuButton_FeedList.svg';
import { shape, string } from 'prop-types';
// import Spinner from '../Spinner';
import pb from '@/api/pocketbase';
import { useEffect, useState } from 'react';

function FeedList() {
  const [feed, setFeed] = useState();
  useEffect(() => {
    async function getList() {
      try {
        const getFeedList = await pb
          .collection('feeds')
          .getFullList({ expand: 'author' });
        console.log(getFeedList);
        setFeed(getFeedList);
      } catch (error) {
        console.log(error);
      }
    }
    getList();
  }, []);

  return (
    <ul className="m-auto w-72">
      {feed?.map((item) => (
        <li key={item.id} className="mb-[22px]">
          <figure className="relative mb-[10px] flex h-10 w-full">
            <img
              src={getPbImageURL(item.expand.author, 'profile_image')}
              alt=""
              className="rounded-full"
            />
            <figcaption className="ml-3">
              <p className="font-bold text-lionly-black">
                {item.expand.author.nickname}
              </p>
              <p className="text-lionly-sm text-lionly-gray-1">
                {item.updated}
              </p>
            </figcaption>
            <button type="button" className="absolute right-0 h-9 w-9">
              <KebabButtonSVG />
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
  );
}

FeedList.propTypes = {
  item: shape({
    id: string,
    image: string,
    nickname: string,
    date: string,
    feed_image: string,
    text: string,
  }).isRequired,
};

export default FeedList;
