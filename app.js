require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')

const adminRoutes = require('./routes/admin')
const cors = require('cors')

//Skapar en express-app, namnet ska vara samma som variabeln 
const app = express();

app.use(cors())

//Middleware för att kunna använda req.body i post/patch req
app.use(express.json())

/*Middleware - kod som körs mellan att vi får en request på servern och att vi sänder en response
Routes är en typ av middleware
Koden nedan är en blobal middleware, use är en metid, funktionen nedan körs för varje request som kommer in
Next måste inkluderas så nästa del av middleware körs, ex funktiknen nedan köra INNAN ex app.get('/*), utan next skulle den
inte köras
KOden nedan är en logger som är hjälpsam i utvecklingsarbetet
*/
app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

//Routes
app.use('/api/admin', adminRoutes)

mongoose.set("strictQuery", false);

//Connect to db
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        //Listen for requests - Vi kommer nu endast bara lyssna på request om anslutningen mot databasen lyckats
        app.listen(process.env.PORT, () => {
        console.log('Connected to db & listening on port', process.env.PORT)
        })
    })
    .catch((error) => {
        console.log(error)
    })





