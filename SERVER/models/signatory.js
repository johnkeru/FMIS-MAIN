// this will be the table for overall signatories

const mongoose = require("mongoose");

const boxSchema = mongoose.Schema({
  boxName: String,
  fullName: String,
  positionTitle: String,
});

const signatorySchema = mongoose.Schema({
  transactionType: String,
  reportName: String,
  payee: String, // fullname of the payee. default is current user login
  positionType: String,
  payeeDigits: Number, // 6 digits, which is the payee's unique identification number. default is current user login
  preparedDigits: Number, // 6 digits, which is the payee's unique identification number. default is current user login
  boxA: boxSchema,
  boxB: boxSchema,
  boxC: boxSchema,
  boxD: boxSchema,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Signatory", signatorySchema);
