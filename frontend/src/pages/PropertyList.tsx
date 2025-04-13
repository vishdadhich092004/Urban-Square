import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Property, PropertyFilters, ApiResponse } from '../types';
import PropertyCard from '../components/properties/PropertyCard';
import PropertyFiltersComponent from '../components/properties/PropertyFilters';
import { FaSpinner, FaSadTear, FaHeart, FaRegHeart } from 'react-icons/fa';
import apiService from '../services/api';
import { useAuth } from '../context/AuthContext';

const PropertyList: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { isAuthenticated } = useAuth();

  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<Record<string, boolean>>({});
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
  });

  // Get initial filters from URL search params
  const getInitialFilters = (): PropertyFilters => {
    return {
      propertyType: searchParams.get('propertyType') || '',
      status: searchParams.get('status') || '',
      minPrice: searchParams.get('minPrice') ? Number(searchParams.get('minPrice')) : undefined,
      maxPrice: searchParams.get('maxPrice') ? Number(searchParams.get('maxPrice')) : undefined,
      bedrooms: searchParams.get('bedrooms') ? Number(searchParams.get('bedrooms')) : undefined,
      bathrooms: searchParams.get('bathrooms') ? Number(searchParams.get('bathrooms')) : undefined,
      city: searchParams.get('city') || '',
      state: searchParams.get('state') || '',
      furnished: searchParams.get('furnished') === 'true' ? true : undefined,
      parking: searchParams.get('parking') === 'true' ? true : undefined,
      page: searchParams.get('page') ? Number(searchParams.get('page')) : 1,
      limit: 9,
    };
  };

  const [filters, setFilters] = useState<PropertyFilters>(getInitialFilters());

  // Fetch properties based on filters
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setLoading(true);
        const response: ApiResponse<Property[]> = await apiService.properties.getAll(filters);

        if (response.success && response.data) {
          setProperties(response.data);

          // Update pagination info
          if (response.pagination) {
            setPagination({
              currentPage: response.pagination.page,
              totalPages: response.pagination.pages,
              totalItems: response.pagination.total,
            });
          }
        } else {
          setError(response.message || 'Failed to fetch properties');
        }
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError('An unknown error occurred');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, [filters]);

  // Fetch user's favorites if authenticated
  useEffect(() => {
    if (!isAuthenticated) return;

    const fetchFavorites = async () => {
      try {
        const response = await apiService.favorites.getAll();

        if (response.success && response.data) {
          const favoritesMap: Record<string, boolean> = {};
          response.data.forEach((favorite: any) => {
            const propertyId = typeof favorite.property === 'string'
              ? favorite.property
              : favorite.property._id;

            favoritesMap[propertyId] = true;
          });

          setFavorites(favoritesMap);
        }
      } catch (error) {
        console.error('Failed to fetch favorites:', error);
      }
    };

    fetchFavorites();
  }, [isAuthenticated]);

  // Update URL search params when filters change
  useEffect(() => {
    const params = new URLSearchParams();

    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== '' && key !== 'limit') {
        params.set(key, String(value));
      }
    });

    setSearchParams(params);
  }, [filters, setSearchParams]);

  // Handle filter changes
  const handleFilterChange = (newFilters: PropertyFilters) => {
    // Reset page to 1 when changing filters
    setFilters({ ...newFilters, page: 1 });
  };

  // Handle pagination
  const handlePageChange = (newPage: number) => {
    setFilters({ ...filters, page: newPage });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Toggle favorite
  const toggleFavorite = async (propertyId: string) => {
    if (!isAuthenticated) {
      // Redirect to login page or show login modal
      window.location.href = '/login';
      return;
    }

    try {
      if (favorites[propertyId]) {
        // Find the favorite to delete
        const response = await apiService.favorites.checkFavorite(propertyId);
        if (response.success && response.data) {
          await apiService.favorites.remove(response.data._id);
          setFavorites({ ...favorites, [propertyId]: false });
        }
      } else {
        await apiService.favorites.add(propertyId);
        setFavorites({ ...favorites, [propertyId]: true });
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Browse Properties</h1>

      {/* Filters */}
      <PropertyFiltersComponent
        initialFilters={filters}
        onFilterChange={handleFilterChange}
      />

      {/* Results */}
      {loading ? (
        <div className="flex justify-center items-center py-16">
          <FaSpinner className="animate-spin text-4xl text-primary-600" />
        </div>
      ) : error ? (
        <div className="bg-red-50 text-red-600 p-4 rounded-md text-center">
          <p className="flex items-center justify-center">
            <FaSadTear className="mr-2" />
            {error}
          </p>
        </div>
      ) : properties.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-md">
          <h3 className="text-lg font-medium text-gray-800 mb-2">No properties found</h3>
          <p className="text-gray-600">
            Try adjusting your search filters or check back later for new listings.
          </p>
        </div>
      ) : (
        <>
          {/* Properties count */}
          <div className="mb-4 text-gray-600">
            Showing {properties.length} of {pagination.totalItems} properties
          </div>

          {/* Property Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {properties.map((property) => (
              <PropertyCard
                key={property._id}
                property={property}
                isFavorite={!!favorites[property._id]}
                onToggleFavorite={toggleFavorite}
              />
            ))}
          </div>

          {/* Pagination */}
          {pagination.totalPages > 1 && (
            <div className="flex justify-center mt-8">
              <nav className="flex items-center rounded-md divide-x divide-gray-200">
                <button
                  onClick={() => handlePageChange(pagination.currentPage - 1)}
                  disabled={pagination.currentPage === 1}
                  className={`px-4 py-2 text-sm font-medium rounded-l-md ${
                    pagination.currentPage === 1
                      ? 'text-gray-400 cursor-not-allowed'
                      : 'text-primary-600 hover:bg-primary-50'
                  }`}
                >
                  Previous
                </button>

                {/* Page numbers */}
                {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`px-4 py-2 text-sm font-medium ${
                      pagination.currentPage === page
                        ? 'bg-primary-600 text-white hover:bg-primary-700'
                        : 'text-gray-500 hover:bg-gray-100'
                    }`}
                  >
                    {page}
                  </button>
                ))}

                <button
                  onClick={() => handlePageChange(pagination.currentPage + 1)}
                  disabled={pagination.currentPage === pagination.totalPages}
                  className={`px-4 py-2 text-sm font-medium rounded-r-md ${
                    pagination.currentPage === pagination.totalPages
                      ? 'text-gray-400 cursor-not-allowed'
                      : 'text-primary-600 hover:bg-primary-50'
                  }`}
                >
                  Next
                </button>
              </nav>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default PropertyList;
