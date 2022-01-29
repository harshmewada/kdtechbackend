const httpStatus = require("http-status");
const { Category, Product, Platform, Offer } = require("../../models");
const moment = require('moment')

const all = async (id) => {
  try {
    // const products = await Product.find({ status: true });

    const cats = await Category.find({ status: true }).sort({ priority: 1 });
    const offers = await Offer.find().sort({ createdAt: -1 }).limit(10);

    const loopedCats = await Promise.all(
      cats.filter(c => c.categoryName !== 'Loot Deals').map(async (c) => {
        const products = await Product.find({
          categoryId: { $in: [c._id || c.id] }, status: true,
          // expireAt: {
          //   $gte: moment().toDate(),
          // }
        }).sort({ createdAt: -1 });
        const newProducts = await Promise.all(products.map(async p => {
          const platform = await Platform.findById(p.platformId)
          return {
            ...p._doc, platformImage: platform.platformImage,
            productDescription: "<h6>This product can be purchased by clicking on this button</h6>"
          }
        }))
        return {
          ...c._doc,
          title: c.categoryName,
          products: newProducts,
        };
      })
    );
    let lootDealsProducts = []

    const lootDealsCate = await Category.findOne({ categoryName: 'Loot Deals' })
    if (lootDealsCate) {
      const prod = await Product.find({
        categoryId: { $in: [lootDealsCate._id || lootDealsCate.id] }, status: true,
      }).sort({ createdAt: -1 });
      lootDealsProducts = await Promise.all(prod.map(async p => {
        const platform = await Platform.findById(p.platformId)
        return {
          ...p._doc, platformImage: platform.platformImage,
          productDescription: "<h6>This product can be purchased by clicking on this button</h6>"
        }
      }))

    }
    const trending = await Product.find({ status: true }).limit(20).sort({ viewCount: -1 })
    const trendingDeals = await Promise.all(trending.map(async p => {
      const platform = await Platform.findById(p.platformId)
      return {
        ...p._doc, platformImage: platform.platformImage,
        productDescription: "<h6>This product can be purchased by clicking on this button</h6>"
      }
    }))

    return {
      status: httpStatus.OK,
      data: {
        offers: offers,
        categories: loopedCats,
        lootDeals: lootDealsCate ? { ...lootDealsCate._doc, title: lootDealsCate.categoryName, products: lootDealsProducts } : {},
        trendingDeals: trendingDeals
      },
    };
  } catch (error) {
    console.log(error);
    return { status: httpStatus.INTERNAL_SERVER_ERROR, message: error };
  }
};

module.exports = {
  all,
};
