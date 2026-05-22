const Booking = require('../models/Booking');
const ApiError = require('../utils/ApiError');

// @desc    Create a new booking
// @route   POST /api/bookings
// @access  Private
const createBooking = async (req, res, next) => {
  try {
    const { serviceId, date, slot, address, paymentMethod, totalAmount } = req.body;
    // Fetch service to get provider reference and price validation
    const Service = require('../models/Service');
    const serviceDoc = await Service.findById(serviceId);
    if (!serviceDoc) {
      return next(new ApiError(404, 'Service not found'));
    }
    const provider = serviceDoc.provider;
    // Map slot to a time representation (e.g., keep slot string)
    const time = slot;
    const booking = new Booking({
      user: req.user._id,
      service: serviceId,
      provider,
      date,
      time,
      address: typeof address === 'object' ? JSON.stringify(address) : address,
      totalPrice: totalAmount,
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

// @desc    Get provider bookings (jobs assigned to this provider)
// @route   GET /api/bookings/provider
// @access  Private (provider)
const getProviderBookings = async (req, res, next) => {
  try {
    const bookings = await Booking.find({ provider: req.user._id })
      .populate('service', 'title image')
      .populate('user', 'name email phone');
    // Map user field to customer for frontend compatibility
    const mapped = bookings.map(b => {
      const obj = b.toObject();
      obj.customer = obj.user;
      return obj;
    });
    res.json(mapped);
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
  getProviderBookings,
  getBookingById,
  updateBookingStatus,
};
