import useFetchData from './useFetchData';

const endpoint = `${import.meta.env.VITE_PB_API}/collections/feeds/records`;

function useFeedList() {
  return useFetchData(endpoint);
}

export default useFeedList;
