const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    specialization: { type: String, required: true },
    qualification: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String },
    experience: { type: Number }, // in years
    consultationFee: { type: Number, required: true },
    availability: {
      days: [String], // e.g. ["Monday", "Wednesday", "Friday"]
      startTime: String, // e.g. "09:00"
      endTime: String, // e.g. "17:00"
    },
    status: {
      type: String,
      enum: ["Active", "On Leave", "Inactive"],
      default: "Active",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Doctor", doctorSchema);
