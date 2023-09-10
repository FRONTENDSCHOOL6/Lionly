import feedImg from '@/assets/feed_Header.svg';
import WritingButton from '../button/WritingButton';
import LogoutButton from '../button/LogoutButton';
import { useState } from 'react';
import { useEffect } from 'react';
import recordPending from '@/api/useFeedHeader';
import renderImg from '@/utils/getImageData';
import Spinner from '../Spinner';

function FeedHeader() {
  const [userInfo, setUserInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      const fetchedData = await recordPending('users', 'v20jyys9v37stq8');
      setUserInfo(fetchedData);
      setIsLoading(false);
    }
    fetchData();
  }, []);

 
  

  return (
      isLoading ? (
        <Spinner />
      ) : (
        <div className="w-full bg-lionly-primary-color px-4 pt-0 ">
          <div className="flex w-full items-center justify-between border-b border-lionly-secondary-color ">
            <div>
              <img
                src={feedImg}
                alt=""
                className="inline-block pb-2 pr-[10px]"
              />
              <span className="text-lionly-xl text-white">Lionly</span>
            </div>
            <button className="w-8">
              <span className="block h-1 w-full rounded-xl bg-white"></span>
              <span className="mt-1 block h-1 w-full rounded-xl bg-white"></span>
              <span className="mt-1 block h-1 w-full rounded-xl bg-white"></span>
            </button>
          </div>
          <div className="mt-10 flex justify-center pb-3 pl-1 text-white">
            {userInfo && (
              <>
                <button className="relative mr-[19px] h-[70px] w-[70px] rounded-full border-2 border-white">
                  <img
                    src={renderImg(
                      userInfo.collectionName,
                      userInfo.id,
                      userInfo.profile_image
                    )}
                    alt=""
                    className="h-[70px] w-[70px] rounded-full"
                  />
                </button>
                <div>
                  <span className="text-lionly-lg">{userInfo.nickname}</span>
                  <div className="flex ">
                    <WritingButton />
                    <LogoutButton />
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )
    
  );
}

export default FeedHeader;
