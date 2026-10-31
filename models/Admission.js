const mongoose = require("mongoose");

const admissionSchema = new mongoose.Schema(
  {
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patient",
      required: true,
    },
    doctor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor",
      required: true,
    },
    admissionDate: { type: Date, required: true, default: Date.now },
    dischargeDate: { type: Date },
    roomNumber: { type: String, required: true },
    roomType: {
      type: String,
      enum: ["General", "Semi-Private", "Private", "ICU"],
      required: true,
    },
    reason: { type: String, required: true },
    status: {
      type: String,
      enum: ["Admitted", "Discharged", "Transferred"],
      default: "Admitted",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Admission", admissionSchema);
