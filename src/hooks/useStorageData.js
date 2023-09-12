import pb from '@/api/pocketbase'
import { useNavigate } from 'react-router-dom';


// 중요 ! key는 문자열 string으로 전달해야함
function useStorageData(key) {
  const navigate = useNavigate();
  if(!pb.authStore.isValid){
    navigate('/signin');
  }
  if(typeof key !== 'string'){
    throw new Error('key는 string 타입을 줘야 합니다.');
  }
  
  return pb.authStore.model[key];
}

export default useStorageData