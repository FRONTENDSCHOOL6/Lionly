import { getFeedList } from '@/api';
import { useInfiniteQuery } from '@tanstack/react-query';

function useInfiniteFeed() {
  let channelName;
  switch (window.location.pathname) {
    case '/feed':
      channelName = '';
      break;

    case '/feed/daily':
      channelName = '일상방';
      break;

    case '/feed/food':
      channelName = '맛집방';
      break;

    case '/feed/job':
      channelName = '취업방';
      break;

    case '/feed/healing':
      channelName = '힐링방';
      break;
  }

  const { isLoading, isSuccess, data, hasNextPage, fetchNextPage, refetch } =
    useInfiniteQuery({
      queryKey: ['feedList', window.location.pathname],
      queryFn: ({ pageParam = 1 }) => getFeedList(pageParam, channelName),
      getNextPageParam: (lastPage) =>
        lastPage.page < lastPage.totalPages ? lastPage.page + 1 : undefined,

      retry: 3,
      cacheTime: 5 * 60 * 1000,
      staleTime: 3 * 1000,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    });

  return { isLoading, isSuccess, data, hasNextPage, fetchNextPage, refetch };
}

export default useInfiniteFeed;
