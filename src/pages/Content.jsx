import createComment from '@/api/createComment';
import pb from '@/api/pocketbase';
import updateComment from '@/api/updateComment';
import { ReactComponent as UpArrowSVG } from '@/assets/arrow_Feed_up.svg';
import { ReactComponent as LeftArrow } from '@/assets/arrow_common_left.svg';
import Spinner from '@/components/Spinner';
import { ProfileImage } from '@/components/button';
import { useContent } from '@/hooks';
import useStorageData from '@/hooks/useStorageData';
import { getPbImageURL, getTimeDifference } from '@/utils';
import getDate from '@/utils/getDate';
import { useEffect, useRef, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate, useParams } from 'react-router-dom';

function Content() {
  const { feedId } = useParams();
  const navigate = useNavigate();
  const { isLoading, data, pathname } = useContent(feedId);
  const { id, nickname, profile_image } = useStorageData();
  const commentInputRef = useRef(null);
  const commentId = crypto.randomUUID().replaceAll('-', '').slice(0, 15);
  const commentArray = data?.comments?.map((item) => item.collectionId);
  const handleSubmitComment = async (e) => {
    e.preventDefault();

    await createComment({
      id: commentId,
      comment: commentInputRef.current?.value,
      commenter: id,
    });

    commentArray?.push(commentId);
    await updateComment(data.id, { comments: commentArray });
  };

  // const [comments, setComments] = useState([]);
  // useEffect(() => {
  //   async function subscribeComments() {
  //     await pb
  //       .collection('feeds')
  //       .subscribe('*', async ({ action, record }) => {
  //         console.log(action);
  //         if (action === 'update') {
  //           setComments((comments) => [...comments, record.comments]);
  //         }
  //       });

  // return () => {

  // }
  // }
  //   subscribeComments();
  // }, [comments]);

  if (isLoading) {
    return (
      <div className="h-screen">
        <Spinner size={'50%'} />
        <p
          role="status"
          className="text-center text-lionly-lg text-lionly-white"
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

        <div className="flex min-h-screen flex-col justify-between bg-lionly-white">
          <div>
            <header className="sticky top-0 z-10 flex bg-lionly-primary-color px-4 py-3">
              <LeftArrow
                aria-label="뒤로 가기"
                role="button"
                tabIndex="0"
                onClick={() => {
                  navigate(pathname);
                }}
                className="absolute cursor-pointer fill-lionly-primary-color transition-all hover:scale-125"
              />
              <h2 className="w-full text-center text-lionly-base font-bold text-lionly-white">
                {data.author.nickname}의 게시글
              </h2>
            </header>
            <main className="flex flex-col gap-y-2.5 px-4 py-3">
              <h3 className="sr-only">Content</h3>
              <figure className="flex w-full gap-x-3">
                <ProfileImage
                  nickname={data.author.nickname}
                  imageName={[data.author.id, data.author.profileImage]}
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
            <section className="px-4">
              <h3 className="sr-only">Comments</h3>
              <ul className="flex flex-col gap-y-3">
                {data.comments
                  ? data?.comments.map((item) => (
                      <li key={item.collectionId} className="flex gap-x-3">
                        <ProfileImage
                          nickname={item.commenter.nickname}
                          imageName={[
                            item.commenter.id,
                            item.commenter.profileImage,
                          ]}
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
          </div>

          <section className="sticky bottom-0 bg-lionly-white px-4 py-[18px]">
            <form
              id="commentInputRef"
              onSubmit={handleSubmitComment}
              className="flex items-center gap-x-2"
            >
              <label htmlFor="writeComment">
                <h3 className="sr-only">댓글 달기</h3>
                <ProfileImage
                  nickname={nickname}
                  imageName={[id, profile_image]}
                />
              </label>
              <input
                ref={commentInputRef}
                id="writeComment"
                name="comment"
                type="text"
                placeholder={`${nickname}(으)로 댓글 달기`}
                maxLength={250}
                onInput={(e) =>
                  e.target.maxLength < e.target.value.length
                    ? (e.target.value = e.target.value.slice(
                        0,
                        e.target.maxLength
                      ))
                    : null
                }
                className="w-full rounded-full border px-5 py-2"
              />
              <button
                role="button"
                aria-label="댓글 쓰기"
                type="submit"
                className="h-7 w-7 rounded-full shadow-lg"
              >
                <UpArrowSVG className="h-7 w-7 rounded-full shadow-lg transition-all hover:scale-125 focus:scale-125" />
              </button>
            </form>
          </section>
        </div>
      </>
    )
  );
}

export default Content;
