import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import Property, { IProperty } from '../models/Property';

// @desc    Create a new property
// @route   POST /api/properties
// @access  Private
export const createProperty = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }

  try {
    // Process images if uploaded
    const images: string[] = [];
    if (req.files && Array.isArray(req.files)) {
      req.files.forEach((file: Express.Multer.File) => {
        images.push(`/uploads/${file.filename}`);
      });
    }

    // Create new property
    const property = new Property({
      ...req.body,
      owner: req.user?._id,
      images,
    });

    const createdProperty = await property.save();

    res.status(201).json({
      success: true,
      data: createdProperty,
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    } else {
      res.status(500).json({
        success: false,
        message: 'Server Error',
      });
    }
  }
};

// @desc    Get all properties with filtering
// @route   GET /api/properties
// @access  Public
export const getProperties = async (req: Request, res: Response) => {
  try {
    // Build query based on filter parameters
    const queryParams = { ...req.query };
    const removeFields = ['page', 'limit', 'sort', 'fields'];

    // Remove fields that are not meant for filtering
    removeFields.forEach((param) => delete queryParams[param]);

    // Create query string with operators
    let queryStr = JSON.stringify(queryParams);
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, (match) => `$${match}`);

    // Parse query string back to object
    let query = Property.find(JSON.parse(queryStr)).populate('owner', 'name email phone avatar');

    // Apply sort
    if (req.query.sort) {
      const sortBy = (req.query.sort as string).split(',').join(' ');
      query = query.sort(sortBy);
    } else {
      query = query.sort('-createdAt');
    }

    // Apply pagination
    const page = parseInt(req.query.page as string, 10) || 1;
    const limit = parseInt(req.query.limit as string, 10) || 10;
    const skip = (page - 1) * limit;

    query = query.skip(skip).limit(limit);

    // Execute query
    const properties = await query;
    const total = await Property.countDocuments(JSON.parse(queryStr));

    res.json({
      success: true,
      count: properties.length,
      pagination: {
        total,
        page,
        pages: Math.ceil(total / limit),
      },
      data: properties,
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    } else {
      res.status(500).json({
        success: false,
        message: 'Server Error',
      });
    }
  }
};

// @desc    Get property by ID
// @route   GET /api/properties/:id
// @access  Public
export const getPropertyById = async (req: Request, res: Response) => {
  try {
    const property = await Property.findById(req.params.id).populate('owner', 'name email phone avatar');

    if (property) {
      res.json({
        success: true,
        data: property,
      });
    } else {
      res.status(404).json({
        success: false,
        message: 'Property not found',
      });
    }
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    } else {
      res.status(500).json({
        success: false,
        message: 'Server Error',
      });
    }
  }
};

// @desc    Update property
// @route   PUT /api/properties/:id
// @access  Private
export const updateProperty = async (req: Request, res: Response) => {
  try {
    const property = await Property.findById(req.params.id);

    if (!property) {
      return res.status(404).json({
        success: false,
        message: 'Property not found',
      });
    }

    // Check if user is owner or admin
    if (property.owner.toString() !== req.user?._id.toString() && req.user?.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this property',
      });
    }

    // Process images if uploaded
    const images: string[] = [...property.images];
    if (req.files && Array.isArray(req.files)) {
      req.files.forEach((file: Express.Multer.File) => {
        images.push(`/uploads/${file.filename}`);
      });
    }

    // Update property
    const updatedProperty = await Property.findByIdAndUpdate(
      req.params.id,
      { ...req.body, images },
      { new: true, runValidators: true }
    );

    res.json({
      success: true,
      data: updatedProperty,
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    } else {
      res.status(500).json({
        success: false,
        message: 'Server Error',
      });
    }
  }
};

// @desc    Delete property
// @route   DELETE /api/properties/:id
// @access  Private
export const deleteProperty = async (req: Request, res: Response) => {
  try {
    const property = await Property.findById(req.params.id);

    if (!property) {
      return res.status(404).json({
        success: false,
        message: 'Property not found',
      });
    }

    // Check if user is owner or admin
    if (property.owner.toString() !== req.user?._id.toString() && req.user?.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this property',
      });
    }

    await property.deleteOne();

    res.json({
      success: true,
      message: 'Property removed',
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    } else {
      res.status(500).json({
        success: false,
        message: 'Server Error',
      });
    }
  }
};

// @desc    Get user properties (properties listed by the logged-in user)
// @route   GET /api/properties/user
// @access  Private
export const getUserProperties = async (req: Request, res: Response) => {
  try {
    const properties = await Property.find({ owner: req.user?._id });

    res.json({
      success: true,
      count: properties.length,
      data: properties,
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    } else {
      res.status(500).json({
        success: false,
        message: 'Server Error',
      });
    }
  }
};
