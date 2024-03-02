const { Schema, model } = require("mongoose");

const bankAccountSchema = new Schema({
  accountHolderName: {
    type: String,
    required: { value: true, message: "Account Holder Name is required" },
  },
  accountNumber: {
    type: String,
    required: { value: true, message: "Account Number is required" },
  },
  bankName: {
    type: String,
    required: { value: true, message: "Bank Name is required" },
  },
  branchName: {
    type: String,
    required: { value: true, message: "Branch Name is required" },
  },
  ifscCode: {
    type: String,
    required: { value: true, message: "IFSC Code is required" },
  },
  vendor: {
    type: Schema.Types.ObjectId,
    ref: "Vendor",
    required: { value: true, message: "vendorId  is required" },
  },
});

const BankAccount = model("BankAccount", bankAccountSchema);

module.exports = BankAccount;
