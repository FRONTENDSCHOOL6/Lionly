import { ProfileImage } from '@/components/button';
import { getDate, getPbImageURL } from '@/utils';
import { object } from 'prop-types';

function Content({ contentData }) {
  return (
    <main className="flex flex-col gap-y-2.5 px-4 py-3">
      <h4 className="sr-only">Content</h4>

      <figure className="flex w-full gap-x-3">
        <ProfileImage
          size={40}
          nickname={contentData.authorNickname}
          imageName={[contentData.authorId, contentData.authorProfileImage]}
        />

        <figcaption className="flex flex-col">
          <span className="font-bold text-lionly-black">
            {contentData.authorNickname}
          </span>
          <div className="flex gap-x-1">
            <span className="text-lionly-sm text-lionly-gray-1">{`${getDate(
              contentData.created
            )}`}</span>
          </div>
        </figcaption>
      </figure>
      <figure className="flex w-full flex-col gap-y-[14px]">
        <img
          src={getPbImageURL(contentData, 'feedImage')}
          className="aspect-[4/3] w-full self-center rounded-2xl object-cover"
        />
        <figcaption>
          <p className="w-full text-lionly-base font-bold text-lionly-gray-1">
            {contentData.text}
          </p>
        </figcaption>
      </figure>
    </main>
  );
}

Content.propTypes = {
  contentData: object,
};

export default Content;
