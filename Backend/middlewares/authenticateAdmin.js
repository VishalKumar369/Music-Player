const {JWT_SECRET_ADMIN}=require("../config")
const jwt=require("jsonwebtoken")

const authenticateAdmin=(req,res,next)=>{
    const authHeader=req.headers.authorization;
    if(authHeader){
        const token=authHeader;
        console.log("token",token)
        jwt.verify(token,JWT_SECRET_ADMIN,(err,user)=>{
            console.log("error",err)
            if(err) res.sendStatus(403);
            req.user=user.username;
            next()
        });
    }else{
        res.status(401).json({message: "Admin Not Authenticated"})
    } 
}

module.exports={
    authenticateAdmin
}

