import { getPbImageURL } from '@/utils/getPbImageURL';
import { ReactComponent as KebabButtonSVG } from '@/assets/KebabMenuButton_FeedList.svg';
import { shape, string } from 'prop-types';
import { useQuery } from '@tanstack/react-query';
import getFeedText from '@/api/getFeedText';

function Feed() {
  const { status, isLoading, data } = useQuery({
    queryKey: ['text'],
    queryFn: getFeedText,
    retry: 3,
    cacheTime: 5 * 60 * 1000,
    staleTime: 3 * 1000,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
  });
  console.log(status);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (data) {
    return (
      <>
        <h2>전체 게시글</h2>
        <ul className="m-auto w-72">
          {data && data.map((item) => <FeedItem key={item.id} item={item} />)}
        </ul>
      </>
    );
  }
}

export default Feed;

function FeedItem({ item }) {
  return (
    <li key={item.id}>
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
          src={getPbImageURL(item, 'feedimage')}
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
  );
}

FeedItem.propTypes = {
  item: shape({
    id: string,
    image: string,
    nickname: string,
    date: string,
    feedimage: string,
    text: string,
  }).isRequired,
};
