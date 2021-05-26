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
module.exports.productDescription=async function(req,res){
    try{
        var productId=req.params.id;
        let product= await Product.findById(productId).populate({
            path: 'reviews',
            populate:{
                path: 'user'
            }
        });  
        for(review of product.reviews){
            review = await review.populate('user', 'name').execPopulate();
        }
        

        return res.render('product_description',{
            product:product
        });

    }catch(err){
        console.log(err);
        return;
    }

}