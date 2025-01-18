import { useQuery } from '@tanstack/react-query';
import { supabase } from '../../supabase/supabase';
import { ReviewProps } from '../../types/PlacesTypes';

/**
 * Fetch all reviews for a specific place from the `nightclub_reviews` table.
 *
 * @param placeId - The ID of the place to fetch reviews for.
 * @returns An array of Review objects.
 */
const fetchReviewsByPlace = async (placeId: string): Promise<ReviewProps[]> => {
  const { data, error } = await supabase
    .from('nightclub_reviews')
    .select('*')
    .eq('google_place_id', placeId);

  if (error) {
    throw new Error(error.message);
  }

  return data || [];
};

/**
 * React Query hook to fetch reviews for a specific place.
 *
 * @param placeId - The ID of the place to fetch reviews for.
 * @returns An object containing the query result.
 */
const useFetchReviewsByPlace = (placeId: string) => {
  return useQuery({ queryKey: ['reviews', placeId], queryFn: () => fetchReviewsByPlace(placeId) });
};

export { useFetchReviewsByPlace, fetchReviewsByPlace };
