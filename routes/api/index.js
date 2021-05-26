const express=require('express');
const router=express.Router();


router.use('/users',require('./users'));


console.log('router is working fine');
module.exports=router;
