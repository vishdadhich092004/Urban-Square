import React, { useState } from "react";

interface SearchFormProps {
  onSearch: (query: string, propertyType: string, status: string) => void;
}

const SearchForm: React.FC<SearchFormProps> = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [propertyType, setPropertyType] = useState<string>("");
  const [status, setStatus] = useState<string>("");
  const [advancedSearch, setAdvancedSearch] = useState<boolean>(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery, propertyType, status);
  };

  return (
    <form
      onSubmit={handleSearch}
      className="bg-white/10 backdrop-blur-md p-6 rounded-xl shadow-2xl border border-white/20"
    >
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="md:col-span-2">
          <input
            type="text"
            placeholder="Enter city, address, or ZIP code"
            className="input bg-white/20 text-white placeholder-gray-300 border-0 focus:ring-2 focus:ring-primary-500 focus:bg-white/30"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div>
          <select
            className="input bg-white/20 text-white border-0 focus:ring-2 focus:ring-primary-500 focus:bg-white/30"
            value={propertyType}
            onChange={(e) => setPropertyType(e.target.value)}
          >
            <option value="" className="text-gray-800">
              Property Type
            </option>
            <option value="house" className="text-gray-800">
              House
            </option>
            <option value="apartment" className="text-gray-800">
              Apartment
            </option>
            <option value="condo" className="text-gray-800">
              Condo
            </option>
            <option value="land" className="text-gray-800">
              Land
            </option>
            <option value="commercial" className="text-gray-800">
              Commercial
            </option>
          </select>
        </div>
        <div>
          <select
            className="input bg-white/20 text-white border-0 focus:ring-2 focus:ring-primary-500 focus:bg-white/30"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="" className="text-gray-800">
              For Sale or Rent
            </option>
            <option value="for-sale" className="text-gray-800">
              For Sale
            </option>
            <option value="for-rent" className="text-gray-800">
              For Rent
            </option>
          </select>
        </div>
      </div>

      {advancedSearch && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          <div>
            <select className="input bg-white/20 text-white border-0 focus:ring-2 focus:ring-primary-500">
              <option value="" className="text-gray-800">
                Bedrooms
              </option>
              <option value="1" className="text-gray-800">
                1+
              </option>
              <option value="2" className="text-gray-800">
                2+
              </option>
              <option value="3" className="text-gray-800">
                3+
              </option>
              <option value="4" className="text-gray-800">
                4+
              </option>
              <option value="5" className="text-gray-800">
                5+
              </option>
            </select>
          </div>
          <div>
            <select className="input bg-white/20 text-white border-0 focus:ring-2 focus:ring-primary-500">
              <option value="" className="text-gray-800">
                Bathrooms
              </option>
              <option value="1" className="text-gray-800">
                1+
              </option>
              <option value="2" className="text-gray-800">
                2+
              </option>
              <option value="3" className="text-gray-800">
                3+
              </option>
              <option value="4" className="text-gray-800">
                4+
              </option>
            </select>
          </div>
          <div>
            <select className="input bg-white/20 text-white border-0 focus:ring-2 focus:ring-primary-500">
              <option value="" className="text-gray-800">
                Price Range
              </option>
              <option value="100000" className="text-gray-800">
                Under $100,000
              </option>
              <option value="200000" className="text-gray-800">
                Under $200,000
              </option>
              <option value="300000" className="text-gray-800">
                Under $300,000
              </option>
              <option value="500000" className="text-gray-800">
                Under $500,000
              </option>
              <option value="750000" className="text-gray-800">
                Under $750,000
              </option>
              <option value="1000000" className="text-gray-800">
                Under $1,000,000
              </option>
              <option value="any" className="text-gray-800">
                Any Price
              </option>
            </select>
          </div>
        </div>
      )}

      <div className="flex flex-col sm:flex-row justify-between items-center mt-4 gap-3">
        <button
          type="button"
          onClick={() => setAdvancedSearch(!advancedSearch)}
          className="text-sm text-gray-200 hover:text-white underline transition duration-200 w-full sm:w-auto text-center"
        >
          {advancedSearch ? "Simple Search" : "Advanced Search Options"}
        </button>

        <button
          type="submit"
          className="btn bg-primary-600 hover:bg-primary-700 text-white px-8 py-3 rounded-lg flex items-center justify-center transition-all duration-300 transform hover:scale-105 w-full sm:w-auto"
        >
          Search Properties
        </button>
      </div>
    </form>
  );
};

export default SearchForm;
