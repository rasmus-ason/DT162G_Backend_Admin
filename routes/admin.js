const express = require('express')
//Importera funktioner
const {
    createUser,
    loginUser,
    getUser,
    getUsers,
    deleteUser
    
} = require('../controllers/adminController')

const router = express.Router()

//Get all users
router.get('/', getUsers)

//Get a single user
router.get('/:id', getUser)

//Create user
router.post('/register', createUser)

//Login user
router.post('/login', loginUser)

//Delete user
router.delete('/:id', deleteUser)


//Exporterar alla funktioner med router.verb
module.exports = router