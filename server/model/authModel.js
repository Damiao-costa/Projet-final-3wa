const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "Email is Required"],
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        minlength:[6, 'Taille minimum est de 6 characters'],
        required: [true, "Password is Required"],
    },
});

userSchema.pre("save", async function (next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

//Schema pour quand on veut login, la fonction prend l'email et vois s'il existe dans la bdd puis compare le mdp de cette utilisateur, les etant crypté via bcrypt.
userSchema.statics.login = async function (email, password) {
    const user = await this.findOne({ email });
    if (user) {
        const auth = await bcrypt.compare(password, user.password);
        if (auth) {
            return user;
        }
        throw Error("incorrect password");
    }
    throw Error("incorrect email");
};

module.exports = mongoose.model("Users", userSchema);
