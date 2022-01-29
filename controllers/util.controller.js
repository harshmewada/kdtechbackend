const catchAsync = require('../utils/catchAsync');
const utilService = require('../services/util.service');

const getImage = catchAsync(async (req, res) => {
    return await utilService.getImage(req, res);
});


module.exports = {
    getImage
};