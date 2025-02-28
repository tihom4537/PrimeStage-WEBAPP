// HeroSection.jsx
import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import * as AlertDialog from "@radix-ui/react-alert-dialog";

// Add this CSS to your global.css or styles.css
// `
// @keyframes slideUp {
//   0% {
//     transform: translateY(100%);
//     opacity: 0;
//   }
//   100% {
//     transform: translateY(0);
//     opacity: 1;
//   }
// }

// .transition-transform {
//   transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
// }
// `

const cities = [
  { name: 'Chandigarh', lat: 30.7333, lng: 76.7794 },
  { name: 'Mohali', lat: 30.7046, lng: 76.7179 },
  { name: 'Kharar', lat: 30.7460, lng: 76.6454 }
];

const SearchPlaceholder = () => {
  const terms = ['SINGER', 'DANCER', 'DJ', 'BANDS'];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [animationState, setAnimationState] = useState('idle');

  useEffect(() => {
    const animationCycle = () => {
      // Start the animation
      setAnimationState('animating');

      // After the animation completes, set to idle
      setTimeout(() => {
        setAnimationState('idle');
        setCurrentIndex((prev) => (prev + 1) % terms.length);
      }, 500); // Match the duration of slideUpFadeOut
    };

    const interval = setInterval(animationCycle, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center">
      <span className="mr-1">Search</span>
      <span className="ml-1">For</span>
      <div className="relative w-24 h-8 overflow-hidden flex items-center">
        {/* Current word */}
        <div
          className={`absolute w-full text-center ${
            animationState === 'animating' ? 'animate-slideUpFadeOut' : ''
          }`}
        >
          {terms[currentIndex]}
        </div>

        {/* Next word */}
        <div
          className={`absolute w-full text-center ${
            animationState === 'animating' ? 'animate-slideUpFadeIn' : 'opacity-0'
          }`}
        >
          {terms[(currentIndex + 1) % terms.length]}
        </div>
      </div>
    </div>
  );
};
const HeroSection = ({ mainLogoStyles }) => {
  const [showCityDialog, setShowCityDialog] = useState(false);
  const [selectedCity, setSelectedCity] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [artists, setArtists] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSearch = async () => {
    if (!selectedCity) {
      setShowCityDialog(true);
      return;
    }

    if (!searchTerm.trim()) {
      setError('Please enter a search term');
      return;
    }

    try {
      const response = await fetch('http://localhost:8000/api/search/fetch-artists', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          lat: selectedCity.lat,
          lng: selectedCity.lng,
          skill: searchTerm
        })
      });

      if (!response.ok) {
        throw new Error('Failed to fetch artists');
      }

      const data = await response.json();
      setArtists(data);
      navigate('/search', { state: { artists: data } });
    } catch (err) {
      setError(err.message);
      console.error('Error fetching artists:', err);
    }
  };

  const handleCitySelect = (city) => {
    setSelectedCity(city);
    setShowCityDialog(false);
  };

  return (
    <div className="relative h-[90vh] w-full overflow-hidden">
      <video 
        autoPlay 
        loop 
        muted 
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover"
      >
        <source src="/7804233-hd_1920_1080_25fps.mp4" type="video/mp4" />
      </video>
      
      <div className="absolute inset-0 bg-black bg-opacity-40">
        <div className="container mx-auto px-4 h-full flex flex-col items-center justify-center">
          <h1 
            className="w-screen font-light text-white pointer-events-none text-center"
            style={mainLogoStyles}
          >
            PRIMESTAGE
          </h1>
          
          <div className="w-full max-w-3xl mt-32">
            <div className="relative mt-48">
              <div className="flex items-center mb-4">
                <button
                  onClick={() => setShowCityDialog(true)}
                  className="px-4 py-2 bg-white bg-opacity-90 text-gray-600 mr-2 rounded-full"
                >
                  {selectedCity ? selectedCity.name : 'Select City'}
                </button>
                {error && <p className="text-red-500 text-sm">{error}</p>}
              </div>
              
              <div className="relative">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder=""
                  className="w-full px-6 py-4 bg-white bg-opacity-90 text-xl placeholder-gray-600 focus:outline-none rounded-full"
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                />
                {!searchTerm && (
                  <div className="absolute left-6 top-1/2 transform -translate-y-1/2 text-gray-600 text-xl pointer-events-none">
                    <SearchPlaceholder />
                  </div>
                )}
                <button
                  onClick={handleSearch}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 hover:bg-gray-100 rounded-full"
                >
                  <Search className="h-6 w-6 text-gray-600" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <AlertDialog.Root open={showCityDialog} onOpenChange={setShowCityDialog}>
        <AlertDialog.Portal>
          <AlertDialog.Overlay className="fixed inset-0 bg-black bg-opacity-50" />
          <AlertDialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-lg w-96">
            <AlertDialog.Title className="text-lg font-semibold">Select your city</AlertDialog.Title>
            <div className="grid gap-2 mt-4">
              {cities.map((city) => (
                <button
                  key={city.name}
                  onClick={() => handleCitySelect(city)}
                  className="w-full px-4 py-2 text-left hover:bg-gray-100 rounded"
                >
                  {city.name}
                </button>
              ))}
            </div>
            <AlertDialog.Action asChild>
              <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Close</button>
            </AlertDialog.Action>
          </AlertDialog.Content>
        </AlertDialog.Portal>
      </AlertDialog.Root>
    </div>
  );
};

export default HeroSection;