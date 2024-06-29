const User = require('../model/UserModel')
const { body, validationResult } = require("express-validator")

exports.validateInsert = [
    body("email").trim().isEmail().withMessage("Provide valid mail id"),
    body("username").trim().isLength({min: 5}).withMessage("Username must be above 5 characters")
    .custom((value)=>{
        return User.findOne({username: value})
        .then((user)=>{
            if(user){
                return Promise.reject("Username already exist")
            }
        })
    })
    // isLength ->validator
    // withMessage -> error message
]