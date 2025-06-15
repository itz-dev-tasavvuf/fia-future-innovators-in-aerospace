import { approximateCoords } from "@/data/approximateCoordinates";

// Enhanced geocoding function with multiple providers and better error handling
export const geocodeLocation = async (location: string): Promise<{ lat: number; lng: number } | null> => {
  if (!location || location.trim() === '') {
    console.error('Geocoding error: Empty location provided');
    return null;
  }

  // Try Nominatim first (OpenStreetMap)
  try {
    console.log('Attempting to geocode location:', location);
    
    const nominatimResponse = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(location)}&limit=1&addressdetails=1`,
      {
        headers: {
          'User-Agent': 'FIA-Space-App/1.0'
        }
      }
    );
    
    if (!nominatimResponse.ok) {
      throw new Error(`Nominatim API error: ${nominatimResponse.status}`);
    }
    
    const nominatimData = await nominatimResponse.json();
    console.log('Nominatim response:', nominatimData);
    
    if (nominatimData && nominatimData.length > 0) {
      const result = {
        lat: parseFloat(nominatimData[0].lat),
        lng: parseFloat(nominatimData[0].lon)
      };
      console.log('Geocoding successful:', result);
      return result;
    }
  } catch (error) {
    console.error('Nominatim geocoding failed:', error);
  }

  // Using the OpenCage API key provided.
  const openCageApiKey = 'cd00c08d9f564664b3b362d3b32b868a';

  // Fallback to OpenCageData if an API key is provided
  if (openCageApiKey) {
    try {
      console.log('Trying fallback geocoding service (OpenCage)...');
      
      const fallbackResponse = await fetch(
        `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(location)}&key=${openCageApiKey}&limit=1&no_annotations=1`
      );
      
      if (fallbackResponse.ok) {
        const fallbackData = await fallbackResponse.json();
        console.log('Fallback response:', fallbackData);
        
        if (fallbackData.results && fallbackData.results.length > 0) {
          const result = {
            lat: fallbackData.results[0].geometry.lat,
            lng: fallbackData.results[0].geometry.lng
          };
          console.log('Fallback geocoding successful:', result);
          return result;
        }
      } else {
        const errorText = await fallbackResponse.text();
        console.error(`OpenCage API error: ${fallbackResponse.status}`, errorText);
      }
    } catch (error) {
      console.error('OpenCage geocoding failed:', error);
    }
  }


  // If all geocoding services fail, try to extract country/city info and use approximate coordinates
  const approximateCoordinates = getApproximateCoordinates(location);
  if (approximateCoordinates) {
    console.log('Using approximate coordinates:', approximateCoordinates);
    return approximateCoordinates;
  }
  
  console.error('All geocoding methods failed for location:', location);
  return null;
};

// Fallback function with approximate coordinates for major cities/countries
const getApproximateCoordinates = (location: string): { lat: number; lng: number } | null => {
  const locationLower = location.toLowerCase();
  
  // Check for exact matches first
  for (const [key, coords] of Object.entries(approximateCoords)) {
    if (locationLower.includes(key)) {
      return coords;
    }
  }
  
  return null;
};
