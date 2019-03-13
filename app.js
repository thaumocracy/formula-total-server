const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const app = express()

mongoose.connect('mongodb://localhost/formula-total')

const db = mongoose.connection

db.once('open',() => console.log('Server connected to the database'))

const userSchema = new mongoose.Schema({
    userName : String,
    email:String,
    password:String,
    userBalance:Number,
    userBets : [{
        race:String,
        win : Boolean
    }]
})

const User = new mongoose.model('User',userSchema)

const TestUser = new User({
    userName:"TestUser",
    email:"test@example.com",
    password:"password",
    userBalance:10000,
    userBets :[ {
        race:'Australia',
        win:false
    }]
})

TestUser.save((error,user) => {
    if(error){
        console.log(error)
    } else {
        console.log(user)
    }

})


app.get('/',(request,response) => {
    User.find({}).then(data => response.json(data))
    console.log('/ - connected')
})



app.listen(3000,() => console.log(`Server launched at port 3000`))