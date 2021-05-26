const express=require('express');
const router=express.Router();
const reviewController=require('../controllers/review_controller.js');
const passport= require('passport');

router.get('/delete', passport.checkAuthentication, reviewController.delete);
router.post('/create', passport.checkAuthentication, reviewController.create);

module.exports=router;