const httpStatus = require("http-status");
const { Product, Category } = require("../../models");
const { getFilesData } = require("../../utils/functions");
const { sendNotifications } = require("../user/notification.service");

const all = async (status) => {
  try {
    const products = await Product.find();
    return {
      status: httpStatus.OK,
      data: products,
    };
  } catch (error) {
    console.log(error);
    return { status: httpStatus.INTERNAL_SERVER_ERROR, message: error };
  }
};

const create = async (data, files) => {
  try {
    console.log('data', data);
    data.productImage = await getFilesData(files[0])
    data.categoryId = JSON.parse(data.categoryId)
    data.discount = ((data.basePrice - data.salePrice) / data.basePrice) * 100
    data.isManyProduct = data.isManyProduct !== 'undefined' ? true : false
    const added = await Product.create(data);
    if (added) {
      await Promise.all(data.categoryId.map(async c => {
        const foundCate = await Category.findById(c)
        if (foundCate.categoryName === 'Loot Deals') {
          await sendNotifications({
            title: `${parseInt(added.discount)}% OFF - ${added.productName}`, body: 'New Super Deals Added', imageUrl: `https://lootdealsapp.com/api/util/file/${added.productImage}`, productData: {
              productId: added.id || added._id,
              type: 'Product',
              productName: added.productName
            }
          })
        }

      }))
    }
    return { status: httpStatus.OK, message: "Product Added Successfully" };
  } catch (error) {
    console.log(error);
    return { status: httpStatus.INTERNAL_SERVER_ERROR, message: error };
  }
};

const update = async (data, files) => {
  try {
    data.productImage = await getFilesData(files[0])
    data.categoryId = JSON.parse(data.categoryId)
    data.discount = ((data.basePrice - data.salePrice) / data.basePrice) * 100
    data.manyProductTitle = data.isManyProduct === 'true' ? data.manyProductTitle : ''
    await Product.findByIdAndUpdate(data._id || data.id, data, { new: true });

    return { status: httpStatus.OK, message: "Product Updated Successfully" };
  } catch (error) {
    console.log(error);
    return { status: httpStatus.INTERNAL_SERVER_ERROR, message: error };
  }
};

const remove = async (data) => {
  try {
    await Product.findByIdAndDelete(data._id || data.id);
    return { status: httpStatus.OK, message: "Product Deleted Successfully" };
  } catch (error) {
    return { status: httpStatus.INTERNAL_SERVER_ERROR, message: error };
  }
};

const toggleExpire = async (data, files) => {
  try {
    await Product.findByIdAndUpdate(data._id || data.id, data);
    return { status: httpStatus.OK, message: "Expiration Changed Successfully" };
  } catch (error) {
    console.log(error);
    return { status: httpStatus.INTERNAL_SERVER_ERROR, message: error };
  }
};

module.exports = {
  all,
  create,
  update,
  remove,
  toggleExpire
};
