import { useEffect, useState } from 'react';

const defaultOptions = {
  method: 'GET',
};

function useFetchData(endpoint, options = {}) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    setIsLoading(true);

    async function fetchData() {
      try {
        const response = await fetch(endpoint, {
          ...defaultOptions,
          ...options,
          signal: controller.signal,
        });
        const responseData = await response.json();
        setData(responseData);
      } catch (error) {
        if (!(error instanceof DOMException)) {
          setError(error);
        }
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();

    return () => {
      controller.abort();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [endpoint]);

  return { data, isLoading, error };
}

export default useFetchData;
