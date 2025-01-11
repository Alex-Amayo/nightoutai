// @ts-expect-error this edge function is running deno on the server
// eslint-disable-next-line import/no-unresolved
import { serve } from 'https://deno.land/std@0.192.0/http/server.ts';

// CORS headers to allow cross-origin requests
const corsHeaders = {
  'Access-Control-Allow-Origin': '*', //Change to domain later
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

serve(async (req: Request) => {
  // Handle preflight CORS request (OPTIONS)
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Parse the incoming request body to extract place_id and fields
    const { place_id, fields } = await req.json();

    // Check if place_id is provided
    if (!place_id) {
      return new Response('place_id is required', { status: 400 });
    }

    // Set default fields if none are provided
    const defaultFields = 'name,website,formatted_address,formatted_phone_number,reviews,photos';
    const selectedFields = fields || defaultFields;

    // Get Google Places API key from environment variables
    // @ts-expect-error Deno running on server
    const apiKey = Deno.env.get('GOOGLE_PLACES_API_KEY');
    if (!apiKey) {
      return new Response('API key not found', { status: 500 });
    }

    // Construct the Google Places API URL for fetching place details
    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${place_id}&key=${apiKey}&fields=${selectedFields}`;

    // Fetch the data from Google Places API
    const response = await fetch(url);
    if (!response.ok) {
      return new Response('Failed to fetch data from Google Places API', {
        status: 500,
      });
    }

    const data = await response.json();

    // Return the fetched place details with CORS headers
    return new Response(JSON.stringify(data.result), {
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
    });
  } catch (error) {
    console.error('Error fetching Google Places data:', error);
    return new Response(JSON.stringify({ error: 'An error occurred' }), {
      status: 500,
      headers: { ...corsHeaders },
    });
  }
});
