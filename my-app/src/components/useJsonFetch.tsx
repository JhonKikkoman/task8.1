/** @format */

import { useEffect, useState } from 'react';

type stateT = {
  data?: {
    status: string;
  };
  loading?: boolean;
  error?: {
    status: string;
  };
};

type returnFetchNow = {
  data?: {
    status: string;
  };
  loading?: boolean;
  error?: {
    status: string;
  };
  fetchNow: (url: string, options?: RequestInit) => void;
};

export const useJsonFetch = (
  url: string,
  options?: RequestInit
): returnFetchNow => {
  const [state, setStatus] = useState<stateT>({
    data: undefined,
    loading: false,
    error: undefined,
  });

  function fetchNow(url: string, options?: RequestInit): void {
    setStatus({ loading: true });
    const fch = async () => {
      const response = await fetch(url, options);
      if (response.status !== 200) {
        setStatus({ loading: false, error: { status: response.statusText } });
        throw new Error(`Ошибка - ${response.statusText}`);
      }
      const header = response.headers.get('Content-type');
      if (header !== 'application/json; charset=utf-8') {
        throw new Error(
          `Ошибка парсинга - ${response.headers.get('Content-type')}`
        );
      }
      const result = await response.json();
      setStatus({ loading: false, data: result });
    };
    fch();
  }

  useEffect(() => {
    if (url) {
      fetchNow(url, options);
    }
  }, [url, options]);

  return { ...state, fetchNow };
};
