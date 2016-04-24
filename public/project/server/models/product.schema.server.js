/**
 * Created by ying on 4/22/16.
 */
module.exports = function (mongoose) {
    var ProductSchema = mongoose.Schema({
        sku: String,
        name: String,
        largeImage: String,
        url: String,
        addToCartUrl: String
    })

    return ProductSchema;
};