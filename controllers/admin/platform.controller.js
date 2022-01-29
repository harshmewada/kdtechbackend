const catchAsync = require('../../utils/catchAsync');
const { platformService } = require('../../services/admin');
const { statusCheck } = require('../../utils/functions');

const all = catchAsync(async (req, res) => {
    const result = await platformService.all();
    await res.status(result.status).send(result)
});

const create = catchAsync(async (req, res) => {
    const result = await platformService.create(req.body, req.files);
    await res.status(result.status).send(result)
});

const update = catchAsync(async (req, res) => {
    const result = await platformService.update(req.body, req.files);
    await res.status(result.status).send(result)
});

const remove = catchAsync(async (req, res) => {
    const result = await platformService.remove(req.body);
    await res.status(result.status).send(result)
});



module.exports = {
    all, create, remove, update
};