const Prescription = require("../models/Prescription");

// Create a new prescription
exports.createPrescription = async (req, res) => {
  try {
    const prescription = await Prescription.create(req.body);
    res.status(201).json(prescription);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all prescriptions
exports.getAllPrescriptions = async (req, res) => {
  try {
    const prescriptions = await Prescription.find()
      .populate("patient", "name phone")
      .populate("doctor", "name specialization")
      .sort({ date: -1 });
    res.json(prescriptions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a single prescription by ID
exports.getPrescriptionById = async (req, res) => {
  try {
    const prescription = await Prescription.findById(req.params.id)
      .populate("patient", "name phone")
      .populate("doctor", "name specialization");
    if (!prescription)
      return res.status(404).json({ error: "Prescription not found" });
    res.json(prescription);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get prescriptions by patient ID
exports.getPrescriptionsByPatient = async (req, res) => {
  try {
    const prescriptions = await Prescription.find({
      patient: req.params.patientId,
    })
      .populate("doctor", "name specialization")
      .sort({ date: -1 });
    res.json(prescriptions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a prescription
exports.updatePrescription = async (req, res) => {
  try {
    const prescription = await Prescription.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!prescription)
      return res.status(404).json({ error: "Prescription not found" });
    res.json(prescription);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete a prescription
exports.deletePrescription = async (req, res) => {
  try {
    const prescription = await Prescription.findByIdAndDelete(req.params.id);
    if (!prescription)
      return res.status(404).json({ error: "Prescription not found" });
    res.json({ message: "Prescription deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
