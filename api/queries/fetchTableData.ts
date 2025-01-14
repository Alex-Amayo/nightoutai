import { supabase } from '../../supabase/supabase';

/**
 * Fetch data from a Supabase table.
 *
 * @template T - The type of the records in the table.
 * @param tableName - The name of the table to fetch data from.
 * @returns A promise resolving to an array of records of type T.
 * @throws Will throw an error if the Supabase query fails.
 */
export const fetchTableData = async <T>(tableName: string): Promise<T[]> => {
  const { data, error } = await supabase.from(tableName).select('*');
  if (error) {
    console.error(`Error fetching data from table "${tableName}":`, error.message);
    throw error;
  }
  return data;
};
