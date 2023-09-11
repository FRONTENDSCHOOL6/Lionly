import Spinner from '@/components/Spinner';
import useFeed from '@/hooks/useFeed';
import { getPbImageURL } from '@/utils/getPbImageURL';
import { Fragment } from 'react';

function FeedList() {
  const { isLoading, data, fetchNextPage } = useFeed();

  if (isLoading) {
    return (
      <div className="h-screen">
        <Spinner size={'50%'} />
      </div>
    );
  }

  return (
    <ul className="mx-auto my-[14px] flex w-72 flex-col gap-y-6">
      {data?.pages.map((feed, index) => (
        <Fragment key={index}>
          {feed?.items.map((item) => (
            <li
              key={item.id}
              onClick={() => {
                console.log('게시글 클릭');
              }}
              className="cursor-pointer"
            >
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
                    {item.updated}
                  </p>
                </figcaption>
                {/* <button type="button" className="absolute right-0 h-9 w-9">
              <KebabButtonSVG />
            </button> */}
              </figure>
              <figure className="w-full">
                <img
                  src={getPbImageURL(item, 'feed_image')}
                  alt=""
                  className="h-40 w-full rounded-2xl object-contain"
                />
                <figcaption className="mt-[14px]">
                  <p className="w-[260] text-lionly-sm text-lionly-gray-1">
                    {item.text}
                  </p>
                </figcaption>
              </figure>
            </li>
          ))}
        </Fragment>
      ))}

      <button type="button" onClick={fetchNextPage}>
        클릭
      </button>
    </ul>
  );
}

export default FeedList;
