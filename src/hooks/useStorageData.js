import pb from '@/api/pocketbase';

function useStorageData() {
  return pb.authStore.model;
}



export default useStorageData;
