const mongoose = require("mongoose");
const userSchema=new mongoose.Schema({
    clerkId:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    chatHistory:[
        {
            _id: { 
                type: mongoose.Schema.Types.ObjectId, auto: true 
            },
            question:{
                type:String,
                required:true
            },
            answer:{
                type:String,
                required:true
            },
            date:{
                type:Date,
                default:Date.now
            },
        }
    ],
});
const User=mongoose.model("User",userSchema);
module.exports=User;