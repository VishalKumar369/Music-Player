const {Router}=require("express")
const router=Router()
const {User}=require("../db/user")
const jwt=require("jsonwebtoken")
const {JWT_SECRET_USER}=require("../config")

//signin
router.post("/signin",async(req,res)=>{
    const {username,password}=req.body

    const user=await User.findOne({
        username,
        password
    })

    if(!user){
        return res.status(411).json({message: "User Doesn't Exist"})
    }

    const userid=user._id

    try{
        const token=jwt.sign({username,type:"User"},JWT_SECRET_USER,{expiresIn:"1h"})
        return res.status(200).json({message: "User login successfully",token: token,user: userid})
    }catch{
        return res.status(411).json({message:"Internal server error"})
    }
})

//signup
router.post("/signup",async(req,res)=>{
    const {username,password}=req.body

    const alreadyExist=await User.findOne({
        username:username
    })

    if(alreadyExist){
        return res.status(411).json({message: "User Already Exist"})
    }

    try{
        const user=await User.create({
            username,
            password
        })
        const userid=user._id;
        const token=jwt.sign({username,type:"User"},JWT_SECRET_USER,{expiresIn:"1h"})
        return res.status(200).json({message: "User created successfully",token: token,user: userid})
    }catch{
        return res.status(411).json({message:"Internal server error"})
    }
})


router.get("",(req,res)=>{
    res.json({message: "entered routes"},JWT_SECRET)
})


module.exports=router