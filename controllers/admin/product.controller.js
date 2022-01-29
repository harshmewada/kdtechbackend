const catchAsync = require("../../utils/catchAsync");
const { productService } = require("../../services/admin");
const { statusCheck } = require("../../utils/functions");

const all = catchAsync(async (req, res) => {
  const result = await productService.all(statusCheck(req.query.status));
  await res.status(result.status).send(result);
});

const create = catchAsync(async (req, res) => {
  const result = await productService.create(req.body, req.files);
  await res.status(result.status).send(result);
});

const update = catchAsync(async (req, res) => {
  const result = await productService.update(req.body, req.files);
  await res.status(result.status).send(result);
});

const remove = catchAsync(async (req, res) => {
  const result = await productService.remove(req.body);
  await res.status(result.status).send(result);
});

const toggleExpire = catchAsync(async (req, res) => {
  const result = await productService.toggleExpire(req.body, req.files);
  await res.status(result.status).send(result);
});

module.exports = {
  all,
  create,
  remove,
  update,
  toggleExpire
};
