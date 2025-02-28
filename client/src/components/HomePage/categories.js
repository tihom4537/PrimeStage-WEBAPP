import React, { useState, useEffect } from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';

const FeaturedCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    const fetchCategories = async () => {
        try {
          const response = await fetch('http://localhost:8000/api/artists', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',  // ✅ Added Content-Type header
            },
          });
      
          if (!response.ok) {
            throw new Error('Failed to fetch categories');
          }
      
          const data = await response.json();
          console.log(data);
          setCategories(data);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };
      
    fetchCategories();
  }, []);

  // Calculate pagination values
  const totalPages = Math.ceil(categories.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentCategories = categories.slice(startIndex, endIndex);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    // Scroll to top of the categories section smoothly
    document.getElementById('categories-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-normal mb-8">CATEGORIES</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6].map((skeleton) => (
            <div key={skeleton} className="animate-pulse">
              <div className="bg-gray-200 h-64 rounded-lg"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="text-red-500">Error: {error}</div>
      </div>
    );
  }

  return (
    <div id="categories-section" className="container mx-auto px-4 py-16">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold">CATEGORIES</h2>
        <div className="text-sm text-gray-600">
          Showing {startIndex + 1}-{Math.min(endIndex, categories.length)} of {categories.length}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {currentCategories.map((category) => (
          <div 
            key={category.id} 
            className="relative group cursor-pointer"
          >
            <div className="aspect-w-16 aspect-h-9">
              <img
                src={category.item_data}
                alt={category.item_name}
                className="w-full h-64 object-cover rounded-lg"
                onError={(e) => {
                //   e.target.src = '/api/placeholder/600/400';
                  e.target.alt = 'Placeholder';
                }}
              />
            </div>
            <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-30 transition-all rounded-lg">
              <div className="absolute bottom-8 left-8">
                <h3 className="text-white text-2xl font-light">{category.item_name}</h3>
                <button className="text-white flex items-center space-x-2 mt-2">
                  <span>Discover</span>
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="mt-8 flex justify-center items-center space-x-4">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="p-2 rounded-full hover:bg-gray-100 disabled:opacity-50 disabled:hover:bg-transparent"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          
          <div className="flex space-x-2">
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index + 1}
                onClick={() => handlePageChange(index + 1)}
                className={`px-4 py-2 rounded-lg ${
                  currentPage === index + 1
                    ? 'bg-black text-white'
                    : 'hover:bg-gray-100'
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="p-2 rounded-full hover:bg-gray-100 disabled:opacity-50 disabled:hover:bg-transparent"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      )}
    </div>
  );
};

export default FeaturedCategories;