const { model, Schema } = require("mongoose");

const userWalletSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  balance: {
    type: Number,
    default: 0,
  },
});

const vendorWalletSchema = new Schema({
  vendor: {
    type: Schema.Types.ObjectId,
    ref: "Vendor",
    required: true,
  },
  balance: {
    type: Number,
    default: 0,
  },
});

const UserWallet = model("UserWallet", userWalletSchema);
const VendorWallet = model("VendorWallet", vendorWalletSchema);

module.exports = { UserWallet, VendorWallet };
