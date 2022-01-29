const httpStatus = require("http-status");
const { Offer } = require("../../models");

const all = async () => {
  try {

    const offers = await Offer.find().sort({ createdAt: -1 })
    return {
      status: httpStatus.OK,
      data: offers
    };
  } catch (error) {
    console.log(error);
    return { status: httpStatus.INTERNAL_SERVER_ERROR, message: error };
  }
};

module.exports = {
  all,
};
