const User = require("../model/UserModel")
const { validationResult } = require("express-validator")
const UserValidator = require('../validator/UserValidator')
const bcrypt = require('bcrypt')
const jwt= require('jsonwebtoken')

exports.insert=[
    UserValidator.validateInsert,
    async (req, res)=>{
        const errors= validationResult(req)
        // console.log(errors);
        const handlePassword = await bcrypt.hash(req.body.password, 10);
        if(errors.isEmpty()){
            const user = new User({
                username: req.body.username,
                email: req.body.email,
                contact: req.body.contact,
                // password: req.body.password,
                password: handlePassword
        })
    
        user.save()
            .then((ele)=>{
                res.send(ele)
            })
            .catch((err)=>{
                res.send(err)
            }) 
        }
        else{
            res.send(errors);
        }
        }
]

exports.list=[
    (req,res) =>{
        User.find().populate("address") //populate used to show the address in the output otherwise it only shows the id only
            .then((users)=>{
                res.send(users)
            })
            .catch((err)=>{
                res.send(err)
            })
    }
]

exports.login=[
    async (req,res)=>{
        const username = req.body.username
        const password = req.body.password
        User.findOne({
            username:username
            // password:password
        })
        .then(async (user)=>{
            const passwordMatch = await bcrypt.compare(password, user.password);
            if(passwordMatch){
                const token = jwt.sign({
                    userId: user._id,
                    username: user.username,
                    email: user.email
                }, 'this-can-be-any-random-key',{
                    expiresIn : '1h',
                })
                res.send({
                    userFound : true,
                    token: token
                })
            }
            else{
                res.send({userNotFound : false})
            }
        })
        .catch((err)=>{
            res.send(err)
        })
    }
]

exports.update=[
    (req,res) =>{
User.updateOne(
       {_id:req.params.id},  //search this
       {$set : {
            username : req.body.username,
            email: req.body.email,             //update this(data to update)
            contact: req.body.contact,
            password: req.body.password
    }})
   .then((user)=> {
            res.send(user)
  })
  .catch((err)=> {
            res.send(err)
  })
}
]

//body
//query
//params

exports.delete = [
    (req,res) => {
        User.deleteOne({_id: req.params.id})
        .then((data)=>{
            res.send(data)
        })
        .catch((err)=>{
            res.send(err)
        })
    }
]

const Address=require("../model/AddressModel")
exports.insertUserWithAddress = [
    (req, res)=>{
        const address= new Address({
                plotno: req.body.address.plotno,
                street: req.body.address.street,
                landmark: req.body.address.landmark,
                city: req.body.address.city,
                state: req.body.address.state,
                pincode: req.body.address.pincode
        })
        address.save()
        .then((ele)=>{
            const user = new User({
                username: req.body.username,
                email: req.body.email,
                contact: req.body.contact,
                password: req.body.password,
                address: ele._id
            })
            user.save()
            .then((ele)=>{
                res.send(ele)
            })
            .catch((err)=>{
                res.send(err)
            })
        })
        
    }
]

// const Contact = require("../models/ContactModel")
const ContactModel = require("../model/ContactModel")
exports.insertUserWithAddressAndContacts = [
    async (req, res) => {
        let savedAddress = null
        let savedContacts = []
        const address = new Address({
            plotno: req.body.address.plotno,
            street: req.body.address.street,
            landmark: req.body.address.landmark,
            city: req.body.address.city,
            state: req.body.address.state,
            pincode: req.body.address.pincode
        })
        console.log("Saving Address")
        await address.save()
        .then((ele)=>{
            savedAddress = ele
        })
        console.log("Address Saved")

       for(let i=0; i<req.body.contacts.length; i++){
            let e = req.body.contacts[i]
            const contact = new ContactModel({
                data: e.data, type: e.type, active: e.active                 
            })
            console.log("Saving Contact")
            await contact.save().then((t)=>{
                savedContacts = [...savedContacts, t._id]
            })
            console.log("Contact Saved")
       }
        console.log(savedContacts)
        console.log("Saving User")
        const user = new User({
            username: req.body.username,
            email: req.body.email,
            contact: req.body.contact,
            password: req.body.password,
            address: savedAddress._id,
            contacts: savedContacts
        })
        await user.save()
        .then((ele)=>{
            res.send(ele)
        })
        .catch((err)=>{
            res.send(err)
        })
        console.log("User Saved")

    }
]