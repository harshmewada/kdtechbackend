const mongoose = require("mongoose");
const { toJSON, paginate } = require("./plugins");

const categorySchema = mongoose.Schema(
  {
    productName: {
      type: String,
      required: true,
    },
    productImage: {
      type: String,
      required: false,
    },
    productDescription: {
      type: String,
      required: false,
    },
    basePrice: {
      type: Number,
      required: false,
    },
    salePrice: {
      type: Number,
      required: false,
    },
    platformId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "platforms",
      required: false,
    },
    discount: {
      type: Number,
      required: false
    },
    isExpired: {
      type: Boolean,
      default: false
    },
    categoryId: [
      {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "categories",
        required: false,
      }
    ],
    productUrl: {
      type: String,
      required: true,
    },
    expireAt: {
      type: Date,
      required: false
    },
    isManyProduct: {
      type: Boolean,
      default: false,
    },
    manyProductTitle: {
      type: String,
      required: false,
    },
    viewCount: {
      type: Number,
      default: 0
    },
    postedBy: {
      type: String,
      required: false,
    },
    postedById: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "users",
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
categorySchema.plugin(toJSON);
categorySchema.plugin(paginate);

const Product = mongoose.model("Product", categorySchema);

module.exports = Product;
