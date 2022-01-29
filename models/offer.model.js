const mongoose = require("mongoose");
const { toJSON, paginate } = require("./plugins");

const offerSchema = mongoose.Schema(
  {
    offerName: {
      type: String,
      required: true,
    },
    offerImage: {
      type: String,
      required: false,
    },
    offerLink: {
      type: String,
      required: false,
    },
    status: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
offerSchema.plugin(toJSON);
offerSchema.plugin(paginate);

const Offer = mongoose.model("Offer", offerSchema);

module.exports = Offer;
