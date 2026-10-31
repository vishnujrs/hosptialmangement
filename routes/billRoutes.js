const express = require("express");
const router = express.Router();
const {
  createBill,
  getAllBills,
  getBillById,
  getBillsByPatient,
  updateBill,
  deleteBill,
} = require("../controllers/billController");

router.post("/", createBill);
router.get("/", getAllBills);
router.get("/:id", getBillById);
router.get("/patient/:patientId", getBillsByPatient);
router.put("/:id", updateBill);
router.delete("/:id", deleteBill);

module.exports = router;
