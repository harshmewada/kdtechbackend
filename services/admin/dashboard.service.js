const { User, UserSubscription } = require('../../models')
const moment = require('moment')

const all = async () => {

    const users = await User.find({
        "createdAt": {
            $gte: moment().subtract(1, 'months').endOf('month'),
            $lte: moment()
        },
    })

    const revenue = await UserSubscription.aggregate([
        {
            $match: {
                $and: [
                    { "createdAt": { $gte: new Date(moment(new Date()).subtract(1, 'months').endOf('month').format('YYYY-MM-DD[T00:00:00.000Z]')), } },
                ]
            }
        },
        {
            $group: {
                _id: null, totalRevenue: { $sum: "$amount" }, average: { $avg: '$amount' }, count: { $sum: 1 }
            }
        },

    ])
    const allrevenue = await UserSubscription.aggregate([

        {
            $group: {
                _id: null, totalRevenue: { $sum: "$amount" }, average: { $avg: '$amount' }, count: { $sum: 1 }
            }
        },

    ])

    return ({ users: users.length, revenue: revenue.length > 0 ? revenue[0].totalRevenue : 0, average: revenue.length > 0 ? revenue[0].average : 0, count: revenue.length > 0 ? revenue[0].count : 0, allrevenue: allrevenue.length > 0 ? allrevenue[0].totalRevenue : 0, allaverage: allrevenue.length > 0 ? allrevenue[0].average : 0, allcount: allrevenue.length > 0 ? allrevenue[0].count : 0 })
}

module.exports = {
    all
}