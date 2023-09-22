import getDate from '@/utils/getDate';
import { getPbImageURL, handleKeyboardArrowControl } from '@/utils';
import { shape, string } from 'prop-types';
import { useState, Fragment } from 'react';
import { ReactComponent as KebabButtonSVG } from '/src/assets/kebabMenuButton_FeedList.svg';
import { useCallback } from 'react';
import deleteMyFeed from '@/api/deleteMyFeed';
import useInfiniteMyFeed from '@/hooks/useInfiniteMyFeed';
import Spinner from '../Spinner';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as Comment } from '@/assets/comment_Feed.svg';

function MyFeedList() {
  const [drop, setDrop] = useState(null);
  const { isLoading, data } = useInfiniteMyFeed();
  const navigate = useNavigate();
  const handleDrop = useCallback((id) => {
    setDrop((prevId) => (prevId === id ? null : id));
  }, []);

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

  const handleUpdateClick = (postId) => {
    navigate(`/edit/${postId}`);
  };

  return (
    data && (
      <main>
        <ul className="mx-auto flex min-h-[72vh] flex-col gap-y-6 px-2">
          <h3 className="sr-only">내가 쓴 글 </h3>
          {data.pages.map((feed, index) => (
            <Fragment key={index}>
              {feed?.items.map((item) => (
                <li
                  key={item.id}
                  id={item.id}
                  className="relative mb-[22px] cursor-pointer"
                >
                  <Link
                    to={`/feed/contents/${item.id}`}
                    onKeyDown={handleKeyboardArrowControl}
                  >
                    <div className="div">
                      <figure className=" my-[10px] flex h-10 w-full">
                        <img
                          src={getPbImageURL(
                            item.expand.author,
                            'profile_image'
                          )}
                          aria-hidden
                          className="h-[40px] min-h-[40px] w-[40px] min-w-[40px] rounded-full"
                        />
                        <figcaption className="ml-3 w-full">
                          <p className="font-bold text-lionly-black">
                            {item.expand.author.nickname}
                          </p>
                          <div className="flex items-center gap-x-2">
                            <p className="text-lionly-sm text-lionly-gray-1">
                              {getDate(item.created)}
                            </p>
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
                                  {item.expand.comments
                                    ? item.expand.comments
                                        .map(
                                          (comment) => 1 + comment.reply?.length
                                        )
                                        .reduce((acc, cur) => acc + cur)
                                    : 0}
                                </span>
                              </div>
                            </div>
                          </div>
                        </figcaption>
                      </figure>
                      <figure className="w-full ">
                        <img
                          src={getPbImageURL(item, 'feed_image')}
                          alt="피드 이미지"
                          aria-hidden
                          className="aspect-[4/3] w-full self-center rounded-2xl object-cover"
                        />
                        <figcaption className="mt-[14px]">
                          <p className="w-full text-lionly-md text-lionly-gray-1">
                            {item.text}
                          </p>
                        </figcaption>
                      </figure>
                    </div>
                  </Link>
                  <div>
                    <button
                      type="button"
                      className="absolute right-0 top-5 h-9 w-9"
                      onClick={() => handleDrop(item.id)}
                    >
                      <KebabButtonSVG aria-hidden />
                    </button>
                    {drop == item.id && (
                      <ul className="absolute right-0 top-[60px]  rounded-md border border-gray-300 bg-white p-2 shadow-lg">
                        <li className="cursor-pointer rounded-md p-2 duration-300 hover:bg-gray-200/80">
                          <button
                            type="button"
                            onClick={() => {
                              handleUpdateClick(item.id);
                            }}
                          >
                            수정하기
                          </button>
                        </li>
                        <li className="cursor-pointer rounded-md p-2 text-red-700 duration-300 hover:bg-gray-200/80 ">
                          <button
                            type="button"
                            onClick={() =>
                              deleteMyFeed(item, item.id, item.comments)
                            }
                          >
                            삭제하기
                          </button>
                        </li>
                      </ul>
                    )}
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

MyFeedList.propTypes = {
  item: shape({
    id: string,
    image: string,
    nickname: string,
    created: string,
    feed_image: string,
    text: string,
  }),
};

export default MyFeedList;
