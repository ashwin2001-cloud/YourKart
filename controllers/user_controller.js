const User=require('../models/user');

//go to sign up page
module.exports.signUp=function(req,res){
    //if he is already logged in he cant signup.
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    return res.render('user_sign_up');
}
//creating a user
module.exports.create=function(req,res){
    if(req.body.password!=req.body.confirm_password){
        return res.redirect('back');
    }
    User.findOne({email:req.body.email},function(err,user){
        if(err){
            console.log('error in finding user');
            return;
        }
        if(!user){
            User.create(req.body,function(err,user){
                if(err){
                    console.log('error in creating user');
                    return;
                }
                return res.redirect('/users/sign-in');
            });
        }
        else{
            return res.redirect('back');
        }
    });

}
//go to sign in page
module.exports.signIn=function(req,res){
    //if he is already logged in he cant sign in.
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    return res.render('user_sign_in');
}
module.exports.createSession=function(req,res){
    //remove 1 45 to 66
    // try{
    //     let user=await User.findOne({email:req.body.email});
    //     if(!user || user.password!=req.body.password){
    //         return res.json(422,{
    //             message:'invalid username|password'
    //         });
    //     } 
    //     //if user found  
    //     return res.json(200,{
    //         message:'Sign In successful ,here is your token please keep it safe!',
    //         data:{
    //             token:jwt.sign(user.toJSON(),'yourkart',{expiresIn:'100000'})
    //         }
    //     });
    // }
    // catch(error){
    //     console.log('********error',err);
    //     return res.json(500,{
    //         message:'Internal server Error'
    //     });
    // }
    return res.redirect('/');


}
//profile section
module.exports.profile=function(req,res){
    return res.render('user_profile');
}
//sign out
module.exports.destroySession=function(req,res){
    //logout() function is given by passport
    req.logout();
    //return to homepage
    return res.redirect('/');


}
