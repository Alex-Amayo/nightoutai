import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { fetchNearbyPlaces } from '../api/queries/fetchNearbyPlaces';
import { PlaceProps } from '../app/EatOutTypes';

/**
 * Custom hook that uses Google Places API to fetch nearby places based on location and keyword.
 *
 * @param {number} lat - The latitude of the current location.
 * @param {number} lng - The longitude of the current location.
 * @param {number} radius - The search radius (in meters) for nearby places.
 * @param {string} type - The type of places to search for (e.g., 'restaurant').
 * @param {string} keyword - A specific keyword or category to filter the results (e.g., 'mexican', 'italian').
 *
 * @returns {object} - The query object from `useQuery` containing:
 * - `data`: Array of `PlaceProps` objects representing the nearby places found.
 * - `isLoading`: Boolean indicating whether the query is still loading.
 * - `error`: Any error that occurred during the query.
 *
 * @example
 * const { data, isLoading, error } = useFetchNearbyPlaces(36.1699, -115.1398, 1000, 'restaurant', 'mexican');
 */
export const useFetchNearbyPlaces = (
  lat: number,
  lng: number,
  radius: number,
  type: string,
  keyword: string,
): UseQueryResult<PlaceProps[], Error> => {
  return useQuery<PlaceProps[]>({
    queryKey: ['nearby-places', lat, lng, radius, type, keyword],
    queryFn: () => fetchNearbyPlaces({ lat, lng, radius, type, keyword }),
    staleTime: 1000 * 60 * 60, // 1 hour stale time
    enabled: !!lat && !!lng && radius > 0, // Only fetch when lat/lng are valid and radius is greater than 0
  });
};
