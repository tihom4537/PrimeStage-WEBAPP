import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { X } from 'lucide-react';


const SearchResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const artists = location.state?.artists || [];

  const formatSkills = (skills) => {
    return skills.split(',').join(', ');
  };

  const formatPrice = (price) => {
    return `₹${parseInt(price).toLocaleString()}`;
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="sticky top-0 bg-white border-b z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-light">Artists</h1>
          <button 
            onClick={() => navigate('/')}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
      </div>

      {/* Banner Image Section */}
      <div className="relative w-full h-96 overflow-hidden">
        <img
          src="/api/placeholder/1920/400"
          alt="Artists Banner"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
          <h2 className="text-4xl text-white font-light tracking-wide">
            Discover Amazing Artists
          </h2>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6 flex">
        {/* Filter Section (Left Sidebar) */}
        <div className="w-1/6 pr-8">
          <div className="sticky top-20">
            <h3 className="text-lg font-light mb-4">Filters</h3>

            {/* Pricing Filter */}
            <div className="mb-6">
              <h4 className="text-md font-light mb-2">Pricing</h4>
              <input
                type="range"
                min="0"
                max="10000"
                className="w-full"
              />
              <div className="flex justify-between text-sm text-gray-600">
                <span>₹0</span>
                <span>₹10,000</span>
              </div>
            </div>
            
            {/* Category Filter */}
            <div className="mb-6">
              <h4 className="text-md font-light mb-2">Category</h4>
              <select className="w-full p-2 border rounded">
                <option value="">All Categories</option>
                <option value="Singer">Singer</option>
                <option value="Instrumentalist">Instrumentalist</option>
                <option value="Dancer">Dancer</option>
                <option value="Chef">Chef</option>
                <option value="Magician">Magician</option>
                <option value="Sketch Artist">Sketch Artist</option>
                <option value="Stand-Up Comedian">Stand-Up Comedian</option>
                <option value="Anchor/MC">Anchor/MC</option>
                <option value="Kids Entertainer">Kids Entertainer</option>
                <option value="Photographer">Photographer</option>
              </select>
            </div>

            {/* Subcategory Filter */}
            <div className="mb-6">
              <h4 className="text-md font-light mb-2">Subcategory</h4>
              <select className="w-full p-2 border rounded">
                <option value="">All Subcategories</option>
                <option value="portrait">Portrait</option>
                <option value="landscape">Landscape</option>
                <option value="abstract">Abstract</option>
              </select>
            </div>

            {/* Location Filter */}
            <div className="mb-6">
              <h4 className="text-md font-light mb-2">Location</h4>
              <input
                type="text"
                placeholder="Enter location"
                className="w-full p-2 border rounded"
              />
            </div>

            {/* Apply Filters Button */}
            <button className="w-full bg-primary text-black py-2 rounded hover:bg-primary-dark">
              Apply Filters
            </button>
          </div>
        </div>

        {/* Results Section */}
        <div className="w-5/6">
          {/* Results Count */}
          <div className="mb-6">
            <p className="text-gray-600 font-light">
              {artists.length} {artists.length === 1 ? 'artist' : 'artists'} found
            </p>
          </div>

          {/* Results Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {artists.map((artist) => (
              <div key={artist.id} className="group bg-white cursor-pointer  rounded-lg shadow-sm hover:shadow-md transition-shadow"
              onClick={() => navigate(`/artists/${artist.id}`,{ state: { artist } })}>
                {/* Image Container */}
                <div className="relative w-full h-[375px] overflow-hidden mb-6">
                  <img
                    src={artist.profile_photo || "/api/placeholder/400/300"}
                    alt={artist.name}
                    className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      e.target.src = "/api/placeholder/400/300";
                    }}
                  />
                </div>

                {/* Artist Info */}
                <div className="space-y-2">
                  <h3 className="text-lg font-light tracking-wide">
                    {artist.name}
                  </h3>
                  <p className="text-gray-600 font-light">
                    {artist.skill_category}
                  </p>
                  <p className="text-sm text-gray-500 font-light">
                    {formatSkills(artist.skills)}
                  </p>
                  <p className="text-primary font-light">
                    {formatPrice(artist.price_per_hour)}/hr
                  </p>
                  {artist.average_rating && (
                    <div className="flex items-center">
                      <span className="text-yellow-500">★</span>
                      <span className="ml-1 font-light">{artist.average_rating}</span>
                    </div>
                  )}
                  <p className="text-sm text-gray-500 font-light">
                    {artist.address}
                  </p>
                </div>

                {/* Badges */}
                <div className="flex gap-2 mt-3">
                  {artist.booked_status === 1 && (
                    <span className="px-3 py-1 bg-gray-100 text-gray-600 text-sm font-light rounded-full">
                      Currently Booked
                    </span>
                  )}
                  {artist.featured === 1 && (
                    <span className="px-3 py-1 bg-primary bg-opacity-10 text-primary text-sm font-light rounded-full">
                      Featured Artist
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* No Results Message */}
          {artists.length === 0 && (
            <div className="text-center py-16">
              <h2 className="text-2xl font-light mb-4">No artists found</h2>
              <p className="text-gray-600 font-light">Try adjusting your search criteria</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchResults;