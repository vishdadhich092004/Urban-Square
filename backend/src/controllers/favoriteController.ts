import { Request, Response } from 'express';
import Favorite from '../models/Favorite';
import Property from '../models/Property';

// @desc    Add property to favorites
// @route   POST /api/favorites
// @access  Private
export const addFavorite = async (req: Request, res: Response) => {
  try {
    const { propertyId } = req.body;

    // Check if property exists
    const property = await Property.findById(propertyId);
    if (!property) {
      return res.status(404).json({
        success: false,
        message: 'Property not found',
      });
    }

    // Check if already favorited
    const existingFavorite = await Favorite.findOne({
      user: req.user?._id,
      property: propertyId,
    });

    if (existingFavorite) {
      return res.status(400).json({
        success: false,
        message: 'Property already in favorites',
      });
    }

    // Create new favorite
    const favorite = await Favorite.create({
      user: req.user?._id,
      property: propertyId,
    });

    res.status(201).json({
      success: true,
      data: favorite,
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

// @desc    Remove property from favorites
// @route   DELETE /api/favorites/:id
// @access  Private
export const removeFavorite = async (req: Request, res: Response) => {
  try {
    const favorite = await Favorite.findOne({
      _id: req.params.id,
      user: req.user?._id,
    });

    if (!favorite) {
      return res.status(404).json({
        success: false,
        message: 'Favorite not found',
      });
    }

    await favorite.deleteOne();

    res.json({
      success: true,
      message: 'Property removed from favorites',
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

// @desc    Get user favorites
// @route   GET /api/favorites
// @access  Private
export const getUserFavorites = async (req: Request, res: Response) => {
  try {
    const favorites = await Favorite.find({ user: req.user?._id }).populate({
      path: 'property',
      populate: {
        path: 'owner',
        select: 'name email phone avatar',
      },
    });

    res.json({
      success: true,
      count: favorites.length,
      data: favorites,
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

// @desc    Check if property is in user's favorites
// @route   GET /api/favorites/check/:propertyId
// @access  Private
export const checkFavorite = async (req: Request, res: Response) => {
  try {
    const favorite = await Favorite.findOne({
      user: req.user?._id,
      property: req.params.propertyId,
    });

    res.json({
      success: true,
      isFavorite: !!favorite,
      data: favorite,
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
