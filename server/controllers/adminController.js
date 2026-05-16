const asyncHandler = require('../middleware/asyncHandler');
const User = require('../models/User');
const Service = require('../models/Service');
const Booking = require('../models/Booking');

// @desc    Get dashboard stats
// @route   GET /api/admin/stats
// @access  Private/Admin
const getStats = asyncHandler(async (req, res) => {
  const userCount = await User.countDocuments();
  const serviceCount = await Service.countDocuments();
  const bookingCount = await Booking.countDocuments();
  
  res.json({
    users: userCount,
    services: serviceCount,
    bookings: bookingCount
  });
});

module.exports = { getStats };
