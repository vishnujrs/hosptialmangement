const mongoose = require("mongoose");

const billSchema = new mongoose.Schema(
  {
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patient",
      required: true,
    },
    admission: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admission",
    },
    items: [
      {
        description: { type: String, required: true },
        category: {
          type: String,
          enum: [
            "Consultation",
            "Room Charges",
            "Medication",
            "Lab Tests",
            "Surgery",
            "Other",
          ],
        },
        amount: { type: Number, required: true },
      },
    ],
    totalAmount: { type: Number, required: true },
    discount: { type: Number, default: 0 },
    tax: { type: Number, default: 0 },
    netAmount: { type: Number, required: true },
    paymentStatus: {
      type: String,
      enum: ["Pending", "Partial", "Paid"],
      default: "Pending",
    },
    paymentMethod: {
      type: String,
      enum: ["Cash", "Card", "Insurance", "UPI", "Bank Transfer"],
    },
    date: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Bill", billSchema);
