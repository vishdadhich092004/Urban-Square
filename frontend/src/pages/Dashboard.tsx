import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaHeart, FaCalendarAlt, FaUserCircle, FaPlus, FaSpinner } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import apiService from '../services/api';
import PropertyCard from '../components/properties/PropertyCard';
import { Property, Appointment } from '../types';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'properties' | 'favorites' | 'appointments' | 'profile'>('properties');
  const [userProperties, setUserProperties] = useState<Property[]>([]);
  const [favoriteProperties, setFavoriteProperties] = useState<Property[]>([]);
  const [appointments, setAppointments] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch user's properties
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        if (activeTab === 'properties' && (user?.role === 'agent' || user?.role === 'admin')) {
          const response = await apiService.properties.getUserProperties();
          if (response.success && response.data) {
            setUserProperties(response.data);
          }
        } else if (activeTab === 'favorites') {
          const response = await apiService.favorites.getAll();
          if (response.success && response.data) {
            // Extract properties from favorites
            const properties = response.data.map((favorite: any) => {
              return typeof favorite.property === 'string' ? null : favorite.property;
            }).filter(Boolean);

            setFavoriteProperties(properties);
          }
        } else if (activeTab === 'appointments') {
          // Fetch both client and agent appointments
          let clientPromise = apiService.appointments.getClientAppointments();
          let agentPromise = user?.role === 'agent' || user?.role === 'admin'
            ? apiService.appointments.getAgentAppointments()
            : Promise.resolve({ success: true, data: [] });

          const [clientResponse, agentResponse] = await Promise.all([clientPromise, agentPromise]);

          let allAppointments: any[] = [];

          if (clientResponse.success && clientResponse.data) {
            allAppointments = [...allAppointments, ...clientResponse.data.map((apt: any) => ({...apt, type: 'client'}))];
          }

          if (agentResponse.success && agentResponse.data) {
            allAppointments = [...allAppointments, ...agentResponse.data.map((apt: any) => ({...apt, type: 'agent'}))];
          }

          // Sort by date, most recent first
          allAppointments.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

          setAppointments(allAppointments);
        }
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        setError('Failed to load data. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [activeTab, user?.role]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(date);
  };

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 mb-6 overflow-x-auto">
        <button
          className={`py-2 px-4 font-medium text-sm border-b-2 ${
            activeTab === 'properties'
              ? 'border-primary-600 text-primary-600'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
          }`}
          onClick={() => setActiveTab('properties')}
        >
          <FaHome className="inline mr-1" /> My Properties
        </button>
        <button
          className={`py-2 px-4 font-medium text-sm border-b-2 ${
            activeTab === 'favorites'
              ? 'border-primary-600 text-primary-600'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
          }`}
          onClick={() => setActiveTab('favorites')}
        >
          <FaHeart className="inline mr-1" /> Favorites
        </button>
        <button
          className={`py-2 px-4 font-medium text-sm border-b-2 ${
            activeTab === 'appointments'
              ? 'border-primary-600 text-primary-600'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
          }`}
          onClick={() => setActiveTab('appointments')}
        >
          <FaCalendarAlt className="inline mr-1" /> Appointments
        </button>
        <button
          className={`py-2 px-4 font-medium text-sm border-b-2 ${
            activeTab === 'profile'
              ? 'border-primary-600 text-primary-600'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
          }`}
          onClick={() => setActiveTab('profile')}
        >
          <FaUserCircle className="inline mr-1" /> Profile
        </button>
      </div>

      {/* Tab Content */}
      {loading ? (
        <div className="flex justify-center items-center py-12">
          <FaSpinner className="animate-spin text-4xl text-primary-600" />
        </div>
      ) : error ? (
        <div className="bg-red-50 text-red-600 p-4 rounded-md">
          <p>{error}</p>
        </div>
      ) : (
        <>
          {/* My Properties Tab */}
          {activeTab === 'properties' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">My Properties</h2>
                {(user?.role === 'agent' || user?.role === 'admin') && (
                  <Link to="/add-property" className="btn btn-primary flex items-center">
                    <FaPlus className="mr-1" /> Add Property
                  </Link>
                )}
              </div>

              {user?.role !== 'agent' && user?.role !== 'admin' ? (
                <div className="bg-yellow-50 p-4 rounded-md">
                  <p className="text-yellow-700">
                    Only agents can list properties. If you want to list properties, please contact us to upgrade your account.
                  </p>
                </div>
              ) : userProperties.length === 0 ? (
                <div className="text-center py-12 bg-gray-50 rounded-md">
                  <h3 className="text-lg font-medium text-gray-800 mb-2">No properties listed yet</h3>
                  <p className="text-gray-600 mb-4">
                    Start adding your properties to showcase them to potential buyers or renters.
                  </p>
                  <Link to="/add-property" className="btn btn-primary">
                    Add Your First Property
                  </Link>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {userProperties.map((property) => (
                    <PropertyCard key={property._id} property={property} />
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Favorites Tab */}
          {activeTab === 'favorites' && (
            <div>
              <h2 className="text-xl font-bold mb-6">Favorite Properties</h2>

              {favoriteProperties.length === 0 ? (
                <div className="text-center py-12 bg-gray-50 rounded-md">
                  <h3 className="text-lg font-medium text-gray-800 mb-2">No favorite properties yet</h3>
                  <p className="text-gray-600 mb-4">
                    Start browsing properties and save your favorites to access them quickly.
                  </p>
                  <Link to="/properties" className="btn btn-primary">
                    Browse Properties
                  </Link>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {favoriteProperties.map((property) => (
                    <PropertyCard
                      key={property._id}
                      property={property}
                      isFavorite={true}
                      onToggleFavorite={() => {
                        // Update favorites - we'd implement this to remove the item
                        setFavoriteProperties(favoriteProperties.filter(p => p._id !== property._id));
                      }}
                    />
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Appointments Tab */}
          {activeTab === 'appointments' && (
            <div>
              <h2 className="text-xl font-bold mb-6">Appointments</h2>

              {appointments.length === 0 ? (
                <div className="text-center py-12 bg-gray-50 rounded-md">
                  <h3 className="text-lg font-medium text-gray-800 mb-2">No appointments scheduled</h3>
                  <p className="text-gray-600 mb-4">
                    Schedule property visits to see them in person.
                  </p>
                  <Link to="/properties" className="btn btn-primary">
                    Browse Properties
                  </Link>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full bg-white rounded-lg">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Property
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Date & Time
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          {user?.role === 'agent' ? 'Client' : 'Agent'}
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {appointments.map((appointment) => (
                        <tr key={appointment._id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="h-10 w-10 flex-shrink-0">
                                <img
                                  className="h-10 w-10 rounded-md object-cover"
                                  src={
                                    typeof appointment.property === 'string'
                                      ? 'https://via.placeholder.com/40?text=Property'
                                      : appointment.property.images?.[0] || 'https://via.placeholder.com/40?text=Property'
                                  }
                                  alt="Property"
                                />
                              </div>
                              <div className="ml-4">
                                <Link
                                  to={`/properties/${typeof appointment.property === 'string' ? appointment.property : appointment.property._id}`}
                                  className="text-sm font-medium text-gray-900 hover:text-primary-600"
                                >
                                  {typeof appointment.property === 'string'
                                    ? 'Property'
                                    : appointment.property.title || 'Property'}
                                </Link>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{formatDate(appointment.date)}</div>
                            <div className="text-sm text-gray-500">{appointment.time}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {appointment.type === 'client'
                                ? typeof appointment.agent === 'string'
                                  ? 'Agent'
                                  : appointment.agent?.name
                                : typeof appointment.client === 'string'
                                  ? 'Client'
                                  : appointment.client?.name
                              }
                            </div>
                            <div className="text-sm text-gray-500">
                              {appointment.type === 'client'
                                ? typeof appointment.agent === 'string'
                                  ? ''
                                  : appointment.agent?.email
                                : typeof appointment.client === 'string'
                                  ? ''
                                  : appointment.client?.email
                              }
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeClass(appointment.status)}`}>
                              {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            <button className="text-primary-600 hover:text-primary-900 mr-3">
                              View Details
                            </button>
                            {appointment.status === 'pending' && (
                              <>
                                {appointment.type === 'agent' && (
                                  <button className="text-green-600 hover:text-green-900 mr-3">
                                    Confirm
                                  </button>
                                )}
                                <button className="text-red-600 hover:text-red-900">
                                  Cancel
                                </button>
                              </>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <div>
              <h2 className="text-xl font-bold mb-6">Profile</h2>
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-start mb-6">
                  <div className="mr-6">
                    <img
                      src={user?.avatar || 'https://via.placeholder.com/100?text=User'}
                      alt={user?.name || 'User'}
                      className="w-24 h-24 rounded-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold">{user?.name}</h3>
                    <p className="text-gray-600">{user?.email}</p>
                    <p className="text-gray-600">{user?.phone || 'No phone number'}</p>
                    <p className="mt-2 inline-block px-2 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded-full">
                      {user?.role.charAt(0).toUpperCase() + user?.role.slice(1)}
                    </p>
                  </div>
                </div>
                <div className="border-t pt-4">
                  <Link to="/profile/edit" className="btn btn-primary">Edit Profile</Link>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Dashboard;
