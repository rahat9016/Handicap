import { getData } from '@/api/api';
import { useQuery } from '@tanstack/react-query';

interface UseFetchDataProps {
    queryKey: string | string[];  // This can be either a string or an array of strings
    url: string;                  // URL for the API request
}

export const useFetchData = <T>({ queryKey, url }: UseFetchDataProps) => {
    return useQuery<T>({
        queryKey: Array.isArray(queryKey) ? queryKey : [queryKey],  // Ensure queryKey is an array
        queryFn: () => getData<T>(url),  // Fetch data using getData function
    });
};


