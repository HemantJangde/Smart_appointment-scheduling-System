const Availability = require("../models/Availability");
const Appointment = require("../models/Appointment");

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

exports.getMyAvailability = async (req, res) => {

  try {

    const slots = await Availability.find({
      doctor: req.user.id
    });

    res.json(slots);

  } catch (error) {

    res.status(500).json({ error: error.message });

  }

};

exports.getDoctorAppointments = async (req, res) => {

  try {

    const appointments = await Appointment.find({
      doctor: req.user.id
    })
    .populate("patient", "name email")
    .sort({ date: 1 });

    res.json(appointments);

  } catch (error) {

    res.status(500).json({ error: error.message });

  }

};