const User = require("../model/authModel");
const jwt = require("jsonwebtoken");

//L'age des cookies 3 jours
const maxAge = 3 * 24 * 60 * 60;

//On crée le json web token avec le code secret dans le .env
const createToken = (id) => {
    return jwt.sign({ id },process.env.jwtSecret, {
        expiresIn: maxAge,
    });
};

//Fonction pour ajouter des commentaires personalisé aux erreurs customisé
const handleErrors = (err) => {
    let errors = { email: "", password: "" };

    console.log(err);
    if (err.message === "incorrect email") {
        errors.email = "That email is not registered";
    }

    if (err.message === "incorrect password") {
        errors.password = "That password is incorrect";
    }

    if (err.code === 11000) {
        errors.email = "Email is already registered";
        return errors;
    }

    if (err.message.includes("users validation failed")) {
        Object.values(err.errors).forEach(({ properties }) => {
        errors[properties.path] = properties.message;
        });
    }

    return errors;
};

//Fonction pour enregistrer un nouveau utilisateur puis crée un token pour l'enregistré en tant que connecté
module.exports.register = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const user = await User.create({ email, password,type:'user'});
        const token = createToken(user._id);

        res.cookie("jwt", token, {withCredentials: true, httpOnly: false, maxAge: maxAge * 1000});

        res.status(201).json({ user: user._id, created: true });
    } catch (err) {
        const errors = handleErrors(err);
        res.json({ errors, created: false });
    }
};

//Fonction pour recuperer un utilisateur de la bdd qui correspond au email et mot de passe rentré, si les deux sont valide on crée un token dans les cookies qui dure 3 jours
module.exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.login(email, password);
        const token = createToken(user._id);

        res.cookie("jwt", token, { httpOnly: false, maxAge: maxAge * 1000 });
        res.status(200).json({ user: user._id, status: true });
    } catch (err) {
        const errors = handleErrors(err);
        res.json({ errors, status: false });
    }
};
