import { useChannel, useInfiniteFeed } from '@/hooks';
import { getPbImageURL } from '@/utils';
import getDate from '@/utils/getDate';
import { Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
import Spinner from '../Spinner';

function FeedList() {
  const navigate = useNavigate();
  const { isLoading, data } = useInfiniteFeed();
  const { channelList } = useChannel();

  if (isLoading) {
    return (
      <div className="h-screen">
        <Spinner size={'50%'} />
        <p role="status" className="text-center text-lionly-md text-lionly-red">
          게시글을 불러오는 중입니다.
        </p>
      </div>
    );
  }

  return (
    data && (
      <main>
        <ul
          id={`tabpanel-${Object.values(channelList).indexOf(true) + 1}`}
          role="tabpanel"
          aria-labelledby={`tab-${
            Object.values(channelList).indexOf(true) + 1
          }`}
          className="mx-auto flex min-h-[72vh] flex-col gap-y-6 px-2"
        >
          <h4 className="sr-only">피드 리스트</h4>
          {data.pages.map((feed, index) => (
            <Fragment key={index}>
              {feed.items.map((item) => (
                <li
                  tabIndex={0}
                  key={item.id}
                  id={item.id}
                  onClick={() => {
                    navigate(`/feed/content/${item.id}`);
                  }}
                  className="cursor-pointer"
                >
                  <div className="flex flex-col gap-y-2.5">
                    <figure className="flex h-10 w-full gap-x-3">
                      <img
                        alt={`${item.expand.author.nickname}의 프로필 이미지`}
                        src={getPbImageURL(item.expand.author, 'profile_image')}
                        className="h-10 min-h-[40px] w-10 min-w-[40px] rounded-full border-2"
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
                        alt="피드 이미지"
                        src={getPbImageURL(item, 'feed_image')}
                        className="aspect-[4/3] w-full self-center rounded-2xl object-cover"
                      />
                      <figcaption>
                        <p className="w-full text-lionly-md text-lionly-gray-1">
                          {item.text}
                        </p>
                      </figcaption>
                    </figure>
                  </div>
                </li>
              ))}
            </Fragment>
          ))}
        </ul>
      </main>
    )
  );
}

export default FeedList;
