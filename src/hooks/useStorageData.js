import pb from '@/api/pocketbase';
import { useNavigate } from 'react-router-dom';

function useStorageData() {
  const navigate = useNavigate();

  if (!pb.authStore.isValid) {
    // console.log('hi');
    navigate('/signin');
  }
  return pb.authStore.model;
}

export default useStorageData;
