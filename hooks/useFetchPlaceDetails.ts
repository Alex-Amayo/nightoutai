import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { fetchPlaceDetails } from '../api/queries/fetchPlaceDetails';
import { PlaceDetailsProps } from '../app/EatOutTypes';

/**
 * Custom hook that fetches place details from Google Places API based on place ID and fields.
 *
 * @param {string} place_id - The unique identifier of the place to fetch details for.
 * @param {string} fields - A comma-separated list of fields to return in the place details.
 *
 * @returns {object} - The query object from `useQuery` containing:
 * - `data`: Object of `PlaceDetailsProps` representing the place details.
 * - `isLoading`: Boolean indicating whether the query is still loading.
 * - `error`: Any error that occurred during the query.
 *
 * @example
 * const { data, isLoading, error } = useFetchPlaceDetails('ChIJwRmrZfzDyIARyzuaOcQIrMg', 'name,website,formatted_address');
 */
export const useFetchPlaceDetails = (
  place_id: string,
  fields: string,
): UseQueryResult<PlaceDetailsProps, Error> => {
  return useQuery<PlaceDetailsProps>({
    queryKey: ['place-details', place_id, fields],
    queryFn: () => fetchPlaceDetails({ place_id, fields }),
    staleTime: 1000 * 60, // 1 minute stale time
    enabled: !!place_id, // Only fetch when place_id is provided
  });
};
