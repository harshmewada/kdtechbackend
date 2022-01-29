const jwt = require("jsonwebtoken");
const { User } = require("../models");

async function auth(req, res, next) {
  const token = req.header("auth-token");
  if (token !== "null" && Boolean(token)) {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    if (!verified) {
      return res.status(401).send({ message: "Access denied" });
    }
    const userId = verified._id;

    const users = await User.findOne({ _id: userId });

    if (!users) {
      return res.status(404).send({ message: "user not found" });
    }
    req.userId = verified._id;
    req.standardId = users.selectedStandardId;
    req.language = users.selectedLanguage == 'gujarati' ? users.selectedLanguage : 'english';
    req.branchId = users.selectedBranchId;
  }
  next();

}
module.exports = auth;
