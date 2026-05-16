const Booking = require('../models/Booking');
const ApiError = require('../utils/ApiError');

// @desc    Create a new booking
// @route   POST /api/bookings
// @access  Private
const createBooking = async (req, res, next) => {
  try {
    const { service, provider, date, time, address, totalAmount } = req.body;

    const booking = new Booking({
      user: req.user._id,
      service,
      provider,
      date,
      time,
      address,
      totalAmount,
    });

    const createdBooking = await booking.save();
    res.status(201).json(createdBooking);
  } catch (error) {
    next(error);
  }
};

// @desc    Get user bookings
// @route   GET /api/bookings/mybookings
// @access  Private
const getMyBookings = async (req, res, next) => {
  try {
    const bookings = await Booking.find({ user: req.user._id }).populate('service', 'title image').populate('provider', 'name');
    res.json(bookings);
  } catch (error) {
    next(error);
  }
};

// @desc    Get booking by ID
// @route   GET /api/bookings/:id
// @access  Private
const getBookingById = async (req, res, next) => {
  try {
    const booking = await Booking.findById(req.params.id).populate('service', 'title').populate('provider', 'name').populate('user', 'name email');

    if (booking) {
      // Check if user is authorized to view this booking
      if (booking.user._id.toString() !== req.user._id.toString() && booking.provider._id.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
        return next(new ApiError(403, 'Not authorized to view this booking'));
      }
      res.json(booking);
    } else {
      return next(new ApiError(404, 'Booking not found'));
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Update booking status
// @route   PUT /api/bookings/:id/status
// @access  Private
const updateBookingStatus = async (req, res, next) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (booking) {
      if (booking.provider.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
        return next(new ApiError(403, 'Not authorized to update this booking'));
      }

      booking.status = req.body.status || booking.status;
      const updatedBooking = await booking.save();
      res.json(updatedBooking);
    } else {
      return next(new ApiError(404, 'Booking not found'));
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createBooking,
  getMyBookings,
  getBookingById,
  updateBookingStatus,
};
