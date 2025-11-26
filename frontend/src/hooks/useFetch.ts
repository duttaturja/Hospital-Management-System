import { useState, useEffect, useCallback } from 'react';
import apiClient from '../services/api';
import { AxiosError } from 'axios';

interface FetchState<T> {
  data: T | null;
  isLoading: boolean;
  error: AxiosError | Error | null;
}

/**
 * A custom hook to fetch data from the API.
 * @template T - The type of the data to be fetched.
 * @param {string} url - The API endpoint to fetch data from.
 * @returns {object} The state of the fetch operation, including data, isLoading, error, and a refetch function.
 */
const useFetch = <T,>(url: string) => {
  const [state, setState] = useState<FetchState<T>>({
    data: null,
    isLoading: true,
    error: null,
  });

  const fetchData = useCallback(async () => {
    // Reset state before fetching
    setState((prevState) => ({ ...prevState, isLoading: true, error: null }));
    try {
      const response = await apiClient.get<T>(url);
      setState({ data: response.data, isLoading: false, error: null });
    } catch (err) {
      const error = err as AxiosError | Error;
      console.error(`Failed to fetch from ${url}:`, error);
      setState({ data: null, isLoading: false, error: error });
    }
  }, [url]);

  useEffect(() => {
    // Initial fetch when the component mounts or URL changes
    fetchData();
  }, [fetchData]);

  return { ...state, refetch: fetchData };
};

export default useFetch;