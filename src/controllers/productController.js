const Product = require('../models/Product');
const cloudinary = require('../config/cloudinary');
const streamifier = require('streamifier');

exports.createProduct = async (req, res) => {
  try {
    const imageUrls = [];
    
    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        const result = await new Promise((resolve, reject) => {
          const uploadStream = cloudinary.uploader.upload_stream(
            { folder: 'jos-marketplace' },
            (error, result) => {
              if (error) reject(error);
              else resolve(result);
            }
          );
          streamifier.createReadStream(file.buffer).pipe(uploadStream);
        });
        imageUrls.push(result.secure_url);
      }
    }

    const product = await Product.create({
      ...req.body,
      images: imageUrls,
      seller: req.user._id,
      tags: req.body.tags ? JSON.parse(req.body.tags) : []
    });

    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getProducts = async (req, res) => {
  try {
    const { category, location, condition, minPrice, maxPrice, search, sort } = req.query;
    const filter = { status: 'active' };

    if (category) filter.category = category;
    if (location) filter.location = location;
    if (condition) filter.condition = condition;
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }
    if (search) filter.$text = { $search: search };

    let query = Product.find(filter).populate('seller', 'name shopName phone isVerified rating');

    // Sorting
    if (sort === 'newest') query = query.sort('-createdAt');
    else if (sort === 'price-low') query = query.sort('price');
    else if (sort === 'price-high') query = query.sort('-price');
    else if (sort === 'popular') query = query.sort('-views');
    else if (sort === 'rating') query = query.sort('-seller.rating');

    const products = await query;
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate('seller', 'name shopName phone email location isVerified rating shopLogo');
    
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Track view
    product.views += 1;
    const today = new Date().setHours(0, 0, 0, 0);
    const todayView = product.viewsHistory.find(v => new Date(v.date).setHours(0, 0, 0, 0) === today);
    if (todayView) todayView.count += 1;
    else product.viewsHistory.push({ date: new Date(), count: 1 });
    await product.save();

    // Track recently viewed for user
    if (req.user) {
      const User = require('../models/User');
      await User.findByIdAndUpdate(req.user._id, {
        $pull: { recentlyViewed: product._id },
      });
      await User.findByIdAndUpdate(req.user._id, {
        $push: { recentlyViewed: { $each: [product._id], $position: 0, $slice: 20 } }
      });
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    if (product.seller.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    const updated = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    if (product.seller.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    await product.deleteOne();
    res.json({ message: 'Product deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.toggleFavorite = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    const index = product.favorites.indexOf(req.user._id);
    
    if (index > -1) {
      product.favorites.splice(index, 1);
    } else {
      product.favorites.push(req.user._id);
    }
    
    await product.save();
    res.json({ favorites: product.favorites });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getMyProducts = async (req, res) => {
  try {
    const products = await Product.find({ seller: req.user._id });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getFavorites = async (req, res) => {
  try {
    const products = await Product.find({ favorites: req.user._id }).populate('seller', 'name shopName phone');
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getProductAnalytics = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product.seller.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }
    res.json({
      views: product.views,
      viewsHistory: product.viewsHistory,
      favorites: product.favorites.length,
      engagement: product.views > 0 ? (product.favorites.length / product.views * 100).toFixed(2) : 0
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getTrending = async (req, res) => {
  try {
    const { period = '7d' } = req.query;
    const days = period === '24h' ? 1 : 7;
    const since = new Date(Date.now() - days * 24 * 60 * 60 * 1000);
    
    const products = await Product.find({ 
      status: 'active',
      createdAt: { $gte: since }
    })
    .populate('seller', 'name shopName')
    .sort('-views -favorites')
    .limit(20);
    
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getRelated = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    const related = await Product.find({
      _id: { $ne: product._id },
      category: product.category,
      status: 'active'
    })
    .populate('seller', 'name shopName')
    .limit(8);
    res.json(related);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.saveDraft = async (req, res) => {
  try {
    const draft = await Product.create({
      ...req.body,
      seller: req.user._id,
      isDraft: true,
      status: 'draft'
    });
    res.status(201).json(draft);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getDrafts = async (req, res) => {
  try {
    const drafts = await Product.find({ seller: req.user._id, isDraft: true });
    res.json(drafts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.bulkDelete = async (req, res) => {
  try {
    const { ids } = req.body;
    await Product.deleteMany({ _id: { $in: ids }, seller: req.user._id });
    res.json({ message: 'Products deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.bulkUpdate = async (req, res) => {
  try {
    const { ids, updates } = req.body;
    await Product.updateMany({ _id: { $in: ids }, seller: req.user._id }, updates);
    res.json({ message: 'Products updated' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.searchNearby = async (req, res) => {
  try {
    const { lat, lng, radius = 50 } = req.query;
    const products = await Product.find({
      status: 'active',
      'coordinates.lat': { $exists: true }
    }).populate('seller', 'name shopName');
    
    const nearby = products.filter(p => {
      if (!p.coordinates) return false;
      const distance = getDistance(
        { latitude: lat, longitude: lng },
        { latitude: p.coordinates.lat, longitude: p.coordinates.lng }
      );
      return distance <= radius;
    });
    
    res.json(nearby);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

function getDistance(coord1, coord2) {
  const R = 6371;
  const dLat = (coord2.latitude - coord1.latitude) * Math.PI / 180;
  const dLon = (coord2.longitude - coord1.longitude) * Math.PI / 180;
  const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(coord1.latitude * Math.PI / 180) * Math.cos(coord2.latitude * Math.PI / 180) *
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
}
