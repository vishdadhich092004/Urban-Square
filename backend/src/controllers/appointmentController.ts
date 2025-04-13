import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import Appointment from '../models/Appointment';
import Property from '../models/Property';
import User from '../models/User';

// @desc    Create a new appointment/booking
// @route   POST /api/appointments
// @access  Private
export const createAppointment = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }

  try {
    const { propertyId, date, time, message } = req.body;

    // Check if property exists
    const property = await Property.findById(propertyId);
    if (!property) {
      return res.status(404).json({
        success: false,
        message: 'Property not found',
      });
    }

    // Get the agent/owner from the property
    const agent = await User.findById(property.owner);
    if (!agent) {
      return res.status(404).json({
        success: false,
        message: 'Property owner not found',
      });
    }

    // Create new appointment
    const appointment = await Appointment.create({
      property: propertyId,
      client: req.user?._id,
      agent: property.owner,
      date,
      time,
      message,
      status: 'pending',
    });

    // Populate the appointment with property and user details
    const populatedAppointment = await Appointment.findById(appointment._id)
      .populate('property', 'title images location.address price')
      .populate('agent', 'name email phone')
      .populate('client', 'name email phone');

    res.status(201).json({
      success: true,
      data: populatedAppointment,
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

// @desc    Get user's appointments (as client)
// @route   GET /api/appointments/client
// @access  Private
export const getClientAppointments = async (req: Request, res: Response) => {
  try {
    const appointments = await Appointment.find({ client: req.user?._id })
      .populate('property', 'title images location.address price')
      .populate('agent', 'name email phone avatar')
      .sort('-createdAt');

    res.json({
      success: true,
      count: appointments.length,
      data: appointments,
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

// @desc    Get appointments for agent's properties
// @route   GET /api/appointments/agent
// @access  Private
export const getAgentAppointments = async (req: Request, res: Response) => {
  try {
    const appointments = await Appointment.find({ agent: req.user?._id })
      .populate('property', 'title images location.address price')
      .populate('client', 'name email phone avatar')
      .sort('-createdAt');

    res.json({
      success: true,
      count: appointments.length,
      data: appointments,
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

// @desc    Update appointment status
// @route   PUT /api/appointments/:id
// @access  Private
export const updateAppointment = async (req: Request, res: Response) => {
  try {
    const { status } = req.body;

    // Find appointment
    const appointment = await Appointment.findById(req.params.id);

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: 'Appointment not found',
      });
    }

    // Check if user is authorized to update
    if (
      appointment.agent.toString() !== req.user?._id.toString() &&
      appointment.client.toString() !== req.user?._id.toString() &&
      req.user?.role !== 'admin'
    ) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this appointment',
      });
    }

    // Only agents/admins can confirm or complete appointments
    if (
      (status === 'confirmed' || status === 'completed') &&
      appointment.agent.toString() !== req.user?._id.toString() &&
      req.user?.role !== 'admin'
    ) {
      return res.status(403).json({
        success: false,
        message: 'Only property agents can confirm or complete appointments',
      });
    }

    // Update appointment
    appointment.status = status;
    await appointment.save();

    // Get updated appointment with populated fields
    const updatedAppointment = await Appointment.findById(req.params.id)
      .populate('property', 'title images location.address price')
      .populate('agent', 'name email phone avatar')
      .populate('client', 'name email phone avatar');

    res.json({
      success: true,
      data: updatedAppointment,
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

// @desc    Delete appointment
// @route   DELETE /api/appointments/:id
// @access  Private
export const deleteAppointment = async (req: Request, res: Response) => {
  try {
    const appointment = await Appointment.findById(req.params.id);

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: 'Appointment not found',
      });
    }

    // Check if user is authorized to delete
    if (
      appointment.client.toString() !== req.user?._id.toString() &&
      appointment.agent.toString() !== req.user?._id.toString() &&
      req.user?.role !== 'admin'
    ) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this appointment',
      });
    }

    await appointment.deleteOne();

    res.json({
      success: true,
      message: 'Appointment cancelled',
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
