import FeedList from '@/components/layout/FeedList';
import MypPageHeader from '@/components/layout/MypageHeader';

function MyPage() {
  return (
    <div className="w-full ">
      <MypPageHeader />
      <div className="z-10 h-full bg-lionly-white">
        <p className="mx-4 mb-4 mt-9 border-b-4 border-lionly-black px-11 py-3 text-center text-lionly-lg text-lionly-black">
          내가 쓴 글
        </p>
        <FeedList />
      </div>
    </div>
  );
}

export default MyPage;
