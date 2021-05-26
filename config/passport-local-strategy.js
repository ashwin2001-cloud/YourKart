const passport=require('passport');
//imported passport local and especially strategy property
const LocalStrategy=require('passport-local').Strategy;
//imported user
const User=require('../models/user');

passport.use(new LocalStrategy({
        usernameField:'email'
    },
    function(email,password,done){
        User.findOne({email:email},function(err,user){
            if(err){
                console.log('error in finding user--> passport');
                return done(err);
            }
            if(!user || user.password!=password){
                console.log('error in finding user');
                return done(null,false);
            }
            return done(null,user);
        });
    }
));
//serialising the user and deciding which key is to be kept in cookies
passport.serializeUser(function(user,done){
    done(null,user.id);
});
//deserialsiing
passport.deserializeUser(function(id,done){
    User.findById(id,function(err,user){
        if(err){
            console.log('error in deserialising');
            return done(err);
        }
        return done(null,user);

    });
});
//to check that user is authenticated or not 
//it is passed as a middle ware
passport.checkAuthentication=function(req,res,next){
    //if user is signed in pass on request to next.
    if(req.isAuthenticated()){
        return next();
    }
    //if user is not signed in.
    return res.redirect('/users/sign-in');



}
passport.setAuthenticatedUser=function(req,res,next){
    if(req.isAuthenticated()){
        /* req.user contains the current signed in user 
        from the session cookie and we are just sending 
        this to the locals for the views*/
        res.locals.user=req.user;
        res.locals.session=req.session;
        res.locals.isCart=false;
        //console.log('req',req);
    }
    next();
}




module.exports=passport;