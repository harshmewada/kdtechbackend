const httpStatus = require("http-status");
const { Offer } = require("../../models");
const { getFilesData } = require("../../utils/functions");

const all = async () => {
  try {
    const offers = await Offer.find();
    return {
      status: httpStatus.OK,
      data: offers,
    };
  } catch (error) {
    console.log(error);
    return { status: httpStatus.INTERNAL_SERVER_ERROR, message: error };
  }

};

const create = async (data, files) => {
  try {
    data.offerImage = await getFilesData(files[0])
    await Offer.create(data);
    return { status: httpStatus.OK, message: "Offer Added Successfully" };
  } catch (error) {
    console.log(error);
    return { status: httpStatus.INTERNAL_SERVER_ERROR, message: error };
  }
};

const update = async (data, files) => {
  try {
    data.offerImage = await getFilesData(files[0])
    await Offer.findByIdAndUpdate(
      data._id || data.id,
      data
    );
    return { status: httpStatus.OK, message: "Offer Updated Successfully" };
  } catch (error) {
    console.log(error);
    return { status: httpStatus.INTERNAL_SERVER_ERROR, message: error };
  }
};

const remove = async (data) => {
  try {
    await Offer.findByIdAndDelete(data._id || data.id);
    return { status: httpStatus.OK, message: "Offer Deleted Successfully" };
  } catch (error) {
    return { status: httpStatus.INTERNAL_SERVER_ERROR, message: error };
  }
};

module.exports = {
  all,
  create,
  update,
  remove
};
