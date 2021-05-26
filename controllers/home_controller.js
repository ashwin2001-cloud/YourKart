const Product=require('../models/product');

module.exports.home=function(req,res){
    Product.find({},function(err,products){
        if(err){
            console.log('error in finding the products');
            return;
        }
        console.log('home page');
        return res.render('home',{
            products:products
        });
    });
}
module.exports.productDescription=function(req,res){
    var productId=req.params.id;
    console.log(productId,'product id');
    Product.findById(productId,function(err,product){
        if(err){
            console.log('error in loading the project');
            return;
        }
        console.log('viewed product',product);
        if(product){
            return res.render('product_description',{
                product:product
            });
        }
        else{
            console.log('error in loading the project');
            return;
        }
    });
}