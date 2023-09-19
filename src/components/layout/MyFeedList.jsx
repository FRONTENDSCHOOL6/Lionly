import getDate from '@/utils/getDate';
import { getPbImageURL } from '@/utils';
import { shape, string } from 'prop-types';
import { useState, Fragment } from 'react';
import { ReactComponent as KebabButtonSVG } from '/src/assets/kebabMenuButton_FeedList.svg';
import { useCallback } from 'react';
import deleteMyFeed from '@/api/deleteMyFeed';
import useInfiniteMyFeed from '@/hooks/useInfiniteMyFeed';
import Spinner from '../Spinner';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

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
  console.log(data);

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
                  onClick={() => {}}
                  className="mb-[22px] cursor-pointer"
                >
                  <figure className="relative mb-[10px] flex h-10 w-full">
                    <img
                      src={getPbImageURL(item.expand.author, 'profile_image')}
                      aria-hidden
                      className="h-[40px] w-[40px] rounded-full"
                    />
                    <figcaption className="ml-3 w-full">
                      <p className="font-bold text-lionly-black">
                        {item.expand.author.nickname}
                      </p>
                      <p className="text-lionly-sm text-lionly-gray-1">
                        {getDate(item.created)}
                      </p>
                    </figcaption>
                    <button
                      type="button"
                      className="absolute right-0 h-9 w-9"
                      onClick={() => handleDrop(item.id)}
                    >
                      <KebabButtonSVG aria-hidden />
                    </button>
                    {drop == item.id && (
                      <ul className="absolute right-0 top-full z-10  border border-gray-300 bg-white p-2 shadow-lg">
                        <li className="cursor-pointer rounded-md p-2 ">
                          <button
                            type="button"
                            onClick={() => {
                              handleUpdateClick(item.id);
                            }}
                          >
                            수정하기
                          </button>
                        </li>

                        <li className="cursor-pointer rounded-md p-2 text-red-700 ">
                          <button
                            type="button"
                            onClick={() => deleteMyFeed(item.id, item.comments)}
                          >
                            삭제하기
                          </button>
                        </li>
                      </ul>
                    )}
                  </figure>
                  <Link to={`/feed/contents/${item.id}`}>
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
                  </Link>
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
