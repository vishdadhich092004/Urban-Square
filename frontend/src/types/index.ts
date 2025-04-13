// User Types
export interface User {
  _id: string;
  name: string;
  email: string;
  role: "user" | "agent" | "admin";
  phone?: string;
  avatar?: string;
  bio?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface AuthUser extends User {
  token: string;
}

// Property Types
export interface PropertyLocation {
  address: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
  coordinates?: {
    latitude: number;
    longitude: number;
  };
}

export interface PropertyFeatures {
  bedrooms: number;
  bathrooms: number;
  area: number;
  furnished: boolean;
  parking: boolean;
  yearBuilt?: number;
}

export interface Property {
  _id: string;
  title: string;
  description: string;
  propertyType: "house" | "apartment" | "condo" | "land" | "commercial";
  status: "for-sale" | "for-rent";
  price: number;
  location: PropertyLocation;
  features: PropertyFeatures;
  amenities: string[];
  images: string[];
  owner: User | string;
  createdAt: string;
  updatedAt: string;
}

// Favorite Types
export interface Favorite {
  _id: string;
  user: string | User;
  property: string | Property;
  createdAt: string;
  updatedAt: string;
}

// Appointment Types
export interface Appointment {
  _id: string;
  property: string | Property;
  client: string | User;
  agent: string | User;
  date: string;
  time: string;
  status: "pending" | "confirmed" | "cancelled" | "completed";
  message?: string;
  createdAt: string;
  updatedAt: string;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  errors?: unknown[];
  count?: number;
  pagination?: {
    total: number;
    page: number;
    pages: number;
  };
}

// Filter Types
export interface PropertyFilters {
  propertyType?: string;
  status?: string;
  minPrice?: number;
  maxPrice?: number;
  bedrooms?: number;
  bathrooms?: number;
  city?: string;
  state?: string;
  furnished?: boolean;
  parking?: boolean;
  sort?: string;
  page?: number;
  limit?: number;
}
