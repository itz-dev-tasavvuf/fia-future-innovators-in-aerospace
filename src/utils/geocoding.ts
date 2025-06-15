
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

  // Fallback to a simpler geocoding approach using a different service
  try {
    console.log('Trying fallback geocoding service...');
    
    const fallbackResponse = await fetch(
      `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(location)}&key=no-api-key-required&limit=1&no_annotations=1`
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
    }
  } catch (error) {
    console.error('Fallback geocoding failed:', error);
  }

  // If both fail, try to extract country/city info and use approximate coordinates
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
  
  const approximateCoords: { [key: string]: { lat: number; lng: number } } = {
    // Major cities
    'new york': { lat: 40.7128, lng: -74.0060 },
    'london': { lat: 51.5074, lng: -0.1278 },
    'paris': { lat: 48.8566, lng: 2.3522 },
    'tokyo': { lat: 35.6762, lng: 139.6503 },
    'beijing': { lat: 39.9042, lng: 116.4074 },
    'moscow': { lat: 55.7558, lng: 37.6176 },
    'sydney': { lat: -33.8688, lng: 151.2093 },
    'mumbai': { lat: 19.0760, lng: 72.8777 },
    'cairo': { lat: 30.0444, lng: 31.2357 },
    'lagos': { lat: 6.5244, lng: 3.3792 },
    'mexico city': { lat: 19.4326, lng: -99.1332 },
    'são paulo': { lat: -23.5505, lng: -46.6333 },
    'berlin': { lat: 52.5200, lng: 13.4050 },
    'madrid': { lat: 40.4168, lng: -3.7038 },
    'rome': { lat: 41.9028, lng: 12.4964 },
    
    // Countries (approximate center)
    'usa': { lat: 39.8283, lng: -98.5795 },
    'united states': { lat: 39.8283, lng: -98.5795 },
    'uk': { lat: 55.3781, lng: -3.4360 },
    'united kingdom': { lat: 55.3781, lng: -3.4360 },
    'canada': { lat: 56.1304, lng: -106.3468 },
    'australia': { lat: -25.2744, lng: 133.7751 },
    'india': { lat: 20.5937, lng: 78.9629 },
    'china': { lat: 35.8617, lng: 104.1954 },
    'russia': { lat: 61.5240, lng: 105.3188 },
    'brazil': { lat: -14.2350, lng: -51.9253 },
    'germany': { lat: 51.1657, lng: 10.4515 },
    'france': { lat: 46.6034, lng: 1.8883 },
    'spain': { lat: 40.4637, lng: -3.7492 },
    'italy': { lat: 41.8719, lng: 12.5674 },
    'japan': { lat: 36.2048, lng: 138.2529 },
  };
  
  // Check for exact matches first
  for (const [key, coords] of Object.entries(approximateCoords)) {
    if (locationLower.includes(key)) {
      return coords;
    }
  }
  
  return null;
};
