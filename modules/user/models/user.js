const { Schema, model } = require("mongoose");
const { createHmac, randomBytes } = require("node:crypto");
const { generateToken } = require("../../shared/services/authentication");

const userSchema = new Schema(
  {
    fullName: {
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
      minlength: 6,
    },
    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
      default: "Other",
      required: true,
    },
    wallet: {
      type: Number,
      default: 0.0,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", function (next) {
  const user = this;

  if (!user.isModified("password")) return;

  const salt = randomBytes(16).toString();
  const hashPassword = createHmac("sha256", salt)
    .update(user.password)
    .digest("hex");

  this.salt = salt;
  this.password = hashPassword;
  next();
});

userSchema.static(
  "matchPasswordAndGenerateToken",
  async function (phone, password) {
    const user = await this.findOne({ phoneNumber: phone });
    if (!user) throw new Error("user not found");

    const salt = user.salt;
    const hashedPassword = user.password;

    const userProvidedHash = createHmac("sha256", salt)
      .update(password)
      .digest("hex");

    if (hashedPassword !== userProvidedHash)
      throw new Error("Incorrect Password");

    // for plan jsobject we can use both user._doc or user.toObject() but batter to use toObject() method becuase _docs is internal property of mongoose documents and it may change in future versions
    const token = generateToken(user, "USER");
    return token;
  }
);

const User = model("User", userSchema);

module.exports = User;
