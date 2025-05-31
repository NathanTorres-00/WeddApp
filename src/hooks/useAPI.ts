import { useState, useCallback } from 'react';
import { APIError } from '../api/config';

interface UseAPIState<T> {
  data: T | null;
  error: APIError | null;
  isLoading: boolean;
}

interface UseAPIResponse<T> extends UseAPIState<T> {
  execute: (...args: any[]) => Promise<void>;
  reset: () => void;
}

export function useAPI<T>(
  apiFunction: (...args: any[]) => Promise<{ data: T }>,
): UseAPIResponse<T> {
  const [state, setState] = useState<UseAPIState<T>>({
    data: null,
    error: null,
    isLoading: false,
  });

  const execute = useCallback(
    async (...args: any[]) => {
      setState(prev => ({ ...prev, isLoading: true, error: null }));
      try {
        const { data } = await apiFunction(...args);
        setState({ data, error: null, isLoading: false });
      } catch (error) {
        setState({
          data: null,
          error: error instanceof APIError ? error : new APIError('Unknown error', 500, 'UNKNOWN'),
          isLoading: false,
        });
      }
    },
    [apiFunction]
  );

  const reset = useCallback(() => {
    setState({ data: null, error: null, isLoading: false });
  }, []);

  return { ...state, execute, reset };
}