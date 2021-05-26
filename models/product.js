const mongoose=require('mongoose');
const multer=require('multer');
const path=require('path');
const AVATAR_PATH=path.join('/uploads/products/avatars');


const productSchema=new mongoose.Schema({
    product_id:{
        type:Number,
        required:true,
        unique:true
    },
    name:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    type:{
        type:String,
        required:true
    },
    subtype:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    manufacturer:{
        type:String,
        required:true
    },
    stock:{
        type:Number,
        required:true

    },
    avatar:{
        type:String
    },
    reviews: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Review'
        }
    ]
    

},{
    timestamps:true
});

let storage=multer.diskStorage({
    destination:function(req,file,cb){
        //cb=callback function
        cb(null,path.join(__dirname,"..",AVATAR_PATH));
    },
    filename:function(req,file,cb){
        cb(null,file.fieldname+'-'+Date.now());

    }
});
//static methods
productSchema.statics.uploadedAvatar=multer({storage:storage}).single('avatar');
productSchema.statics.avatarPath=AVATAR_PATH;



const Product=mongoose.model('Product',productSchema);
module.exports=Product;