const Review = require('../models/Review');
const User = require('../models/User');

exports.createReview = async (req, res) => {
  try {
    const { sellerId, productId, rating, comment } = req.body;

    const review = await Review.create({
      seller: sellerId,
      product: productId,
      buyer: req.user._id,
      rating,
      comment
    });

    const reviews = await Review.find({ seller: sellerId });
    const avgRating = reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length;
    
    await User.findByIdAndUpdate(sellerId, {
      rating: avgRating,
      totalReviews: reviews.length
    });

    res.status(201).json(review);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getSellerReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ seller: req.params.sellerId })
      .populate('buyer', 'name avatar')
      .populate('product', 'title')
      .sort('-createdAt');
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
