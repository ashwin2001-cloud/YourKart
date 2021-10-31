const express=require('express');
const cookieParser=require('cookie-parser');
const app=express();
const port=process.env.PORT || 8000;
const sassMiddleware=require('node-sass-middleware');
const env= require('./config/environment');
console.log(env);
app.use(sassMiddleware({
    src:'./assets/scss',
    dest:'./assets/css',
    debug:false,
    outputStyle:'extended',
    prefix:'/css'
}));



const expressLayouts=require('express-ejs-layouts');
const db=require('./config/mongoose');

const session=require('express-session');
const passport=require('passport');
const passportLocal=require('./config/passport-local-strategy');
const passportJWT=require('./config/passport-jwt-strategy');
const MongoStore=require('connect-mongo')(session);

app.use(express.urlencoded());
app.use(cookieParser());
app.use(express.static('assets'));
app.use('/uploads',express.static(__dirname+'/uploads'));
app.use(expressLayouts);
//extract style and scripts from subpages into layouts
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);


app.set('view engine','ejs');
app.set('views','./views');

app.use(session({
    name:'yourkart',
    secret: env.session_cookie_key,
    saveUninitialized:false,
    resave:false,
    cookie:{
        //session set for 100 minutes
        maxAge:(1000*60*100)
    },
    store:new MongoStore(
        {
            mongooseConnection:db,
            autoRemove:'disabled'
        },function(err){
            console.log(err || 'connect-mongo set-up ok');
        }
    )
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);
app.use('/',require('./routes/index.js'));

app.listen(port,function(err){
    if(err){
        console.log(`error is :${err}`);
    }
    console.log(`port is running on:${port}`);



})