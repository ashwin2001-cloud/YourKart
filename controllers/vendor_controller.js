const Product=require('../models/product');
const path=require('path');
const AVATAR_PATH=path.join('/uploads/products/avatars');

module.exports.productAdd=function(req,res){
    return res.render('vendor-product-add');
}
/*
module.exports.avatarUpload=function(req,res,product){
    Product.uploadedAvatar(req,res,function(err){
        if(err){
            console.log("****************multer error");
            return;
        }
        if(req.file){
            product.avatar=Product.avatarPath+'/'+req.file.fieldname;
        }
        product.save();
    })




}
*/

module.exports.create=function(req,res){
    //console.log(req.body);
    //console.log(req.file);
    Product.create({
        product_id:req.body.productid,
        name:req.body.name,
        price:req.body.price,
        type:req.body.type,
        subtype:req.body.subtype,
        description:req.body.description,
        manufacturer:req.body.manufacturer,
        stock:req.body.stock,
        avatar:AVATAR_PATH+'/'+req.file.filename
       // avatar:Product.avatarPath+'/'+req.file.fieldname

    },function(err,product){
        if(err){
            console.log('error in creating a product');
            return;
        }
        //avatarUpload(product);
        return res.redirect('/vendor/product-insertion-page');
    })



}