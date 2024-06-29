const express = require('express') //Common JS syntax
// import {express} from 'express' //Es6 syntax

const app = express() //Initiates Express Application

const signinRouter = require("./routes/signin") //Import & Connect
app.use(signinRouter)

app.get("/hi",(req, res)=>{
    res.send("Hii World")
})

app.get("/hello",(req, res)=>{
    res.send("Hello World")
})

app.get("/html", (req, res)=>{
    const html=`
    <div>
        Username : <input type="text" /><br />
        Password : <input type="password" /> <br />
        <input type="button" value="Signin" />
    </div>
    `
    res.send(html)
})

app.get("/json", (req, res)=>{
    const user = {
        username : "Madhu",
        id : "123",
        gender : "Female"
    }
    res.send(user)
})

app.use("/public", express.static(__dirname + "/files"))

// app.use(express.urlencoded())
const bodyParser = require("body-parser")
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.post("/signin", (req, res)=>{
    const username=req.body.username
    const password=req.body.password
    if(username=="madhu"&& password=="123"){
        res.send("Login Success")
    }
    else{
        res.send("Login Failed")
    }
    // const username=req.query("username")
    // const password=req.query("password")
    console.log(username + " " + password);
    res.send("Data received")
})

const post = [
    {
        id:1,
        titile:"id 1 details: some Length description for post",
        author:"Madhu"
    },
    {
        id:2,
        titile:" id 2 details:some Length description for post",
        author:"Deepi"
    },
    {
        id:3,
        titile:" id 3 details:some Length description for post",
        author:"Dharshini"
    }
]

const levelone =(req,res,next)=>{
    console.log(" level 1  Request received/post/:id",new Date())
    next()
}
const leveltwo =(req,res,next)=>{
    console.log(" level 2  Request received/post/:id",new Date())
    next()
}
const levelthree =(req,res,next)=>{
    console.log(" level 3  Request received/post/:id",new Date())
    next()
}
app.get("/post/:id",[
    levelone,leveltwo,levelthree,
    (req,res) => {
        // console.log(req.params.id);
        // res.send("id",req.params.id)
        console.log("sending Data")
        let id = req.params.id
        res.send(post[id])
    }
])

app.listen(5000, ()=>{
    console.log("Server Listening...");
})