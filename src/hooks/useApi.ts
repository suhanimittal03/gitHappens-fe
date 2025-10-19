import { useState, useCallback } from 'react';

interface ApiState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

interface UseApiReturn<T> extends ApiState<T> {
  execute: (url: string, options?: RequestInit) => Promise<T | null>;
  reset: () => void;
}

/**
 * Generic hook for API calls
 * @example
 * const { data, loading, error, execute } = useApi<MyDataType>();
 * 
 * // Then call it like:
 * await execute('/api/endpoint', { method: 'POST', body: JSON.stringify(payload) });
 */
export function useApi<T = any>(): UseApiReturn<T> {
  const [state, setState] = useState<ApiState<T>>({
    data: null,
    loading: false,
    error: null,
  });

  const execute = useCallback(async (url: string, options?: RequestInit): Promise<T | null> => {
    setState({ data: null, loading: true, error: null });

    try {
      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          ...options?.headers,
        },
        ...options,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setState({ data, loading: false, error: null });
      return data;
    } catch (err) {
      const error = err instanceof Error ? err.message : 'An error occurred';
      setState({ data: null, loading: false, error });
      return null;
    }
  }, []);

  const reset = useCallback(() => {
    setState({ data: null, loading: false, error: null });
  }, []);

  return {
    ...state,
    execute,
    reset,
  };
}
