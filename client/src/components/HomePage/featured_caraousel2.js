import React, { useState, useEffect } from 'react';
import { ChevronRight } from 'lucide-react';

const FeaturedArtists2 = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-advance slides every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % featuredArtists.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const featuredArtists = [
    {
      id: 1,
      name: "Classical Ensemble",
      media: "/514f5c2e851363191bb1b020237eec7b.jpg",
      type: "image",
      category: "Orchestra"
    },
    {
      id: 2,
      name: "Jazz Quartet",
      media: "/7269180-uhd_3840_2160_25fps 2.mp4",
      type: "video",
      category: "Jazz"
    },
    {
      id: 3,
      name: "Modern Dance Trio",
      media: "/7266cfb4de074ef895d07206c66e16b3.jpg",
      type: "image",
      category: "Dance"
    },
    {
      id: 4,
      name: "Rock Band",
      media: "/rock-concert.mp4",
      type: "video",
      category: "Rock"
    },
    {
      id: 5,
      name: "Symphony Orchestra",
      media: "/2715fd5e2b75cf7ac53ba44d6abc4124.jpg",
      type: "image",
      category: "Classical"
    }
  ];

  const MediaContent = ({ artist }) => {
    if (artist.type === "video") {
      return (
        <video
          src={artist.media}
          alt={artist.name}
          className="w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
        />
      );
    }
    return (
      <img
        src={artist.media}
        alt={artist.name}
        className="w-full h-full object-cover"
      />
    );
  };

  return (
    <div className="pt-0">
      <div className="relative w-full aspect-[16/10] lg:aspect-[21/10] max-h-[85vh]">
        {featuredArtists.map((artist, index) => (
          <div
            key={artist.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              currentSlide === index ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
          >
            <MediaContent artist={artist} />
            <div className="absolute inset-0 bg-black bg-opacity-30">
              <div className="container mx-auto px-4 h-full flex items-center">
                <div className="text-white">
                  <h2 className="text-5xl font-light mb-4">{artist.name}</h2>
                  <p className="text-xl mb-8">{artist.category}</p>
                  <button className="bg-white text-black px-8 py-3 flex items-center space-x-2 hover:bg-gray-100 transition-colors">
                    <span>BOOK NOW</span>
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Navigation Dots */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {featuredArtists.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                currentSlide === i 
                  ? 'bg-white w-6' 
                  : 'bg-white/50 hover:bg-white/70'
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturedArtists2;