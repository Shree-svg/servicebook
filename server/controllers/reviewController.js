const asyncHandler = require('../middleware/asyncHandler');
const Review = require('../models/Review');
const Service = require('../models/Service');
const ApiError = require('../utils/ApiError');

// @desc    Get all reviews for a service
// @route   GET /api/services/:serviceId/reviews
// @access  Public
const getReviews = asyncHandler(async (req, res) => {
  const reviews = await Review.find({ service: req.params.serviceId }).populate('user', 'name avatar');
  res.json(reviews);
});

// @desc    Create new review
// @route   POST /api/services/:serviceId/reviews
// @access  Private
const createReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;
  const serviceId = req.params.serviceId;

  const service = await Service.findById(serviceId);

  if (!service) {
    throw new ApiError(404, 'Service not found');
  }

  const alreadyReviewed = await Review.findOne({
    service: serviceId,
    user: req.user._id
  });

  if (alreadyReviewed) {
    throw new ApiError(400, 'Service already reviewed');
  }

  const review = new Review({
    user: req.user._id,
    service: serviceId,
    rating: Number(rating),
    comment
  });

  await review.save();

  // Update service rating and numReviews
  const reviews = await Review.find({ service: serviceId });
  service.numReviews = reviews.length;
  service.rating = reviews.reduce((acc, item) => item.rating + acc, 0) / reviews.length;
  await service.save();

  res.status(201).json({ message: 'Review added' });
});

module.exports = { getReviews, createReview };
