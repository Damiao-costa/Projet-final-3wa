const User = require("../model/authModel");
const jwt = require("jsonwebtoken");

//On verifie que le cookies correspond à un json token valide avec le code secret
module.exports.checkUser = (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
        jwt.verify(
        token,
        process.env.jwtSecret,
        async (err, decodedToken) => {
            if (err) {
                res.json({ status: false });
                next();
            } else {
                const user = await User.findById(decodedToken.id);
                if (user) res.json({ status: true, user: user.email });
                else res.json({ status: false });
                next();
            }
        }
        );
    } else {
        res.json({ status: false });
        next();
    }
};
