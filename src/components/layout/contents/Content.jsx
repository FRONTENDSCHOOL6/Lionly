import { getDate, getPbImageURL } from '@/utils';
import { object } from 'prop-types';
import { ProfileImage } from '..';

function Content({ data }) {
  return (
    data && (
      <main className="flex flex-col gap-y-2.5 px-4 py-3">
        <h4 className="sr-only">Content</h4>

        <figure className="flex w-full gap-x-3">
          <ProfileImage
            size={40}
            imageName={[
              data.expand.author.id,
              data.expand.author.profile_image,
            ]}
          />

          <figcaption className="flex flex-col">
            <span className="font-bold text-lionly-black">
              {data.expand.author.nickname}
            </span>
            <div className="flex gap-x-1">
              <span className="text-lionly-sm text-lionly-gray-1">{`${getDate(
                data.created
              )}`}</span>
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
