// Appointment controller: booking and listing
const Appointment = require('../models/Appointment');
const DoctorProfile = require('../models/DoctorProfile');

exports.bookAppointment = async (req, res) => {
  try {
    const { doctorId, date, time, mode } = req.body;
    const doctorProfile = await DoctorProfile.findById(doctorId);
    if (!doctorProfile) return res.status(404).json({ message: 'Doctor not found' });
    const slotExists = doctorProfile.availableSlots.some((s) => s.date === date && s.time === time);
    if (!slotExists) return res.status(400).json({ message: 'Selected slot not available' });
    const appointment = await Appointment.create({
      patient: req.user.id,
      doctor: doctorProfile.user,
      date,
      time,
      mode,
      status: 'pending'
    });
    // Remove booked slot from doctor's available slots
    doctorProfile.availableSlots = doctorProfile.availableSlots.filter((s) => !(s.date === date && s.time === time));
    await doctorProfile.save();
    res.status(201).json(appointment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.listMyAppointments = async (req, res) => {
  try {
    const role = req.user.role;
    const filter = role === 'patient' ? { patient: req.user.id } : { doctor: req.user.id };
    const appts = await Appointment.find(filter).populate('patient', 'name').populate('doctor', 'name');
    res.json(appts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateStatus = async (req, res) => {
  try {
    const { status } = req.body; // confirmed / cancelled
    const appt = await Appointment.findById(req.params.id);
    if (!appt) return res.status(404).json({ message: 'Appointment not found' });
    appt.status = status || appt.status;
    await appt.save();
    res.json(appt);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};