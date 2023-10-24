const Store = require('../model/storeModel');

//Fonction pour ajouter des commentaires personalisé aux erreurs customisé
const handleErrors = (err) => {
    let errors = { data: "" , ListId: "" };

    console.log(err);
    if (err.message === "Could not retrieve from store") {
        errors.data = "Database Error could not retrieve products";
    }

    if (err.code === 11000) {
        errors.ListId = "ListId est unique";
        return errors;
    }

    if (err.message.includes("store validation failed")) {
        Object.values(err.errors).forEach(({ properties }) => {
        errors[properties.path] = properties.message;
        });
    }

    return errors;
};

//Fonction pour recuperer les produits et les enregistrer dans un format json pour utiliser dans le front
module.exports.catalogue = async (req,res) =>
{
    try {
        const docs = await Store.catalogue({});
        res.json(docs);
    } catch (err) {
        const errors = handleErrors(err);
        res.json({ errors });
    }
}

//Fonction pour changer les valeurs d'un produit dans la base de données
module.exports.updateProduct = async (req,res) =>
{
    const { _id, Name, Price, Stock, Description, ListId } = req.body;
    try {
        const docs = await Store.updateOne({_id: _id},{Name,Price,Stock,Description,ListId});
        res.status(201).json({ docs });
    }catch(err){
        const errors = handleErrors(err);
        res.json({ errors, update: false });
    }
}

//Fonction pour delete un produit dans la base de données
module.exports.deleteProduct = async (req,res) =>
{
    const {id} = req.body;
    try {
        const docs = await Store.deleteOne({_id: id});
        res.status(201).json({ docs });
    }catch(err){
        const errors = handleErrors(err);
        res.json({ errors, delete: false });
    }
}

//Fonction pour ajouter un produit dans la base de données
module.exports.addProduct = async (req, res, next) => {
    const { Name, Price, Stock, Description, ListId } = req.body;

    try {
        const docs = await Store.create({ Name, Price, Stock, Description, ListId: ListId});

        res.status(201).json({ docs , created: true });
    } catch (err) {
        const errors = handleErrors(err);
        res.json({ errors, created: false });
    }
};
