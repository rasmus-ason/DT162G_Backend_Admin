const Admin = require('../models/adminModel')
const mongoose = require('mongoose')
const express = require('express')
const bodyParser = require('express')
const app = express();
const bcrypt = require("bcryptjs")

const jwt = require("jsonwebtoken")

const JWT_SECRET = "kbscbscb233ksbc(/b44jbj55bbppkkqq/&Chhh!!"

app.use(bodyParser.urlencoded({ 
    extended: true 
}));

// get all destinations
const getUsers = async (req, res) => {

     const users = await Admin.find()

     res.status(200).json(users)
    
}


// get single destination
const getUser = async (req, res) => {
    const { id } = req.params

    //Kontroll så det är en giltig objectId
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'Not a valid ID'})
    }
    const user = await Admin.findById(id)

    if(!user) {
        return res.status(400).json({error: 'User did not exist!'})
    }
    res.status(200).json(user)

}


// create new destination
const createUser = async (req, res) => {

    const {email, password} = req.body 

    const encryptedPassword = await bcrypt.hash(password,10)

    try {
        const oldUser = Admin.findOne({email});

        if(!oldUser){
            res.send({error: "Email already exists"})
        }

        await Admin.create({
            email,
            password: encryptedPassword
        });
        res.send({status:"ok"})
    }catch(error) {
        res.send({status:"error"})
    }

}

 const loginUser = async (req, res) => {

    const {email, password} = req.body

    const user = await Admin.findOne({email})

    if(!user){
        return res.json({ error: "User not found" })
    }

    if(await bcrypt.compare(password, user.password)){
        const token = jwt.sign({}, JWT_SECRET)
    
        if(res.status(201)){
            return res.json({ status: "ok", data: token})
        }else {
            return res.json({ status: "error"})
        }
    }else {
        return res.json({ status: "error", error: "Wrong password"})
    }

    



 }

// delete destination
 const deleteUser = async (req, res) => {

     const { id } = req.params

     //Kontroll så det är en giltig objectId
     if(!mongoose.Types.ObjectId.isValid(id)){
         return res.status(404).json({error: 'Not a valid ID'})
     }

     const admin = await Admin.findOneAndDelete({_id: id})

     if(!admin) {
         return res.status(400).json({error: 'User with selected ID does not exist'})
     }

     res.status(200).json(admin)


 }


//Exportera funktionerna separat
module.exports = {
    createUser,
    loginUser,
    getUsers,
    getUser,
    deleteUser
  
}