// /api/doctors routes
const router = require('express').Router();
const { auth, requireRole } = require('../middleware/auth');
const { createOrUpdateProfile, addSlot, listDoctors, getDoctor } = require('../controllers/doctorController');

router.get('/', listDoctors);
router.get('/:id', getDoctor);
router.post('/profile', auth, requireRole('doctor'), createOrUpdateProfile);
router.post('/slots', auth, requireRole('doctor'), addSlot);

module.exports = router;