import React from "react";
import { Link } from "react-router-dom";
import { Property } from "../../types";
import {
  FaBed,
  FaBath,
  FaRulerCombined,
  FaMapMarkerAlt,
  FaHeart,
  FaRegHeart,
} from "react-icons/fa";

interface PropertyCardProps {
  property: Property;
  isFavorite?: boolean;
  onToggleFavorite?: (propertyId: string) => void;
}

const PropertyCard: React.FC<PropertyCardProps> = ({
  property,
  isFavorite = false,
  onToggleFavorite,
}) => {
  const {
    _id,
    title,
    price,
    location,
    features,
    propertyType,
    status,
    images,
  } = property;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(price);
  };

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onToggleFavorite) {
      onToggleFavorite(_id);
    }
  };

  return (
    <div className="card transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg">
      <div className="relative overflow-hidden">
        <Link to={`/properties/${_id}`}>
          <img
            src={
              images[0] || "https://via.placeholder.com/400x300?text=No+Image"
            }
            alt={title}
            className="h-52 w-full object-cover transition-transform duration-300 hover:scale-105"
          />
        </Link>

        {/* Status Badge */}
        <div className="absolute top-4 left-4">
          <span
            className={`text-xs font-bold px-2 py-1 rounded-md ${
              status === "for-sale"
                ? "bg-blue-600 text-white"
                : "bg-green-600 text-white"
            }`}
          >
            {status === "for-sale" ? "FOR SALE" : "FOR RENT"}
          </span>
        </div>

        {/* Property Type Badge */}
        <div className="absolute top-4 right-4">
          <span className="text-xs font-medium px-2 py-1 rounded-md bg-gray-800 bg-opacity-70 text-white">
            {propertyType.charAt(0).toUpperCase() + propertyType.slice(1)}
          </span>
        </div>

        {/* Favorite Button */}
        {onToggleFavorite && (
          <button
            onClick={handleFavoriteClick}
            className="absolute bottom-4 right-4 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition-colors duration-200"
            aria-label={
              isFavorite ? "Remove from favorites" : "Add to favorites"
            }
          >
            {isFavorite ? (
              <FaHeart className="text-red-500" size={18} />
            ) : (
              <FaRegHeart className="text-gray-600" size={18} />
            )}
          </button>
        )}
      </div>

      <div className="p-4">
        <Link to={`/properties/${_id}`} className="block">
          <h3 className="text-lg font-semibold mb-1 truncate hover:text-primary-600 transition-colors duration-200">
            {title}
          </h3>
        </Link>

        <div className="flex items-center text-gray-600 mb-2">
          <FaMapMarkerAlt className="mr-1 text-gray-400" />
          <p className="text-sm truncate">{`${location.city}, ${location.state}`}</p>
        </div>

        <p className="text-xl font-bold text-primary-600 mb-3">
          {formatPrice(price)}
          {status === "for-rent" && (
            <span className="text-sm text-gray-600 font-normal">/month</span>
          )}
        </p>

        <div className="flex justify-between text-sm text-gray-600 border-t pt-3">
          <div className="flex items-center">
            <FaBed className="mr-1" />
            <span>{features.bedrooms} Beds</span>
          </div>
          <div className="flex items-center">
            <FaBath className="mr-1" />
            <span>{features.bathrooms} Baths</span>
          </div>
          <div className="flex items-center">
            <FaRulerCombined className="mr-1" />
            <span>{features.area} sqft</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
