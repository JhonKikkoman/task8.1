/** @format */

import { useEffect, useState } from 'react';

type returnT = {
  data: string | null;
  loading: boolean;
  error: string | null;
};

export const useJsonFetch = (url: string, options?: RequestInit): returnT => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const sendRequest = async () => {
      setLoading(true);
      try {
        const response = await fetch(url, {
          method: options?.method ? options.method : 'GET',
          headers: options?.headers
            ? options.headers
            : { 'Content-Type': 'application/json' },
          body: options?.body ? JSON.stringify(options.body) : null,
        });
        if (!response.ok) {
          throw new Error('Что-то пошло не так!');
        }
        const result = await response.json();
        setData(result);
      } catch (e: any) {
        setError(e.message);
      }
      setLoading(false);
    };
    sendRequest();
  }, [options?.body, options?.headers, options?.method, url]);
  return { data, loading, error };
};
