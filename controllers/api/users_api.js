const User=require('../../models/user');
const jwt=require('jsonwebtoken');
const passport=require('passport');
const Cart = require('../../models/cart');

module.exports.createSession=async function(req,res){
    try{
        let user=await User.findOne({email:req.body.email});
        if(!user || user.password!=req.body.password){
            return res.json(422,{
                message:'invalid username|password'
            });
        } 
        //if user found  
        return res.json(200,{
            message:'Sign In successful ,here is your token please keep it safe!',
            data:{
                token:jwt.sign(user.toJSON(),'yourkart',{expiresIn:'100000'})
            }
        });
    }
    catch(error){
        console.log('********error',err);
        return res.json(500,{
            message:'Internal server Error'
        });
    }



}
module.exports.orderPlace=function(req,res){
    console.log('order place user id:',req.params.id);
    try{
        
        if(req.params.id==res.locals.user.id){
            var cart=new Cart(req.session.cart ? req.session.cart : {} );
            cart.emptyCart();
            req.session.cart=cart;
            return res.render('order_place',{
                message:'Your Order has been succesfully placed!!'
            });
        
            // return res.json(200,{
            //     message:'order placed successfully'
                
            // });
        }
    }
    catch(err){
        // res.render('order_place',{
        //     message:'internal server error!!'
        // });
        console.log(err);
        return res.json(500,{
            message:'internal server'
        });
    }
    


}
