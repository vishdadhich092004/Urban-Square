import express from 'express';
import { body } from 'express-validator';
import {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
} from '../controllers/userController';
import { protect, admin } from '../middleware/auth';
import { uploadSingle } from '../middleware/upload';

const router = express.Router();

// Register a new user
router.post(
  '/',
  [
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Please include a valid email'),
    body('password')
      .isLength({ min: 6 })
      .withMessage('Password must be at least 6 characters long'),
  ],
  registerUser
);

// Login user
router.post(
  '/login',
  [
    body('email').isEmail().withMessage('Please include a valid email'),
    body('password').exists().withMessage('Password is required'),
  ],
  loginUser
);

// Get user profile
router.get('/profile', protect, getUserProfile);

// Update user profile
router.put('/profile', protect, uploadSingle, updateUserProfile);

// Admin Routes
router.get('/', protect, admin, getUsers);
router.delete('/:id', protect, admin, deleteUser);

export default router;
