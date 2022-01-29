const catchAsync = require("../../utils/catchAsync");
const { productService } = require("../../services/user");

const all = catchAsync(async (req, res) => {
  const result = await productService.all(req.query.id);
  await res.status(result.status).send(result);
});

module.exports = {
  all,
};
