const httpStatus = require("http-status");
const { User, Subscription } = require("../../models");
const bcrypt = require("bcryptjs");
const moment = require('moment')

const all = async () => {
  try {
    const appuser = await User.aggregate([
      { $match: { role: 'user' } },
      {
        $lookup: {
          from: "userbusinesses",
          localField: "_id",
          foreignField: "userId",
          as: "businesses",
        },
      },
      {
        $addFields: {
          totalBusinesses: { $size: "$businesses" }
        }
      },
      {
        $sort: { _id: -1 }
      }
    ])
    const adminuser = await User.aggregate([
      { $match: { $and: [{ role: { $ne: "user" } }, { role: { $ne: "superadmin" } }] } }])

    return {
      status: httpStatus.OK,
      appuser: appuser,
      adminuser: adminuser,
    };
  } catch (error) {
    console.log(error);
    return { status: httpStatus.INTERNAL_SERVER_ERROR, message: error };
  }
};

const create = async (data) => {
  try {
    if (data.mobile) {
      const checkMobile = await User.find({ mobile: data.mobile });
      if (checkMobile.length > 0) {
        return {
          status: httpStatus.INTERNAL_SERVER_ERROR,
          message:
            "Mobile number is already exist!, Please try another one",
        };
      }
    }
    if (data.email) {
      const checkEmail = await User.find({ email: data.email });
      if (checkEmail.length > 0) {
        return {
          status: httpStatus.INTERNAL_SERVER_ERROR,
          message:
            "Email address is already exist!, Please try another one",
        };
      }
    }
    let hashPassword
    if (data.password) {
      const salt = await bcrypt.genSalt(10);
      hashPassword = await bcrypt.hash(data.password, salt);
    }
    await User.create({ ...data, password: data.password ? hashPassword : undefined });

    return { status: httpStatus.OK, message: "User Added Successfully" };
  } catch (error) {
    console.log(error);
    return { status: httpStatus.INTERNAL_SERVER_ERROR, message: error };
  }
};

const update = async (data) => {
  try {
    const checkMobile = await User.find({ mobile: data.mobile });
    if (checkMobile.length > 0) {
      const checkuser = await User.find({
        mobile: data.mobile,
      });

      if (checkuser.length <= 0) {
        return {
          status: httpStatus.INTERNAL_SERVER_ERROR,
          message:
            "Mobile address already exist!, Please try another mobile number",
        };
      }
    }

    await User.findByIdAndUpdate(
      data._id || data.id,
      data
    );
    return { status: httpStatus.OK, message: "User Updated Successfully" };
  } catch (error) {
    console.log(error);
    return { status: httpStatus.INTERNAL_SERVER_ERROR, message: error };
  }
};

const remove = async (data) => {
  try {
    await User.findByIdAndDelete(data._id || data.id);
    return { status: httpStatus.OK, message: "User Deleted Successfully" };
  } catch (error) {
    return { status: httpStatus.INTERNAL_SERVER_ERROR, message: error };
  }
};

module.exports = {
  all,
  create,
  update,
  remove,
};
