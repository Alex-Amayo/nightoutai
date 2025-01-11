import { useQueries, UseQueryResult } from '@tanstack/react-query';
import { fetchNearbyPlaces } from '../api/queries/fetchNearbyPlaces';
import { PlaceProps } from '../app/EatOutTypes';
import { getDistance } from 'geolib';

/**
 * Fetches multiple categories of nearby places in parallel.
 * Returns an object where each category is a key and its value is an array of places.
 *
 * @param lat Latitude of the current location.
 * @param lng Longitude of the current location.
 * @param radius Search radius for places.
 * @param type Type of places (e.g., 'restaurant').
 * @param categories Array of categories to search for (e.g., ['mexican', 'italian', 'chinese']).
 * @returns {object} - Object where each key is a category and value is an array of places.
 */
export const useFetchMultipleNearbyPlaces = (
  lat: number,
  lng: number,
  radius: number,
  type: string,
  categories: string[],
): {
  data: Record<string, PlaceProps[]>;
  isLoading: boolean;
  error?: Error | null;
} => {
  // Run parallel queries for each category
  const queryResults = useQueries({
    queries: categories.map((category) => ({
      queryKey: ['nearby-places', lat, lng, radius, type, category],
      queryFn: () => fetchNearbyPlaces({ lat, lng, radius, type, keyword: category }),
      staleTime: 1000 * 60 * 60, // Cache results for 1 hour
      enabled: !!lat && !!lng && radius > 0, // Ensure query is only enabled with valid lat/lng and radius
      retry: false
    })),
  });

  // Create an object where keys are categories and values are the fetched places
  const categoriesWithPlaces = categories.reduce(
    (acc, category, index) => {
      const result = queryResults[index] as UseQueryResult<PlaceProps[]>;
      if (result && result.data) {
        // Safeguard: Only calculate distance if lat/lng are available
        const sortedPlaces = result.data
          .filter((place) => place.geometry.location.lat !== undefined && place.geometry.location.lng !== undefined) // Ensure lat/lng exist
          .map((place) => ({
            ...place,
            distance: getDistance(
              { latitude: lat, longitude: lng },
              { latitude: place.geometry.location.lat, longitude: place.geometry.location.lng }
            ),
          }))
          .sort((a, b) => a.distance - b.distance); // Sort by distance (ascending)

        acc[category] = sortedPlaces;
      } else {
        acc[category] = [];
      }
      return acc;
    },
    {} as Record<string, PlaceProps[]>,
  );

  // Determine loading state (if any query is loading)
  const isLoading = queryResults.some((result) => result.isLoading);

  // Handle error (if any query encountered an error)
  const error = queryResults.find((result) => result.error)?.error;

  return { data: categoriesWithPlaces, isLoading, error: error ?? null };
};
