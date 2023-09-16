import { ReactComponent as LeftArrow } from '@/assets/arrow_common_left.svg';
import Spinner from '@/components/Spinner';
import { useContent } from '@/hooks';
import { getPbImageURL, getTimeDifference, onLoadMoveScrollTop } from '@/utils';
import getDate from '@/utils/getDate';
import { Helmet } from 'react-helmet-async';
import { useNavigate, useParams } from 'react-router-dom';

function Content() {
  const { feedId } = useParams();
  const navigate = useNavigate();
  const { isLoading, data, pathname } = useContent(feedId);
  onLoadMoveScrollTop();
  console.log(data);

  if (isLoading) {
    return (
      <div className="h-screen">
        <Spinner size={'50%'} />
        <p
          role="status"
          className="text-center text-lionly-xl text-lionly-white"
        >
          게시글을 불러오는 중입니다.
        </p>
      </div>
    );
  }

  return (
    data && (
      <>
        <Helmet>
          <title>{data.author.nickname}의 게시글</title>
        </Helmet>

        <h1 className="sr-only">Lionly</h1>

        <header className="flex px-4 py-3 ">
          <LeftArrow
            aria-label="뒤로 가기"
            role="button"
            tabIndex="0"
            onClick={() => {
              navigate(pathname);
            }}
            className="absolute cursor-pointer transition-all hover:scale-125"
          />

          <h2 className="w-full text-center text-lionly-base font-bold text-lionly-white">
            {data.author.nickname}의 게시글
          </h2>
        </header>

        <main className="flex flex-col gap-y-2.5 bg-lionly-white px-4 py-3">
          <figure className="flex w-full gap-x-3">
            <img
              alt={`${data.author.nickname}의 프로필 이미지`}
              src={getPbImageURL(data.author, 'profileImage')}
              className="h-10 min-h-[40px] w-10 min-w-[40px] rounded-full border-2"
            />

            <figcaption>
              <p className="font-bold text-lionly-black">
                {data.author.nickname}
              </p>
              <p className="text-lionly-sm text-lionly-gray-1">{`${getDate(
                data.createdTime
              )}`}</p>
            </figcaption>
          </figure>

          <figure className="flex w-full flex-col gap-y-[14px]">
            <img
              alt="피드 이미지"
              src={getPbImageURL(data, 'feedImage')}
              className="aspect-[4/3] w-full self-center rounded-2xl object-cover"
            />

            <figcaption>
              <p className="w-full text-lionly-base font-bold text-lionly-gray-1">
                {data.text}
              </p>
            </figcaption>
          </figure>
        </main>

        <section className="bg-lionly-white px-4">
          <ul className="flex flex-col gap-y-3">
            {data.comments
              ? data?.comments.map((item) => (
                  <li key={item.collectionId} className="flex gap-x-3">
                    <img
                      src={getPbImageURL(item.commenter, 'profileImage')}
                      alt={`${item.commenter.nickname}의 프로필 이미지`}
                      className="h-[40px] min-h-[40px] w-[40px] min-w-[40px] rounded-full border-2"
                    />

                    <div className="flex flex-col gap-y-px">
                      <div className="flex gap-x-2">
                        <span className="text-lionly-sm-bold">
                          {item.commenter.nickname}
                        </span>
                        <span className="text-lionly-sm">
                          {getTimeDifference(item.createdTime)}
                        </span>
                      </div>
                      <p className="text-lionly-sm-bold">{item.comment}</p>
                      <span
                        tabIndex="0"
                        onClick={() => {
                          console.log('답글 달기');
                        }}
                        className="w-fit cursor-pointer text-lionly-sm"
                      >
                        답글 달기
                      </span>
                    </div>
                  </li>
                ))
              : null}
          </ul>
        </section>
      </>
    )
  );
}

export default Content;
