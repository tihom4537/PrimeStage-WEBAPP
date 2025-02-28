import React, { useState, useRef, useEffect } from 'react';
import { Star, Share2, Heart, MapPin, User, ChevronRight, Plus, Calendar, Check } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import PhoneAuthModal from './PhoneAuthModel';
import { useAuth } from '../context/AuthContext';
import Footer from './HomePage/footer';
import Header from './HomePage/Header';

const ArtistShowcase = () => {
  const [activeTab, setActiveTab] = useState('gallery');
  const [selectedImage, setSelectedImage] = useState(0);
  const locationData = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const artist = locationData.state?.artist;
  const { user } = useAuth();
  const navigate = useNavigate();
  const [scrollProgress, setScrollProgress] = useState(0);

  // Sample rating data (replace with actual data)
  const ratingData = {
    averageRating: artist.average_rating || 4.5,
    totalReviews: 127,
    ratingDistribution: {
      5: 0.65,
      4: 0.20,
      3: 0.10,
      2: 0.03,
      1: 0.02,
    },
  };

   // Add scroll event listener to track scroll progress for the Header
 useEffect(() => {
  const handleScroll = () => {
    const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
    const currentScroll = window.scrollY;
    const progress = currentScroll / totalScroll;
    setScrollProgress(progress);
  };
  
  window.addEventListener('scroll', handleScroll);
  return () => window.removeEventListener('scroll', handleScroll);
}, []);

  const handleBookNowClick = () => {
    if (user) {
      // If user is logged in, navigate directly to booking page
      navigate('/artists/booking', {
        state: {
          artist,
          user,
        },
      });
    } else {
      // If user is not logged in, show the auth modal
      setShowAuthModal(true);
    }
  };

  // Simulate loading state
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setIsLoading(false);
      } catch (err) {
        setError('Failed to load reviews');
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const [expandedFaq, setExpandedFaq] = useState(null);

  const toggleFaq = (index) => {
    if (expandedFaq === index) {
      setExpandedFaq(null);
    } else {
      setExpandedFaq(index);
    }
  };

  // FAQ Data
  const faqs = [
    {
      question: 'All about Live101.',
      answer: 'Detailed information about Live101 services and platform...',
    },
    {
      question: 'All about Pre booking.',
      answer: 'Information about the pre-booking process...',
    },
    {
      question: 'All about post booking.',
      answer: 'Details about what happens after booking...',
    },
  ];

  // Refs for scroll functionality
  const galleryRef = useRef(null);
  const aboutRef = useRef(null);

  if (!artist) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Artist information not found</p>
      </div>
    );
  }

  const formatPrice = (price) => {
    return `₹${parseFloat(price).toLocaleString('en-IN')}`;
  };

  const formatSkills = (skills) => {
    return skills?.split(',').join(' • ');
  };

  const images = [artist.profile_photo, artist.image1, artist.image2].filter(Boolean);

  const videos = [artist.video1, artist.video2, artist.video3, artist.video4].filter(Boolean);

  // Event types for displaying tags
  const eventTypes = [
    'Private Event',
    'House Party',
    'Cafes & Lounges',
    'Hotels & Villas',
    'Wedding',
    'Corporate Event',
    'Social Event',
    'Virtual Event',
  ];



  // Scroll to section handler
  const scrollToSection = (section) => {
    setActiveTab(section);
    const ref = section === 'gallery' ? galleryRef : aboutRef;
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    
    <div className="bg-white min-h-screen">
       <Header scrollProgress={scrollProgress} />
      {/* Breadcrumb */}
      {/* <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center gap-2 text-sm">
          <span>Home</span>
          <ChevronRight className="w-4 h-4" />
          <span>{artist.skill_category}</span>
          <ChevronRight className="w-4 h-4" />
          <span>{artist.name}</span>
        </div>
      </div> */}

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 py-6 pt-16">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Image Section */}
          <div className="lg:w-3/5 h-[70vh] rounded-lg overflow-hidden">
            <img
              src={artist.profile_photo}
              alt={artist.name}
              className="w-[700px] h-[500px] object-cover rounded-lg"
              style={{ objectFit: 'cover', borderRadius: '10px' }}
            />
          </div>

          <div className="lg:w-[520px] h-auto bg-white p-6 rounded-2xl shadow-lg">
            <div className="space-y-5">
              {/* Artist Name and Icon */}
              <div className="flex justify-between items-start">
                <h1 className="text-3xl font-bold">{artist.name}</h1>
                {artist.featured === 1 && (
                  <span className="inline-block">
                    <img src="/api/placeholder/24/24" alt="verified" className="w-6 h-6" />
                  </span>
                )}
                <div className="flex gap-2">
                  <Heart className="w-6 h-6" />
                  <Share2 className="w-6 h-6" />
                </div>
              </div>
              {/* Rating */}
              {artist.average_rating && (
                <div className="flex items-center gap-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${
                          i < artist.average_rating
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">
                    {artist.average_rating} / 5
                  </span>
                </div>
              )}


              {/* Price Per Hour */}
              <div className="text-lg font-semibold text-gray-800">
                <span>Rate:</span> {formatPrice(artist.price_per_hour)} / hour
              </div>

              {/* Artist Subheading: Skill Category */}
              <div className="flex items-center gap-2 text-base font-medium text-gray-700">
                <User className="w-5 h-5 text-red-600" />
                <span>Category:</span>
                <span className="font-normal text-gray-600">{artist.skill_category}</span>
              </div>

              {/* Artist Location */}
              <div className="flex items-center gap-2 text-base font-medium text-gray-700">
                <MapPin className="w-5 h-5 text-red-600" />
                <span>Location:</span>
                <span className="font-normal text-gray-600">{artist.address}</span>
              </div>

              

              {/* Experience */}
              <div className="flex items-center gap-2 text-base font-medium text-gray-700">
                <User className="w-5 h-5 text-red-600" />
                <span>Experience:</span>
                <span className="font-normal text-gray-600">{artist.about_yourself}</span>
              </div>

              {/* No. of Past Bookings */}
              <div className="flex items-center gap-2 text-base font-medium text-gray-700">
                <Calendar className="w-5 h-5 text-red-600" />
                <span>No. of Past Bookings:</span>
                <span className="font-normal text-gray-600">{artist.no_of_bookings}</span>
              </div>

              {/* Skills */}
              <div className="text-sm text-gray-600">
                <span className="font-medium">Skills:</span>
                <div className="flex flex-wrap gap-2 mt-2">
                  {artist.skills?.split(',').map((skill, index) => (
                    <div
                      key={index}
                      className="px-4 py-1 bg-pink-100 text-pink-800 rounded-full text-sm">
                      {skill.trim()}
                    </div>
                  ))}
                </div>
              </div>

              {/* Buttons */}
              <div className="flex gap-2 pt-4">
                <button
                  onClick={handleBookNowClick}
                  className="flex-1 px-6 py-2 bg-red-600 text-white rounded-2xl hover:bg-red-700">
                  Book Now
                </button>
              </div>

              {/* Phone Authentication Modal */}
              {showAuthModal && (
                <PhoneAuthModal artist={artist} onClose={() => setShowAuthModal(false)} />
              )}
            </div>
          </div>
        </div>
      </div>

     {/* Message for the Host Section */}
<div className="pt-5 max-w-7xl mx-auto px-4">
  <h2 className="text-2xl font-bold mb-4">Message for the Host</h2>
  <div className="bg-white text-gray-800 p-4 rounded-2xl border border-gray-400">
    <p className="text-lg">
      {/* Message content goes here */}
      Looking forward to the event!
    </p>
  </div>
</div>



      {/* Gallery Section */}
      <div ref={galleryRef} className="py-14 max-w-7xl mx-auto px-4">
        <h2 className="text-2xl font-bold mb-4">Gallery</h2>
        <div className="grid grid-cols-3 gap-4">
          {images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Artist image ${index + 1}`}
              className={`cursor-pointer w-full h-64 object-cover rounded-2xl ${
                selectedImage === index ? 'border-4 border-red-600' : ''
              }`}
              onClick={() => setSelectedImage(index)}
            />
          ))}
        </div>
      </div>

      {/* Video Carousel Section */}
      <div className=" max-w-7xl mx-auto px-4 pb-4">
        <h2 className="text-2xl font-bold mb-4">Videos</h2>
        <div className="grid grid-cols-4 gap-4">
          {videos.map((video, index) => (
            <div key={index} className="rounded-lg overflow-hidden">
              <video
                controls
                className="w-full h-64 object-cover rounded-2xl"
              >
                <source src={video} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          ))}
        </div>
      </div>

      {/* Reviews Section */}
<div className="py-12 max-w-7xl mx-auto px-4">
  <h2 className="text-2xl font-bold mb-4">Reviews</h2>
  <div className="space-y-4">
    {isLoading ? (
      <p>Loading reviews...</p>
    ) : error ? (
      <p className="text-red-500">{error}</p>
    ) : (
      <div className="bg-white shadow-xl rounded-2xl p-6">
        {/* Ratings summary */}
        <div className="flex items-center gap-4">
          <div className="text-5xl font-bold text-gray-900">
            {ratingData.averageRating}
            <span className="text-lg text-gray-500"> / 5</span>
          </div>
          <div className="text-gray-700 text-lg">
            Based on {ratingData.totalReviews} reviews
          </div>
        </div>

        {/* Rating breakdown */}
        <div className="mt-6 space-y-3">
          {Object.keys(ratingData.ratingDistribution).map((rating) => (
            <div key={rating} className="flex items-center gap-3">
              <div className="w-1/6 text-right text-gray-700 font-medium">{rating} ⭐</div>
              <div className="w-3/6 bg-gray-200 h-4 rounded-full overflow-hidden">
                <div
                  className="h-4 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-600"
                  style={{
                    width: `${ratingData.ratingDistribution[rating] * 100}%`,
                  }}></div>
              </div>
              <div className="w-1/6 text-gray-700 font-medium">
                {(ratingData.ratingDistribution[rating] * 100).toFixed(1)}%
              </div>
            </div>
          ))}
        </div>

        {/* See All Reviews Button */}
        <div className="mt-6 flex justify-center">
          <button className="px-6 py-2 border border-black rounded-full text-black bg-white hover:bg-gray-100 transition">
            See All Reviews
          </button>
        </div>
      </div>
    )}
  </div>
</div>
{/* Buttons */}
<div className="flex gap-2 pt-4">
  <button
    onClick={handleBookNowClick}
    className="flex-1 px-14 py-3 bg-red-600 text-white rounded-2xl hover:bg-red-700 text-lg">
    Book Now
  </button>
</div>

{/* Phone Authentication Modal */}
{showAuthModal && (
  <PhoneAuthModal artist={artist} onClose={() => setShowAuthModal(false)} />
)}
      {/* FAQs Section */}
      <div className="py-12 max-w-7xl mx-auto px-4">
        <h2 className="text-2xl font-bold mb-4">FAQs</h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="border rounded-2xl p-4 bg-white">
              <button
                onClick={() => toggleFaq(index)}
                className="flex justify-between w-full text-left text-gray-700 font-medium">
                <span>{faq.question}</span>
                <Plus className="w-5 h-5" />
              </button>
              {expandedFaq === index && (
                <div className="mt-2 text-gray-600">
                  <p>{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default ArtistShowcase;