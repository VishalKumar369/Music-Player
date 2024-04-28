const {JWT_SECRET_ADMIN}=require("../config")
const jwt=require("jsonwebtoken")

const authenticateAdmin=(req,res,next)=>{
    const authHeader=req.headers.authorization;
    console.log("authHeader",authHeader)
    if(authHeader){
        const token=authHeader;
        jwt.verify(token,JWT_SECRET_ADMIN,(err,user)=>{
            if(err) res.sendStatus(403);
            console.log("error",err)
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

