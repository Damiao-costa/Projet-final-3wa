const { register, login } = require("../controllers/authControllers");
const { catalogue } = require('../controllers/storeController');
const { checkUser } = require("../middlewares/authMiddleware");

const router = require("express").Router();

//Les routes de l'application pour tout ce qui concerne l'utilisateur 
router.post("/", checkUser); 
router.post("/register", register);
router.post("/login", login);

//Les routes de l'application pour tout ce qui concerne les produits magazins 
router.get("/store", catalogue);

module.exports = router;
