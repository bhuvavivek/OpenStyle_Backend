const { Schema, model } = require("mongoose");

const aboutSchema = new Schema({
  vendor: {
    type: Schema.Types.ObjectId,
    ref: "Vendor",
    required: true,
  },
  aboutText: {
    type: String,
    required: true,
    default: "Start Typing Here...",
  },
  aminities: {
    wifi: {
      type: Boolean,
      default: false,
    },
    ac: {
      type: Boolean,
      default: false,
    },
    tv: {
      type: Boolean,
      default: false,
    },
    beverage: {
      type: Boolean,
      default: false,
    },
    parking: {
      type: Boolean,
      default: false,
    },
    cardPayment: {
      type: Boolean,
      default: false,
    },
    ccTV: {
      type: Boolean,
      default: false,
    },
    petFriendly: {
      type: Boolean,
      default: false,
    },
    petFriendly: {
      type: Boolean,
      default: false,
    },
    selfiePoint: {
      type: Boolean,
      default: false,
    },
    music: {
      type: Boolean,
      default: false,
    },
  },
});

const About = model("About", aboutSchema);

module.exports = About;
