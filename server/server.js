const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes");
const cookieParser = require("cookie-parser");
require('dotenv').config();

const app = express();

//On se connect au serveur (le port est dans le .env)
app.listen(parseInt(process.env.hiddenBackUrl), (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log("Server Started Successfully.");
    }
});

//On desactive le pluralize pour pouvoir mettre des nom de bdd singulier
mongoose.pluralize(false);

//On se connect sur le serveur mongo (mis dans le .env)
mongoose.connect(process.env.Mongo, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        console.log("DB Connetion Successfull");
    })
    .catch((err) => {
        console.log(err.message);
    });

//Cors permet la communication du front end vers le back end et bloque l'accès à tout autre domaine d'interagir
app.use(
    cors({
        origin: [process.env.hiddenFrontUrl],
        methods: ["GET", "POST"],
        credentials: true,
    })
);

//On indique a l'application express d'utiliser des json pour communiquer les données de la base de données
app.use(cookieParser());
app.use(express.json());
app.use("/", authRoutes);
