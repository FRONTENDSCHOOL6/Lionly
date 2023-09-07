import feedImg from '@/assets/feed_Header.svg';
import WritingButton from '../button/WritingButton';
import LogoutButton from '../button/LogoutButton';
import PocketBase from 'pocketbase';
import { useState } from 'react';

function FeedHeader() {
  const pb = new PocketBase('https://lionly.pockethost.io/');

  let [img,setImg] = useState('');
  const readRecordOne = async (collectionName, id) => {
    try {
      return await pb.collection(collectionName).getOne(id);
    } catch (error) {
      throw new Error(error.message);
    }
  };
  
  async function fetchAndLogData() {
    try {
      const result = await readRecordOne('users', 'v20jyys9v37stq8');
      console.log(result.profile_image
        ); 
      // setImg(result.profile_image);
      
    } catch (error) {
      console.error(error);
    }
  }
  // console.log(setImg)
  fetchAndLogData();
  // console.log(fetchAndLogData())

  // console.log(readRecordOne('users', 'v20jyys9v37stq8'))

  // const fatchData = async (collection, id) => {
  //   const response = await fetch(readRecordOne(collection, id));
  //   // const b = await a.json();
  //   console.log(response);
  // };

  // fatchData('users', 'v20jyys9v37stq8')

  return (
    <div className="w-full bg-lionly-primary-color px-4 pt-0 ">
      <div className="flex w-full items-center justify-between border-b border-lionly-secondary-color ">
        <div>
          <img src={feedImg} alt="" className="inline-block pb-2 pr-[10px]" />
          <span className="text-lionly-xl text-white">Lionly</span>
        </div>
        <button className="w-8">
          <span className="block h-1 w-full rounded-xl bg-white"></span>
          <span className="mt-1 block h-1 w-full rounded-xl bg-white"></span>
          <span className="mt-1 block h-1 w-full rounded-xl bg-white"></span>
        </button>
      </div>

      <div className="mt-10 flex justify-center pb-3 pl-1 text-white">
        <button className="relative mr-[19px] h-[70px] w-[70px] rounded-full border-2 border-white">
          <img
            src={'https://lionly.pockethost.io/api/files/_pb_users_auth_/v20jyys9v37stq8/i6Jagc3jWg_xV17i9Ct9Z.jpg?token='}
            alt=""
            className="h-[70px] w-[70px] rounded-full"
          />
        </button>
        <div>
          <span className="text-lionly-lg">두부 왕자</span>
          <div className="flex ">
            <WritingButton />
            <LogoutButton />
          </div>
        </div>
      </div>
    </div>
  );
}

export default FeedHeader;
