import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import {
  ApiResponse,
  User,
  Property,
  Favorite,
  Appointment,
  PropertyFilters,
} from "../types";

const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL as string}/api`,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add auth token to requests if available
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Generic API request function
const apiRequest = async <T>(
  method: string,
  url: string,
  data?: unknown,
  config?: AxiosRequestConfig
): Promise<ApiResponse<T>> => {
  try {
    const response: AxiosResponse<ApiResponse<T>> = await api.request({
      method,
      url,
      data,
      ...config,
    });
    return response.data;
  } catch (error: unknown) {
    // Handle errors consistently
    if (error instanceof Error) {
      if ("response" in error) {
        // The request was made and the server responded with an error status
        return (error as { response: { data: ApiResponse<T> } }).response.data;
      } else if ("request" in error) {
        // The request was made but no response was received
        throw new Error(
          "No response from server. Please check your internet connection and try again."
        );
      } else {
        // Something happened in setting up the request
        throw new Error(error.message || "An unexpected error occurred");
      }
    }
    throw new Error("An unexpected error occurred");
  }
};

// API service methods
const apiService = {
  // Auth endpoints
  auth: {
    register: (userData: Partial<User>) =>
      apiRequest<User>("post", "/users", userData),
    login: (credentials: { email: string; password: string }) =>
      apiRequest<User>("post", "/users/login", credentials),
    getProfile: () => apiRequest<User>("get", "/users/profile"),
    updateProfile: (userData: Partial<User>) =>
      apiRequest<User>("put", "/users/profile", userData),
  },

  // Property endpoints
  properties: {
    getAll: (filters?: PropertyFilters) =>
      apiRequest<Property[]>("get", "/properties", undefined, {
        params: filters,
      }),
    getById: (id: string) => apiRequest<Property>("get", `/properties/${id}`),
    create: (propertyData: Partial<Property>) =>
      apiRequest<Property>("post", "/properties", propertyData),
    update: (id: string, propertyData: Partial<Property>) =>
      apiRequest<Property>("put", `/properties/${id}`, propertyData),
    delete: (id: string) => apiRequest<void>("delete", `/properties/${id}`),
    getUserProperties: () =>
      apiRequest<Property[]>("get", "/properties/user/listings"),
  },

  // Favorite endpoints
  favorites: {
    getAll: () => apiRequest<Favorite[]>("get", "/favorites"),
    add: (propertyId: string) =>
      apiRequest<Favorite>("post", "/favorites", { propertyId }),
    remove: (id: string) => apiRequest<void>("delete", `/favorites/${id}`),
    checkFavorite: (propertyId: string) =>
      apiRequest<Favorite>("get", `/favorites/check/${propertyId}`),
  },

  // Appointment endpoints
  appointments: {
    getClientAppointments: () =>
      apiRequest<Appointment[]>("get", "/appointments/client"),
    getAgentAppointments: () =>
      apiRequest<Appointment[]>("get", "/appointments/agent"),
    create: (appointmentData: Partial<Appointment>) =>
      apiRequest<Appointment>("post", "/appointments", appointmentData),
    update: (id: string, data: { status: string }) =>
      apiRequest<Appointment>("put", `/appointments/${id}`, data),
    delete: (id: string) => apiRequest<void>("delete", `/appointments/${id}`),
  },
};

export default apiService;
