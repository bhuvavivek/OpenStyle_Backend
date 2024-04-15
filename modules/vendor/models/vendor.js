const { model, Schema } = require("mongoose");
const { createHmac, randomBytes } = require("node:crypto");
const { generateToken } = require("../../shared/services/authentication");
const VendorReview = require("../../shared/models/vendorReviews");

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
    lattitude: {
      type: String,
      required: true,
    },
    longitude: {
      type: String,
      required: true,
    },

    upcomingAppointment: {
      type: Number,
      default: 0,
    },
    todayAppointmentCount: {
      type: Number,
      default: 0,
    },
    totalCompletedAppointmentCount: {
      type: Number,
      default: 0,
    },
    vendorProfileImage: {
      type: String,
      default: "",
    },
    averageRating: {
      type: Number,
      default: 0,
    },
    ratingsCount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

vendorSchema.pre("save", function (next) {
  try {
    const vendor = this;
    if (!vendor.isModified("password")) return next();

    const salt = randomBytes(16).toString();
    const hashPassword = createHmac("sha256", salt)
      .update(vendor.password)
      .digest("hex");

    this.salt = salt;
    this.password = hashPassword;

    next();
  } catch (error) {
    next(error);
  }
});

vendorSchema.static(
  "matchPasswordAndGenerateToken",
  async function (phone, password) {
    const vendor = await this.findOne({ phoneNumber: phone });

    if (!vendor) throw new Error("Vendor not found");

    const salt = vendor.salt;
    const hashedPassword = vendor.password;

    const userProvidedHash = createHmac("sha256", salt)
      .update(password)
      .digest("hex");

    if (hashedPassword !== userProvidedHash)
      throw new Error("Incorrect Password");

    const token = generateToken(vendor, "VENDOR");

    return token;
  }
);

vendorSchema.pre("remove", async function (next) {
  try {
    await VendorReview.deleteMany({ vendor: this._id });
    next();
  } catch (error) {
    console.error("Error in pre-remove middleware:", error);
    throw error;
  }
});

const Vendor = model("Vendor", vendorSchema);
module.exports = Vendor;
