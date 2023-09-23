import { getMyFeedList } from '@/api';
import { useInfiniteQuery } from '@tanstack/react-query';

function useInfiniteMyFeed() {
  const { isLoading, isSuccess, data, hasNextPage, fetchNextPage, refetch } =
    useInfiniteQuery({
      queryKey: ['MyfeedList'],
      queryFn: ({ pageParam = 1 }) => getMyFeedList(pageParam),
      getNextPageParam: (lastPage) =>
        lastPage.page < lastPage.totalPages ? lastPage.page + 1 : undefined,

      retry: 3,
      cacheTime: 5 * 60 * 1000,
      staleTime: 3 * 1000,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      refetchOnMount: true,
    });

  return { isLoading, isSuccess, data, hasNextPage, fetchNextPage, refetch };
}

export default useInfiniteMyFeed;
