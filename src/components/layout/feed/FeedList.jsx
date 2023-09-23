import { ReactComponent as Comment } from '@/assets/comment_Feed.svg';
import Spinner from '@/components/Spinner';
import { useChannel } from '@/contexts/Channel';
import { useInfiniteFeed } from '@/hooks';
import { getDate, getPbImageURL, handleKeyboardArrowControl } from '@/utils';
import { Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
import { ProfileImage } from '..';

function FeedList() {
  const navigate = useNavigate();
  const { isLoading, data, hasNextPage } = useInfiniteFeed();
  const { channelList } = useChannel();

  if (isLoading) {
    return (
      <div className="min-h-[calc(100vh-280px)] pt-10">
        <Spinner size={'50%'} />
        <p role="status" className="text-center text-lionly-md text-lionly-red">
          게시글을 불러오는 중입니다.
        </p>
      </div>
    );
  }

  return (
    data && (
      <main className="mt-6 min-h-[calc(100vh-280px)]">
        <ul
          id={`tabpanel-${Object.values(channelList).indexOf(true) + 1}`}
          role="tabpanel"
          aria-labelledby={`tab-${
            Object.values(channelList).indexOf(true) + 1
          }`}
          className="mx-auto flex flex-col gap-y-6 px-2"
        >
          <h4 className="sr-only">피드 리스트</h4>
          {data.pages.map((feed, index) => (
            <Fragment key={index}>
              {feed.totalPages !== 0 ? (
                feed.items.map((content) => (
                  <li
                    tabIndex={0}
                    key={content.id}
                    id={content.id}
                    onKeyDown={(e) => {
                      e.key === 'Enter'
                        ? navigate(`/feed/contents/${content.id}`)
                        : handleKeyboardArrowControl(e);
                    }}
                    onClick={() => {
                      navigate(`/feed/contents/${content.id}`);
                    }}
                    className="cursor-pointer"
                  >
                    <div className="flex flex-col gap-y-2.5">
                      <figure className="flex h-10 w-full gap-x-3">
                        <ProfileImage
                          size={40}
                          imageName={[
                            content.expand.author.id,
                            content.expand.author.profile_image,
                          ]}
                        />

                        <figcaption className="flex w-full gap-x-2">
                          <div className="flex flex-col">
                            <p className="font-bold text-lionly-black">
                              {content.expand.author.nickname}
                            </p>
                            <p className="text-lionly-sm text-lionly-gray-1">
                              {`${getDate(content.created)}`}
                            </p>
                          </div>
                          <div className="flex h-full items-end">
                            <div className="flex items-center gap-x-1">
                              <Comment
                                aria-hidden
                                className="w-4 items-center fill-lionly-black"
                              />
                              <span
                                aria-label="댓글 수"
                                className="text-lionly-sm text-lionly-black"
                              >
                                {content.expand.comments
                                  ? content.expand.comments
                                      .map(
                                        (comment) => 1 + comment.reply?.length
                                      )
                                      .reduce((acc, cur) => acc + cur)
                                  : 0}
                              </span>
                            </div>
                          </div>
                        </figcaption>
                      </figure>

                      <figure className="flex w-full flex-col gap-y-[14px]">
                        <img
                          src={getPbImageURL(content, 'feed_image')}
                          alt=""
                          className="aspect-[4/3] w-full self-center rounded-2xl object-cover"
                        />

                        <figcaption>
                          <p className="w-full text-lionly-md text-lionly-gray-1">
                            {content.text}
                          </p>
                        </figcaption>
                      </figure>
                    </div>
                  </li>
                ))
              ) : (
                <div className="pt-[30%] text-center">
                  <p className="text-lionly-xl text-lionly-red">
                    게시글이 없습니다.
                  </p>
                  <p className="text-lionly-2xl text-lionly-black">
                    게시글을 등록해보세요!
                  </p>
                </div>
              )}
            </Fragment>
          ))}
        </ul>

        {!hasNextPage && data.pages[0].totalPages !== 0 ? (
          <p
            id="lastContent"
            role="status"
            className="text-center text-lionly-base text-lionly-red"
          >
            마지막 게시글입니다.
          </p>
        ) : null}
      </main>
    )
  );
}

export default FeedList;
