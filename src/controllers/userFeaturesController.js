const User = require('../models/User');
const Product = require('../models/Product');

exports.saveSearch = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    user.savedSearches.push(req.body);
    await user.save();
    res.json(user.savedSearches);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getSavedSearches = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    res.json(user.savedSearches);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteSavedSearch = async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.user._id, {
      $pull: { savedSearches: { _id: req.params.id } }
    });
    res.json({ message: 'Search deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getNotifications = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    res.json(user.notifications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.markNotificationRead = async (req, res) => {
  try {
    await User.updateOne(
      { _id: req.user._id, 'notifications._id': req.params.id },
      { $set: { 'notifications.$.read': true } }
    );
    res.json({ message: 'Marked as read' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.addToCompare = async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.user._id, {
      $addToSet: { compareList: req.params.productId }
    });
    res.json({ message: 'Added to compare' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.removeFromCompare = async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.user._id, {
      $pull: { compareList: req.params.productId }
    });
    res.json({ message: 'Removed from compare' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getCompareList = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate({
      path: 'compareList',
      populate: { path: 'seller', select: 'name shopName rating' }
    });
    res.json(user.compareList);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getRecentlyViewed = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate({
      path: 'recentlyViewed',
      populate: { path: 'seller', select: 'name shopName' }
    });
    res.json(user.recentlyViewed);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.uploadVerification = async (req, res) => {
  try {
    const updates = {};
    if (req.body.idDocument) updates.idDocument = req.body.idDocument;
    if (req.body.businessRegistration) updates.businessRegistration = req.body.businessRegistration;
    
    const user = await User.findByIdAndUpdate(req.user._id, updates, { new: true });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.upgradeSubscription = async (req, res) => {
  try {
    const { plan, duration } = req.body;
    const expires = new Date();
    expires.setMonth(expires.getMonth() + duration);
    
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { subscription: plan, subscriptionExpires: expires },
      { new: true }
    );
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
