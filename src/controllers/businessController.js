const Product = require('../models/Product');
const User = require('../models/User');
const Order = require('../models/Order');

exports.promoteProduct = async (req, res) => {
  try {
    const { productId, plan, duration } = req.body;
    const days = duration || 7;
    const promotedUntil = new Date(Date.now() + days * 24 * 60 * 60 * 1000);
    
    const product = await Product.findByIdAndUpdate(
      productId,
      { promoted: true, promotedUntil, promotionPlan: plan },
      { new: true }
    );
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createFlashSale = async (req, res) => {
  try {
    const { productId, discountPercent, duration } = req.body;
    const product = await Product.findById(productId);
    
    const endDate = new Date(Date.now() + duration * 60 * 60 * 1000);
    const discountedPrice = product.price * (1 - discountPercent / 100);
    
    product.flashSale = {
      active: true,
      originalPrice: product.price,
      discountPercent,
      startDate: new Date(),
      endDate
    };
    product.price = discountedPrice;
    await product.save();
    
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getFlashSales = async (req, res) => {
  try {
    const products = await Product.find({
      'flashSale.active': true,
      'flashSale.endDate': { $gt: new Date() }
    }).populate('seller', 'name shopName');
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createCoupon = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    user.coupons.push(req.body);
    await user.save();
    res.json(user.coupons);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.applyCoupon = async (req, res) => {
  try {
    const { code, amount } = req.body;
    const user = await User.findById(req.user._id);
    const coupon = user.coupons.find(c => c.code === code && c.expiresAt > new Date());
    
    if (!coupon) return res.status(404).json({ message: 'Invalid coupon' });
    if (coupon.maxUses && coupon.usedCount >= coupon.maxUses) {
      return res.status(400).json({ message: 'Coupon limit reached' });
    }
    if (coupon.minPurchase && amount < coupon.minPurchase) {
      return res.status(400).json({ message: 'Minimum purchase not met' });
    }
    
    const discount = coupon.type === 'percentage' 
      ? amount * (coupon.discount / 100)
      : coupon.discount;
    
    coupon.usedCount += 1;
    await user.save();
    
    res.json({ discount, finalAmount: amount - discount });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.addLoyaltyPoints = async (req, res) => {
  try {
    const { points } = req.body;
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { $inc: { loyaltyPoints: points } },
      { new: true }
    );
    res.json({ loyaltyPoints: user.loyaltyPoints });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.redeemPoints = async (req, res) => {
  try {
    const { points } = req.body;
    const user = await User.findById(req.user._id);
    
    if (user.loyaltyPoints < points) {
      return res.status(400).json({ message: 'Insufficient points' });
    }
    
    const discount = points * 0.1; // 1 point = ₦0.10
    user.loyaltyPoints -= points;
    await user.save();
    
    res.json({ discount, remainingPoints: user.loyaltyPoints });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getSellerAnalytics = async (req, res) => {
  try {
    const products = await Product.find({ seller: req.user._id });
    const orders = await Order.find({ seller: req.user._id });
    
    const totalProducts = products.length;
    const totalViews = products.reduce((sum, p) => sum + p.views, 0);
    const totalFavorites = products.reduce((sum, p) => sum + p.favorites.length, 0);
    const lowStock = products.filter(p => p.stock <= p.lowStockAlert);
    const totalOrders = orders.length;
    const totalRevenue = orders.reduce((sum, o) => sum + (o.amount || 0), 0);
    
    res.json({
      totalProducts,
      totalViews,
      totalFavorites,
      lowStock: lowStock.length,
      lowStockProducts: lowStock,
      totalOrders,
      totalRevenue,
      avgOrderValue: totalOrders > 0 ? totalRevenue / totalOrders : 0
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateStock = async (req, res) => {
  try {
    const { productId, stock } = req.body;
    const product = await Product.findByIdAndUpdate(
      productId,
      { stock },
      { new: true }
    );
    
    if (stock <= product.lowStockAlert) {
      const user = await User.findById(product.seller);
      user.notifications.push({
        type: 'Low Stock',
        message: `${product.title} is running low on stock (${stock} left)`,
        link: `/product/${product._id}`
      });
      await user.save();
    }
    
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createShop = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    user.shops.push(req.body);
    await user.save();
    res.json(user.shops);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getShops = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    res.json(user.shops);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
