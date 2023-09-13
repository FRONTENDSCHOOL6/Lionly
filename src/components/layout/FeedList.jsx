import useChannel from '@/hooks/useChannel';
import useFeed from '@/hooks/useFeed';
import getDate from '@/utils/getDate';
import { getPbImageURL } from '@/utils/getPbImageURL';
import { Fragment } from 'react';
import Spinner from '../Spinner';
import { memo } from 'react';

function FeedList() {
  const { isLoading, data } = useFeed(window.location.pathname);
  const { channelList } = useChannel();

  if (isLoading) {
    return (
      <div className="h-screen">
        <Spinner size={'50%'} />
      </div>
    );
  }

  return (
    <ul
      id={`tabpanel-${Object.values(channelList).indexOf(true) + 1}`}
      role="tabpanel"
      aria-labelledby={`tab-${Object.values(channelList).indexOf(true) + 1}`}
      className="mx-auto flex min-h-[72vh] flex-col gap-y-6 px-2"
    >
      <h4 className="sr-only">피드 리스트</h4>
      {data?.pages.map((feed, index) => (
        <Fragment key={index}>
          {feed?.items.map((item) => (
            <li
              tabIndex={0}
              key={item.id}
              onClick={() => {
                console.log('게시글 클릭');
              }}
              className="cursor-pointer"
            >
              <figure className="mb-[10px] flex h-10 w-full gap-x-3">
                <img
                  src={getPbImageURL(item.expand.author, 'profile_image')}
                  aria-hidden
                  className="h-[40px] w-[40px] rounded-full"
                />

                <figcaption className="w-full">
                  <p className="font-bold text-lionly-black">
                    {item.expand.author.nickname}
                  </p>

                  <p className="text-lionly-sm text-lionly-gray-1">
                    {`${getDate(item.created)}`}
                  </p>
                </figcaption>
              </figure>

              <figure className="flex w-full flex-col gap-y-[14px]">
                <img
                  src={getPbImageURL(item, 'feed_image')}
                  aria-hidden
                  className="aspect-[4/3] w-full self-center rounded-2xl object-cover"
                />

                <figcaption>
                  <p className="w-full text-lionly-md text-lionly-gray-1">
                    {item.text}
                  </p>
                </figcaption>
              </figure>
            </li>
          ))}
        </Fragment>
      ))}
    </ul>
  );
}

export default memo(FeedList);
