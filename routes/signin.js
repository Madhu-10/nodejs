const express = require("express")
const router = express.Router()
const bodyParser = require("body-parser")
router.use(bodyParser.urlencoded({extended: false}))
router.use(bodyParser.json())

router.post("/signin", (req, res)=>{
    const username=req.body.username
    const password=req.body.password
    if(username=="madhu"&& password=="123"){
        res.send("Login Success")
    }
    else{
        res.send("Login Failed")
    }
})

router.get("/signin", (req, res)=>{
    const username=req.body.username
    const password=req.body.password
    if(username=="madhu"&& password=="123"){
        res.send("Login Success")
    }
    else{
        res.send("Login Failed")
    }
})

module.exports = router