const Doctor = require("../models/Doctor");

exports.getPendingDoctors = async (req, res) => {

  try {

    const doctors = await Doctor.find({ status: "pending" });

    res.json(doctors);

  } catch (error) {

    res.status(500).json({ error: error.message });

  }

};

exports.approveDoctor = async (req, res) => {

  try {

    const doctor = await Doctor.findByIdAndUpdate(
      req.params.id,
      { status: "approved" },
      { new: true }
    );

    res.json({
      message: "Doctor approved successfully",
      doctor
    });

  } catch (error) {

    res.status(500).json({ error: error.message });

  }

};
exports.rejectDoctor = async (req, res) => {

  try {

    const doctor = await Doctor.findByIdAndUpdate(
      req.params.id,
      { status: "rejected" },
      { new: true }
    );

    res.json({
      message: "Doctor rejected",
      doctor
    });

  } catch (error) {

    res.status(500).json({ error: error.message });

  }

};