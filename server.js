const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./database");

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/patients", require("./routes/patientRoutes"));
app.use("/api/doctors", require("./routes/doctorRoutes"));
app.use("/api/appointments", require("./routes/appointmentRoutes"));
app.use("/api/admissions", require("./routes/admissionRoutes"));
app.use("/api/medical-records", require("./routes/medicalRecordRoutes"));
app.use("/api/prescriptions", require("./routes/prescriptionRoutes"));
app.use("/api/bills", require("./routes/billRoutes"));

// Root endpoint
app.get("/", (req, res) => {
  res.json({ message: "Hospital Management System API" });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port http/localhost ${PORT}`));
