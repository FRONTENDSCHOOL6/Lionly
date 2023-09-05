import { ReactComponent as UserProfile } from '@/assets/lionHeadLogo_common.svg';
import { ReactComponent as KebabButton } from '@/assets/KebabMenuButton_FeedList.svg';

export default function CreateFeed() {
  return (
    <div className="m-auto w-72 ">
      <figure className="relative mb-[10px] flex h-10 w-full">
        <UserProfile width="40px" height="40px" />
        <figcaption className="ml-3">
          <p className="font-bold text-lionly-black">두부왕자</p>
          <p className="text-lionly-sm text-lionly-gray-1">
            2023.09.03 오후 2시 40분
          </p>
        </figcaption>
        <button type="button" className="absolute right-0 h-9 w-9">
          <KebabButton />
          {/* <img src="@/assets/KebabMenuButton_FeedList.svg" alt="" />d */}
        </button>
      </figure>
      <figure className="w-full ">
        <img
          src="../../public/favicon/android-icon-48x48.png"
          alt=""
          className="h-40 w-full rounded-2xl"
        />
        <figcaption className="mt-[14px]">
          <p className="w-[260] text-lionly-sm text-lionly-gray-1">
            주말엔 매일 줄 서 있어서 먹을 수가 없었는데 평일에 다행히 갈 수
            있어서 너무 좋았어요! 줄 안기다리고 먹었는데 와 너무 맛있었습니다 !!
            주말엔 매일 줄 서 있어서 먹을 수가 없었는데 평일에 다행히 갈 수
            있었네요!
          </p>
        </figcaption>
      </figure>
    </div>
  );
}
