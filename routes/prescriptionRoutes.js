const express = require("express");
const router = express.Router();
const {
  createPrescription,
  getAllPrescriptions,
  getPrescriptionById,
  getPrescriptionsByPatient,
  updatePrescription,
  deletePrescription,
} = require("../controllers/prescriptionController");

router.post("/", createPrescription);
router.get("/", getAllPrescriptions);
router.get("/:id", getPrescriptionById);
router.get("/patient/:patientId", getPrescriptionsByPatient);
router.put("/:id", updatePrescription);
router.delete("/:id", deletePrescription);

module.exports = router;
