const Product=require('../models/product');
const path=require('path');
const AVATAR_PATH=path.join('/uploads/products/avatars');

module.exports.productAdd=function(req,res){
    if(req.isAuthenticated() && req.user.email=='ashwinbaranwal2001@gmail.com'){
        console.log(req.user);
        return res.render('vendor-product-add');
    }
    return res.redirect('/users/sign-in');
}

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