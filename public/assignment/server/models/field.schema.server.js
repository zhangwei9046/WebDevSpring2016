/**
 * Created by ying on 4/1/16.
 */
"use strict";
module.exports = function (mongoose) {
    var FieldSchema = mongoose.Schema({
        "label": String,
        "type": {
            "type": String,
            "enum": ["TEXT", "TEXTAREA", "RADIOS", "CHECKBOXES", "OPTIONS", "DATE"]
        },
        "placeholder": String,
        "options": [
            {
                "label": String,
                "value": String
            }
        ]
    });

    return FieldSchema;
}