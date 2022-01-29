const catchAsync = require("../../utils/catchAsync");
const { categoryService } = require("../../services/user");

const all = catchAsync(async (req, res) => {
  const result = await categoryService.all(req.query.id);
  await res.status(result.status).send(result);
});

const products = catchAsync(async (req, res) => {
  const result = await categoryService.products(req.query.id);
  await res.status(result.status).send(result);
});

module.exports = {
  all,
  products,
};
