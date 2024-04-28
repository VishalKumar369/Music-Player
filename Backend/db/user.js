const mongoose=require("mongoose")

// mongoose.connect("mongodb+srv://kvishal4598:Rcsei19jz5AiDqW4@cluster0.atzmxoo.mongodb.net/capstone")
// mongoose.connect("mongodb+srv://admin:Vishal2468@cluster0.la3bepe.mongodb.net/MyUser?retryWrites=true&w=majority")
mongoose.connect("mongodb://localhost:27017/MusicLibrary")


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