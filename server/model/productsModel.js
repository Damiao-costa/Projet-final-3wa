const mongoose = require('mongoose');
mongoose.set('sanitizeFilter', true); // SanitizeFilter change tout nom qui commence par $ en les metant dans un $eq pour prevenir des injections 

mongoose.pluralize(false);

const productSchema = new mongoose.Schema({
    Name:String,
    Price:Number,
    Stock:Number,
    Description:String,
    ListId: {
        type: Number,
        required: [true, "Listid is required"],
        unique: true,
    }
});

productSchema.statics.catalogue = async function () {
    // la méthode .find() du Modèle permet de récupérer les documents
    const produits = await this.find({}).sort({ListId: 1});
    if (produits) {
        return produits;
    }
    throw Error("Could not retrieve from store");
};

module.exports = mongoose.model("products", productSchema);