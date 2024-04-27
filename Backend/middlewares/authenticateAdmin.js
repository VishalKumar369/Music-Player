const {JWT_SECRET_ADMIN}=require("../config")
const jwt=require("jsonwebtoken")

const authenticateAdmin=(req,res,next)=>{
    const authHeader=req.headers.authorization;
    if(authHeader){
        const token=authHeader.split(' ')[1];
        jwt.verify(token,JWT_SECRET_ADMIN,(err,user)=>{
            if(err) res.sendStatus(403);
            req.user=user.username;
            next()
        });
    }else{
        res.sendStatus(401).json({message: "Admin Not Authenticated"})
    } 
}

module.exports={
    authenticateAdmin
}

