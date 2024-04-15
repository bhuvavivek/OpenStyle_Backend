const { model, Schema } = require("mongoose");

const userWalletSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    require: true,
  },
  balance: {
    type: Number,
    default: 0,
    require: true,
  },
});

const vendorWalletSchema = new Schema({
  vendor: {
    type: Schema.Types.ObjectId,
    ref: "Vendor",
    require: true,
  },
  balance: {
    type: Number,
    default: 0,
    require: true,
  },
});

const UserWallet = model("UserWallet", userWalletSchema);
const VendorWallet = model("VendorWallet", vendorWalletSchema);

module.exports = { UserWallet, VendorWallet };
