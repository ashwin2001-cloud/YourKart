
const Cart=require('../models/cart');
const User=require('../models/user');
const Product=require('../models/product');
// const cart = require('../models/cart');


module.exports.addProductsInCart=function(req,res){
    var product_id=req.params.id;
    var cart=new Cart(req.session.cart ? req.session.cart : {} );
    // if(req.session.cart){
    //     var cart=new Cart(req.session.cart,true );
    // }
    // else{
    //     var cart=new Cart({},false );
    // }
    Product.findById(product_id,function(err,product){
        if(err){
            console.log('back');
            return res.redirect('/');
        }
        cart.add(product, product_id);
        req.session.cart=cart;
        if(cart.totalQty>0){
            res.locals.isCart=true;
        }
        console.log('!!!!!!!!!!!!!!', product, '!!!!!!!!!!!!!!');
        // console.log(req.session.cart);
        // console.log(cart.totalQty," ",res.locals.isCart)
        // console.log("session:::::::",req.session);
        // console.log(req.session.cart.items);
        //console.log('generated array',cart.generateArray());
        return res.redirect('/users/cartpage/${req.user.id}');
    });

}
module.exports.cartPage=function(req,res){
    if(!req.session.cart){
        return res.render('cart-page',{
            products:null
        });
    }
    console.log('cartpage rendered');
    var cart=new Cart(req.session.cart);
    
    return res.render('cart-page',{
        products:cart.generateArray(),
        totalPrice:cart.totalPrice,
        totalQty:cart.totalQty
    })
}
module.exports.checkout=function(req,res){
    if(!req.session.cart){
        return res.redirect(back);
    }
    var cart=new Cart(req.session.cart);
    return res.render('checkout',{
        totalPrice:cart.totalPrice
    })


}
module.exports.decrementQuantity=function(req,res){
    console.log("decremented product",req.params.id);
    var product_id=req.params.id;
    var cart=new Cart(req.session.cart ? req.session.cart : {} );
    Product.findById(product_id,function(err,product){
        if(err){
            return res.redirect('back');
        }
        cart.subtract(product,product_id);
        req.session.cart=cart;
        if(cart.totalQty>0){
            res.locals.isCart=true;
        }
        else{
            res.locals.isCart=false;
        }
        return res.redirect('back');
    });

}
module.exports.removeProduct=function(req,res){
    console.log("removed product",req.params.id);
    // var cart=new Cart(req.session.cart);
    var cart=new Cart(req.session.cart ? req.session.cart : {} );
    var product_id=req.params.id;
    Product.findById(product_id,function(err,product){
        if(err){
            console.log('product cant be removed');
            return res.redirect('back');
        }
        cart.remove(product,product_id);
        req.session.cart=cart;
        if(cart.totalQty>0){
            res.locals.isCart=true;
            console.log('true', cart.totalQty);

        }
        else{
            res.locals.isCart=false;
            console.log('false case',cart.totalQty);
            return res.redirect('back');
        }
        return res.redirect('back');

    })
}