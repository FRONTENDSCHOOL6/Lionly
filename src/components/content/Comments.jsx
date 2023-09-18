import getFeed from '@/api/getFeed';
import pb from '@/api/pocketbase';
import { ProfileImage } from '@/components/button';
import useComments from '@/hooks/useComments';
import { calcTimeDifference } from '@/utils';
import { object } from 'prop-types';
import { useState } from 'react';
import { useEffect } from 'react';

function Comments({ data }) {
  const { comments, setComments, commentsData } = useComments(data, data.id);
  useEffect(() => {
    (async function subscribeComments() {
      await pb
        .collection('feeds')
        .subscribe('*', async ({ action, record }) => {
          if (action === 'update') {
            // setComments(feedData?.expand.comments);
          }
        });
    })();
  }, []);
  console.log(comments);
  return (
    <section className="px-4">
      <h3 className="sr-only">Comments</h3>
      <ul className="flex flex-col gap-y-3">
        {comments &&
          comments.map((item) => (
            <li key={item.id} className="flex gap-x-3">
              <ProfileImage
                nickname={item.expand.commenter.nickname}
                imageName={[
                  item.expand.commenter.id,
                  item.expand.commenter.profile_image,
                ]}
              />
              <div className="flex flex-col gap-y-px">
                <div className="flex gap-x-2">
                  <span className="text-lionly-sm-bold">
                    {item.expand.commenter.nickname}
                  </span>
                  <span className="text-lionly-sm text-lionly-gray-2">
                    {calcTimeDifference(item.created)}
                  </span>
                </div>
                <p className="text-lionly-sm">{item.comment}</p>
                <span
                  tabIndex="0"
                  onClick={() => {
                    console.log('답글 달기');
                  }}
                  className="w-fit cursor-pointer text-lionly-sm text-lionly-gray-2"
                >
                  답글 달기
                </span>
              </div>
            </li>
          ))}
      </ul>
    </section>
  );
}

Comments.propTypes = {
  data: object,
};

export default Comments;
