import { ProfileImage } from '@/components/button';
import { getDate, getPbImageURL } from '@/utils';
import { object } from 'prop-types';

function Content({ data }) {
  return (
    <main className="flex flex-col gap-y-2.5 px-4 py-3">
      <h3 className="sr-only">Content</h3>

      <figure className="flex w-full gap-x-3">
        <ProfileImage
          size={40}
          nickname={data.expand.author.nickname}
          imageName={[data.expand.author.id, data.expand.author.profile_image]}
        />

        <figcaption>
          <p className="font-bold text-lionly-black">
            {data.expand.author.nickname}
          </p>
          <p className="text-lionly-sm text-lionly-gray-1">{`${getDate(
            data.created
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
  );
}

Content.propTypes = {
  data: object,
};

export default Content;
