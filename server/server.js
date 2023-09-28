const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const routeStore = require('./routes/store.route');
const cookieParser = require('cookie-parser');


mongoose.pluralize(false);

mongoose.connect(`mongodb://127.0.0.1:27017/Project_Store`, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(init())
    .catch(error => {
         console.log(error);
    });

async function init()
{
    //settings
    app.use(cors());
    app.use(express.json());
    app.use(cookieParser());

    //cookies
    
    
    //routers
    app.use(routeStore);
    
    //start
    app.listen(5000,()=>{console.log("Le serveur est sur le port 5000")});
}