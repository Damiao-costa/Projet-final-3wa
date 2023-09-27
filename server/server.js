const express = require('express');
const app = express();
const routeStore = require('./routes/store/store.route');
const cors = require('cors');
const mongoose = require('mongoose');

mongoose.pluralize(false);

mongoose.connect(`mongodb://127.0.0.1:27017/Project_Store`, {

},)
    .then(init())
    .catch(error => {
         console.log(error);
    });

async function init()
{
    app.use(cors());
    app.use('/',routeStore);
    
    app.listen(5000,()=>{console.log("Le serveur est sur le port 5000")})
}