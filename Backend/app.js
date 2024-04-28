const express=require("express")
const app=express()
const PORT=8001
const userRoute=require("./Routes/user")
const adminRoute=require("./Routes/admin")
const cors=require("cors")

app.use(cors())
app.use(express.json());

app.use("/user",userRoute)
app.use("/admin",adminRoute)
app.use((err,req,res,next)=>{
    res.status(500).send("An internal server error occured")
})


app.listen(PORT,()=>{
    console.log(`Server is listening on PORT ${PORT}`)
})
