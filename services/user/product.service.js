const httpStatus = require("http-status");
const { ObjectId } = require("mongodb");
const { Product, Platform, Category } = require("../../models");

const all = async (id) => {
  try {

    const products = await Product.findById(id);
    const platform = await Platform.findById(products.platformId)
    const categories = await Promise.all(products.categoryId.map(async c => {
      const cate = await Category.findById(c)
      return cate.categoryName
    }))
    await Product.findByIdAndUpdate(id, { $inc: { viewCount: 1 } })
    return {
      status: httpStatus.OK,
      data: { ...products._doc, categories: categories, platformImage: platform.platformImage }
    };
  } catch (error) {
    console.log(error);
    return { status: httpStatus.INTERNAL_SERVER_ERROR, message: error };
  }
};

module.exports = {
  all,
};
