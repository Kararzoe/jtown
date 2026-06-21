const ServiceProvider = require('../models/ServiceProvider');

exports.applyAsProvider = async (req, res) => {
  try {
    const provider = await ServiceProvider.create({
      user: req.user._id,
      ...req.body
    });
    res.status(201).json(provider);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.applyPublic = async (req, res) => {
  try {
    const { serviceName, category, description, phone, location, experience, priceRange } = req.body;
    if (!serviceName || !category || !description || !phone || !location) {
      return res.status(400).json({ message: 'Please fill all required fields' });
    }
    const provider = await ServiceProvider.create({
      serviceName, category, description, phone, location, experience, priceRange,
      status: 'pending'
    });
    res.status(201).json(provider);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getProviderById = async (req, res) => {
  try {
    const provider = await ServiceProvider.findById(req.params.id)
      .populate('user', 'name email avatar');
    if (!provider) {
      return res.status(404).json({ message: 'Provider not found' });
    }
    res.json(provider);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getProvidersByCategory = async (req, res) => {
  try {
    const providers = await ServiceProvider.find({
      category: req.params.category,
      status: 'approved'
    }).populate('user', 'name email avatar');
    res.json(providers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getMyApplications = async (req, res) => {
  try {
    const applications = await ServiceProvider.find({ user: req.user._id });
    res.json(applications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAllApplications = async (req, res) => {
  try {
    const applications = await ServiceProvider.find()
      .populate('user', 'name email phone')
      .sort({ createdAt: -1 });
    res.json(applications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateApplicationStatus = async (req, res) => {
  try {
    const provider = await ServiceProvider.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    ).populate('user', 'name email phone');
    if (!provider) {
      return res.status(404).json({ message: 'Application not found' });
    }
    res.json(provider);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteApplication = async (req, res) => {
  try {
    await ServiceProvider.findByIdAndDelete(req.params.id);
    res.json({ message: 'Application deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
