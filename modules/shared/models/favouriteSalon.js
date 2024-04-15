const { Schema, model } = require("mongoose");

const favouriteSalonSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    require: true,
  },
  salon: {
    type: Schema.Types.ObjectId,
    ref: "Vendor",
    require: true,
  },
  addedAt: {
    type: Date,
    default: Date.now,
  },
});

favouriteSalonSchema.index({ user: 1, salon: 1 }, { unique: true });

const FavouriteSalon = model("FavouriteSalon", favouriteSalonSchema);

module.exports = FavouriteSalon;
