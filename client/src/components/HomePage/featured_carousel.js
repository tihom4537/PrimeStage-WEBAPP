import React, { useState, useEffect } from 'react';
import { ChevronRight } from 'lucide-react';

const FeaturedArtists = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const featuredArtists = [
    {
      id: 1,
      name: "Classical Ensemble",
      media: {
        type: "image",
        url: "/0091cab0989eb9eb56ae106b3d5e4181.jpg"
      },
      category: "Orchestra"
    },
    {
      id: 2,
      name: "Jazz Quartet",
      media: {
        type: "video",
        url: "/4142313-hd_1920_1080_30fps.mp4",
        thumbnail: "/0bf603f59a6490c63f3ccdaf04528864.jpg"
      },
      category: "Jazz"
    },
    {
      id: 3,
      name: "Modern Dance Trio",
      media: {
        type: "image",
        url: "/pexels-yankrukov-9002001.jpg"
      },
      category: "Dance"
    },
    {
      id: 4,
      name: "Rock Band",
      media: {
        type: "image",
        url: "/music-of-dhwani-1.jpg"
      },
      category: "Rock"
    },
    {
      id: 5,
      name: "DJ Performance",
      media: {
        type: "video",
        url: "/5390401-uhd_3840_2160_30fps.mp4",
        thumbnail: "/images-2.jpeg"
      },
      category: "Electronic"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % featuredArtists.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const MediaContent = ({ media, name }) => {
    if (media.type === "video") {
      return (
        <div className="relative w-full h-full">
          <video
            className="w-full h-full object-cover"
            autoPlay
            loop
            muted
            playsInline
            poster={media.thumbnail}
          >
            <source src={media.url} type="video/mp4" />
            <img 
              src={media.thumbnail} 
              alt={name} 
              className="w-full h-full object-cover"
            />
          </video>
        </div>
      );
    }

    return (
      <img
        src={media.url}
        alt={name}
        className="w-full h-full object-cover"
      />
    );
  };

  return (
    <div className="pt-16">
      <div className="relative w-full aspect-[16/10] lg:aspect-[21/10] max-h-[85vh]">
        {featuredArtists.map((artist, index) => (
          <div
            key={artist.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              currentSlide === index ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <MediaContent media={artist.media} name={artist.name} />
            
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/30">
              <div className="container mx-auto px-4 h-full flex items-center">
                <div className="text-white max-w-xl">
                  <h2 className="text-5xl font-light mb-4 tracking-wide">
                    {artist.name}
                  </h2>
                  <p className="text-xl mb-8 opacity-90">
                    {artist.category}
                  </p>
                  <button className="bg-white text-black px-8 py-3 flex items-center space-x-2 hover:bg-gray-100 transition-colors duration-300 rounded-sm">
                    <span className="font-medium">BOOK NOW</span>
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>

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
        ))}
      </div>
    </div>
  );
};

export default FeaturedArtists;