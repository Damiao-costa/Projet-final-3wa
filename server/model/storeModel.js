const mongoose = require('mongoose');

mongoose.pluralize(false);

const catalogueSchema = new mongoose.Schema({
    Name:String,
    Price:Number,
    Stock:Number,
    Description:String,
    ListId:Number
});

catalogueSchema.statics.catalogue = async function () {
    // la méthode .find() du Modèle permet de récupérer les documents
    const user = await this.find({});
    if (user) {
        return user;
    }
    throw Error("Could not retrieve from store");
};

module.exports = mongoose.model("store", catalogueSchema);