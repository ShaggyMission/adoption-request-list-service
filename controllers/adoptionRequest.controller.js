const AdoptionRequest = require('../models/adoptionRequest.model');

exports.listRequests = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = 10;

  try {
    const total = await AdoptionRequest.countDocuments();
    const requests = await AdoptionRequest.find()
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ dateRequested: -1 });

    res.json({
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalRequests: total,
      requests,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
