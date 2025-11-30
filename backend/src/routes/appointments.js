// /api/appointments routes
const router = require('express').Router();
const { auth } = require('../middleware/auth');
const { bookAppointment, listMyAppointments, updateStatus } = require('../controllers/appointmentController');

router.post('/book', auth, bookAppointment);
router.get('/me', auth, listMyAppointments);
router.patch('/:id/status', auth, updateStatus);

module.exports = router;