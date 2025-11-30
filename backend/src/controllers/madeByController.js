// MadeBy controller: returns developer info document
const MadeBy = require('../models/MadeBy');

exports.getMadeBy = async (req, res) => {
  try {
    const doc = await MadeBy.findOne().sort({ createdAt: -1 });
    if (!doc) return res.status(404).json({ message: 'MadeBy document not found' });
    res.json(doc);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};