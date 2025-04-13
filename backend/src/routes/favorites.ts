import express from 'express';
import { body } from 'express-validator';
import {
  addFavorite,
  removeFavorite,
  getUserFavorites,
  checkFavorite,
} from '../controllers/favoriteController';
import { protect } from '../middleware/auth';

const router = express.Router();

// All routes are protected
router.use(protect);

// Get user favorites
router.get('/', getUserFavorites);

// Check if property is in favorites
router.get('/check/:propertyId', checkFavorite);

// Add property to favorites
router.post(
  '/',
  [body('propertyId').notEmpty().withMessage('Property ID is required')],
  addFavorite
);

// Remove property from favorites
router.delete('/:id', removeFavorite);

export default router;
