import { ReactComponent as KebabButtonSVG } from '@/assets/KebabMenuButton_FeedList.svg';
import { getPbImageURL } from '@/utils/getPbImageURL';
import { shape, string } from 'prop-types';

// 피드 아이템으로 바꿔야함 리스트로 뿌려주는 부분이 아니니까
export default function FeedList({ item }) {
  return (
    <div className="m-auto w-72 ">
      <ul>
        <li>
          <figure className="relative mb-[10px] flex h-10 w-full">
            <img src={getPbImageURL(item, 'image')} alt="" />
            <figcaption className="ml-3">
              <p className="font-bold text-lionly-black">{item.nickname}</p>
              <p className="text-lionly-sm text-lionly-gray-1">{item.date}</p>
            </figcaption>
            <button type="button" className="absolute right-0 h-9 w-9">
              <KebabButtonSVG />
            </button>
          </figure>
          <figure className="w-full ">
            <img
              src={item.feedimage}
              alt=""
              className="h-40 w-full rounded-2xl"
            />
            <figcaption className="mt-[14px]">
              <p className="w-[260] text-lionly-sm text-lionly-gray-1">
                {item.text}
              </p>
            </figcaption>
          </figure>
        </li>
      </ul>
    </div>
  );
}

FeedList.propTypes = {
  item: shape({
    id: string,
    image: string,
    nickname: string,
    date: string,
    feedimage: string,
    text: string,
  }).isRequired,
};
