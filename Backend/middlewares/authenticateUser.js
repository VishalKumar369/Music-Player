const {JWT_SECRET_USER}=require("../config")
const jwt=require("jsonwebtoken")

const authenticateUser=(req,res,next)=>{
    const authHeader=req.headers.authorization;
    if(authHeader){
        const token=authHeader;
        jwt.verify(token,JWT_SECRET_USER,(err,user)=>{
            if(err) res.sendStatus(403);
            req.user=user.username;
            next()
        });
    }else{
        res.status(401).json({message: "User Not Authenticated"})
    } 
}

module.exports={
    authenticateUser
}

