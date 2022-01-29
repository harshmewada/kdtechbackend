const catchAsync = require("../../utils/catchAsync");
const { offerService } = require("../../services/user");

const all = catchAsync(async (req, res) => {
  const result = await offerService.all();
  await res.status(result.status).send(result);
});

module.exports = {
  all,
};
