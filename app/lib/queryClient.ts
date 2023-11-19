import { QueryClient } from 'react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
   queries: {
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5, // 5 minutes
   }  
  }
});