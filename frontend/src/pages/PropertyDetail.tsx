import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  FaBed, FaBath, FaRulerCombined, FaParking, FaCouch,
  FaCalendarAlt, FaHeart, FaRegHeart, FaPhoneAlt, FaEnvelope,
  FaMapMarkerAlt, FaSpinner, FaAngleLeft, FaHome, FaAngleRight
} from 'react-icons/fa';
import { Property } from '../types';
import apiService from '../services/api';
import { useAuth } from '../context/AuthContext';

const PropertyDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);
  const [showContactForm, setShowContactForm] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');
  const [showScheduleForm, setShowScheduleForm] = useState<boolean>(false);
  const [scheduleDate, setScheduleDate] = useState<string>('');
  const [scheduleTime, setScheduleTime] = useState<string>('');

  // Fetch property details
  useEffect(() => {
    const fetchPropertyDetails = async () => {
      if (!id) return;

      try {
        setLoading(true);
        const response = await apiService.properties.getById(id);

        if (response.success && response.data) {
          setProperty(response.data);
        } else {
          setError(response.message || 'Failed to fetch property details');
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

    fetchPropertyDetails();
  }, [id]);

  // Check if property is in favorites
  useEffect(() => {
    if (!isAuthenticated || !id) return;

    const checkFavorite = async () => {
      try {
        const response = await apiService.favorites.checkFavorite(id);
        if (response.success) {
          setIsFavorite(response.isFavorite);
        }
      } catch (error) {
        console.error('Error checking favorite status:', error);
      }
    };

    checkFavorite();
  }, [id, isAuthenticated]);

  // Format price
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(price);
  };

  // Toggle favorite
  const toggleFavorite = async () => {
    if (!isAuthenticated || !id) {
      navigate('/login');
      return;
    }

    try {
      if (isFavorite) {
        // Remove from favorites
        const response = await apiService.favorites.checkFavorite(id);
        if (response.success && response.data) {
          await apiService.favorites.remove(response.data._id);
          setIsFavorite(false);
        }
      } else {
        // Add to favorites
        await apiService.favorites.add(id);
        setIsFavorite(true);
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  };

  // Handle contact form submit
  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    // You would typically send a message to the property owner here
    // For now, we'll just show a success message
    alert('Your message has been sent to the property owner!');
    setMessage('');
    setShowContactForm(false);
  };

  // Handle schedule form submit
  const handleScheduleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isAuthenticated || !id || !property) {
      navigate('/login');
      return;
    }

    try {
      // Create appointment
      const appointmentData = {
        propertyId: id,
        date: scheduleDate,
        time: scheduleTime,
        message: `I would like to schedule a visit for ${scheduleDate} at ${scheduleTime}.`,
      };

      const response = await apiService.appointments.create(appointmentData);

      if (response.success) {
        alert('Your visit has been scheduled! The property owner will contact you to confirm.');
        setScheduleDate('');
        setScheduleTime('');
        setShowScheduleForm(false);
      } else {
        alert(response.message || 'Failed to schedule visit. Please try again.');
      }
    } catch (error) {
      console.error('Error scheduling visit:', error);
      alert('An error occurred while scheduling your visit. Please try again.');
    }
  };

  // Navigate to previous image
  const prevImage = () => {
    if (!property) return;
    setActiveImageIndex((prev) => (prev === 0 ? property.images.length - 1 : prev - 1));
  };

  // Navigate to next image
  const nextImage = () => {
    if (!property) return;
    setActiveImageIndex((prev) => (prev === property.images.length - 1 ? 0 : prev + 1));
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16 flex justify-center">
        <FaSpinner className="animate-spin text-4xl text-primary-600" />
      </div>
    );
  }

  if (error || !property) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-50 text-red-600 p-4 rounded-md">
          <p>{error || 'Property not found'}</p>
          <Link to="/properties" className="text-primary-600 font-medium hover:underline mt-2 block">
            Back to Properties
          </Link>
        </div>
      </div>
    );
  }

  // Destructure property for easier access
  const {
    title, description, propertyType, status, price,
    location, features, amenities, images, owner
  } = property;

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="flex items-center text-sm text-gray-500 mb-6">
        <Link to="/" className="hover:text-primary-600">
          <FaHome className="inline mr-1" /> Home
        </Link>
        <span className="mx-2">/</span>
        <Link to="/properties" className="hover:text-primary-600">
          Properties
        </Link>
        <span className="mx-2">/</span>
        <span className="text-gray-700">{title}</span>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Main Content */}
        <div className="lg:w-2/3">
          {/* Image Gallery */}
          <div className="relative mb-6 bg-gray-100 rounded-lg overflow-hidden">
            <div className="aspect-w-16 aspect-h-9 relative">
              <img
                src={images[activeImageIndex] || 'https://via.placeholder.com/800x600?text=No+Image'}
                alt={title}
                className="object-cover w-full h-full"
              />

              {/* Navigation Arrows */}
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70"
              >
                <FaAngleLeft />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70"
              >
                <FaAngleRight />
              </button>

              {/* Image Counter */}
              <div className="absolute bottom-4 right-4 bg-black bg-opacity-60 text-white px-3 py-1 rounded-full text-sm">
                {activeImageIndex + 1} / {images.length}
              </div>
            </div>

            {/* Thumbnails */}
            {images.length > 1 && (
              <div className="flex overflow-x-auto space-x-2 p-2">
                {images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveImageIndex(index)}
                    className={`flex-shrink-0 w-20 h-20 ${
                      index === activeImageIndex ? 'ring-2 ring-primary-500' : 'opacity-70'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${title} - Image ${index + 1}`}
                      className="object-cover w-full h-full rounded"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Property Info */}
          <div className="mb-8">
            <div className="flex justify-between items-start mb-4">
              <div>
                <div className="flex items-center space-x-2 mb-1">
                  <span className={`text-xs font-bold px-2 py-1 rounded-md ${
                    status === 'for-sale' ? 'bg-blue-600 text-white' : 'bg-green-600 text-white'
                  }`}>
                    {status === 'for-sale' ? 'FOR SALE' : 'FOR RENT'}
                  </span>
                  <span className="text-xs font-medium px-2 py-1 rounded-md bg-gray-200 text-gray-800">
                    {propertyType.charAt(0).toUpperCase() + propertyType.slice(1)}
                  </span>
                </div>
                <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
                <div className="flex items-center mt-2 text-gray-600">
                  <FaMapMarkerAlt className="mr-1" />
                  <span>{`${location.address}, ${location.city}, ${location.state}, ${location.zipCode}`}</span>
                </div>
              </div>
              <div className="text-right">
                <p className="text-3xl font-bold text-primary-600">
                  {formatPrice(price)}
                  {status === 'for-rent' && <span className="text-sm text-gray-600 font-normal">/month</span>}
                </p>
                <button
                  onClick={toggleFavorite}
                  className="mt-2 flex items-center text-gray-700 hover:text-primary-600"
                >
                  {isFavorite ? (
                    <>
                      <FaHeart className="text-red-500 mr-1" /> Saved to Favorites
                    </>
                  ) : (
                    <>
                      <FaRegHeart className="mr-1" /> Save to Favorites
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Property Features */}
            <div className="bg-gray-100 rounded-lg p-4 flex justify-between mb-6">
              <div className="flex items-center">
                <FaBed className="text-gray-500 mr-2" />
                <div>
                  <p className="font-semibold">{features.bedrooms}</p>
                  <p className="text-sm text-gray-500">Bedrooms</p>
                </div>
              </div>
              <div className="flex items-center">
                <FaBath className="text-gray-500 mr-2" />
                <div>
                  <p className="font-semibold">{features.bathrooms}</p>
                  <p className="text-sm text-gray-500">Bathrooms</p>
                </div>
              </div>
              <div className="flex items-center">
                <FaRulerCombined className="text-gray-500 mr-2" />
                <div>
                  <p className="font-semibold">{features.area}</p>
                  <p className="text-sm text-gray-500">Sq Ft</p>
                </div>
              </div>
              {features.furnished && (
                <div className="flex items-center">
                  <FaCouch className="text-gray-500 mr-2" />
                  <div>
                    <p className="font-semibold">Yes</p>
                    <p className="text-sm text-gray-500">Furnished</p>
                  </div>
                </div>
              )}
              {features.parking && (
                <div className="flex items-center">
                  <FaParking className="text-gray-500 mr-2" />
                  <div>
                    <p className="font-semibold">Yes</p>
                    <p className="text-sm text-gray-500">Parking</p>
                  </div>
                </div>
              )}
            </div>

            {/* Description */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Description</h2>
              <p className="text-gray-700 whitespace-pre-line">{description}</p>
            </div>

            {/* Amenities */}
            {amenities.length > 0 && (
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4">Amenities</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {amenities.map((amenity, index) => (
                    <div key={index} className="flex items-center">
                      <span className="w-2 h-2 bg-primary-500 rounded-full mr-2"></span>
                      <span>{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Location Map (Placeholder) */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Location</h2>
              <div className="bg-gray-200 p-4 rounded-lg text-center h-64 flex items-center justify-center">
                <p className="text-gray-600">Map will be displayed here</p>
              </div>
              <p className="mt-2 text-sm text-gray-500">
                {location.address}, {location.city}, {location.state}, {location.zipCode}
              </p>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:w-1/3">
          {/* Agent Info */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h3 className="text-xl font-bold mb-4">Property Agent</h3>
            <div className="flex items-center mb-4">
              <img
                src={(typeof owner !== 'string' && owner.avatar) || 'https://via.placeholder.com/100?text=Agent'}
                alt="Agent"
                className="w-16 h-16 rounded-full mr-4 object-cover"
              />
              <div>
                <h4 className="font-semibold text-lg">
                  {typeof owner !== 'string' ? owner.name : 'Property Agent'}
                </h4>
                {typeof owner !== 'string' && (
                  <p className="text-gray-600 text-sm">{owner.email}</p>
                )}
              </div>
            </div>

            {/* Contact Buttons */}
            <div className="space-y-3">
              <button
                className="w-full btn btn-primary flex items-center justify-center"
                onClick={() => setShowContactForm(!showContactForm)}
              >
                <FaEnvelope className="mr-2" /> Message Agent
              </button>
              {typeof owner !== 'string' && owner.phone && (
                <a
                  href={`tel:${owner.phone}`}
                  className="w-full btn btn-secondary flex items-center justify-center"
                >
                  <FaPhoneAlt className="mr-2" /> Call Agent
                </a>
              )}
              <button
                className="w-full btn border border-primary-600 text-primary-600 hover:bg-primary-50 flex items-center justify-center"
                onClick={() => setShowScheduleForm(!showScheduleForm)}
              >
                <FaCalendarAlt className="mr-2" /> Schedule a Visit
              </button>
            </div>

            {/* Contact Form */}
            {showContactForm && (
              <form onSubmit={handleContactSubmit} className="mt-6 border-t pt-4">
                <h4 className="font-semibold mb-3">Send a Message</h4>
                <div className="mb-4">
                  <textarea
                    rows={4}
                    placeholder="I'm interested in this property..."
                    className="input"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                  ></textarea>
                </div>
                <button type="submit" className="w-full btn btn-primary">
                  Send Message
                </button>
              </form>
            )}

            {/* Schedule Form */}
            {showScheduleForm && (
              <form onSubmit={handleScheduleSubmit} className="mt-6 border-t pt-4">
                <h4 className="font-semibold mb-3">Schedule a Visit</h4>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
                      Date
                    </label>
                    <input
                      type="date"
                      id="date"
                      className="input"
                      value={scheduleDate}
                      onChange={(e) => setScheduleDate(e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-1">
                      Time
                    </label>
                    <input
                      type="time"
                      id="time"
                      className="input"
                      value={scheduleTime}
                      onChange={(e) => setScheduleTime(e.target.value)}
                      required
                    />
                  </div>
                  <button type="submit" className="w-full btn btn-primary">
                    Request Visit
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Similar Properties */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-bold mb-4">Similar Properties</h3>
            <p className="text-gray-600 text-sm">
              Similar properties will be displayed here.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetail;
