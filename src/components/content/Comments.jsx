import getContent from '@/api/getContent';
import pb from '@/api/pocketbase';
import { ProfileImage } from '@/components/button';
import { useComments } from '@/hooks';
import { calcTimeDifference } from '@/utils';
import { object } from 'prop-types';
import { useEffect } from 'react';

function Comments({ data }) {
  const { comments, setComments } = useComments(data);

  useEffect(() => {
    (async function subscribeComments() {
      await pb
        .collection('feeds')
        .subscribe('*', async ({ action, record }) => {
          if (action === 'update') {
            const content = await getContent(record?.id);
            setComments(content.expand.comments);
          }
          scrollTo({
            top: 1000000,
            behavior: 'smooth',
          });
        });

      return async () => {
        await pb.collection('feeds').unsubscribe('*');
      };
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
