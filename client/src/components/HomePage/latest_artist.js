import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import { Loader2 } from 'lucide-react';
import { Alert, AlertDescription } from '../ui/alert';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const LatestArtists = () => {
  const [artists, setArtists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArtists = async () => {
      try {
        const lat = 30.75;
        const lng = 76.78;
        const response = await fetch(`http://localhost:8000/api/search/featured?lat=${lat}&lng=${lng}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch artists');
        }
        
        const data = await response.json();
        setArtists(data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching artists:', err);
        setError('Failed to load featured artists');
        setLoading(false);
      }
    };

    fetchArtists();
  }, []);

  if (loading) {
    return (
      <div className="bg-gray-100 py-16">
        <div className="container mx-auto px-1 flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <span className="ml-2 text-gray-600">Loading featured artists...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gray-100 py-16">
        <div className="container mx-auto px-1">
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 py-16">
      
        <h2 className="text-3xl font-normal mb-8 text-center text-gray-800">
          MASTER PERFORMERS
        </h2>
        <div className="container ml-10 ">
        
        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={24}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          breakpoints={{
            640: {
              slidesPerView: 1.5,
            },
            1024: {
              slidesPerView: 3.5,
            },
            1280: {
              slidesPerView: 4.20,
            },
          }}
          className="pl-4 "
        >
          {artists.map((artist) => (
            <SwiperSlide key={artist.id} className="pb-8 pt-2 ">
              <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden">
                <div className="relative aspect-square">
                  <img
                    src={artist.profile_photo || '/api/placeholder/400/400'}
                    alt={artist.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = '/api/placeholder/400/400';
                    }}
                  />
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {artist.name}
                  </h3>
                  <p className="text-gray-600 mb-2">{artist.skill_category}</p>
                  
                  <div className="flex justify-between items-center">
                    <p className="text-primary font-medium">
                      Price: {artist.price_per_hour}/hr
                    </p>
                    {artist.average_rating && (
                      <div className="flex items-center bg-gray-50 px-3 py-1 rounded-full">
                        <span className="text-yellow-500">★</span>
                        <span className="ml-1 font-medium">
                          {artist.average_rating}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {artists.length === 0 && (
          <div className="text-center mt-8">
            <p className="text-gray-500 text-lg">
              No featured artists available in this region.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LatestArtists;