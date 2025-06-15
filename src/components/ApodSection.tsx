
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertTriangle, CameraOff } from "lucide-react";

const NASA_API_KEY = "4MRhe4oeIdXNeiPmdI5jGhmm1ghjdUuJWdn8xgtQ";

interface ApodData {
  copyright: string;
  date: string;
  explanation: string;
  hdurl: string;
  media_type: "image" | "video";
  service_version: string;
  title: string;
  url: string;
}

const fetchApod = async (): Promise<ApodData> => {
  const response = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${NASA_API_KEY}`);
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.msg || 'Failed to fetch data from NASA API.');
  }
  return response.json();
};

const ApodSection = () => {
  const { data, isLoading, isError, error } = useQuery<ApodData, Error>({
    queryKey: ['apod'],
    queryFn: fetchApod,
  });

  if (isLoading) {
    return (
      <Card className="bg-slate-800/30 border-purple-500/20 backdrop-blur-md mb-8">
        <CardHeader className="text-center">
          <Skeleton className="h-8 w-1/2 mx-auto" />
          <Skeleton className="h-6 w-3/4 mx-auto mt-2" />
        </CardHeader>
        <CardContent>
          <Skeleton className="w-full h-96" />
          <div className="mt-6 space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
          </div>
        </CardContent>
      </Card>
    );
  }

  if (isError) {
    return (
      <Card className="bg-red-900/30 border-red-500/30 backdrop-blur-md mb-8">
        <CardHeader>
          <CardTitle className="text-red-300 flex items-center gap-2">
            <AlertTriangle />
            Error Fetching Picture of the Day
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-red-200">{error.message}</p>
        </CardContent>
      </Card>
    );
  }

  if (!data) {
    return null;
  }

  return (
    <Card className="bg-slate-800/30 border-purple-500/20 backdrop-blur-md mb-8 overflow-hidden">
      <CardHeader className="text-center">
        <CardTitle className="text-white text-3xl font-bold mb-2">Astronomy Picture of the Day</CardTitle>
        <CardDescription className="text-purple-200 text-lg">{data.title}</CardDescription>
      </CardHeader>
      <CardContent>
        {data.media_type === 'image' ? (
          <a href={data.hdurl} target="_blank" rel="noopener noreferrer">
            <img src={data.url} alt={data.title} className="rounded-lg w-full max-h-[70vh] object-contain cursor-pointer" />
          </a>
        ) : data.media_type === 'video' ? (
          <div className="aspect-w-16 aspect-h-9">
             <iframe
                src={data.url}
                title={data.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full rounded-lg"
                style={{ aspectRatio: '16 / 9' }}
            ></iframe>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-64 bg-slate-900/50 rounded-lg">
            <CameraOff className="h-16 w-16 text-purple-300 mb-4" />
            <p className="text-purple-200">Unsupported media type: {data.media_type}</p>
          </div>
        )}
        <p className="text-purple-200 mt-6 text-base leading-relaxed">{data.explanation}</p>
      </CardContent>
      <CardFooter className="flex justify-between items-center text-sm text-purple-300 p-6">
        <span>{data.date}</span>
        {data.copyright && <span>&copy; {data.copyright.trim()}</span>}
      </CardFooter>
    </Card>
  );
};

export default ApodSection;
