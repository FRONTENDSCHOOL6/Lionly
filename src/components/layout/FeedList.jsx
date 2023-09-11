import { getPbImageURL } from '@/utils/getPbImageURL';
import { ReactComponent as KebabButtonSVG } from '@/assets/KebabMenuButton_FeedList.svg';
import { shape, string } from 'prop-types';
import getFeedList from '@/api/getFeedList.js';
import { useQuery } from '@tanstack/react-query';
import Spinner from '@/components/Spinner';
import getDate from '@/utils/getDate';

function FeedList() {
  const { status, isLoading, data } = useQuery({
    queryKey: ['feed'],
    queryFn: getFeedList,
    retry: 3,
    cacheTime: 5 * 60 * 1000,
    staleTime: 3 * 1000,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
  });
  console.log(status);
  console.log(data)
  if (isLoading) {
    return (
      <div>
        <Spinner />
      </div>
    );
  }

  return (
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
