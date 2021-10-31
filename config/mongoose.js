const mongoose=require('mongoose');
const env= require('./environment');
// mongoose.connect(process.env.MONGO_URL || 'mongodb://localhost/e-commerce_development');
mongoose
    .connect(process.env.MONGO_URL || `mongodb+srv://${env.mongo_username}:${env.password}@cluster0.qf7kg.mongodb.net/${env.db}?retryWrites=true&w=majority`,{
        useUnifiedTopology:true,
        useNewUrlParser:true,
        useCreateIndex:true,
    })
    .then(()=> console.log('MongoDB connected....'))
    .catch((err) => console.log(err));
const db=mongoose.connection;
db.on('error',console.error.bind(console,'error in connecting mongodb'));
db.once('open',function(){
    console.log('Connected to Database:: Mongodb');
});
module.exports=db;
