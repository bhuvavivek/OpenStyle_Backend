const { model, Schema } = require("mongoose");
const { createHmac, randomBytes } = require("node:crypto");
const { generateToken } = require("../../../shared/services/authentication");

const vendorSchema = new Schema(
  {
    shopName: {
      type: String,
      required: true,
    },
    emailAddress: {
      type: String,
      required: true,
      unique: true,
    },
    phoneNumber: {
      type: Number,
      required: true,
      unique: true,
    },
    salt: {
      type: String,
    },
    password: {
      type: String,
      required: true,
    },
    totalSeats: {
      type: Number,
      required: true,
    },
    shopType: {
      type: String,
      enum: ["Salon", "Parlour", "Unisex Salon", "Spa"],
      required: true,
    },
    shopAddress: {
      type: String,
      required: true,
    },
    images: {
      type: [String],
    },
  },
  { timestamps: true }
);

vendorSchema.pre("save", function (next) {
  const vendor = this;
  if (!vendor.isModified("password")) return;

  const salt = randomBytes(16).toString();
  const hashPassword = createHmac("sha256", salt)
    .update(vendor.password)
    .digest("hex");

  this.salt = salt;
  this.password = hashPassword;

  next();
});

vendorSchema.static(
  "matchPasswordAndGenerateToken",
  async function (email, password) {
    const vendor = await this.findOne({ emailAddress: email });

    if (!vendor) throw new Error("Vendor not found");

    const salt = vendor.salt;
    const hashedPassword = vendor.password;

    const userProvidedHash = createHmac("sha256", salt)
      .update(password)
      .digest("hex");

    if (hashedPassword !== userProvidedHash)
      throw new Error("Incorrect Password");

    const token = generateToken(vendor);

    return token;
  }
);

const Vendor = model("Vendor", vendorSchema);
module.exports = Vendor;
