import { ProfileImage } from '@/components/button';
import { useContent } from '@/hooks';
import { getDate, getPbImageURL } from '@/utils';

function Content() {
  const { contentData } = useContent();

  return (
    <main className="flex flex-col gap-y-2.5 px-4 py-3">
      <h4 className="sr-only">Content</h4>

      <figure className="flex w-full gap-x-3">
        <ProfileImage
          size={40}
          nickname={contentData.expand?.author.nickname}
          imageName={[
            contentData.expand?.author.id,
            contentData.expand?.author.profile_image,
          ]}
        />

        <figcaption className="flex flex-col">
          <span className="font-bold text-lionly-black">
            {contentData.expand?.author.nickname}
          </span>
          <div className="flex gap-x-1">
            <span className="text-lionly-sm text-lionly-gray-1">{`${getDate(
              contentData.created
            )}`}</span>
            <span className="text-lionly-sm-bold text-lionly-black">
              {contentData.create !== contentData.updated ? '수정됨' : null}
            </span>
          </div>
        </figcaption>
      </figure>
      <figure className="flex w-full flex-col gap-y-[14px]">
        <img
          alt="피드 이미지"
          src={getPbImageURL(contentData, 'feed_image')}
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

export default Content;
