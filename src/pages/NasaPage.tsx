import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertTriangle, Calendar, Search, Rocket, Globe, Camera, Zap } from "lucide-react";
import Header from "@/components/Header";
import Aurora from "@/components/Aurora";
import { format } from "date-fns";
import { nasaFetchWithBackup } from "@/utils/nasaFetchWithBackup";

const NASA_PRIMARY_KEY = "4MRhe4oeIdXNeiPmdI5jGhmm1ghjdUuJWdn8xgtQ";
const NASA_BACKUP_KEY = "MtcZuoTfoCwcfGJkRlhTY1Za3qlL8AAJ1M1sLAcb";

interface ApodData {
  copyright?: string;
  date: string;
  explanation: string;
  hdurl?: string;
  media_type: "image" | "video";
  service_version: string;
  title: string;
  url: string;
}

interface NeoData {
  links: {
    next?: string;
    prev?: string;
    self: string;
  };
  element_count: number;
  near_earth_objects: {
    [date: string]: Array<{
      id: string;
      name: string;
      estimated_diameter: {
        meters: {
          estimated_diameter_min: number;
          estimated_diameter_max: number;
        };
      };
      is_potentially_hazardous_asteroid: boolean;
      close_approach_data: Array<{
        close_approach_date: string;
        miss_distance: {
          kilometers: string;
        };
        relative_velocity: {
          kilometers_per_hour: string;
        };
      }>;
    }>;
  };
}

interface MarsPhoto {
  id: number;
  img_src: string;
  earth_date: string;
  camera: {
    name: string;
    full_name: string;
  };
  rover: {
    name: string;
    status: string;
  };
}

// Update fetchers to use seamless fallback
const fetchApod = async (date?: string): Promise<ApodData> => {
  const urlBuilder = (apiKey: string) =>
    date 
      ? `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&date=${date}`
      : `https://api.nasa.gov/planetary/apod?api_key=${apiKey}`;
  const response = await nasaFetchWithBackup(urlBuilder, NASA_PRIMARY_KEY, NASA_BACKUP_KEY);
  if (!response.ok) throw new Error('Failed to fetch APOD');
  return response.json();
};

const fetchNearEarthObjects = async (): Promise<NeoData> => {
  const today = format(new Date(), 'yyyy-MM-dd');
  const urlBuilder = (apiKey: string) =>
    `https://api.nasa.gov/neo/rest/v1/feed?start_date=${today}&api_key=${apiKey}`;
  const response = await nasaFetchWithBackup(urlBuilder, NASA_PRIMARY_KEY, NASA_BACKUP_KEY);
  if (!response.ok) throw new Error('Failed to fetch NEO data');
  return response.json();
};

const fetchMarsPhotos = async (): Promise<{ photos: MarsPhoto[] }> => {
  const urlBuilder = (apiKey: string) =>
    `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=${apiKey}`;
  const response = await nasaFetchWithBackup(urlBuilder, NASA_PRIMARY_KEY, NASA_BACKUP_KEY);
  if (!response.ok) throw new Error('Failed to fetch Mars photos');
  return response.json();
};

const NasaPage = () => {
  const [selectedDate, setSelectedDate] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const { data: apodData, isLoading: apodLoading, isError: apodError } = useQuery({
    queryKey: ['apod', selectedDate],
    queryFn: () => fetchApod(selectedDate || undefined),
  });

  const { data: neoData, isLoading: neoLoading, isError: neoError } = useQuery({
    queryKey: ['neo'],
    queryFn: fetchNearEarthObjects,
  });

  const { data: marsData, isLoading: marsLoading, isError: marsError } = useQuery({
    queryKey: ['mars'],
    queryFn: fetchMarsPhotos,
  });

  const renderApodSection = () => (
    <Card className="bg-slate-800/30 border-purple-500/20 backdrop-blur-md">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Camera className="h-6 w-6" />
          Astronomy Picture of the Day
        </CardTitle>
        <CardDescription className="text-purple-200">
          Discover the cosmos through NASA's daily featured image
        </CardDescription>
        <div className="flex gap-2 mt-4">
          <Input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="bg-slate-700/50 border-purple-500/30 text-white"
            max={format(new Date(), 'yyyy-MM-dd')}
          />
          <Button 
            onClick={() => setSelectedDate("")}
            variant="outline"
            className="border-purple-500/30 text-purple-200"
          >
            Today
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {apodLoading ? (
          <div className="space-y-4">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-64 w-full" />
          </div>
        ) : apodError ? (
          <div className="text-red-300 flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            Failed to load APOD
          </div>
        ) : apodData ? (
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white">{apodData.title}</h3>
            {apodData.media_type === 'image' ? (
              <img 
                src={apodData.url} 
                alt={apodData.title}
                className="w-full rounded-lg max-h-96 object-cover"
              />
            ) : (
              <iframe
                src={apodData.url}
                title={apodData.title}
                className="w-full h-64 rounded-lg"
              />
            )}
            <p className="text-purple-200 text-sm leading-relaxed">{apodData.explanation}</p>
            <div className="flex justify-between text-xs text-purple-300">
              <span>{apodData.date}</span>
              {apodData.copyright && <span>© {apodData.copyright}</span>}
            </div>
          </div>
        ) : null}
      </CardContent>
    </Card>
  );

  const renderNeoSection = () => (
    <Card className="bg-slate-800/30 border-blue-500/20 backdrop-blur-md">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Zap className="h-6 w-6" />
          Near Earth Objects Today
        </CardTitle>
        <CardDescription className="text-blue-200">
          Asteroids approaching Earth today
        </CardDescription>
      </CardHeader>
      <CardContent>
        {neoLoading ? (
          <div className="space-y-2">
            {[...Array(3)].map((_, i) => (
              <Skeleton key={i} className="h-16 w-full" />
            ))}
          </div>
        ) : neoError ? (
          <div className="text-red-300 flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            Failed to load NEO data
          </div>
        ) : neoData ? (
          <div className="space-y-3">
            <div className="text-sm text-blue-200 mb-4">
              Found {neoData.element_count} objects today
            </div>
            {Object.entries(neoData.near_earth_objects).map(([date, objects]) => (
              <div key={date}>
                {objects.slice(0, 3).map((neo) => (
                  <div key={neo.id} className="bg-slate-700/30 rounded-lg p-3 mb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="text-white font-semibold text-sm">{neo.name}</h4>
                        <p className="text-blue-200 text-xs">
                          Diameter: {neo.estimated_diameter.meters.estimated_diameter_min.toFixed(0)}m - 
                          {neo.estimated_diameter.meters.estimated_diameter_max.toFixed(0)}m
                        </p>
                        {neo.close_approach_data[0] && (
                          <p className="text-blue-200 text-xs">
                            Distance: {parseFloat(neo.close_approach_data[0].miss_distance.kilometers).toLocaleString()} km
                          </p>
                        )}
                      </div>
                      {neo.is_potentially_hazardous_asteroid && (
                        <span className="bg-red-500/20 text-red-300 px-2 py-1 rounded text-xs">
                          Hazardous
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        ) : null}
      </CardContent>
    </Card>
  );

  const renderMarsSection = () => (
    <Card className="bg-slate-800/30 border-red-500/20 backdrop-blur-md">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Globe className="h-6 w-6" />
          Mars Rover Photos
        </CardTitle>
        <CardDescription className="text-red-200">
          Latest images from NASA's Mars rovers
        </CardDescription>
      </CardHeader>
      <CardContent>
        {marsLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[...Array(6)].map((_, i) => (
              <Skeleton key={i} className="h-32 w-full" />
            ))}
          </div>
        ) : marsError ? (
          <div className="text-red-300 flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            Failed to load Mars photos
          </div>
        ) : marsData ? (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {marsData.photos.slice(0, 6).map((photo) => (
              <div key={photo.id} className="space-y-2">
                <img 
                  src={photo.img_src} 
                  alt={`Mars photo by ${photo.rover.name}`}
                  className="w-full h-32 object-cover rounded-lg"
                />
                <div className="text-xs text-red-200">
                  <p>{photo.camera.full_name}</p>
                  <p>{photo.earth_date}</p>
                </div>
              </div>
            ))}
          </div>
        ) : null}
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      <div className="fixed inset-0 z-0 opacity-60">
        <Aurora
          colorStops={["#3A29FF", "#FF94B4", "#FF3232"]}
          blend={0.7}
          amplitude={0.9}
          speed={0.4}
        />
      </div>
      
      <div className="relative z-10">
        <Header />
        
        <main className="container mx-auto px-4 py-8">
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-7xl font-black text-white mb-4 bg-gradient-to-r from-purple-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              NASA Explorer
            </h1>
            <p className="text-2xl text-purple-200 mb-6">
              Discover the universe through NASA's eyes
            </p>
            <div className="flex items-center justify-center gap-4 mb-8">
              <Rocket className="h-8 w-8 text-purple-400" />
              <span className="text-purple-200">Powered by NASA Open Data Portal</span>
            </div>
          </div>

          <div className="space-y-8">
            {renderApodSection()}
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {renderNeoSection()}
              {renderMarsSection()}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default NasaPage;
