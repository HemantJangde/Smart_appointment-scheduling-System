const Doctor = require("../models/Doctor");
const Availability = require("../models/Availability");
const Appointment = require("../models/Appointment");
exports.getDoctors = async (req, res) => {

  try {

    const doctors = await Doctor.find({ status: "approved" });

    res.json(doctors);

  } catch (error) {

    res.status(500).json({ error: error.message });

  }

};

exports.getAvailableSlots = async (req, res) => {

  try {

    const { doctorId } = req.params;

    const availability = await Availability.find({
      doctor: doctorId
    });

    const availableSlots = availability.map(day => ({
      date: day.date,
      slots: day.slots.filter(slot => !slot.isBooked)
    }));

    res.json(availableSlots);

  } catch (error) {

    res.status(500).json({ error: error.message });

  }

};

exports.bookAppointment = async (req, res) => {

  try {

    const { doctorId, date, time } = req.body;

    const availability = await Availability.findOne({
      doctor: doctorId,
      date: date
    });

    if (!availability) {
      return res.status(404).json({
        message: "No availability found"
      });
    }

    const slot = availability.slots.find(s => s.time === time);

    if (!slot || slot.isBooked) {
      return res.status(400).json({
        message: "Slot already booked"
      });
    }

    // mark slot booked
    slot.isBooked = true;

    await availability.save();

    const appointment = new Appointment({
      patient: req.user.id,
      doctor: doctorId,
      date,
      time
    });

    await appointment.save();

    res.json({
      message: "Appointment booked successfully",
      appointment
    });

  } catch (error) {

    res.status(500).json({ error: error.message });

  }

};

exports.getMyAppointments = async (req, res) => {

  try {

    const appointments = await Appointment.find({
      patient: req.user.id
    })
    .populate("doctor", "name specialization")
    .sort({ date: 1 });

    res.json(appointments);

  } catch (error) {

    res.status(500).json({ error: error.message });

  }

};

exports.cancelAppointment = async (req, res) => {

  try {

    const appointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      { status: "cancelled" },
      { new: true }
    );

    res.json({
      message: "Appointment cancelled successfully",
      appointment
    });

  } catch (error) {

    res.status(500).json({ error: error.message });

  }

};

exports.addAvailability = async (req, res) => {

  try {

    const { date, startTime, endTime } = req.body;

    const slots = [];

    let start = parseInt(startTime.split(":")[0]) * 60 + parseInt(startTime.split(":")[1]);
    let end = parseInt(endTime.split(":")[0]) * 60 + parseInt(endTime.split(":")[1]);

    while (start < end) {

      let hours = Math.floor(start / 60);
      let minutes = start % 60;

      let time =
        String(hours).padStart(2, "0") +
        ":" +
        String(minutes).padStart(2, "0");

      slots.push({ time });

      start += 15; // 15 minute slot
    }

    const availability = new Availability({
      doctor: req.user.id,
      date,
      slots
    });

    await availability.save();

    res.json({
      message: "Availability with slots created",
      availability
    });

  } catch (error) {

    res.status(500).json({ error: error.message });

  }

};