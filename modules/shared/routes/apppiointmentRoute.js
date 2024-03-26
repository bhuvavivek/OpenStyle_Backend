const { Router } = require("express");
const AppointmentController = require("../controllers/appointControllers/appointmentController");

const router = Router();

router.post("/setSummery", AppointmentController.setSummery);
router.get("/getSummery", AppointmentController.getSummery);
router.delete("/deleteSummery", AppointmentController.destroySummery);

module.exports = router;
