const httpStatus = require("http-status");
const { Platform } = require("../../models");
const { getFilesData } = require("../../utils/functions");

const all = async () => {
  try {
    const platforms = await Platform.find();
    return {
      status: httpStatus.OK,
      data: platforms,
    };
  } catch (error) {
    console.log(error);
    return { status: httpStatus.INTERNAL_SERVER_ERROR, message: error };
  }

};

const create = async (data, files) => {
  try {
    data.platformImage = await getFilesData(files[0])
    await Platform.create(data);
    return { status: httpStatus.OK, message: "Platform Added Successfully" };
  } catch (error) {
    console.log(error);
    return { status: httpStatus.INTERNAL_SERVER_ERROR, message: error };
  }
};

const update = async (data, files) => {
  try {
    data.platformImage = await getFilesData(files[0])
    await Platform.findByIdAndUpdate(
      data._id || data.id,
      data
    );
    return { status: httpStatus.OK, message: "Platform Updated Successfully" };
  } catch (error) {
    console.log(error);
    return { status: httpStatus.INTERNAL_SERVER_ERROR, message: error };
  }
};

const remove = async (data) => {
  try {
    await Platform.findByIdAndDelete(data._id || data.id);
    return { status: httpStatus.OK, message: "Platform Deleted Successfully" };
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
