/**
 * Created by ying on 4/21/16.
 */
module.exports = function(mongoose) {
    var ReviewSchema = mongoose.Schema({
        sku: String,
        username: String,
        content: String
    }, {collection: "project.review"});

    return ReviewSchema;
}