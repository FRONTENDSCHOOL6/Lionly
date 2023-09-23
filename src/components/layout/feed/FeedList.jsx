import { ReactComponent as UpArrowSVG } from '@/assets/arrow_Feed_up.svg';
import Spinner from '@/components/Spinner';
import { useChannel } from '@/contexts/Channel';
import { useInfiniteFeed, useScroll } from '@/hooks';
import { handleKeyboardArrowControl } from '@/utils';
import { Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
import Content from './../contents/Content';

function FeedList() {
  const navigate = useNavigate();
  const { isLoading, data, hasNextPage } = useInfiniteFeed();
  const { channelList } = useChannel();
  const { showScrollTopButton, handleScrollTop } = useScroll();
  const handleNavigate = (content) => {
    navigate(`/feed/contents/${content.id}`);
    scrollTo({
      top: 0,
    });
  };

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
      <main className="min-h-[calc(100vh-280px)]">
        <h4 className="sr-only">피드 리스트</h4>
        <ul
          id={`tabpanel-${Object.values(channelList).indexOf(true) + 1}`}
          role="tabpanel"
          aria-labelledby={`tab-${
            Object.values(channelList).indexOf(true) + 1
          }`}
          className="mx-auto flex flex-col gap-y-6"
        >
          {data.pages.map((feed, index) => (
            <Fragment key={index}>
              {feed.totalPages !== 0 ? (
                feed.items.map((content) => (
                  <li
                    tabIndex={0}
                    role="tabpanel"
                    key={content.id}
                    id={content.id}
                    onKeyDown={(e) => {
                      e.key === 'Enter'
                        ? () => handleNavigate(content)
                        : handleKeyboardArrowControl(e);
                    }}
                    onClick={() => handleNavigate(content)}
                    className="cursor-pointer"
                  >
                    <div className="flex flex-col gap-y-2.5 px-4 py-3">
                      <Content data={content} />
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

        {showScrollTopButton ? (
          <div className="fixed top-[240px] block w-full max-w-3xl p-8 text-right">
            <button
              role="button"
              aria-label="상단으로 이동"
              tabIndex="0"
              type="button"
              onClick={handleScrollTop}
              className="rounded-full border-2 border-lionly-white transition-all hover:scale-125 focus:scale-125"
            >
              <UpArrowSVG className="h-7 w-7 rounded-full shadow-2xl" />
            </button>
          </div>
        ) : null}

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
