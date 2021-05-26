const mongoose=require('mongoose');
// mongoose.connect(process.env.MONGO_URL || 'mongodb://localhost/e-commerce_development');
mongoose
    .connect(process.env.MONGO_URL || 'mongodb://localhost/e-commerce_development',{
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
