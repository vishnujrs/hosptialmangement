const MedicalRecord = require("../models/MedicalRecord");

// Create a new medical record
exports.createMedicalRecord = async (req, res) => {
  try {
    const record = await MedicalRecord.create(req.body);
    res.status(201).json(record);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all medical records
exports.getAllMedicalRecords = async (req, res) => {
  try {
    const records = await MedicalRecord.find()
      .populate("patient", "name phone")
      .populate("doctor", "name specialization")
      .sort({ date: -1 });
    res.json(records);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a single medical record by ID
exports.getMedicalRecordById = async (req, res) => {
  try {
    const record = await MedicalRecord.findById(req.params.id)
      .populate("patient", "name phone")
      .populate("doctor", "name specialization");
    if (!record)
      return res.status(404).json({ error: "Medical record not found" });
    res.json(record);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get medical records by patient ID
exports.getRecordsByPatient = async (req, res) => {
  try {
    const records = await MedicalRecord.find({ patient: req.params.patientId })
      .populate("doctor", "name specialization")
      .sort({ date: -1 });
    res.json(records);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a medical record
exports.updateMedicalRecord = async (req, res) => {
  try {
    const record = await MedicalRecord.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!record)
      return res.status(404).json({ error: "Medical record not found" });
    res.json(record);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete a medical record
exports.deleteMedicalRecord = async (req, res) => {
  try {
    const record = await MedicalRecord.findByIdAndDelete(req.params.id);
    if (!record)
      return res.status(404).json({ error: "Medical record not found" });
    res.json({ message: "Medical record deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
