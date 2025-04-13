import express from 'express';
import { body } from 'express-validator';
import {
  createAppointment,
  getClientAppointments,
  getAgentAppointments,
  updateAppointment,
  deleteAppointment,
} from '../controllers/appointmentController';
import { protect } from '../middleware/auth';

const router = express.Router();

// All routes are protected
router.use(protect);

// Get appointments (client and agent views)
router.get('/client', getClientAppointments);
router.get('/agent', getAgentAppointments);

// Create appointment
router.post(
  '/',
  [
    body('propertyId').notEmpty().withMessage('Property ID is required'),
    body('date').isDate().withMessage('Valid date is required'),
    body('time').notEmpty().withMessage('Time is required'),
  ],
  createAppointment
);

// Update and delete appointments
router.put(
  '/:id',
  [body('status').isIn(['pending', 'confirmed', 'cancelled', 'completed']).withMessage('Valid status is required')],
  updateAppointment
);
router.delete('/:id', deleteAppointment);

export default router;
