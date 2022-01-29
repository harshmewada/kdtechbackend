const catchAsync = require('../../utils/catchAsync');
const userService = require('../../services/admin/user.service')

const all = catchAsync(async (req, res) => {
    const result = await userService.all();
    await res.status(result.status).send(result)
});

const create = catchAsync(async (req, res) => {
    const result = await userService.create(req.body);
    await res.status(result.status).send(result)
});

const update = catchAsync(async (req, res) => {
    const result = await userService.update(req.body);
    await res.status(result.status).send(result)
});

const remove = catchAsync(async (req, res) => {
    const result = await userService.remove(req.body);
    await res.status(result.status).send(result)
});


module.exports = {
    all, create, remove, update
};