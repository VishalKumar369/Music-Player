const mongoose=require("mongoose")

mongoose.connect("mongodb+srv://kvishal4598:Rcsei19jz5AiDqW4@cluster0.atzmxoo.mongodb.net/capstone")

const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        lowercase:true,
        minLength:3,
        maxLength:30
    },
    password:{
        type:String,
        required:true,
        minLength:6
    }
})

const adminSchema= new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true,
        trim:true,
    },
    password:{
        type:String,
        required:true,
    }
})

const User=mongoose.model('User',userSchema)
const Admin=mongoose.model('Admin',adminSchema)

module.exports={
    User,
    Admin
}