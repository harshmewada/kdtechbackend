const httpStatus = require("http-status");
const { ObjectId } = require("mongodb");
const { Product, Platform, Category } = require("../../models");
const { stableSort, getComparator } = require("../../utils/functions");

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

const searchProduct = async (data) => {
  const products = await Product.aggregate([
    { $match: { $or: [{ productName: { $regex: data, $options: 'i' } }], } },
  ])
  const searchProduct = await Promise.all(products.map(async p => {
    const platform = await Platform.findById(p.platformId)
    return {
      ...p, platformImage: platform.platformImage,
    }
  }))
  console.log('searchProduct', searchProduct);
  return ({ status: httpStatus.OK, data: searchProduct })
}

const trending = async (page) => {
  try {
    const rowsPerPage = 10
    const skip = page * rowsPerPage;
    const trending = await Product.find({ status: true }).skip(skip).limit(rowsPerPage).sort({ viewCount: -1 })
    const trendingDeals = await Promise.all(trending.map(async p => {
      const platform = await Platform.findById(p.platformId)
      return {
        ...p._doc, platformImage: platform.platformImage,
      }
    }))
    // console.log('trending', trending);
    // const paginated = stableSort(trendingDeals, getComparator("desc", "timeStamp")).slice(
    //   page * rowsPerPage,
    //   page * rowsPerPage + rowsPerPage
    // )
    return { status: httpStatus.OK, data: trendingDeals };
  } catch (error) {
    console.log(error);
    return { status: httpStatus.INTERNAL_SERVER_ERROR, message: error };
  }

}

module.exports = {
  all, searchProduct, trending
};
