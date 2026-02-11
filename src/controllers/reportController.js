const Report = require('../models/Report');

exports.createReport = async (req, res) => {
  try {
    const { reportedUser, reportedProduct, reason, description } = req.body;

    const report = await Report.create({
      reporter: req.user._id,
      reportedUser,
      reportedProduct,
      reason,
      description
    });

    res.status(201).json(report);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getReports = async (req, res) => {
  try {
    const reports = await Report.find()
      .populate('reporter', 'name email')
      .populate('reportedUser', 'name email')
      .populate('reportedProduct', 'title')
      .sort('-createdAt');
    res.json(reports);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateReportStatus = async (req, res) => {
  try {
    const report = await Report.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    res.json(report);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
