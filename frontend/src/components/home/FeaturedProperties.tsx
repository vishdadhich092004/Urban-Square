import React from "react";
import { Link } from "react-router-dom";
import PropertyCard from "../properties/PropertyCard";
import { Property } from "../../types";
import { FaArrowRight, FaSpinner } from "react-icons/fa";

interface FeaturedPropertiesProps {
  properties: Property[];
  loading: boolean;
}

const FeaturedProperties: React.FC<FeaturedPropertiesProps> = ({
  properties,
  loading,
}) => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
              Featured Properties
            </h2>
            <div className="w-20 h-1 bg-primary-600"></div>
            <p className="text-gray-600 mt-4 max-w-2xl">
              Explore our handpicked selection of premium properties available
              for sale and rent
            </p>
          </div>
          <Link
            to="/properties"
            className="mt-6 md:mt-0 group flex items-center text-primary-600 font-medium hover:text-primary-700 transition-colors duration-300"
          >
            View All Properties
            <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <FaSpinner className="animate-spin text-primary-600 text-4xl" />
          </div>
        ) : properties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {properties.map((property) => (
              <PropertyCard key={property._id} property={property} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-gray-50 rounded-lg border border-gray-100">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-16 w-16 text-gray-400 mx-auto mb-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
              />
            </svg>
            <p className="text-xl text-gray-600 mb-2">
              No featured properties found
            </p>
            <p className="text-gray-500 mb-6">
              Check back soon or browse our other available properties
            </p>
            <Link
              to="/properties"
              className="btn bg-primary-600 hover:bg-primary-700 text-white py-2 px-6 rounded-md inline-flex items-center transition-all duration-300"
            >
              Browse All Properties <FaArrowRight className="ml-2" />
            </Link>
          </div>
        )}

        {properties.length > 0 && (
          <div className="text-center mt-12">
            <Link
              to="/properties"
              className="btn bg-primary-600 hover:bg-primary-700 text-white py-3 px-8 rounded-md inline-flex items-center shadow-md hover:shadow-lg transition-all duration-300"
            >
              Browse All Properties <FaArrowRight className="ml-2" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedProperties;
