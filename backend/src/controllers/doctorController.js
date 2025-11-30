// Doctor controller: profile CRUD and slot management
const DoctorProfile = require('../models/DoctorProfile');
const User = require('../models/User');

exports.createOrUpdateProfile = async (req, res) => {
  try {
    const { specialization, department, bio } = req.body;
    const existing = await DoctorProfile.findOne({ user: req.user.id });
    if (existing) {
      existing.specialization = specialization ?? existing.specialization;
      existing.department = department ?? existing.department;
      existing.bio = bio ?? existing.bio;
      await existing.save();
      return res.json(existing);
    }
    const profile = await DoctorProfile.create({ user: req.user.id, specialization, department, bio });
    res.status(201).json(profile);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.addSlot = async (req, res) => {
  try {
    const { date, time } = req.body;
    const profile = await DoctorProfile.findOne({ user: req.user.id });
    if (!profile) return res.status(404).json({ message: 'Profile not found' });
    profile.availableSlots.push({ date, time });
    await profile.save();
    res.status(201).json(profile);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.listDoctors = async (req, res) => {
  try {
    const { department } = req.query;
    const filter = department ? { department } : {};
    const doctors = await DoctorProfile.find(filter).populate('user', 'name email role');
    res.json(doctors);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getDoctor = async (req, res) => {
  try {
    const doc = await DoctorProfile.findById(req.params.id).populate('user', 'name email role');
    if (!doc) return res.status(404).json({ message: 'Doctor not found' });
    res.json(doc);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};