const mongoose = require('mongoose');

mongoose.pluralize(false);

const catalogueSchema = new mongoose.Schema({
    Name:String,
    Price:Number,
    Stock:Number,
    Description:String,
    ListId:Number
});
const Catalogue = mongoose.model("store", catalogueSchema);

module.exports = Catalogue;