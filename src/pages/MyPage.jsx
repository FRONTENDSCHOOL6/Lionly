import FeedList from '@/components/layout/FeedList';
import MypPageHeader from '@/components/layout/MypageHeader';

function MyPage() {
  // window.innerWidth > '768px' ? '-mx-[calc(100vw-768px)]' : null;
  return (
    <div className="w-full">
      <MypPageHeader />
      <p className="mx-4 mb-4 mt-3 border-b-4 border-lionly-black px-11 py-3 text-center text-lionly-lg text-lionly-black">
        내가 쓴 글
      </p>
      <FeedList />
    </div>
  );
}

export default MyPage;
