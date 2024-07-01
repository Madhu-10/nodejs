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

const multer = require('multer')        //I) Import
const path = require('path')

const storage = multer.diskStorage({    //II) Configuration
    destination: function ( req, file, cb){
        cb(null, './files/uploads/')
    },
    filename: function ( req, file, cb){
        cb(null, Date.now() + path.extname(file.originalname))  //appending extension
    }
})

const uploader = multer({storage : storage});   //III) middleware connection

app.post('/upload/single', uploader.single('upload_file'), (req, res)=>{
    console.log(req.file, req.body)
    res.status(200).send("File Upload Successfully...!")
});
//single keyword - should only upload one file
//array keyword - used to send multiple files
//into uploader.single/array('upload_files)  -> using this key we upload files into the postman
app.post('/upload/multiple', uploader.array('uploaded_file'), (req, res)=>{
    console.log(req.file, req.body)
    res.status(200).send("Multiple Files Upload Successfully...!")
});

app.listen(4000, ()=>{
    console.log("Server Listening...");
})