import express from 'express';
import { body } from 'express-validator';
import {
  createProperty,
  getProperties,
  getPropertyById,
  updateProperty,
  deleteProperty,
  getUserProperties,
} from '../controllers/propertyController';
import { protect, agent } from '../middleware/auth';
import { uploadMultiple } from '../middleware/upload';

const router = express.Router();

// Public routes
router.get('/', getProperties);
router.get('/:id', getPropertyById);

// Protected routes
router.post(
  '/',
  protect,
  agent,
  uploadMultiple,
  [
    body('title').notEmpty().withMessage('Title is required'),
    body('description').notEmpty().withMessage('Description is required'),
    body('propertyType').notEmpty().withMessage('Property type is required'),
    body('status').notEmpty().withMessage('Status is required'),
    body('price').isNumeric().withMessage('Price must be a number'),
    body('location.address').notEmpty().withMessage('Address is required'),
    body('location.city').notEmpty().withMessage('City is required'),
    body('location.state').notEmpty().withMessage('State is required'),
    body('location.country').notEmpty().withMessage('Country is required'),
    body('location.zipCode').notEmpty().withMessage('Zip code is required'),
    body('features.bedrooms').isNumeric().withMessage('Bedrooms must be a number'),
    body('features.bathrooms').isNumeric().withMessage('Bathrooms must be a number'),
    body('features.area').isNumeric().withMessage('Area must be a number'),
  ],
  createProperty
);

router.put('/:id', protect, uploadMultiple, updateProperty);
router.delete('/:id', protect, deleteProperty);
router.get('/user/listings', protect, getUserProperties);

export default router;
