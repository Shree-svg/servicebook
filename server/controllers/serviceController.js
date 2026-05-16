const Service = require('../models/Service');
const ApiError = require('../utils/ApiError');

// @desc    Get all services
// @route   GET /api/services
// @access  Public
const getServices = async (req, res, next) => {
  try {
    const services = await Service.find().populate('category', 'name').populate('provider', 'name');
    res.json(services);
  } catch (error) {
    next(error);
  }
};

// @desc    Get single service
// @route   GET /api/services/:id
// @access  Public
const getServiceById = async (req, res, next) => {
  try {
    const service = await Service.findById(req.params.id).populate('category', 'name').populate('provider', 'name');
    if (service) {
      res.json(service);
    } else {
      return next(new ApiError(404, 'Service not found'));
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Create a service
// @route   POST /api/services
// @access  Private/Provider
const createService = async (req, res, next) => {
  try {
    const service = new Service({
      ...req.body,
      provider: req.user._id,
    });
    const createdService = await service.save();
    res.status(201).json(createdService);
  } catch (error) {
    next(error);
  }
};

// @desc    Update a service
// @route   PUT /api/services/:id
// @access  Private/Provider
const updateService = async (req, res, next) => {
  try {
    const service = await Service.findById(req.params.id);

    if (service) {
      if (service.provider.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
        return next(new ApiError(403, 'Not authorized to update this service'));
      }

      Object.assign(service, req.body);
      const updatedService = await service.save();
      res.json(updatedService);
    } else {
      return next(new ApiError(404, 'Service not found'));
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a service
// @route   DELETE /api/services/:id
// @access  Private/Provider
const deleteService = async (req, res, next) => {
  try {
    const service = await Service.findById(req.params.id);

    if (service) {
      if (service.provider.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
        return next(new ApiError(403, 'Not authorized to delete this service'));
      }

      await service.deleteOne();
      res.json({ message: 'Service removed' });
    } else {
      return next(new ApiError(404, 'Service not found'));
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getServices,
  getServiceById,
  createService,
  updateService,
  deleteService,
};
