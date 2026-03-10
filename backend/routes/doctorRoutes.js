const express = require("express");

const router = express.Router();

const {
  addAvailability,
  getMyAvailability,
    getDoctorAppointments
} = require("../controllers/doctorController");

const { verifyToken, isDoctor } = require("../middleware/authMiddleware");

router.post("/add-availability", verifyToken, isDoctor, addAvailability);

router.get("/my-slots", verifyToken, isDoctor, getMyAvailability);

router.get("/appointments", verifyToken, isDoctor, getDoctorAppointments);

module.exports = router;