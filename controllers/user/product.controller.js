const catchAsync = require("../../utils/catchAsync");
const { productService } = require("../../services/user");

const all = catchAsync(async (req, res) => {
  const result = await productService.all(req.query.id);
  await res.status(result.status).send(result);
});

const searchProduct = catchAsync(async (req, res) => {
  const result = await productService.searchProduct(req.query.query);
  await res.status(result.status).send(result);
});

const trending = catchAsync(async (req, res) => {
  const result = await productService.trending(req.query.page);
  await res.status(result.status).send(result);
});

module.exports = {
  all, searchProduct, trending
};
