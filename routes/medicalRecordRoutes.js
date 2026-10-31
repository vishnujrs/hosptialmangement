const express = require("express");
const router = express.Router();
const {
  createMedicalRecord,
  getAllMedicalRecords,
  getMedicalRecordById,
  getRecordsByPatient,
  updateMedicalRecord,
  deleteMedicalRecord,
} = require("../controllers/medicalRecordController");

router.post("/", createMedicalRecord);
router.get("/", getAllMedicalRecords);
router.get("/:id", getMedicalRecordById);
router.get("/patient/:patientId", getRecordsByPatient);
router.put("/:id", updateMedicalRecord);
router.delete("/:id", deleteMedicalRecord);

module.exports = router;
