const express=require('express');
const router=express.Router();
const passport=require('passport');
const userAPI=require('../../controllers/api/users_api');
router.post('/create-session',userAPI.createSession);
// router.post('/buy/:id',passport.authenticate('jwt',{session:false}),userAPI.orderPlace);
router.post('/buy/:id',userAPI.orderPlace);
console.log('router is working fine');
module.exports=router;