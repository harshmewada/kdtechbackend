const httpStatus = require("http-status");
const { Token } = require("../../models");


const admin = require("firebase-admin");

// firebase configuration

const serviceAccount = require("../../firebase.json");
const config = require("../../config/config");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: config.mongoose.url
});


const register = async (data) => {
  try {
    const checkExist = await Token.find({ token: data.token })
    if (checkExist.length > 0) {
      return { status: httpStatus.OK, };
    }
    await Token.create(data)
    return { status: httpStatus.OK, message: 'Token registered successfully' };
  } catch (error) {
    console.log(error);
    return { status: httpStatus.INTERNAL_SERVER_ERROR, message: error };
  }
};

const sendNotifications = async (data) => {
  try {
    const { title, body, imageUrl, productData } = data
    const alltokens = await Token.find()
    const tokens = await Promise.all(alltokens.map(t => {
      return t.token
    }))
    const send = await admin.messaging().sendMulticast({
      tokens,
      notification: {
        title,
        body,
        imageUrl,
      },
      topic: "lootdeals",

      data: productData
    });
    console.log('send', send);
    if (send.responses[0].success) {
      return ({ status: httpStatus.OK, message: 'Notification sent successfully' });
    } else {
      return ({ status: httpStatus.INTERNAL_SERVER_ERROR, message: send.responses[0].error || "Failed to send notification" });
    }
  } catch (error) {
    console.log(error);
    return ({ status: httpStatus.INTERNAL_SERVER_ERROR, message: "Failed to send notification" });

  }

}

module.exports = {
  register, sendNotifications
};
