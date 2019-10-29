const router = require('express').Router()
const User = require('../models/User')
const mongoose = require('mongoose')

// Authentication Middleware

const auth = require('../middleware/Auth')


/*  @ GET
    @ Get Users List
    @params BULLs
*/

router.get('/', auth, (req,res) => {
     User.find({},(err,users) => {
        if(!err)  res.render('pages/users/users',{users})
        else  res.render('pages/users/users',{users:[]})
    })
    
})

/*  @ POST
    @ Handle Search Request
    @params search
*/

router.post('/search',auth,(req,res) => {
    const { search } = req.body
    User.find({ $text:{$search:search} },{_id:0,password:0},(err,users) => {
        console.log(err)
        if(!err)  res.render('pages/users/users',{users})
        else  res.render('pages/users/users',{users:[]})
    });  
})


/*  @ GET
    @ User Form
    @params search
*/

router.get('/create',auth,(req,res) => {
    res.render('pages/users/create')
});

/*  @ POST
    @ Handle New User Creation
    @params search
*/

router.post('/create',(req,res) => {

    const {name,email,info,password} = req.body
    console.log(req.body);
    // Create New User
    const user = new User({
        _id:mongoose.Types.ObjectId(),
        name,
        email,
        info,
        password
    })
    user.save().then(result => {
        return res.redirect('/users')
    }).catch(err => console.log(err))

})


module.exports =  router