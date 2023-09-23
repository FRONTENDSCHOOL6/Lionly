import { getDate, getPbImageURL } from '@/utils';
import { object } from 'prop-types';
import { ProfileImage } from '..';
import { ReactComponent as Comment } from '@/assets/comment_Feed.svg';

function Content({ data }) {
  return (
    data && (
      <main className="flex flex-col gap-y-2.5 py-3">
        <h4 className="sr-only">Content</h4>

        <figure className="flex w-full gap-x-3">
          <ProfileImage
            size={40}
            imageName={[
              data.expand.author.id,
              data.expand.author.profile_image,
            ]}
          />

          <figcaption className="flex gap-x-2">
            <div className="flex flex-col">
              <span className="font-bold text-lionly-black">
                {data.expand.author.nickname}
              </span>
              <div className="flex gap-x-1">
                <span className="text-lionly-sm text-lionly-gray-1">{`${getDate(
                  data.created
                )}`}</span>
              </div>
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
                  {data.expand.comments
                    ? data.expand.comments
                        .map((comment) => 1 + comment.reply?.length)
                        .reduce((acc, cur) => acc + cur)
                    : 0}
                </span>
              </div>
            </div>
          </figcaption>
        </figure>
        <figure className="flex w-full flex-col gap-y-[14px]">
          <img
            src={getPbImageURL(data, 'feed_image')}
            alt=""
            className="aspect-[4/3] w-full self-center rounded-2xl object-cover"
          />
          <figcaption>
            <p className="w-full text-lionly-base font-bold text-lionly-gray-1">
              {data.text}
            </p>
          </figcaption>
        </figure>
      </main>
    )
  );
}

Content.propTypes = {
  data: object,
};

export default Content;
