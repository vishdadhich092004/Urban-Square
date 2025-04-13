import React, { useState } from 'react';
import { PropertyFilters as PropertyFiltersType } from '../../types';

interface PropertyFiltersProps {
  initialFilters: PropertyFiltersType;
  onFilterChange: (filters: PropertyFiltersType) => void;
}

const PropertyFilters: React.FC<PropertyFiltersProps> = ({ initialFilters, onFilterChange }) => {
  const [filters, setFilters] = useState<PropertyFiltersType>(initialFilters);
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;

    let parsedValue: string | number | boolean = value;

    // Handle different input types
    if (type === 'number') {
      parsedValue = value === '' ? undefined : Number(value);
    } else if (type === 'checkbox') {
      parsedValue = (e.target as HTMLInputElement).checked;
    }

    setFilters({
      ...filters,
      [name]: parsedValue,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onFilterChange(filters);
  };

  const handleReset = () => {
    const resetFilters: PropertyFiltersType = {
      status: '',
      propertyType: '',
      minPrice: undefined,
      maxPrice: undefined,
      bedrooms: undefined,
      bathrooms: undefined,
      city: '',
      state: '',
      furnished: undefined,
      parking: undefined,
    };

    setFilters(resetFilters);
    onFilterChange(resetFilters);
  };

  const toggleAdvancedFilters = () => {
    setIsAdvancedOpen(!isAdvancedOpen);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <h2 className="text-lg font-bold mb-4">Filter Properties</h2>

      <form onSubmit={handleSubmit}>
        {/* Basic Filters */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          {/* Status */}
          <div>
            <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
              Property Status
            </label>
            <select
              id="status"
              name="status"
              value={filters.status || ''}
              onChange={handleInputChange}
              className="input"
            >
              <option value="">All Status</option>
              <option value="for-sale">For Sale</option>
              <option value="for-rent">For Rent</option>
            </select>
          </div>

          {/* Property Type */}
          <div>
            <label htmlFor="propertyType" className="block text-sm font-medium text-gray-700 mb-1">
              Property Type
            </label>
            <select
              id="propertyType"
              name="propertyType"
              value={filters.propertyType || ''}
              onChange={handleInputChange}
              className="input"
            >
              <option value="">All Types</option>
              <option value="house">House</option>
              <option value="apartment">Apartment</option>
              <option value="condo">Condo</option>
              <option value="land">Land</option>
              <option value="commercial">Commercial</option>
            </select>
          </div>

          {/* Price Range */}
          <div>
            <label htmlFor="minPrice" className="block text-sm font-medium text-gray-700 mb-1">
              Min Price
            </label>
            <input
              type="number"
              id="minPrice"
              name="minPrice"
              value={filters.minPrice || ''}
              onChange={handleInputChange}
              placeholder="Any"
              className="input"
              min="0"
            />
          </div>

          <div>
            <label htmlFor="maxPrice" className="block text-sm font-medium text-gray-700 mb-1">
              Max Price
            </label>
            <input
              type="number"
              id="maxPrice"
              name="maxPrice"
              value={filters.maxPrice || ''}
              onChange={handleInputChange}
              placeholder="Any"
              className="input"
              min="0"
            />
          </div>
        </div>

        {/* Toggle Advanced Filters */}
        <button
          type="button"
          className="text-primary-600 text-sm font-medium flex items-center mb-4"
          onClick={toggleAdvancedFilters}
        >
          {isAdvancedOpen ? 'Hide' : 'Show'} Advanced Filters
          <svg
            className={`ml-1 w-4 h-4 transition-transform ${isAdvancedOpen ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
          </svg>
        </button>

        {/* Advanced Filters */}
        {isAdvancedOpen && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            {/* Bedrooms */}
            <div>
              <label htmlFor="bedrooms" className="block text-sm font-medium text-gray-700 mb-1">
                Bedrooms
              </label>
              <select
                id="bedrooms"
                name="bedrooms"
                value={filters.bedrooms || ''}
                onChange={handleInputChange}
                className="input"
              >
                <option value="">Any</option>
                <option value="1">1+</option>
                <option value="2">2+</option>
                <option value="3">3+</option>
                <option value="4">4+</option>
                <option value="5">5+</option>
              </select>
            </div>

            {/* Bathrooms */}
            <div>
              <label htmlFor="bathrooms" className="block text-sm font-medium text-gray-700 mb-1">
                Bathrooms
              </label>
              <select
                id="bathrooms"
                name="bathrooms"
                value={filters.bathrooms || ''}
                onChange={handleInputChange}
                className="input"
              >
                <option value="">Any</option>
                <option value="1">1+</option>
                <option value="2">2+</option>
                <option value="3">3+</option>
                <option value="4">4+</option>
              </select>
            </div>

            {/* City */}
            <div>
              <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                City
              </label>
              <input
                type="text"
                id="city"
                name="city"
                value={filters.city || ''}
                onChange={handleInputChange}
                placeholder="Any City"
                className="input"
              />
            </div>

            {/* State */}
            <div>
              <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
                State
              </label>
              <input
                type="text"
                id="state"
                name="state"
                value={filters.state || ''}
                onChange={handleInputChange}
                placeholder="Any State"
                className="input"
              />
            </div>

            {/* Features */}
            <div className="flex space-x-4 col-span-2">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="furnished"
                  name="furnished"
                  checked={!!filters.furnished}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                />
                <label htmlFor="furnished" className="ml-2 block text-sm text-gray-700">
                  Furnished
                </label>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="parking"
                  name="parking"
                  checked={!!filters.parking}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                />
                <label htmlFor="parking" className="ml-2 block text-sm text-gray-700">
                  Parking
                </label>
              </div>
            </div>
          </div>
        )}

        {/* Filter Actions */}
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
          <button
            type="submit"
            className="btn btn-primary flex-1"
          >
            Apply Filters
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="btn btn-secondary flex-1"
          >
            Reset Filters
          </button>
        </div>
      </form>
    </div>
  );
};

export default PropertyFilters;
