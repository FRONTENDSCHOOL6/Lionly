import { ReactComponent as LeftArrow } from '@/assets/arrow_common_left.svg';
import Spinner from '@/components/Spinner';
import { useFeed } from '@/hooks';
import { getPbImageURL } from '@/utils';
import getDate from '@/utils/getDate';
import { Helmet } from 'react-helmet-async';
import { useNavigate, useParams } from 'react-router-dom';

function Content() {
  const { feedId } = useParams();
  const { isLoading, data, comment, pathname } = useFeed(feedId);
  const navigate = useNavigate();

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
      <>
        <Helmet>
          <title>Lionly - {data?.expand.author.nickname}의 게시물</title>
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
            {data?.expand.author.nickname}의 게시물
          </h2>
        </header>

        <main className="flex flex-col gap-y-2.5 bg-lionly-white px-4 py-3">
          <figure className="flex w-full gap-x-3">
            <img
              alt={`${data?.expand.author.nickname}의 프로필 이미지`}
              src={getPbImageURL(data?.expand.author, 'profile_image')}
              className="h-10 min-h-[40px] w-10 min-w-[40px] rounded-full border-2"
            />
            <figcaption>
              <p className="font-bold text-lionly-black">
                {data?.expand.author.nickname}
              </p>
              <p className="text-lionly-sm text-lionly-gray-1">{`${getDate(
                data?.created
              )}`}</p>
            </figcaption>
          </figure>

          <figure className="flex w-full flex-col gap-y-[14px]">
            <img
              alt="피드 이미지"
              src={getPbImageURL(data, 'feed_image')}
              className="aspect-[4/3] w-full self-center rounded-2xl object-cover"
            />

            <figcaption>
              <p className="w-full text-lionly-base font-bold text-lionly-gray-1">
                {data.text}
              </p>
            </figcaption>
          </figure>
        </main>

        <section className="bg-lionly-white">
          <ul>
            {comment.map((item) => (
              <li key={item.id}>
                <img
                  src={getPbImageURL(item.commenter, 'profile_image')}
                  alt={`${item.commenter}의 프로필 이미지`}
                />
                <span>{item.commenter}</span>
                <span>{item.created}</span>
                <p>{item.comment}</p>
                <span>답글 달기</span>
              </li>
            ))}
          </ul>
        </section>
      </>
    )
  );
}

export default Content;
