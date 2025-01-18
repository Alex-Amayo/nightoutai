import { useQuery } from '@tanstack/react-query';
import { supabase } from '../../supabase/supabase';
import { PlaceProps } from '../../types/PlacesTypes';

/**
 * Hook to fetch a single place by its ID from the Supabase database.
 *
 * @param id - The ID of the place to fetch.
 * @returns A React Query result object containing the place data, loading state, and error.
 */
export const useFetchPlaceById = (id: string | number | undefined) => {
  return useQuery<PlaceProps | null, Error>({
    queryKey: ['place', id], // Ensure `id` is typed correctly as part of the key
    queryFn: async () => {
      if (!id) {
        throw new Error('No ID provided');
      }

      // Supabase query to fetch a single place by ID
      const { data, error } = await supabase
        .from('nightclubs') // Replace 'places' with your table name
        .select('*') // Adjust the columns you want to fetch
        .eq('id', id) // Filter by the ID column
        .single(); // Ensure only a single row is returned

      if (error) {
        throw new Error(`Error fetching place: ${error.message}`);
      }
      return data;
    },
  });
};
