import getContent from '@/api/getContent';
import { useQuery } from '@tanstack/react-query';

function useContent(contentId) {
  const { isLoading, data } = useQuery({
    queryKey: ['content', window.location.pathname],
    queryFn: () => getContent(contentId),
  });

  return { isLoading, data };
}

export default useContent;
