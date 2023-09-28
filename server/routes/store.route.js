const express = require('express');
const router = express.Router('router');
const authController = require('../controllers/authController');
const storeController = require('../controllers/storeController');

router.get("/",function(req,res,next){
    res.send("Api is working");
});


router.get('/data',storeController.catalogue);

router.get('/signup',authController.signup_get);
router.post('/signup',authController.signup_post);
router.get('/login',authController.login_get);
router.post('/login',authController.login_post);

router.get('/logout',()=>{

});

module.exports=router;