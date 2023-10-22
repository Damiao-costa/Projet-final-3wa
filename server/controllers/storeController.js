const Store = require('../model/storeModel');

//Fonction pour recuperer les produits et les enregistrer dans un format json pour utiliser dans le front
module.exports.catalogue = async function(req,res)
{
    try {
        const docs = await Store.catalogue({});
        res.json(docs);
    } catch (err) {
        res.status(500).send(err.message);
    }
}