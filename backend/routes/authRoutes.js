const express = require("express");

const router = express.Router();

const {
  registerPatient,
  registerDoctor,
  registerAdmin,
  login
} = require("../controllers/authController");

router.post("/register-patient", registerPatient);

router.post("/register-doctor", registerDoctor);

router.post("/register-admin", registerAdmin);

router.post("/login", login);

module.exports = router;