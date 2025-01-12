import { useQuery } from '@tanstack/react-query';
import { supabase } from '../supabase/supabase'; // Adjust the import to your Supabase client setup

// Define the type for the photo object
interface NightclubPhoto {
  id: number;
  place_id: string;
  storage_path: string;
  url: string;
  uploaded_at: string | null;
}

/**
 * Fetch all photos for a specific place from the `nightclub_photos` table.
 *
 * @param placeId - The ID of the place to fetch photos for.
 * @returns An array of NightclubPhoto objects.
 */
const fetchPhotosByPlace = async (placeId: string): Promise<NightclubPhoto[]> => {
  const { data, error } = await supabase
    .from('nightclub_photos')
    .select('*')
    .eq('place_id', placeId);

  if (error) {
    throw new Error(error.message);
  }

  return data || [];
};

/**
 * React Query hook to fetch photos for a specific place.
 *
 * @param placeId - The ID of the place to fetch photos for.
 * @returns A React Query result object.
 */
export const useFetchPhotosByPlace = (placeId: string) => {
  return useQuery<NightclubPhoto[], Error>({
    queryKey: ['nightclub_photos', placeId],
    queryFn: () => fetchPhotosByPlace(placeId),
    enabled: !!placeId, // Only fetch if placeId is provided
    staleTime: 1000 * 60 * 5, // Cache data for 5 minutes
    retry: 2, // Retry failed requests twice
  });
};
