const Admission = require("../models/Admission");

// Create a new admission
exports.createAdmission = async (req, res) => {
  try {
    const admission = await Admission.create(req.body);
    res.status(201).json(admission);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all admissions
exports.getAllAdmissions = async (req, res) => {
  try {
    const admissions = await Admission.find()
      .populate("patient", "name phone")
      .populate("doctor", "name specialization")
      .sort({ admissionDate: -1 });
    res.json(admissions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a single admission by ID
exports.getAdmissionById = async (req, res) => {
  try {
    const admission = await Admission.findById(req.params.id)
      .populate("patient", "name phone")
      .populate("doctor", "name specialization");
    if (!admission)
      return res.status(404).json({ error: "Admission not found" });
    res.json(admission);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update an admission
exports.updateAdmission = async (req, res) => {
  try {
    const admission = await Admission.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!admission)
      return res.status(404).json({ error: "Admission not found" });
    res.json(admission);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete an admission
exports.deleteAdmission = async (req, res) => {
  try {
    const admission = await Admission.findByIdAndDelete(req.params.id);
    if (!admission)
      return res.status(404).json({ error: "Admission not found" });
    res.json({ message: "Admission deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
