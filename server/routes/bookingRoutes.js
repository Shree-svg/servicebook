const express = require('express');
const router = express.Router();
const {
  createBooking,
  getMyBookings,
  getProviderBookings,
  getBookingById,
  updateBookingStatus,
} = require('../controllers/bookingController');
const { protect } = require('../middleware/authMiddleware');

router.route('/')
  .post(protect, createBooking);

router.route('/mybookings')
  .get(protect, getMyBookings);

router.route('/provider')
  .get(protect, getProviderBookings);

router.route('/:id')
  .get(protect, getBookingById);

router.route('/:id/status')
  .put(protect, updateBookingStatus)
  .patch(protect, updateBookingStatus);

module.exports = router;

