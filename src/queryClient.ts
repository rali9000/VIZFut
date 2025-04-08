import { QueryClient, QueryCache } from '@tanstack/react-query';

const queryCache = new QueryCache();
export const queryClient = new QueryClient({
    queryCache,
    defaultOptions: {
        queries: {
            staleTime: 30 * 60 * 1000,
            gcTime: 60 * 60 * 1000,
            refetchOnMount: false,
            refetchOnWindowFocus: false,
        },
    },
});
