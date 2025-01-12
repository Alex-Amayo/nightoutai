import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { supabase } from '../supabase/supabase';

/**
 * Fetch data from a Supabase table.
 *
 * @template T - The type of the records in the table.
 * @param tableName - The name of the table to fetch data from.
 * @returns A promise resolving to an array of records of type T.
 * @throws Will throw an error if the Supabase query fails.
 */
const fetchTableData = async <T>(tableName: string): Promise<T[]> => {
  const { data, error } = await supabase.from(tableName).select('*');
  if (error) {
    console.error(`Error fetching data from table "${tableName}":`, error.message);
    throw error;
  }
  return data;
};

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
