/**
 * Created by ying on 4/21/16.
 */
module.exports = function(mongoose) {
    var ProductSchema = require("./product.schema.server.js")(mongoose);
    var ReviewSchema = mongoose.Schema({
        sku: String,
        product: ProductSchema,
        username: String,
        content: String
    }, {collection: "project.review"});

    return ReviewSchema;
};