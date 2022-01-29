const mongoose = require("mongoose");
const { toJSON, paginate } = require("./plugins");

const platformSchema = mongoose.Schema(
  {
    platformName: {
      type: String,
      required: true,
    },
    platformImage: {
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
platformSchema.plugin(toJSON);
platformSchema.plugin(paginate);

const Platform = mongoose.model("Platform", platformSchema);

module.exports = Platform;
