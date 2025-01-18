import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { fetchTableData } from '../api/queries/fetchTableData';

/**
 * React Query hook to fetch data from a Supabase table.
 *
 * @template T - The type of the records in the table.
 * @param tableName - The name of the table to fetch data from.
 * @returns A React Query result containing the fetched data and status information.
 */
export const useFetchTableData = <T>(tableName: string): UseQueryResult<T[], Error> => {
  return useQuery<T[], Error>({
    queryKey: ['tableData', tableName],
    queryFn: () => fetchTableData<T>(tableName),
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: 2,
    refetchOnWindowFocus: false,
  });
};
