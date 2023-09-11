import getFeedList from '@/api/getFeedList';
import useChannel from '@/hooks/useChannel';
import { useInfiniteQuery } from '@tanstack/react-query';

function useFeed() {
  const { channels, select, selectedChannel } = useChannel();

  const { isLoading, data, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: ['feed'],
    queryFn: ({ pageParam = 1 }) => getFeedList(pageParam),
    getNextPageParam: (lastPage, allPages) =>
      lastPage.page < lastPage.totalPages ? lastPage.page + 1 : undefined,

    retry: 3,
    cacheTime: 5 * 60 * 1000,
    staleTime: 3 * 1000,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
  });

  return { isLoading, data, fetchNextPage };
}

export default useFeed;
