import mongoose, { Schema, Document } from 'mongoose';

export interface IProperty extends Document {
  title: string;
  description: string;
  propertyType: 'house' | 'apartment' | 'condo' | 'land' | 'commercial';
  status: 'for-sale' | 'for-rent';
  price: number;
  location: {
    address: string;
    city: string;
    state: string;
    country: string;
    zipCode: string;
    coordinates?: {
      latitude: number;
      longitude: number;
    };
  };
  features: {
    bedrooms: number;
    bathrooms: number;
    area: number;
    furnished: boolean;
    parking: boolean;
    yearBuilt?: number;
  };
  amenities: string[];
  images: string[];
  owner: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const PropertySchema: Schema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
      maxlength: [100, 'Title cannot be more than 100 characters'],
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      trim: true,
    },
    propertyType: {
      type: String,
      required: [true, 'Property type is required'],
      enum: ['house', 'apartment', 'condo', 'land', 'commercial'],
    },
    status: {
      type: String,
      required: [true, 'Status is required'],
      enum: ['for-sale', 'for-rent'],
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
    },
    location: {
      address: {
        type: String,
        required: [true, 'Address is required'],
      },
      city: {
        type: String,
        required: [true, 'City is required'],
      },
      state: {
        type: String,
        required: [true, 'State is required'],
      },
      country: {
        type: String,
        required: [true, 'Country is required'],
      },
      zipCode: {
        type: String,
        required: [true, 'Zip code is required'],
      },
      coordinates: {
        latitude: {
          type: Number,
        },
        longitude: {
          type: Number,
        },
      },
    },
    features: {
      bedrooms: {
        type: Number,
        required: [true, 'Number of bedrooms is required'],
      },
      bathrooms: {
        type: Number,
        required: [true, 'Number of bathrooms is required'],
      },
      area: {
        type: Number,
        required: [true, 'Area is required'],
      },
      furnished: {
        type: Boolean,
        default: false,
      },
      parking: {
        type: Boolean,
        default: false,
      },
      yearBuilt: {
        type: Number,
      },
    },
    amenities: [String],
    images: [String],
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Add index for search functionality
PropertySchema.index({
  title: 'text',
  description: 'text',
  'location.address': 'text',
  'location.city': 'text',
  'location.state': 'text'
});

export default mongoose.model<IProperty>('Property', PropertySchema);
