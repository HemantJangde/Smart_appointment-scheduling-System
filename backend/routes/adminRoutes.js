const express = require("express");

const router = express.Router();

const {
  getPendingDoctors,
  approveDoctor,
  rejectDoctor
} = require("../controllers/adminController");

const { verifyToken, isAdmin } = require("../middleware/authMiddleware");

router.get("/doctors", verifyToken, isAdmin, getPendingDoctors);

router.put("/approve-doctor/:id", verifyToken, isAdmin, approveDoctor);

router.put("/reject-doctor/:id", verifyToken, isAdmin, rejectDoctor);

module.exports = router;