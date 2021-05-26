/*
const mongoose=require('mongoose');
const cartSchema=new mongoose.Schema({
    productname:{
        type:String
    },
    productid:{
        type:Number
    },
    productprice:{
        type:Number
    },
    productavatar:{
        type:String
    },
    quantity:{
        type:Number
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        //name of model to be linked
        ref:'User'
    }
},{
    timestamps:true
});
const Cart=mongoose.model('Cart',cartSchema);
module.exports=Cart;
*/

module.exports=function Cart(oldCart){
    this.items=oldCart.items || {};
    this.totalPrice=oldCart.totalPrice || 0;
    this.totalQty=oldCart.totalQty || 0;
    // this.isCart=isCardExist;

    this.add=function(item, id){
        var storedItem=this.items[id];
        if(!storedItem){
            storedItem=this.items[id]={item:item,qty:0,price:0}
        }

        if(storedItem.item.stock == storedItem.qty){
            console.log('stock is full');
            return;
        }
        
        storedItem.qty++;
        storedItem.price=storedItem.item.price*storedItem.qty;
        this.totalQty+=1;
        this.totalPrice+=storedItem.item.price;
        console.log(storedItem.item.stock, '******');
        
    }
    this.subtract=function(item,id){
        var storedItem=this.items[id];
        if(storedItem.qty<=1){
            console.log('this product can be now removed directly');
            return;
        }
        storedItem.qty--;
        storedItem.price=storedItem.item.price*storedItem.qty;
        this.totalQty-=1;
        this.totalPrice-=storedItem.item.price;
        
    }
    //empty a cart after buying
    this.emptyCart=function(){
        console.log('empty the cart now!!');
        this.items={};
        this.totalPrice=0;
        this.totalQty=0;
        oldCart.items={};
        oldCart.totalPrice=0;
        oldCart.totalQty=0;
        for(var id in this.items){
            this.items[id]={};
            
        }
    }
    this.remove=function(item, id){

        var storedItem=this.items[id];
        if(storedItem.qty<=0){
            return ;
        }
        
        //storedItem.price=storedItem.item.price*storedItem.qty;
        this.totalQty-=storedItem.qty;
        this.totalPrice-=storedItem.qty*storedItem.item.price;
        storedItem.qty=0;
        storedItem.price=0;
        storedItem.item={};
        this.items[id]={};
        if(this.totalQty<=0){
            // locals.isCart=false;
            // this.isCart=false;
            // thisCardExist=false;
            this.items={};
            this.totalPrice=0;
            this.totalQty=0;
            oldCart.items={};
            oldCart.totalPrice=0;
            oldCart.totalQty=0;
        }
    }
    this.generateArray=function(){
        var arr=[];
        for(var id in this.items){
            if(this.items[id]=={})  continue;
            arr.push(this.items[id]);
        }
        return arr;
    }
}
