const httpStatus = require("http-status");
const { Product, Platform } = require("../../models");

const all = async (id) => {
  try {

    const products = await Product.find({ categoryId: { $in: [id] } });
    const newProducts = await Promise.all(products.map(async p => {
      const platform = await Platform.findById(p.platformId)
      return { ...p._doc, platformImage: platform.platformImage }
    }))

    return {
      status: httpStatus.OK,
      data: newProducts
    };
  } catch (error) {
    console.log(error);
    return { status: httpStatus.INTERNAL_SERVER_ERROR, message: error };
  }
};

const products = async (id) => {
  try {
    console.log('id', id);
    const products = await Product.find({ categoryId: { $in: [id] }, status: true });
    const newProducts = await Promise.all(products.map(async p => {
      const platform = await Platform.findById(p.platformId)
      return { ...p._doc, platformImage: platform.platformImage }
    }))

    return {
      status: httpStatus.OK,
      data: newProducts,
    };
  } catch (error) {
    console.log(error);
    return { status: httpStatus.INTERNAL_SERVER_ERROR, message: error };
  }
};

module.exports = {
  all,
  products,
};
