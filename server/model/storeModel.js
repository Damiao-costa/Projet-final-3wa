const mongoose = require('mongoose');
mongoose.set('sanitizeFilter', true); // SanitizeFilter change tout nom qui commence par $ en les metant dans un $eq pour prevenir des injections 

mongoose.pluralize(false);

const catalogueSchema = new mongoose.Schema({
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

catalogueSchema.pre("save", async function (next) {
    console.log(this)
    next();
});

catalogueSchema.statics.catalogue = async function () {
    // la méthode .find() du Modèle permet de récupérer les documents
    const store = await this.find({});
    if (store) {
        return store;
    }
    throw Error("Could not retrieve from store");
};

module.exports = mongoose.model("store", catalogueSchema);