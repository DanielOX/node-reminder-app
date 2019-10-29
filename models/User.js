const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
    _id:mongoose.Types.ObjectId,
    name:{
        required:true,
        type:String
    },
    email:{
        required:true,
        type:String
    },
    password:{
        required:false,
        type:String
    },
    info:{
        required:true,
        type:String
    }
})

module.exports = User = mongoose.model('users',UserSchema)