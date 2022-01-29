const catchAsync = require('../../utils/catchAsync');
const { dashboardService } = require('../../services/admin')
const index = catchAsync(async (req, res) => {
    const result = await dashboardService.all()
    await res.render('./dashboard/index.ejs', result);
});

module.exports = {
    index
};