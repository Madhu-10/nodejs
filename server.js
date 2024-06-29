const express = require("express")
const app = express()

const bodyParser = require("body-parser")
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
const cors = require("cors")
app.use(cors())

const mongoose = require("mongoose")
// const MONGODB_URL = "mongodb://127.0.0.1:27017/NodeJS"
const MONGODB_URL = "mongodb://127.0.0.1:27017/NodeJS01"

const UserRoute = require("./routes/UserRoute")
app.use(UserRoute)
const PostRoute = require("./routes/PostRoute")
app.use(PostRoute)

const AuthMiddleware=require('./middleware/AuthMiddleware')

app.get("/unprotected",(req,res)=>{
    res.send("Unprotected URL token not needed")
})
app.get("/protected", AuthMiddleware.verifyToken, (req, res)=>{
    res.send("Protected URL token needed")
})

mongoose.connect(MONGODB_URL)
.then(()=>{
    console.log("DB Connection Succeeded");
})
.catch((err)=>{
    console.log("DB Connection Failed...", err);
})

app.listen(4000, ()=>{
    console.log("Server Listening...");
})