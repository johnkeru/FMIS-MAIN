const mongoose = require("mongoose");

const boxSchema = mongoose.Schema({
  name: String,
  findPosition: String, // findPosition is use for getting the real position title in sir joseph's api
  displayPosition: String, // this one is for displaying in the UI
  department: String,
  division: String,
  isPayeeDepartmentDependent: { type: Boolean, default: false },
  isPayeeDivisionDependent: { type: Boolean, default: false },
});

const positionSchema = mongoose.Schema({
  boxes: [boxSchema], // show this when type is 'position'
  positionType: String,
});

// Responsibility Center schema
const responsibilityCenterSchema = mongoose.Schema({
  particular: { type: String, required: true }, // IMO, CO, etc.
  positionTypes: [positionSchema],
});

// Transaction Type schema
const setSignatorychema = mongoose.Schema({
  reportName: String, // to filter what transactions types to show
  transactionType: { type: String, required: true, unique: true }, // e.g. "Disbursement Voucher"
  responsibilityCenters: { type: [responsibilityCenterSchema], required: true },

  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Set_Signatory", setSignatorychema);
