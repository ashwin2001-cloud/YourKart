const express=require('express');
const router=express.Router();
const multer=require('multer');
const path=require('path');
const AVATAR_PATH=path.join('/uploads/products/avatars');
const vendorController=require('../controllers/vendor_controller.js');

let storage=multer.diskStorage({
    destination:function(req,file,cb){
        //cb=callback function
        cb(null,path.join(__dirname,"..",AVATAR_PATH));
    },
    filename:function(req,file,cb){
        cb(null,file.fieldname+'-'+Date.now());

    }
});
var upload=multer({ storage: storage });


router.get('/product-insertion-page',vendorController.productAdd);
router.post('/product-insertion-page/create',upload.single("avatar"),vendorController.create);

module.exports=router;