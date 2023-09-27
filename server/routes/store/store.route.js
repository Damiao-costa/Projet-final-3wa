const express = require('express');
const mongoose = require('mongoose');
const router = express.Router('router');

mongoose.pluralize(false);

const storeSchema = new mongoose.Schema({
    Name:String,
    Price:Number,
    Stock:Number,
    Description:String
});
const storeModel = mongoose.model("store", storeSchema);

router.get("/",function(req,res,next){
    res.send("Api is working");
});

router.get('/data',async function(req,res,next){
        try {
            // la méthode .find() du Modèle permet de récupérer les documents
            const docs = await storeModel.find({});
            res.json(docs);
        } catch (err) {
            res.status(500).send(err.message);
        }
});

module.exports=router;