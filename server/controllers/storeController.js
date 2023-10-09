const Catalogue = require('../models/Catalogue');

module.exports.catalogue = async function(req,res)
{
    try {
        // la méthode .find() du Modèle permet de récupérer les documents
        const docs = await Catalogue.find({});
        res.json(docs);
    } catch (err) {
        res.status(500).send(err.message);
    }
}