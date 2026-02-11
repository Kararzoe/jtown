const express = require('express');
const { createReport, getReports, updateReportStatus } = require('../controllers/reportController');
const { protect, restrictTo } = require('../middleware/auth');

const router = express.Router();

router.post('/', protect, createReport);
router.get('/', protect, restrictTo('admin'), getReports);
router.put('/:id/status', protect, restrictTo('admin'), updateReportStatus);

module.exports = router;
