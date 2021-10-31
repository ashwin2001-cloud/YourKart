const express=require('express');
const router=express.Router();
const homeController=require('../controllers/home_controller.js');
const passport= require('../config/passport-local-strategy');

router.get('/',homeController.home);
router.use('/users',require('./users'));
router.use('/review',require('./review'));
router.use('/vendor',require('./vendor'));
router.use('/api',require('./api'));
router.get('/products/:id', passport.checkAuthentication, homeController.productDescription);
console.log('router is working fine');
module.exports=router;
